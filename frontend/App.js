/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  View,
  Text
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const Sudoku = () => {
  const blocksArr = Array(9).fill(null);
  const blocks = blocksArr.map((c, i) => {
    return <Block key={i} />
  });
  return (
    <View className='sudoku' style={styles.sudoku}>{blocks}</View>
  )
}

const Cell = (props) => {
  return (
    <Text className='cell' style={styles.cell}>{props.entry}</Text>
  )
}

const Block = () => {
  const cellsArr = Array(9).fill(null);
  const cells = cellsArr.map((c, i) => {
    return <Cell key={i} entry={c} />
  });
  return (
    <View className="block" style={styles.block}>{cells}</View>
  )
}

const Numbers = () => {
  const numsArr = Array(9).fill(null);
  const nums = numsArr.map((n, i) => {
    return <Num key={i} num={i + 1} />
  });
  return (
    <View style={styles.numbers}>{nums}</View>
  )
}

const Num = (props) => {
  return (
    <Text style={styles.num}>{props.num}</Text>
  )
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

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
        <Sudoku />
        <Numbers />
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
  }
});

export default App;
