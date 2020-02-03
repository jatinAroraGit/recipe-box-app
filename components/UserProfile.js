import * as React from 'react';
import { View, StyleSheet, Platform, Text, Dimensions, FlatList } from 'react-native';
import { Button, TextInput, Title, Subheading, Avatar, Card, List } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form'
import { TouchableHighlight } from 'react-native-gesture-handler';
import Firebase from '../configure/Firebase';


const styles = StyleSheet.create({
  label: {
    color: '#FFFFFF',
    margin: 20,
    marginLeft: 0
  },
  button: {
    marginTop: 40,
    height: 20,
    backgroundColor: '#1DE9B6',
    borderRadius: 4
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 3,
    padding: 8,
    backgroundColor: '#263238',
    borderRadius: 10,
    height: 'auto',
    ...Platform.select({
      ios: {
        width: 320
      },
      web: {
        width: ((Dimensions.get('window').width) < 500) ? ((Dimensions.get('window').width) - 50) : 600,
      },
      android: {
        width: 320
      },
    })
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 3,
    padding: 8,
    margin: 10,
    backgroundColor: '#4FC3F7',
    borderRadius: 10,
    height: 'auto',
    
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    height: 30,
    padding: 5,
    borderRadius: 4,
  }
});



function UserProfile({ props }) {

  var firstName = 'User';
  var lastName = 'Profile';

  /*if(params.names) {

    firstName = params.names.firstName;
    lastName = params.names.lastName;
  }*/
  // Fill with data from API call for user saved recipes  
  const savedRecipes = [
    {title: "Recipe 1", source: 'https://picsum.photos/200', key: 'item1'},
    {title: "Recipe 2", source: 'https://picsum.photos/200', key: 'item2'},
    {title: "Recipe 3", source: 'https://picsum.photos/200', key: 'item3'}
  ];

  // Fill with data from API call for user cookbooks  
  const savedCookbooks = [
    /*{title: "Cookbook 1", source: 'https://picsum.photos/200', key: 'item1'},
    {title: "Cookbook 2", source: 'https://picsum.photos/200', key: 'item2'},
    {title: "Cookbook 3", source: 'https://picsum.photos/200', key: 'item3'}*/
  ];

  // Adds a space between the cards in the Flatlist
  const seperator = () => { return <View style={{width: 20, height: 20}}/>}
  
  // Returns the cards for saved Recipes
  const showRecipeCard = ({item:item}) => {

    return(
    <Card key={item.key} style={{width: 200}} onPress={() => props.navigate('Recipes')}>     
      <Card.Cover source={{uri: item.source}}></Card.Cover>
      <Card.Content>
        <Title >{item.  title}</Title>
      </Card.Content>
    </Card>);

  }

  // Returns the cards for Cookbooks
  const showCookbookCard = ({item:item}) => {

    return(
    <Card key={item.key} style={{width: 200}} onPress={() => props.navigate('Cookbook')}>     
      <Card.Cover source={{uri: item.source}}></Card.Cover>
      <Card.Content>
        <Title >{item.  title}</Title>
      </Card.Content>
    </Card>);

  }

  // Renders a button to search Recipes if no saved recipes are found
  const noSavedCookbooks = () => {

    return(
      <Button style={{ marginHorizontal: 10, marginVertical: 20 }} mode="contained" onPress={() => props.navigate('CreateCookbook')}>
            Create a Cookbook
      </Button>
    )

  }

  // Renders a button to create cookbook if no cookbooks are found
  const noSavedRecipes = () => {

    return(
      <Button style={{ marginHorizontal: 10, marginVertical: 20 }} mode="contained" onPress={() => props.navigate('Search')}>
            Go to Recipes
      </Button>
    )

  }

  return (

    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Avatar.Text color='#EEEEEE' size={150} label={firstName.charAt(0) + lastName.charAt(0)} style={{marginVertical: 20, backgroundColor: '#448AFF'}} ></Avatar.Text>
        <Text style={{color: '#EEEEEE', fontSize: 30, marginVertical: 10}}> {firstName} {lastName}</Text>
      </View>

      
      <View style={styles.innerContainer} >
          <Button style={{ marginHorizontal: 10, marginTop: 20 }} mode="contained" onPress={() => props.navigate('ChangeEmail')}>
            Change Email
          </Button>
          <Button style={{ marginHorizontal: 10, marginVertical: 20 }} mode="contained" onPress={() => props.navigate('ChangePassword')}>
            Change Password
          </Button>
      </View>

      <View style={styles.innerContainer} >
        <Subheading style={{color: '#EEEEEE', fontSize: 20, marginVertical: 10}}>Saved Recipes</Subheading>
        <FlatList
          ListEmptyComponent = {noSavedRecipes}
          ItemSeparatorComponent = {seperator}
          style={{borderColor: 'green'}}
          horizontal={true}
          data={savedRecipes}
          renderItem={showRecipeCard}
        
        />
      </View>

      <View style={styles.innerContainer} >
        <Subheading style={{color: '#EEEEEE', fontSize: 20, marginVertical: 10}}>Cookbooks</Subheading>
        <FlatList
          ListEmptyComponent = {noSavedCookbooks}
          ItemSeparatorComponent = {seperator}
          style={{borderColor: 'green'}}
          horizontal={true}
          data={savedCookbooks}
          renderItem={showCookbookCard}
        
        />
      </View>

      <View style={styles.innerContainer} >
      <Button color='#FFFFFF' style={{alignSelf: 'center',backgroundColor:'grey', margin: 20}} onPress={() => {
            Firebase.auth().signOut().then(function() {
                // Sign-out successful.
                props.navigate('Login')
              }).catch(function(error) {
                // An error happened.
                console.log(error);
              });
        }}>
            Logout
        </Button>
      </View>

    </View>
    
  );
}
export default UserProfile;
