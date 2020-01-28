import * as React from 'react';
import { View, StyleSheet, Platform, Text, Dimensions } from 'react-native';
import { Button, TextInput, Title,Subheading } from 'react-native-paper';
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


function ForgotPasswordForm({props}) {
    
    const { control, handleSubmit, errors } = useForm({mode:'onChange'});
    const onSubmit = data => {

        console.log(data);

        if(data.email) {

            console.log('good');

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
        <Title style={{color:'#FFFFFF', fontSize: 30, marginTop: 20, alignSelf: 'center'}}>Forgot Password</Title>
        <Subheading style={styles.label}>Email</Subheading>
        <Controller
            as={<TextInput style={styles.input} />}
            name="email"
            control={control}
            onChange={onChange}
            rules={{ pattern:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9][a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/}}
        />
        {errors.email && <Subheading style={{color:'#BF360C'}}>Invalid Email.</Subheading>}

        <Button style={{marginHorizontal: 10, marginTop: 20}} mode="contained" onPress={handleSubmit(onSubmit)}>
                Send
        </Button>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button style={{marginHorizontal: 10, marginTop: 20}} mode="contained" onPress={() => props.navigate('Login')}>
                Log in
            </Button>
            <Button style={{marginHorizontal: 10, marginTop: 20, backgroundColor: 'grey'}} mode="contained" onPress={() => props.navigate('Register')}>
                Register
            </Button>
        </View>
    </View>
  );
}
export default ForgotPasswordForm;
