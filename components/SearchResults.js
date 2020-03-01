import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Platform, Text, Dimensions, ScrollView } from 'react-native';
import axios from 'axios'
import '../configure/apiKey.json'
import RecipeCards from '../components/RecipeCards';

import ViewRecipe from './ViewRecipe';


const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#F5FCFF',
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})




function SearchResults({ navigation }) {

  const [items, setItems] = useState([{}]); //useState is initial state to manage items being updated.
  console.log('I GOT ::::::::::');

  var results = JSON.parse(navigation.state.params.results).results;
  console.log(results);

  function getQuery() {

    var query = "";

    if(results.query != "") {

      console.log("good");
      query += "&query=" + results.query;

    } else {

      console.log("bad");

    }
    return query;
  }

  getQuery();
  useEffect(() => {
    let query = "cheese"
    let apiKey = require('../configure/apiKey.json');
    if (query) {
      axios.get('https://api.spoonacular.com/recipes/search?apiKey=' + apiKey.key + '&query=' + getQuery() + '&number=5')
        .then(res => {
          const items = res.data.results;
          // console.log(items)
          setItems(items);
        })
    }


  }, []);



  /*
  useEffect(()=>{},[]); means "Run only once, like componentDidMount"
  useEffect(()=>{},[count]); means "Run this effect if count is changed, like componentDidUpdate"
  useEffect(()=>{}); means "Run every render componentDidUpdate"
  */

  // async function getReceipeData (endpoint) {

  //   const res = await fetch(endpoint);
  //   return await res.json();
  // }

  return (

    <FlatList
      style={styles.container}
      data={items}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <RecipeCards navigation={navigation} oneitem={item} />}
    //renderItem={({item}) => <ViewRecipe item={item}/>}
    /> //FlatList does have ScrollView builted in I believe
  );
}
export default SearchResults;
