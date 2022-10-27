/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

const sudokuLibrary = require('./libraries/sudoku_solver/sudoku');
const printSudoku = require('./libraries/sudoku_solver/printSudoku');
import Sudoku from './components/Sudoku';
import Numbers from './components/Numbers';
import Actions from './components/Actions';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  View
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const [board, setBoard] = useState(
    [
      [5, null, null, null, 4, null, 8, null, null],
      [6, 7, null, 8, null, null, 5, null, null],
      [9, null, null, null, null, null, 6, 1, 3],
      [null, 6, 2, 1, null, null, 3, 7, 4],
      [4, null, null, null, null, 3, 9, null, 8],
      [null, 7, null, null, 2, null, null, null, null],
      [null, 9, 6, 2, 1, 8, null, 5, null],
      [1, null, 7, null, null, 6, null, 8, null],
      [8, null, 2, null, 4, 5, null, 9, null]
    ]);
  const isDarkMode = useColorScheme() === 'dark';
  const [selectedNum, setSelectedNum] = useState(null);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  const solve = (e) => {
    const rows = [[], [], [], [], [], [], [], [], []];
    for (let i = 0; i < board.length; i++) {
      const block = board[i];
      for (let j = 0; j < block.length; j++) {
        const r = Math.floor(i / 3) * 3 + Math.floor(j / 3); // Transform cell from block into cell from row
        const ii = (i % 3) * 3 + j % 3;
        if (block[j] === null) {
          rows[r][ii] = 0;
        } else {
          rows[r][ii] = block[j];
        }
      }
    }
    printSudoku.printCellNums(rows);
    let sudoku = new sudokuLibrary(rows);
    const results = [];
    let solved = sudoku.solve(0, 0, results);
    console.log(results);
    for (const r of results){
      printSudoku.printCellNums(r);
    }
    if (results !== 1){
      console.log('There is no unique solution. Sry bb');
    } 
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={[
        { backgroundColor: isDarkMode ? Colors.black : Colors.white },
        styles.container
      ]}>
        <Sudoku
          styles={styles}
          selectedNum={selectedNum}
          board={board}
          setBoard={setBoard}
        />
        <Actions
          styles={styles}
          selectedNum={selectedNum}
          handleErase={() => setSelectedNum(null)}
          solve={solve}
        />
        <Numbers styles={styles} setSelectedNum={setSelectedNum} selectedNum={selectedNum} />
      </View>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  cell: {
    width: 25,
    height: 25,
    borderWidth: 0.5,
    borderColor: 'black',
    textAlign: 'center'
  },
  block: {
    width: 77,
    height: 77,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: "wrap",
    borderWidth: 1,
    borderColor: 'black'
  },
  sudoku: {
    width: 233,
    height: 233,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: "wrap",
    borderWidth: 1,
    borderColor: 'black'
  },
  numbers: {
    height: 25,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  num: {
    width: 25,
    height: 25,
    textAlign: 'center'
  },
  actions: {
    width: 233,
    height: 25,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  selected: {
    color: 'blue'
  }
});

export default App;
