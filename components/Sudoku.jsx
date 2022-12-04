import Block from './Block';
import { View } from 'react-native';

const Sudoku = (props) => {
  const handlePress = (e, block, cell) => {
    const newBoard = [...props.board];
    const newCells = [...props.board[block]];
    newCells[cell] = props.selectedNum;
    newBoard[block] = newCells;
    props.setBoard(newBoard);
  }

  const blocks = props.board.map((c, i) => {
    return <Block
      key={i}
      styles={props.styles}
      selectedNum={props.selectedNum}
      cellsArr={props.board[i]}
      block={i}
      handlePress={handlePress}
    />
  });
  return (
    <View className='sudoku' style={props.styles.sudoku}>{blocks}</View>
  )
}

export default Sudoku;