import * as React from 'react';
import { View, StyleSheet, Platform, Text, Dimensions } from 'react-native';
import { Button, TextInput, Title, Subheading, Avatar, Card } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form'
import { TouchableHighlight } from 'react-native-gesture-handler';


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



function UserProfile({ props, params }) {

  const firstName = params.names.firstName;
  const lastName = params.names.lastName;

  return (

    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Avatar.Text color='#EEEEEE' size={150} label={firstName.charAt(0) + lastName.charAt(0)} style={{marginVertical: 20, backgroundColor: '#448AFF'}} ></Avatar.Text>
        <Text style={{color: '#EEEEEE', fontSize: 30, marginVertical: 10}}> {params.names.firstName} {params.names.lastName}</Text>
      </View>

      
      <View style={styles.innerContainer} >
          <Button style={{ marginHorizontal: 10, marginTop: 20 }} mode="contained" onPress={console.log("Email")}>
            Change Email
          </Button>
          <Button style={{ marginHorizontal: 10, marginVertical: 20 }} mode="contained" onPress={console.log("Password")}>
            Change Password
          </Button>
      </View>

      <View style={styles.innerContainer} >
          <Subheading style={{color: '#EEEEEE', fontSize: 20, marginVertical: 10}}>Saved Recipes</Subheading>
          <Card>
            
            <Card.Cover source={{uri: 'https://i.picsum.photos/id/12/100/100.jpg'}}></Card.Cover>
            <Card.Content>
              <Title style={{width: 200}}>Example</Title>
            </Card.Content>
          </Card>
      </View>
    </View>
  );
}
export default UserProfile;
