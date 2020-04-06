import * as React from 'react';
import { View, StyleSheet, Platform, Text, Dimensions } from 'react-native';
import { Button, TextInput, Title, Subheading } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form'
import { TouchableHighlight } from 'react-native-gesture-handler';


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


function SecurityQuestionForm({ props }) {

  const { control, handleSubmit, errors, setError } = useForm({ mode: 'onChange' });
  const onSubmit = data => {

    if (data.question && data.question) {

      if (data.question === data.answer) {

        setError("same", 'bothSame', "Fields can not be the same!");

      } else {

        props.navigate('UserAccount');
      }
    }

  }
  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    };
  };

  return (

    <View style={styles.container}>
      <Title style={{ color: '#FFFFFF', fontSize: 30, marginTop: 20, alignSelf: 'center' }}>Security Question</Title>
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
      {errors.answer && <Subheading style={{ color: '#00FFFF' }}>You must provide an answer.</Subheading>}
      {errors.same && <Subheading style={{ color: '#00FFFF' }}>Your answer cannot be same as the question.</Subheading>}

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Button style={{ marginHorizontal: 10, marginTop: 20 }} mode="contained" onPress={handleSubmit(onSubmit)}>
          Register
            </Button>
      </View>
    </View>
  );
}
export default SecurityQuestionForm;
