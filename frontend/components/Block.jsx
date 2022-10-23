import Cell from './Cell';
import { View } from 'react-native';
import { useState } from 'react';

const Block = (props) => {
  const [cellsArr, setCellArr] = useState(Array(9).fill(null));
  const handlePress = (e, i) => {
    const newCells = [...cellsArr];
    newCells[i] = props.selectedNum;
    setCellArr(newCells);
  }
  const cells = cellsArr.map((c, i) => {
    return (
      <Cell
        key={i}
        entry={c}
        styles={props.styles}
        handlePress={(e) => handlePress(e, i)} />
    )
  });
  return (
    <View className="block" style={props.styles.block}>{cells}</View>
  )
}

export default Block;