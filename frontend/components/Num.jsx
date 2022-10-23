import { Text } from 'react-native';

const Num = (props) => {
  return (
    <Text
      style={
        props.num === props.selectedNum ? props.styles.selectedNum : props.styles.num
      }
      onPress={e => props.setSelectedNum(props.num)}>
      {props.num}
    </Text>
  )
}

export default Num;