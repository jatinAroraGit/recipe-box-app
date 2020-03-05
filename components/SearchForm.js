import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Platform, Text, Dimensions } from 'react-native';
import { Button, TextInput, Title, Subheading, Searchbar, List, RadioButton, Provider, Portal, Modal } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { setLightEstimationEnabled } from 'expo/build/AR';
import { PulseIndicator } from 'react-native-indicators';
import DevScreen from '../screens/DevScreen';

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
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 4,
  },
});

var results = {};

function SearchForm({ props }) {

  const ingre = { name: '' };
  const [empty, setEmpty] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [ingredients, setIngredients] = useState([ingre]);
  const [visibleModal, setVisibleModal] = useState(false);


  const _showModal = () => { setVisibleModal(true) };
  const _hideModal = () => { setVisibleModal(false) };

  const cuisine = ['None', 'African', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern', 'Vietnamese', 'Thai', 'Spanish'];
  const dietary = ['Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame', 'Shellfish', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat']

  const { control, handleSubmit, errors } = useForm({ mode: 'onChange' });

  const onSubmit = data => {

    results.includeIngredients = "";
    results.cuisine = "";
    results.query = "";
    results.intolerances = "";
    setEmpty(true);
    if (ingredients.length < 2 && ingredients[0].name != "") {
      setEmpty(false);

      for (var i in ingredients) {

        if (i > 0 && ingredients[i].name != "") {

          results.includeIngredients += ',';

        }
        if (ingredients[i].name != '') {

          results.includeIngredients += ingredients[i].name;
        }
      }
    }

    if (selectedCuisine != '') {
      setEmpty(false);
      results.cuisine = selectedCuisine;

    }

    if (data.query != undefined) {
      setEmpty(false);
      results.query = data.query;

    }

    if (selectedDietary.length != 0) {
      setEmpty(false);

      for (var i in selectedDietary) {

        if (i > 0 && selectedDietary[i] != "") {

          results.intolerances += ',';

        }
        if (selectedDietary[i] != '') {

          results.intolerances += selectedDietary[i];
        }
      }
    }

    const result = JSON.stringify(results);

    props.navigate("Results", { results: result });

  }
  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    };
  };

  const setCuisine = (c) => {

    setSelectedCuisine(c);

  }

  const addIngredient = () => {

    setIngredients(ingredients.concat(ingre));
    console.log('Hi concat');
    console.log(ingredients);
    console.log('Bye concat');

  }

  const checkDietary = (c) => {

    var selected = false;

    for (var i in selectedDietary) {

      if (selectedDietary[i] == c) {

        selected = true;

      }

    }

    return selected;

  }

  const toggleDietary = (d, i) => {

    var toggled = false;


    for (var i in selectedDietary) {

      if (selectedDietary[i] == d) {

        let temp = [...selectedDietary];
        temp.splice(i, 1);
        console.log("temp")
        console.log(temp);
        setSelectedDietary(temp);

        toggled = true;
      }

    }
    console.log(toggled)
    if (!toggled) {

      setSelectedDietary(selectedDietary.concat(d));
      console.log("!")
      console.log(selectedDietary);

    }

    console.log(selectedDietary);

  }

  /*const removeIngrdient = (i) => {

    setIngredients(ingredients.splice(i, 1))

  }*/

  const updateIngredient = (name, i) => {

    let temp = [...ingredients];
    let item = { ...temp[i] };
    item.name = name;
    temp[i] = item;
    setIngredients(temp);

  }

  const showCuisine = cuisine.map((c, i) => {

    var key = 'cuisine' + i.toString();

    return (
      <Controller
        as={<View style={{ flexDirection: 'row' }}><RadioButton
          key={c + "key"}
          theme={{ colors: { text: '#EEEEEE' } }}
          onPress={() => setCuisine(c)}
          status={selectedCuisine === c ? 'checked' : 'unchecked'}
        />
          <Text style={{ marginTop: 10, marginHorizontal: 10, color: '#EEEEEE' }}>{c}</Text></View>}
        name={key}
        key={c + "key"}
        control={control}
        onChange={onChange}
      />);

  });

  const showDietary = dietary.map((c, i) => {

    var key = 'dietary' + i.toString();

    return (
      <Controller
        as={<View style={{ flexDirection: 'row' }}><RadioButton
          key={key}
          theme={{ colors: { text: '#EEEEEE' } }}
          onPress={() => toggleDietary(c, i)}
          status={checkDietary(c) ? 'checked' : 'unchecked'}
        />
          <Text style={{ marginTop: 10, marginHorizontal: 10, color: '#EEEEEE' }}>{c}</Text></View>}
        name={key}
        key={c + "key"}
        control={control}
        onChange={onChange}
      />);

  });

  const showIngredients = ingredients.map((c, i) => {

    var key = 'ingredient' + i.toString();

    return (
      <Provider>
        <Controller
          as={<View style={{ flexDirection: 'row', marginVertical: 5 }}><TextInput
            style={styles.inputIngredient}
            theme={{ colors: { text: '#000000' } }}
            key={key}
            dense={true}
            onChangeText={(text) => { updateIngredient(text, i) }}
          />
            {//<Button style={{flex: 1, backgroundColor: '#ef5350'}} theme={{colors: {text: '#EEEEEE'}}}onPress={() => { removeIngrdient(i)}} title={key + 'b'}>Remove</Button>
            }
          </View>}
          name={key}
          key={c + "key"}
          control={control}
          onChange={onChange}
        />

      </Provider >
    );

  });


  return (

    <View style={styles.container}>
      <Title style={{ color: '#FFFFFF', fontSize: 30, marginTop: 20, alignSelf: 'center' }}>Search</Title>
      <View style={{ marginBottom: 10 }}>
        <Controller
          as={<Searchbar style={styles.input} />}
          name="query"
          control={control}
          onChange={onChange}
          defaultValue=""
        />
        {errors.search && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}>Invalid Search.</Subheading>}

        <List.Section>
          <List.Accordion theme={{ colors: { text: '#EEEEEE' } }} title='Cuisine'>
            {showCuisine}
          </List.Accordion>
          <List.Accordion theme={{ colors: { text: '#EEEEEE' } }} title='Dietary Restrictions'>
            {showDietary}
          </List.Accordion>
          <Subheading title="Ingredients" style={{ fontSize: 16, marginVertical: 10, marginHorizontal: 15 }} theme={{ colors: { text: '#EEEEEE' } }}>Ingredients</Subheading>
          {showIngredients}
          <Button color='#FFFFFF' style={{ alignSelf: 'center', backgroundColor: '#0288D1', margin: 20 }} onPress={() => addIngredient()}>Add</Button>


        </List.Section>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
          <Button color='#FFFFFF' style={{ alignSelf: 'center', backgroundColor: '#388E3C', marginTop: 20 }} onPress={handleSubmit(onSubmit)}>
            Search
        </Button>
        </View>
      </View>
    </View>
  );
}
export default SearchForm;
