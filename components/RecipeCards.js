import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View, Dimensions, Platform } from 'react-native';
import { Subheading, Title, Headline } from 'react-native-paper';
//import {NavigationContainer} from '@react-navigation/navigate';
//import {Thumbnail, Left, Right} from 'native-base';

export default class RecipeCards extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      baseUri: `https://spoonacular.com/recipeImages/`,
      sendItem: JSON.stringify(this.props.oneitem),
      // navigation: this.props.navigation,
    }

  }
  // source={`${this.state.baseUri}${this.props.oneitem.image}`} 
  render() {


    //console.log(this.props)
    var id = JSON.stringify(this.props.oneitem);

    return (
      <View>

        <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate('ViewAdvancedRecipe', { props: id })}>

          <Text style={styles.cardTitle}>{this.props.oneitem.title}</Text>
          <View style={{ flexDirection: "row" }}>
            <Image style={styles.cardImage} source={{ uri: this.props.oneitem.image }}></Image>
            {/* <Image style={styles.cardImage} source={this.props.oneitem.image} /> */}

            <Text style={styles.cardText}>Serving Size: N/A</Text>
          </View>

        </TouchableOpacity>

      </View>
    );
  }
}
// I don not know the reason why but when I tried to wraip the Thumbnail component with the Left component, It aligns the image on the middle of the cardlists.

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    marginLeft: '2%',
    flexWrap: 'wrap',
    alignItems: "flex-start",
    ...Platform.select({
      ios: {
        width: "auto"
      },
      android: {
        width: "auto"
      },
      web: {
        width: ((Dimensions.get('window').width) < 500) ? ((Dimensions.get('window').width) - 50) : 700,
      }
    }),
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    flexDirection: "row",
    shadowOffset: {
      width: 3,
      height: 3
    },
    padding: 4,
    //  flexDirection: "row"
  },
  cardImage: {
    width: 80,
    height: 60,
    borderRadius: 10
    //resizeMode:'cover'
  },
  cardTitle: {
    padding: 10,
    fontWeight: "600",
    fontSize: 16
  },
  cardText: {
    padding: 10,
    fontSize: 16
    
  },
  title: {
    alignItems: 'flex-start',
    top: -10
  }
});
