import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Platform, Text, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput, Title, Subheading, Modal, Portal, Provider, Card } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form'
import { TouchableHighlight } from 'react-native-gesture-handler';
import Firebase from '../configure/Firebase';
import Axios from 'axios';
//import RNFetchBlob from 'rn-fetch-blob'
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
  const [errorMsg, setErrorMsg] = useState('NA');

  const onSubmit = data => {

    console.log(data);

    if (data.email && data.answer) {

      if (data.answer == response) {//TODO change 'true' to checking for the email in the database.
        //TODO read security questions from database instead of hardcoding.
        console.log('Valid security question answer');


        auth.sendPasswordResetEmail(data.email).then(function () {
          // Email sent.
          setIsEmailSent(true);
          console.log('password recovery email sent');
          //   props.navigate('Login');

        }).catch(function (error) {
          // An error happened.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);

          console.log('No user');
          setError("noUser", 'no user', "no account uses this email");
        });

      } else {
        console.log('Invalid security question answer');
        setError("wrongAnswer", 'wrong answer', "security question answer is incorrect");

      }
    } else if (data.email && !userFound) {
      console.log('Valid email entered.');
      const query = { "userEmail": data.email };
      const sendData = JSON.stringify(query);

      console.log("SENDING DEV REQ AT " + baseURL + 'userAccount/getUserAccount');

      fetch(baseURL + 'userAccount/getUserAccount', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: sendData,

      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setSecurityQuestion(data.securityQuestion)
            setResponse(data.response);
            setUserFound(true);
            setErrorMsg('Successful Dev')
          }
          else {
            setErrorMsg('Not Found User')
          }
        })
        .catch((error) => {
          setErrorMsg(error);
          setError("noUser", 'no user', "no account uses this email");
          console.error('Error:', error);
        });


      /*
            Axios.post(baseURL + 'userAccount/getUserAccount', sendData, {
              headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
      
              },
              withCredentials: false,
              httpsAgent: new https.Agent()
      
            },
             
            ).then((response) => {
              // if(response.data.uid ||;
              console.log(response);
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
              console.log(error);
            });
      */

    }
    else {
      console.log('Please fill all fields');

      setError("missingData", 'missing data', "some fields were left blank");
    }

  }
  const onChange = args => {
    console.log(args[0]);
    return {
      value: args[0].nativeEvent.text,
    };
  };
  const onCloseModal = () => {
    props.navigate('Login');
  };
  const sendProdRequest = () => {
    const testObj = { "userEmail": "jaarora45@gmail.com" };
    const prodURL = apiKey.prodURL;
    console.log("SENDING REQ AT " + prodURL + 'userAccount/getUserAccount');
    fetch(prodURL + 'userAccount/getUserAccount', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testObj),
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        if (data) {
          setSecurityQuestion(data.securityQuestion)
          setResponse(data.response);
          setUserFound(true);
          setErrorMsg("SUCCESS PROD");
        }
        else {
          setErrorMsg('Not Found User');
        }
      })
      .catch((error) => {
        setError("noUser", 'no user', "no account uses this email");
        setErrorMsg(error);
        console.error('Error:', error);
      });
  };

  const sendTestReq = () => {
    const testObj = { "test": "app" };
    const testURL = "http://192.168.56.1:5000/test";
    // console.log("SENDING REQ AT " + prodURL + 'userAccount/getUserAccount');
    Axios.post(testURL, JSON.stringify(testObj), {
      headers: {
        'content-type': 'application/json',

      },
      withCredentials: false,

    },

    ).then((response) => {
      // if(response.data.uid ||;
      console.log(response);
      if (response.data) {
        // setSecurityQuestion(response.data.securityQuestion)
        // setResponse(response.data.response);
        // setUserFound(true);
        setErrorMsg(response.data.TestCall);
      }
      else {
        setError("noUser", 'no user', "no account uses this email");
      }
    }).catch(error => {
      // setLoading(false);
      console.log(error);
    });
  };

  const sendTestProd = () => {
    const testObj = { "test": "app" };
    const testURL = "https://prj666.mystudentlab.ca:6759/test";
    // console.log("SENDING REQ AT " + prodURL + 'userAccount/getUserAccount');
    Axios.post(testURL, JSON.stringify(testObj), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',

      },
      withCredentials: false,

    },

    ).then((response) => {
      // if(response.data.uid ||;
      console.log(response);
      if (response.data) {
        // setSecurityQuestion(response.data.securityQuestion)
        // setResponse(response.data.response);
        // setUserFound(true);
        setErrorMsg(response.data.TestCall);
      }
      else {
        setError("noUser", 'no user', "no account uses this email");
      }
    }).catch(error => {
      // setLoading(false);
      console.log(error);
    });
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
          <View>
            <Button style={{ marginHorizontal: 10, marginTop: 20 }} mode="contained" onPress={handleSubmit(onSubmit)}>
              Continue
        </Button>
            { /*
            <Button style={{ marginHorizontal: 10, marginTop: 20 }} mode="contained" onPress={sendProdRequest}>
              Continue via Prod
        </Button>
            <Button style={{ marginHorizontal: 10, marginTop: 20 }} mode="contained" onPress={sendTestReq}>
              Test
        </Button>

            <Button style={{ marginHorizontal: 10, marginTop: 20 }} mode="contained" onPress={sendTestProd}>
              Test Prod
        </Button>
            <Text style={{ color: "#FFFFFF" }}>{errorMsg}</Text>
        */
            }
          </View>
        )
        }
        {userFound && (
          <Button style={{ marginHorizontal: 10, marginTop: 20 }} mode="contained" onPress={handleSubmit(onSubmit)}>
            Send Reset Email
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
