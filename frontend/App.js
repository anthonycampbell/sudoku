/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

const sudokuLibrary = require('./libraries/sudoku_solver/sudoku');
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
import { switchBetweenBlocksAndRows } from './libraries/sudoku_solver/helpers';

const App = () => {
  const [board, setBoard] = useState(
    // [
    //   [5, null, null, null, 4, null, 8, null, null],
    //   [6, 7, null, 8, null, null, 5, null, null],
    //   [9, null, null, null, null, null, 6, 1, 3],
    //   [null, 6, 2, 1, null, null, 3, 7, 4],
    //   [4, null, null, null, null, 3, 9, null, 8],
    //   [null, 7, null, null, 2, null, null, null, null],
    //   [null, 9, 6, 2, 1, 8, null, 5, null],
    //   [1, null, 7, null, null, 6, null, 8, null],
    //   [8, null, 2, null, 4, 5, null, 9, null]
    // ],
    // [
    //   [null, null, null, null, null, null, null, null, null],
    //   [null, null, null, null, null, null, null, null, null],
    //   [null, null, null, null, null, null, null, null, null],
    //   [null, null, null, null, null, null, null, null, null],
    //   [null, null, null, null, null, null, null, null, null],
    //   [null, null, null, null, null, null, null, null, null],
    //   [null, null, null, null, null, null, null, null, null],
    //   [null, null, null, null, null, null, null, null, null],
    //   [null, null, null, null, null, null, null, null, null]
    // ],
    [
      [null, null, null, 6, 8, null, null, null, 3],
      [6, null, null, 9, 5, 1, null, null, 2],
      [1, null, 7, 3, null, null, 5, 6, 8],
      [null, 4, null, null, null, null, null, 9, null],
      [8, 1, null, null, null, null, null, 6, 5],
      [null, 2, null, 8, 5, null, null, 7, 3],
      [4, null, 9, 1, 6, 2, 5, null, null],
      [null, null, 3, null, null, 9, 7, null, 6],
      [null, 8, 5, null, 3, null, null, null, null]
    ]
  );
  const isDarkMode = useColorScheme() === 'dark';
  const [selectedNum, setSelectedNum] = useState(null);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const solve = (e) => {
    const rows = switchBetweenBlocksAndRows(board);
    const sudoku = new sudokuLibrary(rows);
    const results = sudoku.solve();
    if (results.length !== 1) {
      console.log('There is no unique solution. Sry bb');
    } else {
      setBoard(results[0]);
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
