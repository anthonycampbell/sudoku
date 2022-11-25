#include <opencv2/opencv.hpp>
#include <opencv2/ml.hpp>

using namespace cv;
using namespace ml;

#define MAX_NUM_IMAGES    60000
class DigitRecognizer
{
public:
    DigitRecognizer();

    ~DigitRecognizer();

    bool train(char* trainPath, char* labelsPath);

    int classify(Mat img);

private:
    Mat preprocessImage(Mat img);

    int readFlippedInteger(FILE *fp);

private:
    KNearest    *knn;
    int numRows, numCols, numImages;

};