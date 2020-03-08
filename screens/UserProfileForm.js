import * as React from 'react';
import { View, StyleSheet, Platform, Text, TouchableOpacity, ScrollView, TextField, Dimensions } from 'react-native';
import { Button, Appbar, Snackbar, Menu, Divider, Provider, TextInput, Subheading, Title } from 'react-native-paper';
import TopNavbar from '../components/TopNavbar';
import { useForm, Controller } from 'react-hook-form'

const customFormStyle = StyleSheet.create({
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: '#FFFFFF',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 3,
    padding: 8,
    backgroundColor: '#0e101c',
    ...Platform.select({
      ios: {
        width: 'auto'
      },
      web: {
        width: ((Dimensions.get('window').width) < 500) ? ((Dimensions.get('window').width) - 50) : 600,


      },
    })
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 0,
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});
const styles = StyleSheet.create({
  label: {
    color: '#FFFFFF',
    margin: 20,
    marginLeft: 0
  },
  button: {
    marginTop: 40,
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 3,
    padding: 8,
    backgroundColor: '#0e101c',
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


function UserProfileForm({ props }) {
  const { control, handleSubmit, errors } = useForm({ mode: 'onChange' });
  const onSubmit = (data, event) => {
    props.navigate('Profile', { names: data });
  };
  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    };
  };

  return (
    <View style={styles.container}>
      <Title style={{ color: '#FFFFFF' }}>User Details</Title>
      <Text style={styles.label}>First name</Text>
      <Controller
        as={<TextInput maxLength={30} style={styles.input} />}
        onChange={onChange}
        control={control}
        name="firstName"
        rules={{ pattern: /^[a-zA-Z]+(([\'\,\.\-][a-zA-Z])?[a-zA-Z]){1,}/ }}
      />
      {errors.firstName && <Text style={{ color: '#00FFFF' }}>This is required.</Text>}

      <Text maxLength={30} style={styles.label}>Last name</Text>
      <Controller
        as={<TextInput style={styles.input} />}
        name="lastName"
        control={control}
        onChange={onChange}
        rules={{ pattern: /^[a-zA-Z]+(([\'\,\.\-][a-zA-Z])?[a-zA-Z]){1,}/ }}

      />
      {errors.lastName && <Text style={{ color: '#00FFFF' }}>This is required.</Text>}
      <View style={styles.button}>
        <Button
          color='#FFFFFF'
          title="Button"
          onPress={handleSubmit(onSubmit)}
        > Submit </Button>
      </View>
    </View>
  );
}
export default UserProfileForm;
