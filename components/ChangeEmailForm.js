import * as React from 'react';
import { useState } from 'react';

import { View, StyleSheet, Platform, Text, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput, Title, Subheading, Provider, Modal, Portal, Card } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form'
import { TouchableHighlight } from 'react-native-gesture-handler';
import Firebase from '../configure/Firebase';
import Axios from 'axios';
const apiKey = require('../configure/apiKey.json');
import { NavigationActions, StackActions } from 'react-navigation'

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
  },
  modalStyle: {
    flex: 3,
    justifyContent: 'center',
    paddingTop: 3,
    padding: 8,
    backgroundColor: '#FFFFFF',

    ...Platform.select({
      ios: {
        //  width: (Dimensions.get('screen').width - 50),
        // height: (Dimensions.get('screen').height - 50)
      },
      web: {
        //  width: (Dimensions.get('window').width - 50),
        //  height: (Dimensions.get('window').height - 50)
      },
      android: {
        // width: (Dimensions.get('screen').width - 50),
        // height: (Dimensions.get('screen').height - 50)
      },
    })
  }
});


function ChangeEmailForm({ props }) {

  let isEmailValid = false;
  var auth = Firebase.auth();
  let user = auth.currentUser;//retrieving current user
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { control, handleSubmit, errors, setError } = useForm({ mode: 'onChange' });
  const onSubmit = data => {
    setLoading(true);
    console.log(data);

    if (data.password && data.newEmail && data.confirmNewEmail) {
      console.log('required data entered');

      if (data.newEmail == data.confirmNewEmail) {
        console.log('new emails match');

        auth.signInWithEmailAndPassword(user.email, data.password).then(function () {
          console.log('User verified');
          Axios.get("http://apilayer.net/api/check?access_key=" + apiKey.emailValidator + "&email=" + data.newEmail + "&smtp=1&format=1").then(res => {
            console.log('axios for validator');

            console.log(res.data);
            console.log('HiBye');
            if (!(res.data.smtp_check)) {
              setLoading(false);

              setError("newEmail", "invalid");
            }
            else {
              if(user.email==data.newEmail){
                setLoading(false);
                setError("newEmail", "invalid");
              }
              else {
              user.updateEmail(data.newEmail).then(function () {
                console.log('Email updated');

                user.sendEmailVerification().then(function () {

                  console.log('First Email sent to : ' + user.email);

                  setLoading(false);
                  setShowModal(true)

                  // await Firebase.auth().currentUser.delete;
                  // this.setState({ user: null, loggedIn: false }); // Remember to remove the user from your app's state as well

                  // this.props.navigation.navigate('Auth');
                  // this.props.navigation.navigate('Login');
                  const resetAction = StackActions.replace({
                    key: 'AuthHome',
                    routeName: 'AuthHome',
                    newKey: 'Login',
                  });


                  //props.navigate('Login', "", StackActions.replace('AuthAccountStack'));


                }).catch(error=>{
                  setLoading(false);
                  setError('newEmail',"Invalid, This Email Is In Use")
                  console.log(error);
                });



              }).catch(error=>{
                setLoading(false);
                setError('authEmail',"Invalid, This Email Is In Use")
                console.log(error);
              });
            }
          }
            onVerification();
            // console.log(items)
          });




          /*
                    user.updateEmail(data.newEmail).then(function () {
                      console.log('Email updated');
                      props.navigate('UserProfile');
          
                    }).catch(function (error) {
                      var errorCode = error.code;
                      var errorMessage = error.message;
                      console.log(errorCode);
                      console.log(errorMessage);
                    });
          */
        }).catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          setError("invalid", 'wrong password', "Wrong Password");
          setLoading(false);

          console.log(errorCode);
          console.log(errorMessage);
        });

      } else {

        console.log("emails do not match");
        setError("matchEmail", 'no ematch', "Emails do not match");
        setLoading(false);
      }

    } else {
      setLoading(false);

      console.log('Please fill in all fields');

    }

  }

  const logoutOfStack = () => {
    Firebase.auth().signOut();
    props.navigate('Login');
  }
  const onVerification = () => {
    //setShowModal(true);
  }
  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    };
  };

  return (
    <KeyboardAvoidingView >
      <View style={styles.container}>
        <Title style={{ color: '#FFFFFF', fontSize: 30, marginTop: 20, alignSelf: 'center' }}>Change Email</Title>
        <Subheading style={styles.label}>Password</Subheading>
        <Controller
          as={<TextInput disabled={loading} maxLength={25} style={styles.input} secureTextEntry={true} />}
          name="password"

          control={control}
          onChange={onChange}

          rules={{ required: true, maxLength: 25, pattern: /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/ }}
        />
        {errors.password && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}>Invalid Password.</Subheading>}
        {errors.invalid && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}>Wrong password.</Subheading>}

        <Subheading style={styles.label}>New Email</Subheading>
        <Controller
          as={<TextInput disabled={loading} style={styles.input} />}
          name="newEmail"
          control={control}
          onChange={onChange}
          rules={{ pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9][a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ }}
        />

        {errors.newEmail && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}>Invalid Email Address</Subheading>}
        {errors.authEmail && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}>Email is already in use.</Subheading>}

        <Subheading style={styles.label}>Confirm New Email</Subheading>
        <Controller
          as={<TextInput disabled={loading} style={styles.input} />}
          name="confirmNewEmail"
          control={control}
          onChange={onChange}
          rules={{ pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9][a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ }}
        />
        {errors.confirmNewEmail && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}> Invalid Email.</Subheading>}
        {errors.matchEmail && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}> Emails do not match.</Subheading>}

        <Button style={{ marginHorizontal: 10, marginTop: 20 }} mode="contained" loading={loading} onPress={handleSubmit(onSubmit)}>
          Change Email
        </Button>
        <Button disabled={loading} style={{ marginHorizontal: 10, marginTop: 12, marginBottom: 6 }} mode="contained" onPress={() => props.navigate('UserProfile')}>
          Return to user profile
        </Button>

      </View>
      <Provider>
        <Portal>
          <Modal dismissable={false} visible={showModal} contentContainerStyle={styles.modalStyle}>
            <View >
              <Card.Content>
                <Title style={{ fontSize: 30 }}>Verification Required</Title>
                <Subheading style={{ fontSize: 20, color: '#000000', marginTop: 10 }}>You need to verify your account to proceed further</Subheading>
                <Subheading style={{ fontSize: 20, color: '#E91E63', marginTop: 10 }}>A verification email has been sent to your email.
                </Subheading>
                <Subheading style={{ fontSize: 20, color: '#E91E63', marginTop: 10 }}>Email: {user.email} </Subheading>
                <Button style={{ backgroundColor: '#C62828' }} color='#FF00FF' mode="contained" onPress={logoutOfStack}>Close and ReLogin </Button>
              </Card.Content>
            </View>
          </Modal>

        </Portal>
      </Provider>
    </KeyboardAvoidingView>
  );
}
export default ChangeEmailForm;
