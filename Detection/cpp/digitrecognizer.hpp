#include <opencv2/opencv.hpp>
#include "opencv2/highgui/highgui_c.h"


using namespace cv;
using namespace cv::ml;

#define MAX_NUM_IMAGES 60000
class DigitRecognizer
{
public:
    DigitRecognizer();

    ~DigitRecognizer();

    bool train(char *trainPath, char *labelsPath);

    int classify(Mat img);

private:
    Mat preprocessImage(Mat img);

    int readFlippedInteger(FILE *fp);

private:
    KNearest *knn;
    int numRows, numCols, numImages;
};