import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Platform, Text, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput, Title, Subheading, Modal, Portal, Provider, Card } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form'
import { TouchableHighlight } from 'react-native-gesture-handler';
import Firebase from '../configure/Firebase';
import Axios from 'axios';

const apiKey = require('../configure/apiKey.json');
const baseURL = apiKey.baseURL;
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
    zIndex: 1500,
    position: "absolute",
    flex: 3,
    justifyContent: 'center',
    alignContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    padding: 8,
    backgroundColor: '#FFFFFF',

    ...Platform.select({
      ios: {

        width: 330,
        height: 600
      },
      web: {
        //  width: (Dimensions.get('window').width - 50),
        //  height: (Dimensions.get('window').height - 50)
      },
      android: {
        width: 330,
        height: 600
      },
    })
  }
});


function ForgotPasswordForm({ props }) {
  var auth = Firebase.auth();
  //var securityQuestion = "What is my favorite color? (Red)";
  // var securityAnswer = "Red";
  const { control, handleSubmit, errors, setError } = useForm({ mode: 'onChange' });
  const [securityQuestion, setSecurityQuestion] = useState("Question");
  const [response, setResponse] = useState("answer");
  const [userFound, setUserFound] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const onSubmit = data => {


    if (data.email && data.answer) {

      if (data.answer == response) {//TODO change 'true' to checking for the email in the database.
        //TODO read security questions from database instead of hardcoding.

        props.navigate('ResetPasword', { userEmail: data.email })
        /*
      auth.sendPasswordResetEmail(data.email).then(function () {
        // Email sent.
        setIsEmailSent(true);
        //   props.navigate('Login');

      }).catch(function (error) {
        // An error happened.
        var errorCode = error.code;
        var errorMessage = error.message;
        setError("noUser", 'no user', "no account uses this email");
      });
      */

      } else {
        setError("wrongAnswer", 'wrong answer', "security question answer is incorrect");

      }


    } else if (data.email && !userFound) {
      const query = { "userEmail": data.email };
      const sendData = JSON.stringify(query);

      Axios.post(baseURL + 'userAccount/getUserAccount', sendData, {
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',

        }
      }).then((response) => {
        // if(response.data.uid ||;
        if (response.data) {
          setSecurityQuestion(response.data.securityQuestion)
          setResponse(response.data.response);
          setUserFound(true);
        }
        else {
          setError("noUser", 'no user', "no account uses this email");
        }
      }).catch(error => {
        // setLoading(false);
      });

    }
    else {
      setError("missingData", 'missing data', "some fields were left blank");
    }

  }
  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    };
  };
  const onCloseModal = () => {
    props.navigate('Login');
  };
  const resetStatus = () => {
    setUserFound(false);
    setSecurityQuestion("");
    setIsEmailSent(false);
    setResponse("");
  };
  return (
    <KeyboardAvoidingView >
      <View style={styles.container}>
        <Title style={{ color: '#FFFFFF', fontSize: 30, marginTop: 20, alignSelf: 'center' }}>Forgot Password</Title>
        <Subheading style={styles.label}>Email</Subheading>
        <Controller
          as={<TextInput style={styles.input} />}
          name="email"
          control={control}
          onChange={onChange}

          rules={{ required: true, pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9][a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ }}
        />
        {errors.email && <Subheading style={{ color: '#BF360C' }}>Invalid Email.</Subheading>}
        {errors.noUser && <Subheading style={{ color: '#BF360C' }}>No account exists using that email.</Subheading>}
        {userFound && (
          <View>
            <Title style={{ color: "#EC407A", alignSelf: "center" }} >Security Question</Title>
            <Subheading style={styles.label}>Question: {securityQuestion}</Subheading>
            <Controller
              as={<TextInput placeholder={"Enter Your Answer"} style={styles.input} />}
              name="answer"
              control={control}
              onChange={onChange}
            />
          </View>
        )}
        {errors.wrongAnswer && <Subheading style={{ color: '#BF360C' }}>Answer is incorrect.</Subheading>}
        {errors.missingData && <Subheading style={{ color: '#BF360C' }}>Please fill in all fields.</Subheading>}
        {!userFound && (
          <Button style={{ marginHorizontal: 10, marginTop: 20 }} mode="contained" onPress={handleSubmit(onSubmit)}>
            Continue
        </Button>
        )
        }
        {userFound && (
          <Button style={{ marginHorizontal: 10, marginTop: 20 }} mode="contained" onPress={handleSubmit(onSubmit)}>
            Verify
        </Button>
        )
        }
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button style={{ marginHorizontal: 10, marginTop: 20 }} mode="contained" onPress={() => props.navigate('Login')}>
            Log in
            </Button>
          <Button style={{ marginHorizontal: 10, marginTop: 20, backgroundColor: 'grey' }} mode="contained" onPress={() => props.navigate('Register')}>
            Register
            </Button>
        </View>
      </View>
      <Provider>
        <Portal>
          <Modal dismissable={false} visible={isEmailSent} contentContainerStyle={styles.modalStyle}>
            <View >
              <Card.Content>
                <Title style={{ fontSize: 20 }}>Reset Link Sent</Title>

                <Subheading style={{ fontSize: 16, color: '#E91E63', marginTop: 10 }}>A rest password email has been sent to the provided email.
                </Subheading>

                <Card.Actions style={{ justifyContent: "center", marginTop: 10, flexDirection: "column" }}>
                  <Button style={{ backgroundColor: '#C62828', margin: 5 }} color='#FF00FF' mode="contained" onPress={onCloseModal} >Close </Button>

                </Card.Actions>
              </Card.Content>

            </View>

          </Modal>

        </Portal>
      </Provider>
    </KeyboardAvoidingView>
  );
}
export default ForgotPasswordForm;
