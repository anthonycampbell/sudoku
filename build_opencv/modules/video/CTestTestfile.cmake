# CMake generated Testfile for 
# Source directory: /Users/anthony/cs/sudoku/opencv/modules/video
# Build directory: /Users/anthony/cs/sudoku/build_opencv/modules/video
# 
# This file includes the relevant testing commands required for 
# testing this directory and lists subdirectories to be tested as well.
add_test(opencv_perf_video "/Users/anthony/cs/sudoku/build_opencv/bin/opencv_perf_video" "--gtest_output=xml:opencv_perf_video.xml")
set_tests_properties(opencv_perf_video PROPERTIES  LABELS "Main;opencv_video;Performance" WORKING_DIRECTORY "/Users/anthony/cs/sudoku/build_opencv/test-reports/performance" _BACKTRACE_TRIPLES "/Users/anthony/cs/sudoku/opencv/cmake/OpenCVUtils.cmake;1751;add_test;/Users/anthony/cs/sudoku/opencv/cmake/OpenCVModule.cmake;1251;ocv_add_test_from_target;/Users/anthony/cs/sudoku/opencv/cmake/OpenCVModule.cmake;1111;ocv_add_perf_tests;/Users/anthony/cs/sudoku/opencv/modules/video/CMakeLists.txt;2;ocv_define_module;/Users/anthony/cs/sudoku/opencv/modules/video/CMakeLists.txt;0;")
add_test(opencv_sanity_video "/Users/anthony/cs/sudoku/build_opencv/bin/opencv_perf_video" "--gtest_output=xml:opencv_perf_video.xml" "--perf_min_samples=1" "--perf_force_samples=1" "--perf_verify_sanity")
set_tests_properties(opencv_sanity_video PROPERTIES  LABELS "Main;opencv_video;Sanity" WORKING_DIRECTORY "/Users/anthony/cs/sudoku/build_opencv/test-reports/sanity" _BACKTRACE_TRIPLES "/Users/anthony/cs/sudoku/opencv/cmake/OpenCVUtils.cmake;1751;add_test;/Users/anthony/cs/sudoku/opencv/cmake/OpenCVModule.cmake;1252;ocv_add_test_from_target;/Users/anthony/cs/sudoku/opencv/cmake/OpenCVModule.cmake;1111;ocv_add_perf_tests;/Users/anthony/cs/sudoku/opencv/modules/video/CMakeLists.txt;2;ocv_define_module;/Users/anthony/cs/sudoku/opencv/modules/video/CMakeLists.txt;0;")
