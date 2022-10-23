import Block from './Block';
import { View } from 'react-native';

const Sudoku = (props) => {
  const blocksArr = Array(9).fill(null);
  const blocks = blocksArr.map((c, i) => {
    return <Block key={i} styles={props.styles} selectedNum={props.selectedNum}/>
  });
  return (
    <View className='sudoku' style={props.styles.sudoku}>{blocks}</View>
  )
}

export default Sudoku;