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
  ListView,
  TextInput,
} from 'react-native';
import styles from './style';
import Item from './cityListItem';
import Header from './tools';
import CharList from './charList';

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});
const dsSection = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class component extends React.PureComponent {
  constructor (props) {
    super(props);
    this.chars = props.chars;
    this.citys = [];
    this.dataSource = ds.cloneWithRowsAndSections(props.citys);
    this.state = {
      keywords: '',
      dataSource: this.dataSource,
      isGetCurrentGps: false
    };
    this.postion = {};
    this.chooseCityHandler = this.chooseCityHandler.bind(this);
    this.keywordsChangedHandler = this.keywordsChangedHandler.bind(this);
    this.gobackHandler = this.gobackHandler.bind(this);
    this.renderCharList = this.renderCharList.bind(this);
    this.clickCharHandler = this.clickCharHandler.bind(this);
    this.calPostion = this.calPostion.bind(this);
    for (const charCitys in props.citys) {
      this.citys = [...this.citys, ...props.citys[charCitys]]
    }
    
  }
  
  clickCharHandler (char) {
    const y = this.postion[char] ? this.postion[char] : 0;
    this.listView.scrollTo({y: this.postion[char].y});
  }
  
  chooseCityHandler (cityObject) {
    this.props.choosedCity(cityObject);
  }
  
  keywordsChangedHandler (text) {
    const keyWord = text.trim().toLowerCase();
    const dataSource = keyWord ? dsSection.cloneWithRows(this.citys.filter(city => (city.py.indexOf(keyWord) !== -1 || city.pinyin.indexOf(keyWord) !== -1 || city.area_name.indexOf(keyWord) !== -1))) : this.dataSource;
    this.setState({
      keywords: text,
      dataSource: dataSource
    });
  }
  
  gobackHandler () {
    this.props.gobackHandler();
  }
  
  componentDidMount () {
	  this.listView.scrollToEnd({animated: false});
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => {
        // alert(error.message)
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }
  
  renderCharList () {
    return (
      <CharList
        chars={this.chars}
        changeCharHandler={this.clickCharHandler}
      />
    );
  }

  calPostion (sectionData, sectionID, sectionHeaderLayout) {
	  this.postion[sectionID] = { ...sectionHeaderLayout, isReal: true };
  }

  
  render() {
    const { keywords, initialPosition } = this.state;
    this.CharList = this.CharList || this.renderCharList();
    return (
      <View style={[styles.container, styles.modalContentOuter]}>
        <Header
          keywords={keywords}
          keywordsChangedHandler={this.keywordsChangedHandler}
          goback={this.gobackHandler}
        />
        <ListView
          ref={(listView) => { this.listView = listView; }}
          initialListSize={360}
          enableEmptySections
          dataSource={this.state.dataSource}
          contentContainerStyle={styles.listView}
          renderHeader={() => {
            return (
              <View style={styles.listViewHeader}>
                <Text>{initialPosition}</Text>
              </View>
            );
          }}
          renderRow={(rowData) => <Item
            data={rowData}
            clickCityHandler={this.chooseCityHandler}
          />}
          stickySectionHeadersEnabled
          renderSectionHeader={(sectionData, sectionID) => {
            if (keywords) return null;
            return (
              <View
                style={styles.sectionHeader}
                onLayout={ ({nativeEvent:e}) => {
                  {/*console.log(e.layout);*/}
                  // this.postion[sectionID] = e.layout.y;
                  this.calPostion(sectionData, sectionID, e.layout)
                }}
              >
                <Text>{sectionID.toUpperCase()}</Text>
              </View>
            );
          }}
        />
        {
	        keywords ? null : this.CharList
        }
      </View>
    );
  }
}
