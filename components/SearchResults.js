import React, {useState, useEffect} from 'react';
import { View, StyleSheet, FlatList, Platform, Text, Dimensions, ScrollView } from 'react-native';
import Card from './Card';


const styles = StyleSheet.create({
  container: {
    marginTop:20,
    backgroundColor: '#F5FCFF',
  },
  loader:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
})




function SearchResults({props}) {

  const [items, setItems] = useState([{}]); //useState is initial state to manage items being updated.



useEffect(() => { 
  
  getReceipeData('https://jsonplaceholder.typicode.com/posts') //https://jsonplaceholder.typicode.com/posts
    .then((data) => {
      setItems(data);
    });

}, [items]);

/*
useEffect(()=>{},[]); means "Run only once, like componentDidMount"
useEffect(()=>{},[count]); means "Run this effect if count is changed, like componentDidUpdate"
useEffect(()=>{}); means "Run every render componentDidUpdate"
*/ 

async function getReceipeData (endpoint) {

  const res = await fetch(endpoint);
  return await res.json();
}

  return (

    <FlatList
        style={styles.container}
        data={items}
        keyExtractor={(item, index) => index.toString()}
        onPress={() => props.navigation.navigate('ViewRecipe')} 
        renderItem={({item}) => <Card item={item}/>}
      /> //FlatList does have ScrollView builted in I believe.

    // <ScrollView>
    //   <View style={styles.container}>
        
    //       <Card title='123'></Card>
    //       <Card title="abc"></Card>
    //       <Card title="321"></Card>
    //       <Card title="cba"></Card>
    //   </View>
    // </ScrollView>
  );
}
export default SearchResults;
