/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null]
    ]);
  const isDarkMode = useColorScheme() === 'dark';
  const [selectedNum, setSelectedNum] = useState(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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
        <Actions styles={styles} selectedNum={selectedNum} handleErase={() => setSelectedNum(null)} />
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
