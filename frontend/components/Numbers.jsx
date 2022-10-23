import Num from './Num';
import { ProgressViewIOSComponent, View } from 'react-native';

const Numbers = (props) => {
  const numsArr = Array(9).fill(null);
  const nums = numsArr.map((n, i) => {
    return (
      <Num
        key={i}
        num={i + 1}
        styles={props.styles}
        setSelectedNum={props.setSelectedNum}
        selectedNum={props.selectedNum} />
    )
  });
  return (
    <View style={props.styles.numbers}>{nums}</View>
  )
}

export default Numbers;