import * as React from 'react';
import { useEffect, useState } from 'react';

import { View, StyleSheet, Platform, Text, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput, Title, Subheading } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form'
import { TouchableHighlight } from 'react-native-gesture-handler';
import Firebase from '../configure/Firebase';
import { NavigationActions } from 'react-navigation'

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

function DevForm({ props }) {
  const [indexes, setIndexes] = React.useState([]);
  const [counter, setCounter] = React.useState(0);
  const { register, handleSubmit } = useForm();
  /*
    const onSubmit = data => {
      console.log(data);
    };
  
    const addStep = () => {
      setIndexes(prevIndexes => [...prevIndexes, counter]);
      setCounter(prevCounter => prevCounter + 1);
    };
  
    const removeStep = index => () => {
      setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
      setCounter(prevCounter => prevCounter - 1);
    };
  
    const clearSteps = () => {
      console.log(indexes);
    };
  */
  return (
    <View style={styles.container}>
      <Button style={{ marginHorizontal: 10, marginTop: 20, marginBottom: 100, backgroundColor: '#64B5F6' }} mode="contained" onPress={() => { props.navigate('EditRecipe', { mode: 'create' }) }}>
        Create a Recipe
    </Button>
      <Button style={{ marginHorizontal: 10, marginTop: 20, marginBottom: 100, backgroundColor: '#64B5F6' }} mode="contained" onPress={() => { props.navigate('EditRecipe', { mode: 'edit', uid: "U3085" }) }}>
        Edit a Recipe
    </Button>
      {/*}
          <Title style={{ color: '#4DB6AC', fontSize: 30, marginTop: 30, alignSelf: 'center' }}>Old test stuff</Title>
    <form onSubmit={handleSubmit(onSubmit)}>
      {indexes.map(index => {
        const fieldName = `steps[${index}]`;
        return (
          <fieldset name={fieldName} key={fieldName}>
            <label>
              Step {index+1}:
              <input
                type="text"
                name={`${fieldName}.stepText`}
                ref={register}
              />
            </label>

            <button type="button" onClick={removeStep(index)}>
              Remove
            </button>
          </fieldset>
        );
      })}

      <button type="button" onClick={addStep}>
        Add step
      </button>
      <button type="button" onClick={clearSteps}>
        Clear steps
      </button>
      <input type="submit" />
    </form>
    */}
    </View>
  );
}
export default DevForm;
