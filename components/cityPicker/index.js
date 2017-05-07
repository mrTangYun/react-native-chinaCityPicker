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
    Modal
} from 'react-native';
import styles from './style';
import cityData  from '../../utils/1488442890071.json';
import CityListView from './cityList';

export default class bfftripAppDemo extends React.PureComponent {
  constructor () {
    super();
    this.state = {
      currentCity: '',
      showCityListView: false
    };
    this.onPressButtonHandler = this.onPressButtonHandler.bind(this);
    this.gobackHandler = this.gobackHandler.bind(this);
    this.choosedCityHandler = this.choosedCityHandler.bind(this);
    let citys = {};
    let chars = [];
    cityData.map(char => {
      chars = [...chars, char.char];
      citys[char.char] = char.citys.map(city => {
        return {
          ...city,
          pinyin: city.pinyin.join('')
        }
      });
    });
    this.chars = chars;
    this.citys = citys;
  }
  
  choosedCityHandler (city) {
    console.log(city);
    this.setState({
      showCityListView: false,
      currentCity: city.area_name
    });
  }
  
  gobackHandler () {
    this.setState({
      showCityListView: false
    });
  }
  
  onPressButtonHandler () {
    this.setState({
      showCityListView: true
    });
  }
  
	render() {
    const { currentCity, showCityListView } = this.state;
    this.CityListView = this.CityListView || <CityListView
        citys={this.citys}
        chars={this.chars}
        gobackHandler={this.gobackHandler}
        choosedCity={this.choosedCityHandler}
      />;
		return (
      <View style={styles.container}>
        {
          showCityListView || <TouchableHighlight onPress={this.onPressButtonHandler}>
            <Text>{ currentCity || '选择城市'}</Text>
          </TouchableHighlight>
        }
        <Modal
            visible={this.state.showCityListView}
            animationType='slide'
            onRequestClose={() => {alert("Modal has been closed.")}}
        >
            { this.CityListView }
        </Modal>
      </View>
		);
	}
}
