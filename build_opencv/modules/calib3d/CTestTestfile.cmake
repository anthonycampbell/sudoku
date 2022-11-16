# CMake generated Testfile for 
# Source directory: /Users/anthony/cs/sudoku/opencv/modules/calib3d
# Build directory: /Users/anthony/cs/sudoku/build_opencv/modules/calib3d
# 
# This file includes the relevant testing commands required for 
# testing this directory and lists subdirectories to be tested as well.
add_test(opencv_perf_calib3d "/Users/anthony/cs/sudoku/build_opencv/bin/opencv_perf_calib3d" "--gtest_output=xml:opencv_perf_calib3d.xml")
set_tests_properties(opencv_perf_calib3d PROPERTIES  LABELS "Main;opencv_calib3d;Performance" WORKING_DIRECTORY "/Users/anthony/cs/sudoku/build_opencv/test-reports/performance" _BACKTRACE_TRIPLES "/Users/anthony/cs/sudoku/opencv/cmake/OpenCVUtils.cmake;1751;add_test;/Users/anthony/cs/sudoku/opencv/cmake/OpenCVModule.cmake;1251;ocv_add_test_from_target;/Users/anthony/cs/sudoku/opencv/cmake/OpenCVModule.cmake;1111;ocv_add_perf_tests;/Users/anthony/cs/sudoku/opencv/modules/calib3d/CMakeLists.txt;9;ocv_define_module;/Users/anthony/cs/sudoku/opencv/modules/calib3d/CMakeLists.txt;0;")
add_test(opencv_sanity_calib3d "/Users/anthony/cs/sudoku/build_opencv/bin/opencv_perf_calib3d" "--gtest_output=xml:opencv_perf_calib3d.xml" "--perf_min_samples=1" "--perf_force_samples=1" "--perf_verify_sanity")
set_tests_properties(opencv_sanity_calib3d PROPERTIES  LABELS "Main;opencv_calib3d;Sanity" WORKING_DIRECTORY "/Users/anthony/cs/sudoku/build_opencv/test-reports/sanity" _BACKTRACE_TRIPLES "/Users/anthony/cs/sudoku/opencv/cmake/OpenCVUtils.cmake;1751;add_test;/Users/anthony/cs/sudoku/opencv/cmake/OpenCVModule.cmake;1252;ocv_add_test_from_target;/Users/anthony/cs/sudoku/opencv/cmake/OpenCVModule.cmake;1111;ocv_add_perf_tests;/Users/anthony/cs/sudoku/opencv/modules/calib3d/CMakeLists.txt;9;ocv_define_module;/Users/anthony/cs/sudoku/opencv/modules/calib3d/CMakeLists.txt;0;")
