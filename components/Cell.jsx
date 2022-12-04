import { Text } from 'react-native';

const Cell = (props) => {
  return (
    <Text
      className='cell'
      style={props.styles.cell}
      onPress={props.handlePress}>
      {props.entry}
    </Text>
  )
}

export default Cell;