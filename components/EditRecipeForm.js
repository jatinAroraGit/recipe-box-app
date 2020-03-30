import * as React from 'react';
import {useState} from 'react';
import { View, StyleSheet, Platform, Text, Dimensions, KeyboardAvoidingView, Picker } from 'react-native';
import { Button, TextInput, Title, Subheading, Chip, List } from 'react-native-paper';
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

var recipe = {};

function EditRecipeForm({ nav }) {

  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [ingredientUnit, setIngredientUnit] = useState("cup");
  var recipeID = 'new';
  var author = "UIDGoesHere"
  var isPublished = false;
  var isPublic = false;
  var isShared = false;
  const { control, handleSubmit, errors, setError } = useForm({ mode: 'onChange' });

//--------------------------------------------------
//------------- Database code ----------------------
//--------------------------------------------------
//
//Commented out for now, however this will be how new recipes
//are generated and data is read for editing existing recipes.
//RecipeID will be passed in by navigation, giving the ID of
//the recipe to edit or the text 'new' for creating recipe.

/*

  //TODO get UID at this point
  var UID = "1234";

  //Database sees if recipe exists, creates a new one with author if it doesn't.  If it exists, returns if UID is authorized.
  //returns ONLY res.isDeleted if database reads deleted flag for that ID.  if recipeID='new', generates random recipe ID for new recipe.
  axios.get("https://prj666.mystudentlab.ca:6759/rest-api/userRecipe/" + recipeID + "?UID=" + UID)
  .then(res => {
   if(res.isDeleted == true){
      //TODO tell user recipe is deleted, not able to edit or make recipe with that ID.
    }else{//safe to load all data for editing
      setIngredients(res.ingredients);
      setSteps(res.steps);
      isPublished = res.isPublished;
      isPublic = res.isPublic;
      isShared = res.isShared;
      recipeID = res.ID;
    }
  });

*/


  const showChip = ingredients.map((ingredient, i) => {

    return(
  
      <Chip onClose={() => removeIngredient(i)} key={i} style={{margin: 5, alignSelf: 'baseline'}}>
        {ingredient.name.toString()}: {ingredient.quantity.toString()} {ingredient.unit.toString()}</Chip>
  
    );
  
  });
  
  const showSteps = steps.map((step, i) => {
    console.log("Step "+(i+1).toString()+":");
    return(
      <List.Item
        style={{marginBottom: 10, backgroundColor: '#dddddd' }}
        title={"Step "+(i+1).toString()+":"}
        description={step.toString()}
        right={props => <Button style={{ backgroundColor: '#1DE9B6' }} mode="contained" onPress={() => removeStep(i)}>
          Remove
        </Button>}
      />
    );
  
  });

  const removeIngredient = (i) => {

    let temp = [...ingredients];
     temp.splice(i,1);
     setIngredients(temp);
   }
   
  const onIngredient = data => {
    if (data.ingredientName.length > 1){
      var isAlreadyUsed = false;
      for(var i in ingredients) {
    
        if(data.ingredientName == ingredients[i].name) {
    
          isAlreadyUsed = true;
    
        }
    
      }
      if(!isAlreadyUsed) {
        let temp = {name: data.ingredientName, quantity: data.ingredientQuantity.toString(), unit: ingredientUnit};
        let tempArray = [...ingredients];
        tempArray[ingredients.length] = temp;
        setIngredients(tempArray);
        clearIngredientText();
      }
    }
    else{
      setError("ingredient", 'shortingredient', "Ingredient text is too short.");
    }
  }

  const clearIngredientText = () =>{
    //TODO set the 3 inptus for ingredient to default
  }

  const onStep = data => {
      let tempArray = [...steps];
      tempArray[steps.length] = data.step;
      setSteps(tempArray);
      //TODO clear step text
  }

  const removeStep = (i) => {
    let temp = [...steps];
     temp.splice(i,1);
     setSteps(temp);
   }

  const onPublish = data => {

    console.log(data);
    let isValid = true;

    if (data.recipeName.length < 2) {
      isValid = false;
      setError("recipeName", 'descname', "Error Text");
    }
    if (data.recipeDesc.length < 10) {
      isValid = false;
      setError("recipeDesc", 'descname', "Error Text");
    }
    if (ingredients.length < 1) {
      isValid = false;
      setError("recipeIngredients", 'descname', "Error Text");
    }
    if (steps.length < 1) {
      isValid = false;
      setError("step", 'descname', "Error Text");
    }
    if (isValid){
      isPublished = true;
      onSubmit(data);
    }
  }

  const onSubmit = data => {
    recipe.ID = recipeID;
    recipe.author = author;
    recipe.isPublished = isPublished;
    recipe.isShared = isShared;
    recipe.isPublic = isPublic;
    recipe.name = data.recipeName;
    recipe.description = data.recipeDesc;
    recipe.ingredients = ingredients;
    recipe.steps = steps;
    console.log("here's the recipe:" + JSON.stringify(recipe));

    if (true/* if data is valid enough to be stored*/) {

      //TODO submit data to database


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
        defaultValue="New Recipe"
        control={control}
        onChange={onChange}
      />
      {errors.recipeName && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}>Please enter a name.</Subheading>}

      <Subheading style={styles.label}>Short Description</Subheading>
      <Controller
        as={<TextInput style={styles.longInput} />}
        
        multiline={true}
        name="recipeDesc"
        defaultValue="Enter a description..."
        control={control}
        onChange={onChange}
      />
      {errors.recipeDesc && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}> Please provide a longer description.</Subheading>}

      {/* TODO add image upload/linking here */}

      <Subheading style={styles.label}>Ingredients</Subheading>
      <View style={{flexDirection: "row", flexWrap: 'wrap'}}>
        {showChip}
      </View>  
      <Controller
        as={<TextInput style={styles.input} />}
        name="ingredientName"
        id="ingredientName"
        control={control}
        onChange={onChange}
      />
      {errors.ingredient && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}>cannot add a blank ingredient.</Subheading>}
      
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}/*TODO fix the inputs in this view*/ >
      <Controller
      as={<input type='number'/>}
      name="ingredientQuantity"
      id="ingredientQuantity"
      defaultValue="1" 
      control={control}
      min="1" />
      <Picker style={{backgroundColor: "#4DB6AC", borderRadius: 5, borderColor: "#CCCCCC"}} selectedValue={ingredientUnit} onValueChange={(value) => {setIngredientUnit(value)}} >
        <Picker.Item Key='cup' label='cup' value='cup'/>
        <Picker.Item Key='mililitre' label='mililitre' value='mililitre'/>
        <Picker.Item Key='piece' label='piece' value='piece'/>

      </Picker>
      </View>  


      <Button style={{ marginHorizontal: 10, marginVertical: 20, backgroundColor: '#1DE9B6' }} mode="contained" onPress={handleSubmit(onIngredient)}>
        Add Ingredient
      </Button>

      {errors.recipeIngredients && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}>Must have at least 1 ingredient.</Subheading>}


      {showSteps}

      <Controller
        as={<TextInput style={styles.longInput} />}
        
        multiline={true}
        name="step"
        control={control}
        onChange={onChange}
      />
      <Button style={{ marginHorizontal: 10, marginTop: 20, backgroundColor: '#1DE9B6' }} mode="contained" onPress={handleSubmit(onStep)}>
        Add step
      </Button>
      
      {errors.step && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}>Must have at least 1 step.</Subheading>}


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
