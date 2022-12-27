import cv2
from imutils import contours
import numpy as np
import pytesseract

pytesseract.pytesseract.tesseract_cmd = '/opt/homebrew/Cellar/tesseract/5.2.0/bin/tesseract'

# Load image, grayscale, and adaptive threshold
heightImg = 450
widthImg = 450
line_min_width = 50


def preProcess(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5, 5), 1)
    thresh = cv2.adaptiveThreshold(blur, 255, 1, 1, 11, 2)
    return thresh


def biggestContour(contours):
    biggest = np.array([])
    max_area = 0
    for i in contours:
        area = cv2.contourArea(i)
        if area > 50:
            peri = cv2.arcLength(i, True)
            approx = cv2.approxPolyDP(i, 0.02*peri, True)
            if area > max_area and len(approx) == 4:
                biggest = approx
                max_area = area
    return biggest, max_area


def reorder(points):
    points = points.reshape((4, 2))
    pointsNew = np.zeros((4, 1, 2), dtype=np.int32)
    add = points.sum(1)
    pointsNew[0] = points[np.argmin(add)]
    pointsNew[3] = points[np.argmax(add)]
    diff = np.diff(points, axis=1)
    pointsNew[1] = points[np.argmin(diff)]
    pointsNew[2] = points[np.argmax(diff)]
    return pointsNew


def splitBoxes(img):
    rows = np.vsplit(img, 9)
    boxes = []
    for r in rows:
        cols = np.hsplit(r, 9)
        for box in cols:
            boxes.append(box)
    return boxes


image = cv2.imread('sudoku3.jpg')
image = cv2.resize(image, (widthImg, heightImg))
thresh = preProcess(image)

# Filter out all numbers and noise to isolate only boxes
cnts, heirarchy = cv2.findContours(
    thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
biggest, maxArea = biggestContour(cnts)
if biggest.size != 0:
    biggest = reorder(biggest)
    pts1 = np.float32(biggest)
    pts2 = np.float32(
        [[0, 0], [widthImg, 0], [0, heightImg], [widthImg, heightImg]])
    matrix = cv2.getPerspectiveTransform(pts1, pts2)
    imgWarpColored = cv2.warpPerspective(image, matrix, (widthImg, heightImg))
    imgWarpColored = cv2.cvtColor(imgWarpColored, cv2.COLOR_BGR2GRAY)

    thresh = cv2.adaptiveThreshold(imgWarpColored,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV,57,5)
    cv2.imshow('thrsh', thresh)
    cnts = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    cnts = cnts[0] if len(cnts) == 2 else cnts[1]
    for c in cnts:
        area = cv2.contourArea(c)
        if area < 1000:
            cv2.drawContours(thresh, [c], -1, (0, 0, 0), -1)

    # Fix horizontal and vertical lines
    vertical_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, 5))
    thresh = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE,
                            vertical_kernel, iterations=9)
    horizontal_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 1))
    thresh = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE,
                            horizontal_kernel, iterations=4)

    dilation = cv2.dilate(thresh, vertical_kernel, iterations=1)

    # Sort by top to bottom and each row by left to right
    invert = 255 - thresh
    cnts = cv2.findContours(invert, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    cnts = cnts[0] if len(cnts) == 2 else cnts[1]
    (cnts, _) = contours.sort_contours(cnts, method="top-to-bottom")

    sudoku_rows = []
    row = []
    for (i, c) in enumerate(cnts, 1):
        area = cv2.contourArea(c)
        if area < 50000:
            row.append(c)
            if i % 9 == 0:
                (cnts, _) = contours.sort_contours(row, method="left-to-right")
                sudoku_rows.append(cnts)
                row = []

    # Iterate through each box
    returnStr = ""
    for row in sudoku_rows:
        for c in row:
            # mask = np.zeros(imgWarpColored.shape, dtype=np.uint8)
            # cv2.drawContours(mask, [c], -1, (255, 255, 255), -1)
            # result = cv2.bitwise_and(imgWarpColored, mask)
            # result[mask == 0] = 255
            # text = pytesseract.image_to_string(result)
            x, y, w, h = cv2.boundingRect(c)
            rect = cv2.rectangle(thresh, (x, y), (x + w, y + h), (0, 255, 0), 2)
            cropped = thresh[y:y + h, x:x + w]
            cv2.imshow('crop', cropped)
            cv2.waitKey(1)
            text = pytesseract.image_to_string(
                cropped, lang="eng", config='--psm 9 --oem 3 -c tessedit_char_whitelist=123456789')
            text = text.replace("\n", "")
            returnStr += text or '0'
    print(returnStr)
