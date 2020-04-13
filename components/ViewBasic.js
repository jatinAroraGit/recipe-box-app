import * as React from 'react';
import { View, SafeAreaView, ScrollView, Text, Button } from 'react-native';
//import { Button } from 'react-native-paper'
import TopNavbar from '../components/TopNavbar';
import RegisterForm from '../components/RegisterForm';
import ViewBasicRecipe from '../components/ViewBasicRecipe';


class ViewBasic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,

    }
    console.log('ViewBasic:');
    console.log(this.props.navigation.state.params.props);

  }

  callbackFunction = (childData) => {
    this.setState({ login: childData });
  }

  render() {

    return (

      <SafeAreaView style={{ flex: 3 }}>
        <TopNavbar title='Recipe Details'></TopNavbar>
        <ScrollView >
          <View style={{ marginStart: 10, marginTop: 10, marginEnd: 10, position: 'relative', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 30, overflow: "hidden" }}>
            {/* <Text>Hi This is ViewBasic</Text> 
            <Button title='RecipeCards Results' onPress={()=> {
              
            }}></Button> */}

            <ViewBasicRecipe navigation={this.props.navigation} recipeDetail={this.props.navigation.state.params.props}></ViewBasicRecipe>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

ViewBasic.navigationOptions = {
  header: null,
  gestureEnabled: false
};
export default ViewBasic;