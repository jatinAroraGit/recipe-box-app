import * as React from 'react';
import {useState} from 'react';
import { View, StyleSheet, Platform, Text, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Button, TextInput, Title, Subheading, Chip } from 'react-native-paper';
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
  },
  longInput: {
    backgroundColor: '#FFFFFF',
    //borderWidth: 0,
   // padding: 5,
    //borderRadius: 4,
  }
});

function EditRecipeForm({ nav }) {

  const navigation = nav;
  console.log(navigation);
  var recipeID = 'RandomID';
  var isPublished = false;
  var recipeName = '';
  var recipeDesc = '';
  var recipeIngredients = [];//my old
  var recipeSteps = [];
  const [chips, setChips] = useState([]);//jason
  const [ingredients, setIngredients] = useState([]);//jason
  const { control, handleSubmit, errors, setError } = useForm({ mode: 'onChange' });

  const onCreate = () =>{
    //create ID for new recipe
    //add ID to database
    //defaults: 'false' for isPublishe 
  }

//-------------------------------------------------------------
//------------- Jason's code for ingredients ------------------
//-------------------------------------------------------------
  
  const showChip = ingredients.map((c, i) => {

    return(

      <Chip onClose={() => removeChip(i)} key={i} style={{margin: 5, alignSelf: 'baseline'}}>{c.name.toString()}</Chip>

    );

  });

  const updateIngredient = (name, i) => {

    let temp = [...ingredients];
    let item = {...temp[i]};
    item.name = name;
    temp[i] = item;
    setIngredients(temp);
    addChip(name);

  }

  const addChip = (name, i) => {

    var good = true;
    for(var j in chips) {

      if(name == chips[j].name.name) {

        good = false;

      }

    }
    if(good) {
      i = chips.length;
      let temp = [...chips];
      let item = {...temp[i]};
      item.name = name;
      temp[i] = item;
      
      setChips(temp);
    }
    
  }
  

  const removeChip = (i) => {

    var temp = new Array;
    temp = chips;
    temp.splice(i,1);
    setChips(temp);
    updateAutoComplete("")

  }


//-------------------------------------------------------------
//------------- my old code for ingredients ------------------
//-------------------------------------------------------------

  const onIngredient = data => {
    if (data.ingredient.length > 1){
      recipeIngredients.concat(data.ingredient);
      data.ingredient = '';
    }
    else{
      setError("ingredient", 'shortingredient', "Ingredient text is too short.");
    }
  }





  const onStep = data => {
    if (data.step.length > 1){
      recipeSteps.concat(data.step);
      data.step = '';
    }
    else{
      setError("step", 'shortstep', "Step text is too short.");
    }
  }

  const onPublish = data => {

    console.log(data);

    if (data.recipeName.length > 1) {
      if (data.recipeDesc.length > 1) {
        if (data.recipeIngredients.length >= 1) {
          if (data.recipeSteps.length > 1) {
            //set isPublished to true TODO see if a different command should be used to change it
            data.isPublished = true;
            //onSubmit function sends data to database
            onSubmit(data);
          } else {
            setError("recipeSteps", 'descname', "Error Text");
          }
          
        } else {
          setError("recipeIngredients", 'descname', "Error Text");
        }

      } else {
        setError("recipeDesc", 'descname', "Error Text");
      }

    } else {
      setError("ErrorName", 'descname', "Error Text");
    }
  }

  const onSubmit = data => {

    console.log(data);

    if (true/* if data is valid enough to be stored*/) {

      //submit data to database

    } else {

          setError("ErrorName", 'descname', "Error Text");

    }

  }
  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    };
  };

  return (


    <View style={styles.container}>
      <Title style={{ color: '#1E88E5', fontSize: 30, marginTop: 20, alignSelf: 'center' }}>Create Recipe</Title>
      <Subheading style={styles.label}>Recipe Name</Subheading>
      <Controller
        as={<TextInput style={styles.input} />}
        name="recipeName"
        control={control}
        onChange={onChange}
      />
      {errors.recipeName && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}>Please enter a name.</Subheading>}

      <Subheading style={styles.label}>Short Description</Subheading>
      <Controller
        as={<TextInput style={styles.longInput} />}
        
        multiline={true}
        name="recipeDesc"
        control={control}
        onChange={onChange}
      />
      {errors.recipeDesc && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}> Please enter a description.</Subheading>}

      {/* TODO add image upload/linking here */}

      <Subheading style={styles.label}>Ingredient</Subheading>
      <Controller
        as={<TextInput style={styles.input} />}
        name="ingredient"
        control={control}
        onChange={onChange}
      />
      {errors.ingredient && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}>cannot add a blank ingredient.</Subheading>}

      <Button style={{ marginHorizontal: 10, marginTop: 20, backgroundColor: '#1DE9B6' }} mode="contained" onPress={handleSubmit(onIngredient)}>
        Add Ingredient
      </Button>

      <Subheading style={styles.label}>Step {recipeSteps.length + 1}:</Subheading>
      <Controller
        as={<TextInput style={styles.input} />}
        name="step"
        control={control}
        onChange={onChange}
      />
      {errors.step && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}>cannot add a blank step.</Subheading>}

      <Button style={{ marginHorizontal: 10, marginTop: 20, backgroundColor: '#1DE9B6' }} mode="contained" onPress={handleSubmit(onStep)}>
        Add step
      </Button>

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Button style={{ marginHorizontal: 10, marginTop: 20, backgroundColor: '#29D4FA' }} pre mode="contained" onPress={handleSubmit(onSubmit)}>
          Save Recipe
        </Button>
        <Button style={{ marginHorizontal: 10, marginTop: 20, backgroundColor: '#1DE9B6' }} mode="contained" onPress={handleSubmit(onPublish)}>
          Publish Recipe
        </Button>
      </View>
    </View>

  );
}
export default EditRecipeForm;
