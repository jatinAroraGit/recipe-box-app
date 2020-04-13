import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Platform, Text, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios'
import '../configure/apiKey.json'
import RecipeCards from '../components/RecipeCards';
import { PulseIndicator } from 'react-native-indicators';
import ViewRecipe from './ViewRecipe';
import { Button, Title } from 'react-native-paper';
let apiKey = require('../configure/apiKey.json');

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#69F0AE',
    ...Platform.select({
      ios: {
        width: "auto"
      },
      web: {
        width: ((Dimensions.get('window').width) < 500) ? ((Dimensions.get('window').width) - 50) : 800,
      },
      android: {
        width: "auto"
      },
    }),
    borderRadius: 15,

    padding: 10,

  },


  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})




function SearchResults({ navigation, ingredQuery }) {



  const [items, setItems] = useState([]); //useState is initial state to manage items being updated.
  const [itemCount, setItemCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [responseStr, setResponseTxt] = useState("No Items Found For Your Search");
  console.log('I GOT ::::::::::');

  var basicQuery = navigation.getParam('searchQuery');
  var results = JSON.parse(navigation.state.params.results);
  console.log('Query To search')
  var sendData = JSON.stringify(results)
  console.log(JSON.stringify(results));

  var query = "";
  var queryLength = 0;
  function getQuery() {

    if (results.query != "") {

      queryLength++;
      query += "&query=" + results.query;

    }

    if (results.cuisine != "") {

      queryLength++;
      query += "&cuisine=" + results.cuisine;

    }

    if (results.intolerances != "") {

      queryLength++;
      query += "&intolerances=" + results.intolerances;

    }

    if (results.includeIngredients != "") {

      queryLength++;
      query += "&includeIngredients=" + results.includeIngredients;

    }

    console.log('This is query');
    console.log(query);

    query = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=' + apiKey.key + query + '&addRecipeInformation=true&number=20';

    console.log("######getQuery() query")
    console.log(query);
    return sendData;
  }

  useEffect(() => {
    var baseURL = apiKey.baseURL
    var sendData = getQuery();
    console.log("URL");
    console.log(baseURL + 'recipes/search');
    /*
    axios.get(url)
      .then(res => {
        const items = res.data.results;
        setItems(items);
        setItemCount(items.length);
        setLoading(false);
      })
      */

    axios.post(baseURL + 'recipes/search', sendData, {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: false,
    },
    ).then((response) => {
      // console.log(response);
      if (response.data) {
        // console.log(response.data);
        const items = response.data;
        // console.log(items);
        setItems(items);
        setItemCount(items.length);
        setLoading(false);
      }
      else {
        setResponseTxt("Oops!, Something Went Wrong, Try Again Please.");
        setError("noUser", 'no user', "no account uses this email");
      }
    }).catch(error => {
      console.log("AXIOS CAUGHT ERROR ::::::::::::::::::::");
      setResponseTxt("Oops!, Something Went Wrong, Try Again Please.");
      setLoading(false);
      console.log(error);
    });

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
  if (loading) {
    return (
      <SafeAreaView style={{ flex: 3 }}>


        <PulseIndicator style={{ position: "relative" }} animating={true} size={180} color='#69F0AE' />

      </SafeAreaView>
    )
  } else if (items.length > 0) {
    return (
      <SafeAreaView>

        <FlatList
          style={styles.container}
          inverted={true}
          snapToAlignment={"center"}
          data={items}
          ListFooterComponent={<Title style={{ marginBottom: 4, alignSelf: "center" }}> Found {itemCount} results</Title>}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <RecipeCards navigation={navigation} oneitem={item} />}

        //renderItem={({item}) => <ViewRecipe item={item}/>}
        />

      </SafeAreaView>


    );
  }
  else if (items.length == 0 || !(items)) {
    return (
      <SafeAreaView>
        <Title>{responseStr}</Title>
      </SafeAreaView>

    );
  }
}
export default SearchResults;