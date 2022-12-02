import cv2
from imutils import contours
import numpy as np
import pytesseract

pytesseract.pytesseract.tesseract_cmd = '/opt/homebrew/Cellar/tesseract/5.2.0/bin/tesseract'
file = open("recognized.txt", "w+")
file.write("")
file.close()

# Load image, grayscale, and adaptive threshold
image = cv2.imread('sudoku1.png')
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
thresh = cv2.adaptiveThreshold(gray,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV,57,5)


# Filter out all numbers and noise to isolate only boxes
cnts = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
cnts = cnts[0] if len(cnts) == 2 else cnts[1]
for c in cnts:
    area = cv2.contourArea(c)
    if area < 1000:
        cv2.drawContours(thresh, [c], -1, (0,0,0), -1)

# Fix horizontal and vertical lines
vertical_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1,5))
thresh = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, vertical_kernel, iterations=9)
horizontal_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5,1))
thresh = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, horizontal_kernel, iterations=4)

dilation = cv2.dilate(thresh, vertical_kernel, iterations = 1)

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
file = open("recognized.txt", "a")
for row in sudoku_rows:
    for c in row:
        mask = np.zeros(image.shape, dtype=np.uint8)
        cv2.drawContours(mask, [c], -1, (255,255,255), -1)
        result = cv2.bitwise_and(image, mask)
        result[mask==0] = 255
        text = pytesseract.image_to_string(result)
        x, y, w, h = cv2.boundingRect(c)
        rect = cv2.rectangle(result, (x, y), (x + w, y + h), (0, 255, 0), 2)
        cropped = result[y:y + h, x:x + w]
        cv2.imshow('crop', cropped)
        cv2.waitKey(1)
        text = pytesseract.image_to_string(cropped,lang="eng", config='--psm 9 --oem 3 -c tessedit_char_whitelist=0123456789')
        text = text.replace("\n", "")
        print(text)
        file.write(text or '0')
    file.write('\n')
file.close