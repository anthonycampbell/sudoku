import Cell from './Cell';
import { View } from 'react-native';

const Block = (props) => {
  const cells = props.cellsArr.map((c, i) => {
    return (
      <Cell
        key={i}
        entry={c}
        styles={props.styles}
        handlePress={(e) => props.handlePress(e, props.block, i)}
      />
    )
  });
  return (
    <View className="block" style={props.styles.block}>{cells}</View>
  )
}

export default Block;