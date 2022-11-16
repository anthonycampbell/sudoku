# CMake generated Testfile for 
# Source directory: /Users/anthony/cs/sudoku/opencv/modules/gapi
# Build directory: /Users/anthony/cs/sudoku/build_opencv/modules/gapi
# 
# This file includes the relevant testing commands required for 
# testing this directory and lists subdirectories to be tested as well.
add_test(opencv_perf_gapi "/Users/anthony/cs/sudoku/build_opencv/bin/opencv_perf_gapi" "--gtest_output=xml:opencv_perf_gapi.xml")
set_tests_properties(opencv_perf_gapi PROPERTIES  LABELS "Main;opencv_gapi;Performance" WORKING_DIRECTORY "/Users/anthony/cs/sudoku/build_opencv/test-reports/performance" _BACKTRACE_TRIPLES "/Users/anthony/cs/sudoku/opencv/cmake/OpenCVUtils.cmake;1751;add_test;/Users/anthony/cs/sudoku/opencv/cmake/OpenCVModule.cmake;1251;ocv_add_test_from_target;/Users/anthony/cs/sudoku/opencv/modules/gapi/CMakeLists.txt;365;ocv_add_perf_tests;/Users/anthony/cs/sudoku/opencv/modules/gapi/CMakeLists.txt;0;")
add_test(opencv_sanity_gapi "/Users/anthony/cs/sudoku/build_opencv/bin/opencv_perf_gapi" "--gtest_output=xml:opencv_perf_gapi.xml" "--perf_min_samples=1" "--perf_force_samples=1" "--perf_verify_sanity")
set_tests_properties(opencv_sanity_gapi PROPERTIES  LABELS "Main;opencv_gapi;Sanity" WORKING_DIRECTORY "/Users/anthony/cs/sudoku/build_opencv/test-reports/sanity" _BACKTRACE_TRIPLES "/Users/anthony/cs/sudoku/opencv/cmake/OpenCVUtils.cmake;1751;add_test;/Users/anthony/cs/sudoku/opencv/cmake/OpenCVModule.cmake;1252;ocv_add_test_from_target;/Users/anthony/cs/sudoku/opencv/modules/gapi/CMakeLists.txt;365;ocv_add_perf_tests;/Users/anthony/cs/sudoku/opencv/modules/gapi/CMakeLists.txt;0;")
