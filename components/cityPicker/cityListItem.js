/**
 * Created by User on 2017/5/4.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React from 'react';
import {
  Text,
  TouchableHighlight,
} from 'react-native';
import styles from './style';

const component = props => {
  return <TouchableHighlight
    underlayColor='rgba(233, 233, 233, .1)'
    onPress={() =>{props.clickCityHandler(props.data)}}
    style={[styles.cityList_Item]}
  >
    <Text
      style={styles.cityList_Item_Text}
    >{props.data.area_name}</Text>
  </TouchableHighlight>
};

export default component
