import { Text } from 'react-native';

const Num = (props) => {
  return (
    <Text
      style={[
        props.styles.num,
        props.num === props.selectedNum ? props.styles.selected : null
      ]}
      onPress={e => props.setSelectedNum(props.num)}>
      {props.num}
    </Text>
  )
}

export default Num;