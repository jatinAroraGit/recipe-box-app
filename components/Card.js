import React from 'react';
import {StyleSheet, TouchableOpacity, Image, Text} from 'react-native';

export default class Card extends React.PureComponent {
  render() {
    return (
        <TouchableOpacity style={styles.card}>
          <Image style={styles.cardImage} source={{uri:'https://dynaimage.cdn.cnn.com/cnn/livestory/org/71ba7f52-bdeb-4c6b-9ce8-f561d8c25922.jpg'}} />
          <Text style={styles.cardText}>{this.props.title}</Text>
        </TouchableOpacity>
    );
  }
}

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
    width:'100%',
    height:200,
    resizeMode:'cover'
  },
  cardText: {
    padding:10,
    fontSize:16
  }
});
