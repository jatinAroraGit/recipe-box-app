import * as React from 'react';
import { View, StyleSheet, Platform, Text, Dimensions } from 'react-native';
import { Button, TextInput, Title, Subheading } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form'
import { TouchableHighlight } from 'react-native-gesture-handler';
import Firebase from '../configure/Firebase';
import Axios from 'axios';

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
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    height: 30,
    padding: 5,
    borderRadius: 4,
  }
});


function DeleteUserForm({ props }) {

  var auth = Firebase.auth();
  let user = auth.currentUser;//retrieving current user
  const { control, handleSubmit, errors, setError } = useForm({ mode: 'onChange' });
  const onSubmit = data => {


    if (data.password && data.accept) {

      if (data.accept == 'I AM SURE') {
        let sendData = {
          "userID": user.uid,
          "userEmail": user.email
        }
        auth.signInWithEmailAndPassword(user.email, data.password).then(function () {

          user.delete().then(function () {
            props.navigate('Home');
            Axios.post(baseURL + '/userAccount/delete', sendData, {
              headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',

              }
            }).then(() => {
              console.log("deleted");
              setLoading(false);
            }).catch(error => {
              setLoading(false);
            });
          }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
          });

        }).catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          setError("invalid", 'wrong password', "Wrong Password");
        });

      } else {

        setError("accept", 'bad message', "Deletion confirmation not entered correctly");

      }

    }

  }
  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    };
  };

  return (

    <View style={styles.container}>
      <Title style={{ color: '#FFFFFF', fontSize: 30, marginTop: 20, alignSelf: 'center' }}>Delete Account</Title>
      <Subheading style={styles.label}>Password</Subheading>
      <Controller
        as={<TextInput maxLength={25} style={styles.input} secureTextEntry={true} />}
        name="password"

        control={control}
        onChange={onChange}

        rules={{ required: true, pattern: /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/ }}
      />
      {errors.password && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}>Invalid Password.</Subheading>}
      {errors.invalid && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}>Wrong password.</Subheading>}

      <Subheading style={styles.label}>Confirmation message</Subheading>
      <Subheading style={styles.label}>Type the phrase "I AM SURE" in all caps.</Subheading>
      <Controller
        as={<TextInput style={styles.input} />}
        name="accept"
        control={control}
        onChange={onChange}
        rules={{ required: true }}
      />
      {errors.accept && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}>Invalid confirmation message.</Subheading>}

      <Button style={{ marginHorizontal: 10, marginTop: 20 }} mode="contained" onPress={handleSubmit(onSubmit)}>
        Delete Account
        </Button>
      <Button style={{ marginHorizontal: 10, marginTop: 12, marginBottom: 6 }} mode="contained" onPress={() => props.navigate('UserProfile')}>
        Return to user profile
        </Button>
    </View>
  );
}
export default DeleteUserForm;
