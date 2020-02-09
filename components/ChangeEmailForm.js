import * as React from 'react';
import { View, StyleSheet, Platform, Text, Dimensions } from 'react-native';
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


function ChangeEmailForm({ props }) {

  var auth = Firebase.auth();
  let user = auth.currentUser;//retrieving current user
  const { control, handleSubmit, errors, setError } = useForm({ mode: 'onChange' });
  const onSubmit = data => {

    console.log(data);

    if (data.password && data.newEmail && data.confirmNewEmail) {
      console.log('required data entered');

      if (data.newEmail == data.confirmNewEmail) {
        console.log('new emails match');

        auth.signInWithEmailAndPassword(user.email, data.password).then(function() {
            console.log('User verified');

            user.updateEmail(data.newEmail).then(function() {
              console.log('Email updated');
              props.navigate('UserProfile');

            }).catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorCode);
              console.log(errorMessage);
            });

            }).catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          setError("invalid", 'wrong password', "Wrong Password");
          console.log(errorCode);
          console.log(errorMessage);
        });

      } else {

        console.log("emails do not match");
        setError("matchEmail", 'no ematch', "Emails do not match");

      }
      
    } else {

      console.log('Please fill in all fields');

    }

  }
  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    };
  };

  return (

    <View style={styles.container}>
      <Title style={{ color: '#FFFFFF', fontSize: 30, marginTop: 20, alignSelf: 'center' }}>Change Email</Title>
      <Subheading style={styles.label}>Password</Subheading>
        <Controller
          as={<TextInput style={styles.input} secureTextEntry={true} />}
          name="password"

          control={control}
          onChange={onChange}

          rules={{ required: true, pattern: /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/ }}
        />
        {errors.password && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}>Invalid Password.</Subheading>}
        {errors.invalid && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}>Wrong password.</Subheading>}

      <Subheading style={styles.label}>New Email</Subheading>
      <Controller
        as={<TextInput style={styles.input} />}
        name="newEmail"
        control={control}
        onChange={onChange}
        rules={{ pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9][a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ }}
      />
      {errors.newEmail && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}>Invalid Email.</Subheading>}

      <Subheading style={styles.label}>Confirm New Email</Subheading>
      <Controller
        as={<TextInput style={styles.input} />}
        name="confirmNewEmail"
        control={control}
        onChange={onChange}
        rules={{ pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9][a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ }}
      />
      {errors.confirmNewEmail && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}> Invalid Email.</Subheading>}
      {errors.matchEmail && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}> Emails do not match.</Subheading>}

      <Button style={{ marginHorizontal: 10, marginTop: 20 }} mode="contained" onPress={handleSubmit(onSubmit)}>
        Change Email
        </Button>
      <Button style={{ marginHorizontal: 10, marginTop: 12, marginBottom: 6 }} mode="contained" onPress={() => props.navigate('UserProfile')}>
        Return to user profile
        </Button>

    </View>
  );
}
export default ChangeEmailForm;
