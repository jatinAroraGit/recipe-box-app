import * as React from 'react';
import { View, StyleSheet, Platform, Text, Dimensions } from 'react-native';
import { Button, TextInput, Title } from 'react-native-paper';
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
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 3,
    padding: 20,
    marginTop: 20,
    backgroundColor: '#7986cb',
    borderRadius:10,
    height:'auto',
     ...Platform.select({
      ios: {
        width: 320
      },
      web: {
         width: ((Dimensions.get('window').width)-50),
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
    
    const { control, handleSubmit, errors } = useForm({mode:'onChange'});
    const onSubmit = data => {

        console.log(data);

        if(data.email && data.password) {

            console.log('good');
            props.navigate('UserAccount');

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
        <Title style={{color:'#FFFFFF', fontSize: 30, marginTop: 20, alignSelf: 'center'}}>Login</Title>
        <Text style={styles.label}>Email</Text>
        <Controller
            as={<TextInput style={styles.input} />}
            name="email"
            control={control}
            onChange={onChange}
            rules={{ pattern:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9][a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/}}
        />
        {errors.email && <Text style={{color:'#00FFFF'}}>Invalid Email.</Text>}

        <Text style={styles.label}>Password</Text>
        <Controller
            as={<TextInput style={styles.input} secureTextEntry={true} />}
            name="password"
            control={control}
            onChange={onChange}

            rules={{ required: true, pattern:/(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/}}
        />
        {errors.password && <Text style={{color:'#00FFFF'}}>Invalid Password.</Text>}

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Button style={{marginHorizontal: 10, marginTop: 20}} mode="contained" onPress={handleSubmit(onSubmit)}>
                Log in
            </Button>
            <Button style={{marginHorizontal: 10, marginTop: 20, backgroundColor: 'grey'}} mode="contained" onPress={() => props.navigate('Register')}>
                Register
            </Button>
        </View>
        <TouchableHighlight style={{alignSelf: 'center', marginTop: 20}} onPress={() => props.navigate('ForgotPassword')}>
            <Text>Forgot Password?</Text>
        </TouchableHighlight>
    </View>
  );
}
export default LoginForm;
