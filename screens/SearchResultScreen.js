import * as React from 'react';
import { View, StyleSheet, Platform, SafeAreaView, ScrollView, Dimensions, Text, Button } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import SearchResults from '../components/SearchResults';


class SearchResultScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,

    }

  }

  componentDidMount() {
    const { nav } = this.props;
    let query = "";
    query = this.props.navigation.getParam('searchQuery');
    if (query != "") {
      this.fetchData(query);
    }
  }
  fetchData(query) {
    let apiKey = require('../configure/apiKey.json');
    if (query) {
      axios.get('https://api.spoonacular.com/recipes/search?apiKey=' + apiKey.key + '&query=' + query + '&number=40')
        .then(res => {
          const recipes = res.data.results;
          this.setState({ recipes });
        })
    }
  }

  callbackFunction = (childData) => {
    this.setState({ login: childData });
  }

  render() {


    return (

      <SafeAreaView style={{ flex: 3 }}>
        <TopNavbar title='Results'></TopNavbar>
        <ScrollView >

          <View style={{ marginStart: 10, marginTop: 10, marginEnd: 10, position: 'relative', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 30, overflow: "hidden" }}>

            {/* <Button title='SearchForm Results'onPress={()=>{
              
              this.state.navigation.navigate("SearchResults", { receipeInfo: this.state.navigation.state.params.cuisine })
              
            }}></Button> */}
            <SearchResults navigation={this.props.navigation} ingredQuery={this.state.navigation.state.params.intolerances} ></SearchResults>

          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

SearchResultScreen.navigationOptions = {
  header: null,
};
export default SearchResultScreen;