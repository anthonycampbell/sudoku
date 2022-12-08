/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

const SudokuSolver = require('./libraries/sudoku_solver/solver');
import Sudoku from './components/Sudoku';
import Numbers from './components/Numbers';
import Actions from './components/Actions';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  View,
  Text
} from 'react-native';

import { API } from 'aws-amplify';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';

Amplify.configure(awsconfig);

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { switchBetweenBlocksAndRows } from './libraries/sudoku_solver/helpers';
import { launchImageLibrary } from 'react-native-image-picker';

const App = () => {
  const [board, setBoard] = useState(
    [
      [5, 8, 6, null, null, null, null, null, null],
      [4, null, null, null, 8, null, 9, null, null],
      [null, null, 3, null, null, 4, null, null, 7],
      [null, null, null, null, null, null, null, 3, null],
      [null, null, null, null, null, 9, null, 5, null],
      [null, 4, null, 7, 2, null, null, null, 1],
      [7, null, null, null, 5, null, 2, null, null],
      [null, null, null, null, 3, 2, null, 6, null],
      [null, 6, null, null, null, null, null, null, null]
    ]
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
    // ]
  );
  const isDarkMode = useColorScheme() === 'dark';
  const [selectedNum, setSelectedNum] = useState(null);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const solve = (e) => {
    const rows = switchBetweenBlocksAndRows(board);
    const solver = new SudokuSolver(rows);
    const results = solver.solve();
    if (results.length !== 1) {
      console.log('There is no unique solution. Sry bb');
    } else {
      setBoard(results[0]);
    }
  }

  const accessPhotos = (e) => {
    launchImageLibrary({}, (c) => {
      console.log(c)
    });
  }

  useEffect(() => {
    API.get('processsudokuapi', '/process')
    .then( r => console.log(r));

  });

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={[
        { backgroundColor: isDarkMode ? Colors.black : Colors.white },
        styles.container
      ]}>
        <Text style={styles.accessPhotos} onPress={accessPhotos}>accessPhotos</Text>
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
  },
  accessPhotos: {
    height: 25
  }
});

export default App;
