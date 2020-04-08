import * as React from 'react';
import { useState, useEffect } from 'react';

import { View, StyleSheet, Platform, Text, Dimensions, KeyboardAvoidingView, Picker, Image } from 'react-native';
import { Button, TextInput, Title, Subheading, Provider, Portal, Modal, Card, Snackbar, IconButton, FAB, Banner } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form'
import { TouchableHighlight } from 'react-native-gesture-handler';
import Firebase from '../configure/Firebase';
import { NavigationActions, StackActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const styles = StyleSheet.create({
  label: {
    color: '#000000',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    // borderColor: '#000000',
    // borderWidth: 1,
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
    }),
    shadowColor: "#FFFFFF",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0,
    shadowRadius: 8.62,

    elevation: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',

    borderWidth: 0,
    height: 30,
    padding: 0,
    borderRadius: 4,
    marginBottom: 14
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




function LoginForm({ props }) {

  const { control, handleSubmit, errors, setError, reset } = useForm({ mode: 'onChange' });
  const [unverified, setNotVerified] = useState(2);
  const [showSnack, setShowSnack] = useState(false);
  const [currentUser, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [iconName, setIconName] = useState('playlist-plus');

  useEffect(() => {

  });

  const onSubmit = async data => {
    setNotVerified(false)
    setLoading(true);

    if (data.email && data.password) {

      await Firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(() => {


      }).catch(function (error) {
        // Handle Errors here.
        setLoading(false);
        var errorCode = error.code;
        var errorMessage = error.message;
        handleSubmit(reset);
        setError("invalid", 'no match', "Invalid User Details");
      });

      await Firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          setUser(user);
          // setNotVerified(0)
          if (user.emailVerified) {
            setNotVerified(0);
            setLoading(false);
            //  props.navigate('Home', undefined, StackActions.replace('UserProfile'));

            props.navigate("UserHomeScreen");

          }
          else
            if (!user.emailVerified) {
              setLoading(false);
              setNotVerified(1);

            }
        }
      });

    }
    else {
      setLoading(false);
      setNotVerified(2);

    }

  }


  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    };
  };
  const closeModal = () => {
    // setUser({});
    setNotVerified(2);

  }
  const sendVerification = async () => {
    var user = await Firebase.auth().currentUser;

    if (!user.emailVerified) {
      //  l sentEmail = true;
      // this.setState({ currentUser: user });
      user.sendEmailVerification().then(function () {
        setShowSnack(true);

      });


    }
  }
  const addToList = () => {
    if (iconName == 'bookmark-plus')
      setIconName('bookmark-check');
    else
      setIconName('bookmark-plus');

  }
  return (


    <View style={styles.container}>
      <KeyboardAvoidingView>
        <Image source={require('../assets/images/kitchen-pack-cooking-svgrepo-com.png')} style={{ alignSelf: "center", width: 100, height: 100, position: "relative" }}></Image>
        <Title style={{ color: '#9575CD', fontSize: 31, marginTop: 30, fontWeight: '500', marginBottom: 10, alignSelf: 'flex-start' }}>Login</Title>

        <View style={{ marginBottom: 10 }}>
          <Subheading style={styles.label}>Email</Subheading>
          <Controller
            as={<TextInput maxLength={125} clearTextOnFocus={true} disabled={loading} style={styles.input} />}
            name="email"

            control={control}
            onChange={onChange}
            rules={{ pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9][a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ }}
          />
          {errors.email && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}>Invalid Email.</Subheading>}

          <Subheading style={styles.label}>Password</Subheading>
          <Controller
            as={<TextInput clearTextOnFocus={true} maxLength={25} disabled={loading} style={styles.input} secureTextEntry={true} />}
            name="password"

            control={control}
            onChange={onChange}

            rules={{ required: true, pattern: /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/ }}
          />


          {errors.password && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}>Invalid Password.</Subheading>}
          {errors.invalid && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}>Invalid User Details.</Subheading>}

        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
          <Button loading={loading} style={{ marginHorizontal: 10, marginTop: 20, backgroundColor: '#1DE9B6' }} color="#FFFFFF" onPress={handleSubmit(onSubmit)}>
            Log in

            </Button>
          <Button disabled={loading} style={{ marginHorizontal: 10, marginTop: 20, backgroundColor: '#81D4FA' }} color="#FFFFFF" onPress={() => props.navigate('Register')}>
            Register
            </Button>

        </View>




        <Button color='#FFFFFF' style={{ alignSelf: 'center', backgroundColor: 'grey', margin: 20 }} onPress={() => { props.navigate('ForgotPassword') }}>
          Forgot Password ?
      </Button>
        <Provider>
          <Portal>
            <Modal visible={unverified == 1} contentContainerStyle={styles.modalStyle}>
              <View >
                <Card.Content>
                  <Title style={{ fontSize: 20 }}>Verification Required</Title>
                  <Subheading style={{ fontSize: 16, color: '#000000', marginTop: 10 }}>You need to verify your account to proceed further</Subheading>
                  <Subheading style={{ fontSize: 16, color: '#E91E63', marginTop: 10 }}>A verification email has been sent to your email.
                </Subheading>

                  <Card.Actions style={{ justifyContent: "center", marginTop: 10, flexDirection: "column" }}>
                    <Button style={{ backgroundColor: '#C62828', margin: 5 }} color='#FF00FF' mode="contained" onPress={closeModal} >Close </Button>
                    <Button mode='contained' style={{ margin: 5 }} onPress={sendVerification} >Send Verification Again </Button>
                  </Card.Actions>
                </Card.Content>
                <Snackbar
                  visible={showSnack}
                  onDismiss={() => setShowSnack(false)}
                  duration={5000}
                  action={{
                    label: 'Close',
                    onPress: () => {
                      setShowSnack(false)
                    },
                  }}
                >
                  Verification Email sent to {currentUser.email}
                </Snackbar>
              </View>

            </Modal>

          </Portal>
        </Provider>
      </KeyboardAvoidingView>
    </View>

  );
}
export default LoginForm;
