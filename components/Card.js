import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import {Thumbnail, Left, Right} from 'native-base';

export default class Card extends React.PureComponent {
  render() {
    return (
        <TouchableOpacity style={styles.card}>
          
          <Image style={styles.cardImage} source={{uri:'https://dynaimage.cdn.cnn.com/cnn/livestory/org/71ba7f52-bdeb-4c6b-9ce8-f561d8c25922.jpg'}} />
          <Text style={styles.cardText}>{this.props.item.title}</Text> 
        </TouchableOpacity> 
    ); 
  } 
}
// I don not know the reason why but when I tried to wraip the Thumbnail component with the Left component, It aligns the image on the middle of the cardlists.

const styles = StyleSheet.create({
  card: {
    backgroundColor:'#fff',
    marginBottom: 10,
    marginLeft:'2%',
    width:'96%',
    shadowColor:'#000',
    shadowOpacity:0.2,
    shadowRadius:1,
    shadowOffset:{
      width:3,
      height:3
    }
  },
  cardImage: {
    width: 80,
    height:60,
    borderRadius: 10
    //resizeMode:'cover'
  },
  cardText: {
    padding:10,
    fontSize:16
  },
  title: {
    alignItems: 'flex-start',
    top: -10
  }
});
