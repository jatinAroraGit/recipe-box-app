import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Platform, Text, Dimensions, ScrollView } from 'react-native';
import axios from 'axios'
import '../configure/apiKey.json'
import RecipeCards from '../components/RecipeCards';

import ViewRecipe from './ViewRecipe';
import { Button } from 'react-native-paper';


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




function SearchResults({navigation, ingredQuery}) {

  

  const [items, setItems] = useState([{}]); //useState is initial state to manage items being updated.
  console.log('I GOT ::::::::::');

//  console.log(navigation.state.params);
  var results = JSON.parse(navigation.state.params.results);
  console.log(results);
  var query = "";
  var queryLength = 0;
  function getQuery() {

    console.log("######getQuery() results")
    console.log(results);
    

    if(results.query != "") {

      console.log("good");
      queryLength++;
      query += "&query=" + results.query;

    }

    if(results.cuisine != "") {

      console.log("good");
      queryLength++;
      query += "&cuisine=" + results.cuisine;

    }

    if(results.intolerances != "") {

      console.log("good");
      queryLength++;
      query += "&intolerances=" + results.intolerances;

    }

    if(results.includeIngredients != "") {

      console.log("good");
      queryLength++;
      query += "&includeIngredients=" + results.includeIngredients;

    }
    let apiKey = require('../configure/apiKey.json');
   // if(queryLength == 1) {
    //  console.log(query);
    //  query = 'https://api.spoonacular.com/recipes/search?apiKey=' + apiKey.key + query + '&number=5';
    //} else if(queryLength > 1) {
      console.log('This is query - start');
      console.log(query);
      console.log('This is query - end');
      query = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=' + apiKey.key + query + '&number=30';

    //}
    console.log("######getQuery() query")
    console.log(query);
    return query;
  }

  useEffect(() => {
    
    var url = getQuery();
    if (queryLength == 1) {
      axios.get(url)
        .then(res => {
          const items = res.data.results;
          console.log(items)
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
      />

      
  );
}
export default SearchResults;
