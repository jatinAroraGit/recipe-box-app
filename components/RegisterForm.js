import * as React from 'react';
import { View, StyleSheet, Platform, Text, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput, Title, Subheading } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form'
import { TouchableHighlight } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  label: {
    color: '#FFFFFF',
    margin: 20,
    marginLeft: 0
  },
  button :{
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
    borderRadius:10,
    height:'auto',
     ...Platform.select({
      ios: {
        width: 320
      },
      web: {
        width: ((Dimensions.get('window').width)<500)? ((Dimensions.get('window').width)-50): 600,
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




function LoginForm({props}) {
    
    const { control, handleSubmit, errors, setError } = useForm({mode:'onChange'});
    const onSubmit = data => {

        console.log(data);
        
        if(data.email && data.password && data.confirmEmail && data.confirmPassword) {

            if(data.email === data.confirmEmail && data.password === data.confirmPassword) {

            console.log('good');
            props.navigate('SecurityQuestion');

            } else {

                if(data.email != data.confirmEmail) {

                    console.log("email no good");
                    setError("matchEmail", 'no match', "Emails do not match");
                
                }

                if (data.password != data.confirmPassword) {

                    console.log("password no good");
                    setError("matchPassword", 'no pmatch', "Passwords do not match");

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

    <KeyboardAvoidingView behavior= 'position' keyboardVerticalOffset={15}>
    <View style={styles.container}>
        <Title style={{color:'#FFFFFF', fontSize: 30, marginTop: 20, alignSelf: 'center'}}>Register</Title>
        <Subheading style={styles.label}>Email</Subheading>
        <Controller
            as={<TextInput style={styles.input} />}
            name="email"
            control={control}
            onChange={onChange}
            rules={{ pattern:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9][a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/}}
        />
        {errors.email && <Subheading style={{color:'#BF360C', fontSize:15, fontWeight:'300'}}>Invalid Email.</Subheading>}

        <Subheading style={styles.label}>Confirm Email</Subheading>
        <Controller
            as={<TextInput style={styles.input} />}
            name="confirmEmail"
            control={control}
            onChange={onChange}
            rules={{ pattern:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9][a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/}}
        />
        {errors.confirmEmail && <Subheading style={{color:'#BF360C', fontSize:15, fontWeight:'300'}}> Invalid Email.</Subheading>}
        {errors.matchEmail && <Subheading style={{color:'#BF360C', fontSize:15, fontWeight:'300'}}> Emails do not match</Subheading>}

        <Subheading style={styles.label}>Password</Subheading>
        <Controller
            as={<TextInput style={styles.input} secureTextEntry={true} />}
            name="password"
            control={control}
            onChange={onChange}
            rules={{ required: true, pattern:/(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/}}
        />
        {errors.password && <Subheading style={{color:'#BF360C', fontSize:15, fontWeight:'300'}}>Invalid Password.</Subheading>}

        <Subheading style={styles.label}>Confirm Password</Subheading>
        <Controller
            as={<TextInput style={styles.input} secureTextEntry={true}  />}
            name="confirmPassword"
            control={control}
            onChange={onChange}
            rules={{ required: true, pattern:/(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/}}
        />
        {errors.confirmPassword && <Subheading style={{color:'#BF360C', fontSize:15, fontWeight:'300'}}>Invalid Password.</Subheading>}
        {errors.matchPassword &&<Subheading style={{color:'#BF360C', fontSize:15, fontWeight:'300'}}> Passwords do not match</Subheading>}

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button style={{marginHorizontal: 10, marginTop: 20}} mode="contained" onPress={handleSubmit(onSubmit)}>
                Continue
            </Button>
            <Button style={{marginHorizontal: 10, marginTop: 20, backgroundColor: '#1DE9B6'}} mode="contained" onPress={() => props.navigate('Login')}>
                Log in
            </Button>
        </View>
    </View>
    </KeyboardAvoidingView>
  );
}
export default LoginForm;
