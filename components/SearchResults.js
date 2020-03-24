import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList, Platform, Text, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios'
import '../configure/apiKey.json'
import RecipeCards from '../components/RecipeCards';
import { PulseIndicator } from 'react-native-indicators';
import ViewRecipe from './ViewRecipe';
import { Button, Title } from 'react-native-paper';
import Pagination, { Icon, Dot } from 'react-native-pagination';//{Icon,Dot} also available


const styles = StyleSheet.create({
  container: {
    marginTop: 20,
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
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 10,

  },


  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})




function SearchResults({ navigation, ingredQuery }) {



  const [items, setItems] = useState([{}]); //useState is initial state to manage items being updated.
  const [itemCount, setItemCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [viewItem, setViewItems] = useState([{}]);
  const [itemsViewed, setItemsViewed] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  let counter = 0;
  let numOfItemsViewed = 0;
  let resultsPerPage = 10;

  const ref = useRef();
  console.log('I GOT ::::::::::');

  //  console.log(navigation.state.params);
  var basicQuery = navigation.getParam('searchQuery');
  console.log("BASIC QUERY: " + basicQuery);
  var results = JSON.parse(navigation.state.params.results);
  var query = "";
  var queryLength = 0;
  function getQuery() {

    console.log("######getQuery() results")
    console.log(results);


    if (results.query != "") {

      console.log("good");
      queryLength++;
      query += "&query=" + results.query;

    }

    if (results.cuisine != "") {

      console.log("good");
      queryLength++;
      query += "&cuisine=" + results.cuisine;

    }

    if (results.intolerances != "") {

      console.log("good");
      queryLength++;
      query += "&intolerances=" + results.intolerances;

    }

    if (results.includeIngredients != "") {

      console.log("good");
      queryLength++;
      query += "&includeIngredients=" + results.includeIngredients;

    }
    let apiKey = require('../configure/apiKey.json');
    console.log('This is query');
    console.log(query);
    query = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=' + apiKey.key + query + '&addRecipeInformation=true&number=20';


    console.log("######getQuery() query")
    console.log(query);
    return query;
  }

  useEffect(() => {

    var url = getQuery();
    console.log("URL");
    console.log(url);
    axios.get(url)
      .then(res => {
        console.log(res);
        const items = res.data.results;
        console.log(items);
        setItems(items);
        setItemCount(items.length);
        //  setLoading(false);
        let newItems = items.splice(counter, counter + resultsPerPage);
        let initialLength = newItems.length;
        console.log("NEW LIST ITEMS :::: " + newItems.length);
        setViewItems(newItems);

        counter = counter + resultsPerPage;

        numOfItemsViewed = numOfItemsViewed + initialLength;
        console.log('VIEWED Init ITEMS COUNT ===== ' + numOfItemsViewed);
        setLoading(false);
      })



  }, []);
  const onViewableItemsChanged = () => ({ items, changed }) => setItems(items)
  const getNextItems = () => {
    setLoading(true);
    console.log('ITEM V COUNT --- ' + numOfItemsViewed);
    if (numOfItemsViewed > [itemCount]) {
      setIsEnd(true);
    }
    let newItems;
    if (counter + resultsPerPage < [itemCount]) {
      console.log('UNDER LIMMIT');
      newItems = items.splice(counter, counter + resultsPerPage);
      console.log("NEW LIST ITEMS :::: " + newItems.length);
      numOfItemsViewed = numOfItemsViewed + newItems.length;
    }
    else {
      newItems = items.splice(counter, [itemCount]);
      numOfItemsViewed = numOfItemsViewed + newItems.length;
    }

    setViewItems(newItems);
    //  console.log("NEW LIST ITEMS :::: " + newItems.length);
    setLoading(false);

    console.log('VIEWED ITEMS COUNT ===== ' + numOfItemsViewed);
    counter = counter + 10;


  }
  const getPrevItems = () => {
    setLoading(true);
    let newItems = items.splice(counter, counter + 10);
    console.log("NEW LIST ITEMS :::: " + newItems.length);
    setViewItems(newItems);
    console.log("NEW LIST ITEMS :::: " + newItems.length);
    setLoading(false);

    counter + 10;
  }


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
  } else if (viewItem.length > 0) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/*
        <FlatList
          style={styles.container}
          pagingEnabled={true}
          initialNumToRender={15}
          snapToAlignment={"center"}

          data={items}
          ListHeaderComponent={<Title style={{ marginBottom: 4, alignSelf: "center" }}> Found {itemCount} results</Title>}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <RecipeCards navigation={navigation} oneitem={item} />}

        //renderItem={({item}) => <ViewRecipe item={item}/>}
        />
*/}
        <FlatList
          style={styles.container}
          pagingEnabled={true}
          initialNumToRender={15}
          snapToAlignment={"center"}

          data={viewItem}
          ListHeaderComponent={<Title style={{ marginBottom: 4, alignSelf: "center" }}> Found {itemCount} results</Title>}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <RecipeCards navigation={navigation} oneitem={item} />}

        //renderItem={({item}) => <ViewRecipe item={item}/>}
        />
        {
        //<Button disabled={isEnd} onPress={getNextItems}> Next</Button>
        }
        </SafeAreaView>

    );
  }
  else if (items.length == 0) {
    return (
      <SafeAreaView>
        <Title>No results found for your search</Title>
      </SafeAreaView>

    );
  }
}
export default SearchResults;
