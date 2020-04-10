import * as React from 'react';
import { View, StyleSheet, Platform, Text, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput, Title, Subheading } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form'
import { TouchableHighlight } from 'react-native-gesture-handler';
import Firebase from '../configure/Firebase';
import { jsxOpeningElement } from '@babel/types';
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


function ChangePasswordForm({ props }) {

  var auth = Firebase.auth();
  let user = auth.currentUser;//retrieving current user
  const { control, handleSubmit, errors, setError } = useForm({ mode: 'onChange' });
  const onSubmit = data => {

    const sendData = JSON.stringify(data);
    if (data.password && data.newPassword && data.confirmNewPassword) {

      if (data.newPassword == data.confirmNewPassword) {

        auth.signInWithEmailAndPassword(user.email, data.password).then(function () {

          user.updatePassword(data.newPassword).then(function () {
            props.navigate('UserProfile');

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

        setError("matchPassword", 'no pmatch', "Passwords do not match");

      }

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
        <Title style={{ color: '#FFFFFF', fontSize: 30, marginTop: 20, alignSelf: 'center' }}>Change Password</Title>
        <Subheading style={styles.label}>Current Password</Subheading>
        <Controller
          as={<TextInput maxLength={25} style={styles.input} secureTextEntry={true} />}
          name="password"

          control={control}
          onChange={onChange}

          rules={{ required: true, pattern: /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/ }}
        />
        {errors.password && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}>Invalid Password.</Subheading>}
        {errors.invalid && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}>Wrong password.</Subheading>}

        <Subheading style={styles.label}>New Password</Subheading>
        <Controller
          as={<TextInput maxLength={25} style={styles.input} secureTextEntry={true} />}
          name="newPassword"
          control={control}
          onChange={onChange}
          rules={{ required: true, pattern: /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/ }}
        />
        {errors.newPassword && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}>Invalid Password.</Subheading>}

        <Subheading style={styles.label}>Confirm New Password</Subheading>
        <Controller
          as={<TextInput maxLength={25} style={styles.input} secureTextEntry={true} />}
          name="confirmNewPassword"
          control={control}
          onChange={onChange}
          rules={{ required: true, pattern: /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/ }}
        />
        {errors.confirmNewPassword && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}>Invalid Password.</Subheading>}
        {errors.matchPassword && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}> Passwords do not match</Subheading>}

        <Button style={{ marginHorizontal: 10, marginTop: 20 }} mode="contained" onPress={handleSubmit(onSubmit)}>
          Change Password
        </Button>
        <Button style={{ marginHorizontal: 10, marginTop: 12, marginBottom: 6 }} mode="contained" onPress={() => props.navigate('UserProfile')}>
          Return to user profile
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
export default ChangePasswordForm;
