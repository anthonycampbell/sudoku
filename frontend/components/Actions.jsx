import { View, Text } from 'react-native';

const Actions = (props) => {
  const solve = (e) => {
    console.log(e);
  }
  return (
    <View style={props.styles.actions}>
      <Text
        onPress={props.handleErase}
        style={props.selectedNum === null ? props.styles.selected : null} >
        Erase
      </Text>
      <Text onPress={solve}>Solve</Text>
    </View>
  )
}

export default Actions