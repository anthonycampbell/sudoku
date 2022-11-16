# CMake generated Testfile for 
# Source directory: /Users/anthony/cs/sudoku/opencv/modules/videoio
# Build directory: /Users/anthony/cs/sudoku/build_opencv/modules/videoio
# 
# This file includes the relevant testing commands required for 
# testing this directory and lists subdirectories to be tested as well.
add_test(opencv_perf_videoio "/Users/anthony/cs/sudoku/build_opencv/bin/opencv_perf_videoio" "--gtest_output=xml:opencv_perf_videoio.xml")
set_tests_properties(opencv_perf_videoio PROPERTIES  LABELS "Main;opencv_videoio;Performance" WORKING_DIRECTORY "/Users/anthony/cs/sudoku/build_opencv/test-reports/performance" _BACKTRACE_TRIPLES "/Users/anthony/cs/sudoku/opencv/cmake/OpenCVUtils.cmake;1751;add_test;/Users/anthony/cs/sudoku/opencv/cmake/OpenCVModule.cmake;1251;ocv_add_test_from_target;/Users/anthony/cs/sudoku/opencv/modules/videoio/CMakeLists.txt;281;ocv_add_perf_tests;/Users/anthony/cs/sudoku/opencv/modules/videoio/CMakeLists.txt;0;")
add_test(opencv_sanity_videoio "/Users/anthony/cs/sudoku/build_opencv/bin/opencv_perf_videoio" "--gtest_output=xml:opencv_perf_videoio.xml" "--perf_min_samples=1" "--perf_force_samples=1" "--perf_verify_sanity")
set_tests_properties(opencv_sanity_videoio PROPERTIES  LABELS "Main;opencv_videoio;Sanity" WORKING_DIRECTORY "/Users/anthony/cs/sudoku/build_opencv/test-reports/sanity" _BACKTRACE_TRIPLES "/Users/anthony/cs/sudoku/opencv/cmake/OpenCVUtils.cmake;1751;add_test;/Users/anthony/cs/sudoku/opencv/cmake/OpenCVModule.cmake;1252;ocv_add_test_from_target;/Users/anthony/cs/sudoku/opencv/modules/videoio/CMakeLists.txt;281;ocv_add_perf_tests;/Users/anthony/cs/sudoku/opencv/modules/videoio/CMakeLists.txt;0;")
