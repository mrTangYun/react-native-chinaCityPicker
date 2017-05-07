import { StyleSheet, PixelRatio, Platform } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
		backgroundColor: '#F5FCFF',
    width: '100%'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
  listView: {
    paddingLeft: 20,
    paddingRight: 30
  },
  listViewHeader: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  sectionHeader: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  cityList_Item: {
	  alignItems: 'flex-start',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#a8a8a8',
  },
  cityList_Item_Text: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  headerTools: {
	  flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFF'
  },
  headerTools_btnBack: {
    marginHorizontal: 10,
    padding: 5
  },
  headerTools_search: {
		flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 0,
    marginRight: 20,
    marginLeft: 0
  },
	headerTools_search_text: {
		height: 40,
		fontSize: 15
	},
  charList: {
	  position: 'absolute',
    right: 0,
    justifyContent: 'center',
    width: 30,
    backgroundColor: 'rgba(255, 255, 255, 0)'
  },
  charList_Text: {
	  textAlign: 'center',
  },
	modalContentOuter: {
		alignItems: 'stretch',
		backgroundColor: '#f2f2f2',
		...Platform.select({
			ios: {
				marginTop: 22
			},
			android: {
				marginTop: 0
			},
		}),
	}
});

export default styles;
