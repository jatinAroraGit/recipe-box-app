import * as React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { Button } from 'react-native-paper'
import TopNavbar from '../components/TopNavbar';
import RegisterForm from '../components/RegisterForm';
import SearchForm from '../components/SearchForm';


class SearchScreen extends React.Component {
   constructor(props) {
    super(props);
      this.state = {
        navigation: this.props.navigation,

      }
   }

    callbackFunction = (childData) => {
        this.setState({login: childData});
        console.log("login complete!")
    }
  
  render() {
    
    return (
  
      <SafeAreaView style={{ flex: 3 }}>
        <TopNavbar title='Search'></TopNavbar>
        <ScrollView >
          <View style={{ marginStart:10, marginTop: 10, marginEnd:10, position: 'relative', top: 0, left: 0, right: 0, bottom: 0 , justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 30, overflow: "hidden"}}>
            
              <SearchForm props={this.props.navigation}></SearchForm>
              <Button color='#FFFFFF' style={{alignSelf: 'center',backgroundColor:'grey', margin: 20}} onPress={() => this.props.navigation.navigate('Recipe')}>
                        Results
                    </Button>
            
          </View>
        </ScrollView> 
      </SafeAreaView>
    );
  }
}

SearchScreen.navigationOptions = {
  header: null,
};
export default SearchScreen;