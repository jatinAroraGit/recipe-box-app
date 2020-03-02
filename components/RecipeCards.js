import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';
//import {NavigationContainer} from '@react-navigation/navigate';

export default class RecipeCards extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      baseUri: `https://spoonacular.com/recipeImages/`,
      sendItem: JSON.stringify(this.props.oneitem)
      // navigation: this.props.navigation,
    }

  }
  // source={`${this.state.baseUri}${this.props.oneitem.image}`} 
  render() {

    console.log('This is the RecipeCards.js this.props');
    console.log(this.props)
    var id = JSON.stringify(this.props.oneitem);
    console.log('This is oneitem - start');
    console.log(id);
    console.log('This is oneitem - end');
  

    return (
      <View>
        <TouchableOpacity style={styles.card} onPress={() => this.props.navigation.navigate('ViewRecipe', { props:  id})}>
          <Image style={styles.cardImage} source={{uri:this.props.oneitem.image}}></Image> 
          {/* <Image style={styles.cardImage} source={this.props.oneitem.image} /> */}
          {console.log('This is the image - start')}
          {console.log(this.props.oneitem.image)}
          {console.log('This is the image - end')}
          <Text style={styles.cardText}>{this.props.oneitem.title}</Text>
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
    width: '96%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 3,
      height: 3
    }
  },
  cardImage: {
    width: 80,
    height: 60,
    borderRadius: 10
    //resizeMode:'cover'
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
