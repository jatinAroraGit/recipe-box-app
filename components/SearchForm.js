import * as React from 'react';
import { View, StyleSheet, Platform, Text, Dimensions } from 'react-native';
import { Button, TextInput, Title, Subheading, Searchbar, List } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form'
import { setLightEstimationEnabled } from 'expo/build/AR';


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
    height: 40,
    padding: 5,
    borderRadius: 4,
  },
  inputIngredient: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    height: 20,
    padding: 5,
    marginHorizontal: 10,
    borderRadius: 4,
  },
});

var more = false;
var ingredientIt = 0;

function SearchForm({ props }) {


  var ingredientList = [{ name: '' }];
  const cuisine = ['none', 'italian', 'indian', 'mexican', 'german'];
  var results = { title: '', cuisine: 'none', ingredients: [{ name: '' }] };


  const { control, handleSubmit, errors } = useForm({ mode: 'onChange' });
  const onSubmit = data => {

    console.log(data);
    props.navigate('Results')

  }
  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    };
  };

  const toggleFilter = () => {

    if (more) {

      console.log('less')
      more = false;

    } else {

      console.log('more')
      more = true;

    }


  }

  const setCuisine = (c) => {

    results.cuisine = c;

  }

  const addIngredient = () => {

    ingredientIt++;
    ingredientList[ingredientIt] = { name: '' };
    console.log(ingredientList);
  }

  const showCuisine = cuisine.map((c) => {

    //<List.Item key={c + "key"} title={c} onPress={() => {setCuisine({c})}}></List.Item>
    <Text>{c}</Text>
  });

  const showIngredients = ingredientList.map((ingredient) => {

    <TextInput key={'ingredient' + ingredientIt.toString()}
      style={styles.inputIngredient}
      dense={true}
      value={ingredient.name}
      onChangeText={(text) => { ingredientList[ingredientIt].name = text }}
    />

  });

  return (

    <View style={styles.container}>
      <Title style={{ color: '#FFFFFF', fontSize: 30, marginTop: 20, alignSelf: 'center' }}>Search</Title>
      <View style={{ marginBottom: 10 }}>
        <Controller
          as={<Searchbar style={styles.input} onChangeText={(text) => results.title = text} />}
          name="search"
          control={control}
          onChange={onChange}
          rules={{ required: true }}
        />
        {errors.search && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}>Invalid Search.</Subheading>}

        <List.Section>
          <List.Accordion title='Cuisine'>
            {showCuisine}
          </List.Accordion>
          <List.Accordion title='Ingredients'>
            {showIngredients}
            <Button color='#FFFFFF' style={{ alignSelf: 'center', backgroundColor: 'purple', margin: 20 }} onPress={() => addIngredient()}>Add</Button>
          </List.Accordion>
        </List.Section>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
          <Button color='#FFFFFF' style={{ alignSelf: 'center', backgroundColor: 'purple', margin: 20 }} onPress={() => console.log(showCuisine)}>
            Search
        </Button>
          <Button color='#FFFFFF' style={{ alignSelf: 'center', backgroundColor: 'grey', margin: 20 }} onPress={() => toggleFilter()}>
            Filters
        </Button>
        </View>
        {showCuisine}
      </View>
    </View>
  );
}
export default SearchForm;
