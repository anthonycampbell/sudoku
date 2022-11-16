# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.24

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /opt/homebrew/Cellar/cmake/3.24.3/bin/cmake

# The command to remove a file.
RM = /opt/homebrew/Cellar/cmake/3.24.3/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /Users/anthony/cs/sudoku/opencv

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /Users/anthony/cs/sudoku/build_opencv

# Include any dependencies generated for this target.
include apps/version/CMakeFiles/opencv_version.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include apps/version/CMakeFiles/opencv_version.dir/compiler_depend.make

# Include the progress variables for this target.
include apps/version/CMakeFiles/opencv_version.dir/progress.make

# Include the compile flags for this target's objects.
include apps/version/CMakeFiles/opencv_version.dir/flags.make

apps/version/CMakeFiles/opencv_version.dir/opencv_version.cpp.o: apps/version/CMakeFiles/opencv_version.dir/flags.make
apps/version/CMakeFiles/opencv_version.dir/opencv_version.cpp.o: /Users/anthony/cs/sudoku/opencv/apps/version/opencv_version.cpp
apps/version/CMakeFiles/opencv_version.dir/opencv_version.cpp.o: apps/version/CMakeFiles/opencv_version.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/Users/anthony/cs/sudoku/build_opencv/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object apps/version/CMakeFiles/opencv_version.dir/opencv_version.cpp.o"
	cd /Users/anthony/cs/sudoku/build_opencv/apps/version && /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT apps/version/CMakeFiles/opencv_version.dir/opencv_version.cpp.o -MF CMakeFiles/opencv_version.dir/opencv_version.cpp.o.d -o CMakeFiles/opencv_version.dir/opencv_version.cpp.o -c /Users/anthony/cs/sudoku/opencv/apps/version/opencv_version.cpp

apps/version/CMakeFiles/opencv_version.dir/opencv_version.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/opencv_version.dir/opencv_version.cpp.i"
	cd /Users/anthony/cs/sudoku/build_opencv/apps/version && /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /Users/anthony/cs/sudoku/opencv/apps/version/opencv_version.cpp > CMakeFiles/opencv_version.dir/opencv_version.cpp.i

apps/version/CMakeFiles/opencv_version.dir/opencv_version.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/opencv_version.dir/opencv_version.cpp.s"
	cd /Users/anthony/cs/sudoku/build_opencv/apps/version && /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /Users/anthony/cs/sudoku/opencv/apps/version/opencv_version.cpp -o CMakeFiles/opencv_version.dir/opencv_version.cpp.s

# Object files for target opencv_version
opencv_version_OBJECTS = \
"CMakeFiles/opencv_version.dir/opencv_version.cpp.o"

# External object files for target opencv_version
opencv_version_EXTERNAL_OBJECTS =

bin/opencv_version: apps/version/CMakeFiles/opencv_version.dir/opencv_version.cpp.o
bin/opencv_version: apps/version/CMakeFiles/opencv_version.dir/build.make
bin/opencv_version: lib/libopencv_core.4.6.0.dylib
bin/opencv_version: apps/version/CMakeFiles/opencv_version.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/Users/anthony/cs/sudoku/build_opencv/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX executable ../../bin/opencv_version"
	cd /Users/anthony/cs/sudoku/build_opencv/apps/version && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/opencv_version.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
apps/version/CMakeFiles/opencv_version.dir/build: bin/opencv_version
.PHONY : apps/version/CMakeFiles/opencv_version.dir/build

apps/version/CMakeFiles/opencv_version.dir/clean:
	cd /Users/anthony/cs/sudoku/build_opencv/apps/version && $(CMAKE_COMMAND) -P CMakeFiles/opencv_version.dir/cmake_clean.cmake
.PHONY : apps/version/CMakeFiles/opencv_version.dir/clean

apps/version/CMakeFiles/opencv_version.dir/depend:
	cd /Users/anthony/cs/sudoku/build_opencv && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /Users/anthony/cs/sudoku/opencv /Users/anthony/cs/sudoku/opencv/apps/version /Users/anthony/cs/sudoku/build_opencv /Users/anthony/cs/sudoku/build_opencv/apps/version /Users/anthony/cs/sudoku/build_opencv/apps/version/CMakeFiles/opencv_version.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : apps/version/CMakeFiles/opencv_version.dir/depend

