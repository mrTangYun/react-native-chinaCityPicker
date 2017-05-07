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
  View,
  TouchableHighlight,
  TextInput
} from 'react-native';
import styles from './style';

const component = props => {
  return (
    <View style={styles.headerTools}>
      <TouchableHighlight
        onPress={props.goback}
        style={styles.headerTools_btnBack}>
        <Text>返回</Text>
      </TouchableHighlight>
      <View style={styles.headerTools_search}>
        <TextInput
            style={styles.headerTools_search_text}
          onChangeText={props.keywordsChangedHandler}
          value={props.keywords}
          underlineColorAndroid='transparent'
          placeholder='请输入城市名称或首字母查询'
        />
      </View>
    </View>
  );
};

export default component
