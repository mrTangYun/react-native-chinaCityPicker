/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React from 'react';
import {
  Text,
  View,
  PanResponder
} from 'react-native';
import styles from './style';

export default class component extends React.PureComponent {
  constructor (props) {
    super(props);
    this.length = props.chars.length;
    this.currentCharIndex = 0;
    this.calY_ = this.calY_.bind(this);
    this.getCharByY = this.getCharByY.bind(this);
  }
  
  calY_ (y) {
    if (!this.viewLayout) return 0;
    const relativeY = y - this.viewLayout.y;
    return parseInt(relativeY / this.itemHeight);
  }
  
  getCharByY (y) {
    const index = this.calY_(y);
    const index_ = index < 0 ? 0 : (index > (this.length - 1) ? (this.length - 1) : index);
    if (index_ !== this.currentCharIndex) {
      this.currentCharIndex = index_;
      this.props.changeCharHandler(this.props.chars[this.currentCharIndex]);
    }
  }
  
  componentWillMount () {
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    
      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
        // const o_ = JSON.stringify(gestureState);
        // console.log('onPanResponderGrant');
        // console.log(JSON.parse(o_));
        this.getCharByY(gestureState.y0)
        // gestureState.{x,y}0 现在会被设置为0
      },
      onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}
        // const o_ = JSON.stringify(gestureState);
        this.getCharByY(gestureState.moveY)
        // console.log('onPanResponderMove');
        // console.log(JSON.parse(o_));
        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
        // const o_ = JSON.stringify(gestureState);
        // console.log('onPanResponderRelease');
        // console.log(JSON.parse(o_));
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    });
  }
  
  render() {
    return (
      <View
        style={styles.charList}
        onLayout={ ({nativeEvent:e}) => {
          this.viewLayout = e.layout;
          this.itemHeight = this.viewLayout.height / this.length;
        }}
        {...this._panResponder.panHandlers}>
        {
          this.props.chars.map(char => {
            return (<Text key={char} style={styles.charList_Text}>{char.toUpperCase()}</Text>);
          })
        }
      </View>
    );
  }
}
