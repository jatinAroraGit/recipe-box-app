import * as React from 'react';
import { View, SafeAreaView, ScrollView, Text, Button } from 'react-native';
//import { Button } from 'react-native-paper'
import TopNavbar from '../components/TopNavbar';
import RegisterForm from '../components/RegisterForm';
import ViewRecipe from '../components/ViewRecipe';


class ViewRecipeScreen extends React.Component {
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
        <TopNavbar title='Recipe Details'></TopNavbar>
        <ScrollView >
          <View style={{ marginStart:10, marginTop: 10, marginEnd:10, position: 'relative', top: 0, left: 0, right: 0, bottom: 0 , justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 30, overflow: "hidden"}}>  
            {/* <Text>Hi This is ViewRecipeScreen</Text> 
            <Button title='RecipeCards Results' onPress={()=> {
              console.log(this.state.navigation.state.params.id);
            }}></Button> */}
            {console.log('This is start-ViewRecipeScreen')}
            {console.log(this.state.navigation.state.params)}
            {console.log('This is end-ViewRecipeScreen')}
            <ViewRecipe navigation={this.props.navigation} recipeDetail={this.state.navigation.state.params}></ViewRecipe>
          </View>
        </ScrollView> 
      </SafeAreaView>
    );
  }
}

ViewRecipeScreen.navigationOptions = {
  header: null,
};
export default ViewRecipeScreen;