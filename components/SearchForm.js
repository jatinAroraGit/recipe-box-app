import * as React from 'react';
import { useState } from 'react';
import axios from 'axios'
import '../configure/apiKey.json'
import { View, StyleSheet, Platform, Text, Dimensions, Picker, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput, Title, Headline, Subheading, Searchbar, List, RadioButton, Chip } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import SafeAreaView from 'react-native-safe-area-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FlatList } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  label: {
    color: '#4DB6AC',
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
    padding: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    height: 'auto',
    minWidth: 320,
    ...Platform.select({
      ios: {
        width: "auto"
      },
      web: {
        width: ((Dimensions.get('window').width) < 500) ? ((Dimensions.get('window').width) - 50) : 600,
      },
      android: {
        width: "auto"
      },
    })
  },
  input: {
    backgroundColor: '#B2DFDB',
    borderWidth: 0,
    height: 40,
    width: 140,
    padding: 5,
    width: "auto",
    borderRadius: 4,
    alignSelf: "stretch"
  },
  inputIngredient: {
    backgroundColor: '#B2DFDB',
    borderWidth: 0,
    height: 20,
    padding: 5,
    width: 220,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 4,
  },
});

var results = {};

function SearchForm({ props }) {

  const [currentIngredient, setCurrentIngredient] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState('None');
  const [selectedMealType, setSelectedMealType] = useState('None');
  const [chips, setChips] = useState([]);
  const [refresh, setRefresh] = useState(false)
  const [def, setDef] = useState("");

  const { control, handleSubmit, errors, setError } = useForm({ mode: 'onChange' });
  const _showModal = () => { setVisibleModal(true) };
  const _hideModal = () => { setVisibleModal(false) };

  const onSubmit = data => {

    results.includeIngredients = [];
    results.cuisine = "";
    results.query = "";
    results.mealType = "";
    console.log("chips");
    console.log(chips);

    var num = 0;

    if (data.query)
      data.query = data.query.trim();

    //  if (data.query != "") {

    for (var i in chips) {

      num++;
      if (chips[i] != "") {  //If there is an ingredient to show,
        if (i > 0) {  //If it is not the first ingredient,
          //  results.includeIngredients += ',';// add a comma.
        }
        results.includeIngredients.push(chips[i]);//Add the ingredient.
      }
    }

    if (selectedCuisine != "None") {
      num++;
      results.cuisine = selectedCuisine;

    }

    if (data.query != undefined) {
      num++;
      console.log('query trimmed', data.query.trim());
      results.query = data.query.trim();

    }

    if (selectedMealType != "None") {
      console.log('meal type trimmed', selectedMealType.valueOf());
      num++;
      results.mealType = selectedMealType;
    }//TODO make mealType an array that can support multiple values.  Requires changing input type before supporting it here.

    const result = JSON.stringify(results);
    console.log('Final Query:: ', results);
    if (num > 0) {

      props.navigate("Results", { results: result });

    } else {

      setError("search", 'search', "Invalid Search Terms");
      //TODO this seems like the wrong error message, this seems to be reached when no search parameters are entered

    }
    /*
     }
     else {
       console.log("search error");
       setError("query", "query", "Invalid search");
     }
     */
  }
  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    };
  };




  const showChip = chips.map((c, i) => {

    return (

      <Chip onClose={() => { console.log("remove", i); removeChip(i) }} key={i} style={{ margin: 5, alignSelf: 'baseline' }}>{c}</Chip>

    );

  });

  const updateIngredient = (name) => {

    var good = true;
    name = name.trim()
    if (name != "") {
      for (var i in chips) {

        if (chips[i] == name) {

          good = false;

        }
      }

      if (good) {

        var temp = chips;
        temp[chips.length] = name.toUpperCase();
        setChips(temp);
        setCurrentIngredient("");
      }

    }
  }
  const removeStep = (i) => {
    let temp = [...chips];
    temp.splice(i, 1);
    setChips(temp);
  }

  const showIngs = chips.map((ing, i) => {
    return (
      <View>

        <View style={{ marginBottom: 10, backgroundColor: '#dddddd', width: 'auto', padding: 2, zIndex: 1000, flexDirection: "row" }} key={i} >
          <Text style={{ flexWrap: "wrap", fontSize: 18 }}>{ing}</Text>

          <Button style={{ backgroundColor: '#D50000', marginLeft: 2 }} mode="contained" onPress={() => removeStep(i)}>
            Remove
        </Button>


        </View>

      </View>

    );

  });


  const onStep = data => {
    console.log(data.ing);
    if (data.ing) {
      data.ing = data.ing.trim();
    }

    //  setStepLoading(true);
    // data.step = data.step.trim();
    if (data.ing.length > 1) {
      let tempArray = [...chips];
      tempArray[tempArray.length] = data.ing;
      setChips(tempArray);
      setDef("");
      //TODO clear step text
    } else {
      setError("ingShort", 'ingShort', "Ingredient text is too short.");
    }
    //  setStepLoading(false);
  }
  const removeChip = (i) => {
    console.log(i);
    var temp = new Array;
    temp = chips;
    temp.splice(i, 1);

    setChips(temp);
    console.log(chips);
    setCurrentIngredient("");
    setRefresh(!refresh);

  }

  return (

    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView extraScrollHeight={Platform.OS === 'ios' ? 70 : 180} enableResetScrollToCoords={false} enableOnAndroid={true} >
        <View style={{ marginBottom: 10, marginHorizontal: 15 }}>

          <View style={{ margin: 5, padding: 4, borderRadius: 10 }}>


            <Title style={{ color: '#4DB6AC', fontSize: 30, marginTop: 30, alignSelf: 'center' }}>Search</Title>
            <Controller
              as={<TextInput returnKeyType="search" placeholder="Enter Or Hit Search" style={styles.input} />}
              name="query"
              control={control}
              onChange={onChange}
              defaultValue=""


            />

            <View style={{ alignSelf: 'center', marginBottom: 3 }}>
              {errors.query && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}>Invalid Search.</Subheading>}
              <Button color='#FFFFFF' style={{ backgroundColor: '#388E3C', marginTop: 20 }} onPress={handleSubmit(onSubmit)}>
                Search

        </Button>
            </View>
            <View style={{ flex: 1, margin: 5, padding: 4, backgroundColor: '#37474F', borderRadius: 10 }}>
              <Title style={{ marginHorizontal: 15, marginTop: 15, color: '#EC407A', alignSelf: "center", fontSize: 20 }}>Filter By</Title>
              <Title style={{ marginHorizontal: 15, marginTop: 15, color: '#EEEEEE', alignSelf: "center", fontSize: 16 }}>Include Ingredients</Title>

              {showIngs}
              <Controller
                as={<TextInput clearTextOnFocus={true} placeholder="add a new ingredient" style={styles.input} />}

                multiline={true}
                name="ing"
                defaultValue={def}
                placeholder="type ingredient and press add"
                control={control}
                onChange={onChange}

              />
              <Button style={{ marginHorizontal: 10, marginTop: 20, backgroundColor: '#1DE9B6' }} mode="contained" onPress={handleSubmit(onStep)}>
                Add
      </Button>
              {errors.ingShort && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}>{errors.ingShort.message}
              </Subheading>}
              <View style={{ flexDirection: "row", flexWrap: 'wrap' }}>



              </View>

              <Title style={{ marginHorizontal: 15, marginTop: 15, color: '#EEEEEE', alignSelf: "center", fontSize: 16 }}>Cuisine</Title>
              <TextInput style={styles.input} placeholder="Example: Mediterranean" onSubmitEditing={(value) => setSelectedCuisine(value.nativeEvent.text)}></TextInput>

              <Subheading style={{ marginHorizontal: 15, marginTop: 15, color: '#EEEEEE', alignSelf: "center", fontSize: 16 }}> Meal Type</Subheading>
              <TextInput style={styles.input} placeholder="Example: Dinner" onSubmitEditing={(value) => setSelectedMealType(value.nativeEvent.text)}></TextInput>

            </View>
          </View>

        </View>
      </KeyboardAwareScrollView >
    </SafeAreaView >
  );
}
export default SearchForm;
