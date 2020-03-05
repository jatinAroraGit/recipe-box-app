import * as React from 'react';
import { View, StyleSheet, Platform, Text, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput, Title, Subheading } from 'react-native-paper';
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
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    height: 30,
    padding: 5,
    borderRadius: 4,
  }
});


function ForgotPasswordForm({ props }) {
  var auth = Firebase.auth();
  var securityQuestion = "What is my favorite color? (Red)";
  var securityAnswer = "Red";
  const { control, handleSubmit, errors, setError } = useForm({ mode: 'onChange' });
  const onSubmit = data => {

    console.log(data);

    if (data.email && data.answer) {
      console.log('Valid email entered.');

      if (data.answer == securityAnswer) {//TODO change 'true' to checking for the email in the database.
        //TODO read security questions from database instead of hardcoding.
        console.log('Valid security question answer');


        auth.sendPasswordResetEmail(data.email).then(function () {
          // Email sent.
          console.log('password recovery email sent');
          props.navigate('Home');

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
    } else {

      console.log('Please fill all fields');
      setError("missingData", 'missing data', "some fields were left blank");

    }

  }
  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    };
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

        <Subheading style={styles.label}>Security Question</Subheading>
        <Subheading style={styles.label}>{securityQuestion}</Subheading>
        <Controller
          as={<TextInput style={styles.input} />}
          name="answer"
          control={control}
          onChange={onChange}
        />
        {errors.wrongAnswer && <Subheading style={{ color: '#BF360C' }}>Answer is incorrect.</Subheading>}
        {errors.missingData && <Subheading style={{ color: '#BF360C' }}>Please fill in both fields.</Subheading>}

        <Button style={{ marginHorizontal: 10, marginTop: 20 }} mode="contained" onPress={handleSubmit(onSubmit)}>
          Send
        </Button>

        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button style={{ marginHorizontal: 10, marginTop: 20 }} mode="contained" onPress={() => props.navigate('Login')}>
            Log in
            </Button>
          <Button style={{ marginHorizontal: 10, marginTop: 20, backgroundColor: 'grey' }} mode="contained" onPress={() => props.navigate('Register')}>
            Register
            </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
export default ForgotPasswordForm;
