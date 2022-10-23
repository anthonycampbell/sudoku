/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import Sudoku from './components/Sudoku';
import Numbers from './components/Numbers';
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
  const isDarkMode = useColorScheme() === 'dark';
  const [selectedNum, setSelectedNum] = useState(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={{
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
        flex: 1,
        flexDirection: "column",
        alignItems: "center"
      }}>
        <Sudoku styles={styles} selectedNum={selectedNum} />
        <Numbers styles={styles} setSelectedNum={setSelectedNum} selectedNum={selectedNum} />
      </View>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
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
  selectedNum: {
    width: 25,
    height: 25,
    textAlign: 'center',
    color: 'blue'
  }
});

export default App;
