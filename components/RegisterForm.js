import * as React from 'react';
import { View, StyleSheet, Platform, Text, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput, Title, Subheading } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form'
import { TouchableHighlight } from 'react-native-gesture-handler';
import Firebase from '../configure/Firebase';
import { NavigationActions } from 'react-navigation'

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
    padding: 4,
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#90CAF9',
    borderWidth: 0,
    height: 30,
    padding: 5,
    borderRadius: 4,
  }
});

var errorb = false;


function RegisterForm({ nav }) {

  const navigation = nav;
  console.log(navigation);
  const { control, handleSubmit, errors, setError } = useForm({ mode: 'onChange' });
  const onSubmit = data => {
    console.log("Form Data = ")
    //  JSON.
    JSON.stringify(data);
    console.log(data);

    if (data.email && data.password && data.confirmEmail && data.confirmPassword && data.firstName && data.lastName && data.question && data.answer) {

      if (data.email === data.confirmEmail && data.password === data.confirmPassword && data.question != data.answer) {

        var name = data.firstName + " " + data.lastName;
        errorb = false;
        //Create User with Email and Password
        Firebase.auth().createUserWithEmailAndPassword(data.email, data.password).then(function (result) {

          return result.user.updateProfile({ displayName: name })

        }).catch(function (error) {
          // Handle Errors here.


          var errorCode = error.code;
          errorb = true;
          var errorMessage = error.message;
          console.log("ErrorCode");
          console.log(errorCode);
          console.log("ErrorMessage");
          console.log(errorMessage);
          setError("firebase", 'error', errorMessage);
        });




        Firebase.auth().onAuthStateChanged(function (user) {

          if (user) {

            if (!user.emailVerified) {
              user.sendEmailVerification().then(function () {

                console.log('First Email sent to : ' + user.email);

              }).catch(function (error) {
                console.log(' Already Verified.');
                console.log(error);
              });
            }

            console.log('\n\n\n\n\n\n\n\nhere')
            console.log(user.uid);
            navigation.navigate(NavigationActions.navigate({
              routeName: 'Auth',
              action: NavigationActions.navigate({ routeName: 'UserProfile' })
            }))
            //    props.navigate("Auth");
            //   props.navigate("UserProfile");


          } else {

            console.log("oops");
          }

        });

      } else {

        if (data.email != data.confirmEmail) {

          console.log("email no good");
          setError("matchEmail", 'no match', "Emails do not match");

        }

        if (data.password != data.confirmPassword) {

          console.log("password no good");
          setError("matchPassword", 'no pmatch', "Passwords do not match");

        }

        if (!data.firstName) {

          setError("firstName", 'empty', "Cannot be blank!");

        }

        if (!data.lastName) {

          setError("lastName", 'empty', "Cannot be blank!");

        }

        if (data.question == data.answer) {

          console.log("password no good");
          setError("same", 'match', "Question and Answer must differ");

        }

      }
    } else {

      console.log('bad');

    }

  }
  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    };
  };

  return (


    <View style={styles.container}>
      <Title style={{ color: '#1E88E5', fontSize: 30, marginTop: 20, alignSelf: 'center' }}>Create Account</Title>
      <Subheading style={styles.label}>Email</Subheading>
      <Controller
        as={<TextInput style={styles.input} />}
        name="email"
        control={control}
        onChange={onChange}
        rules={{ pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9][a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ }}
      />
      {errors.email && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}>Invalid Email.</Subheading>}

      <Subheading style={styles.label}>Confirm Email</Subheading>
      <Controller
        as={<TextInput style={styles.input} />}
        name="confirmEmail"
        control={control}
        onChange={onChange}
        rules={{ pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9][a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ }}
      />
      {errors.confirmEmail && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}> Invalid Email.</Subheading>}
      {errors.matchEmail && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}> Emails do not match</Subheading>}

      <Subheading style={styles.label}>Password</Subheading>
      <Controller
        as={<TextInput maxLength={25} style={styles.input} secureTextEntry={true} />}
        name="password"
        control={control}
        onChange={onChange}
        rules={{ required: true, pattern: /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/ }}
      />
      {errors.password && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}>Invalid Password.</Subheading>}

      <Subheading style={styles.label}>Confirm Password</Subheading>
      <Controller
        as={<TextInput maxLength={25} style={styles.input} secureTextEntry={true} />}
        name="confirmPassword"
        control={control}
        onChange={onChange}
        rules={{ required: true, pattern: /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/ }}
      />
      {errors.confirmPassword && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}>Invalid Password.</Subheading>}
      {errors.matchPassword && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}> Passwords do not match</Subheading>}

      <Title style={{ color: '#1E88E5', marginTop: 20 }}>User Details</Title>
      <Subheading style={styles.label}>First name</Subheading>
      <Controller
        as={<TextInput maxLength={30} style={styles.input} />}
        onChange={onChange}
        control={control}
        name="firstName"
        rules={{ pattern: /^[a-zA-Z]+(([\'\,\.\-][a-zA-Z])?[a-zA-Z]){1,}/ }}
      />
      {errors.firstName && <Text style={{ color: '#BF360C' }}>This is required.</Text>}

      <Subheading style={styles.label}>Last name</Subheading>
      <Controller
        as={<TextInput maxLength={30} style={styles.input} />}
        name="lastName"
        control={control}
        onChange={onChange}
        rules={{ pattern: /^[a-zA-Z]+(([\'\,\.\-][a-zA-Z])?[a-zA-Z]){1,}/ }}

      />
      {errors.lastName && <Text style={{ color: '#BF360C' }}>This is required.</Text>}

      <Title style={{ color: '#1E88E5', marginTop: 20 }}>Security Questions</Title>
      <Subheading style={styles.label}>Question</Subheading>
      <Controller
        as={<TextInput style={styles.input} />}
        name="question"
        control={control}
        onChange={onChange}
        rules={{ required: true }}
      />
      {errors.answer && <Subheading style={{ color: '#BF360C' }}>You must enter a question.</Subheading>}

      <Subheading style={styles.label}>Answer</Subheading>
      <Controller
        as={<TextInput style={styles.input} />}
        name="answer"
        control={control}
        onChange={onChange}
        rules={{ required: true }}
      />
      {errors.answer && <Subheading style={{ color: '#BF360C' }}>You must provide an answer.</Subheading>}
      {errors.same && <Subheading style={{ color: '#BF360C' }}>Your answer cannot be same as the question.</Subheading>}
      {errors.firebase && <Subheading style={{ color: '#BF360C' }}>{errors.firebase.message}</Subheading>}

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Button style={{ marginHorizontal: 10, marginTop: 20, backgroundColor: '#29D4FA' }} pre mode="contained" onPress={handleSubmit(onSubmit)}>
          Register
            </Button>

      </View>
    </View>

  );
}
export default RegisterForm;
