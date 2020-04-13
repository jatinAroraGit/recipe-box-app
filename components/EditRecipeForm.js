import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Text, Dimensions, KeyboardAvoidingView, Picker, SafeAreaView, Image } from 'react-native';
import { Button, TextInput, Title, Subheading, Chip, List, Modal, Provider, Portal, Card, Checkbox, Switch, Dialog } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form'
import { TouchableHighlight, ScrollView } from 'react-native-gesture-handler';
import Firebase from '../configure/Firebase';
import { NavigationActions } from 'react-navigation'
import { PulseIndicator } from 'react-native-indicators';
import Axios from 'axios';
const apiKey = require('../configure/apiKey.json')
var baseURL = apiKey.baseURL;

const styles = StyleSheet.create({
  label: {
    color: '#FFFFFF',
    margin: 20,
    marginLeft: 0
  },
  image: {
    flex: 1,
    width: "auto",
    height: "auto",
    alignContent: "center",

  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignContent: "center",

  },
  modalStyle: {
    flex: 3,
    justifyContent: 'center',
    paddingTop: 3,
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    ...Platform.select({
      ios: {
        minWidth: (Dimensions.get('screen').width - 150),
        maxHeight: (Dimensions.get('screen').height - 250)
      },
      web: {
        //  width: (Dimensions.get('window').width - 50),
        //  height: (Dimensions.get('window').height - 50)
      },
      android: {
        // width: (Dimensions.get('screen').width - 50),
        // height: (Dimensions.get('screen').height - 50)
      },
    })

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
    padding: 3,
    backgroundColor: '#81D4FA',
    borderRadius: 10,
    height: 'auto',
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
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    height: 30,
    maxWidth: 310,
    padding: 5,
    borderRadius: 4,
  },
  disabledInput: {
    backgroundColor: '#E0E0E0',
    borderWidth: 0,
    height: 30,
    padding: 5,
    borderRadius: 4,
  },
  multilineInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    minHeight: 150,
    maxHeight: 150,
    width: 250,
    padding: 5,
    borderRadius: 4,
  },
  descInput: {
    backgroundColor: '#FFFFFF',
    minHeight: 150,
    maxHeight: 150,
    paddingBottom: 10,
    width: 300
    //borderWidth: 0,
    // padding: 5,
    //borderRadius: 4,
  },
  descInputDisabled: {
    backgroundColor: '#E0E0E0',
    height: 300,
    //borderWidth: 0,
    // padding: 5,
    //borderRadius: 4,
  },

  longInput: {
    backgroundColor: '#FFFFFF',
    height: 80,
    //borderWidth: 0,
    // padding: 5,
    //borderRadius: 4,
  },
  longInputDisabled: {
    backgroundColor: '#E0E0E0',
    height: 130,
    //borderWidth: 0,
    // padding: 5,
    //borderRadius: 4,
  }
});

var recipe = {};

function EditRecipeForm({ nav }) {
  var userID = Firebase.auth().currentUser.uid;
  var userRecipeUid = "";
  let mode = '';
  let recipePublished = false;
  mode = nav.getParam('mode');
  userRecipeUid = nav.getParam('uid');
  console.log("Mode , recipe uid", mode, userRecipeUid);
  if (Firebase.auth().currentUser) {
    userID = Firebase.auth().currentUser.uid;

  }


  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [defaultVar, setDefaultVar] = useState("aa");

  const [responseStr, setResponseTxt] = useState();
  const [editStep, setEditStep] = useState(false);
  const [newStep, setNewStep] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [ingredientLoading, setIngredientLoading] = useState(false);
  const [stepLoading, setStepLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  let [published, setPublished] = useState(false);
  let [publishedPressed, setPublishedPress] = useState(false);
  let [showSnack, setShowSnack] = useState(false);
  let [isChanged, setIsChanged] = useState(false);
  let [isPublishing, setIsPublishing] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [editingStep, setEditingStep] = useState(false);
  const [pubError, setPubError] = useState("");


  var recipeID = nav.state.params.ID;

  var isPublished = false;
  var isPublic = false;
  var isShared = false;
  let publishing = false;
  let updating = false;
  let unpublished = false;
  const { control, handleSubmit, clearError, errors, setError } = useForm({ mode: 'onChange', defaultValues: recipe });

  //--------------------------------------------------
  //------------- Database code ----------------------
  //--------------------------------------------------
  //
  //Commented out for now, however this will be how new recipes
  //are generated and data is read for editing existing recipes.
  //RecipeID will be passed in by navigation, giving the ID of
  //the recipe to edit or the text 'new' for creating recipe.

  /*
  
    //Database sees if recipe exists, creates a new one with author if it doesn't.  If it exists, returns data if UID is authorized.
    //If invalid UID or recipeID, return the flag 'allowedAccess' as 'false'.
    //returns ONLY res.isDeleted if database reads deleted flag for that ID.  if recipeID='new', generates random recipe ID for new recipe.
    axios.get("https://prj666.mystudentlab.ca:6759/rest-api/userRecipe/" + recipeID + "?UID=" + userID)
    .then(res => {
     if(res.allowedAccess == false){
      //TODO tell user they do not have permission to edit the recipe, do not show them editing page.
     }
     else if(res.isDeleted == true){
        //TODO tell user recipe is deleted, not able to edit that recipe.
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

  useEffect(() => {
    // Update the document title using the browser API
    if (mode == "create") {
      recipe.uid = "";
      recipe.recipeTitle = "New Recipe";
      recipe.recipeImage = "";
      recipe.author = "";
      recipe.isPublished = false;
      setPublished(recipe.isPublished);
      //  recipe.isPublic = false;
      recipe.author = "";
      recipe.summary = "";
      recipe.readyInMinutes = 0;
      recipe.servings = 0;
      recipe.cuisine = "";
      recipe.mealType = "";
      console.log('Creating');
      setLoading(false);
    }
    else if (mode == "edit") {
      getUserRecipe();
    }
  }, []);

  const getUserRecipe = async () => {
    if (mode == "edit") {
      let sendData = { "userId": userID, "uid": userRecipeUid }
      console.log('Calling API: ' + baseURL + 'recipes/getUserRecipeByUserId', sendData);
      Axios.post(baseURL + 'recipes/getUserRecipeByUserId', sendData, {
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',

        }
      }).then((response) => {
        // if(response.data.uid ||;
        // console.log(response);
        if (response.data) {
          recipe.uid = response.data.id;
          recipe.recipeTitle = response.data.title;
          recipe.recipeImage = response.data.image
          recipe.author = response.data.author;
          recipe.isPublished = response.data.isPublished;
          setPublished(recipe.isPublished);
          //  recipe.isPublic = false;
          recipe.author = response.data.author;
          recipe.summary = response.data.summary;
          recipe.readyInMinutes = response.data.readyInMinutes;
          recipe.servings = response.data.servings;
          recipe.cuisine = response.data.cuisine;
          recipe.mealType = response.data.mealType;
          if (response.data.instructions.length > 0) {
            var stepsDescription = []
            for (var s = 0; s < response.data.instructions.length; s++) {
              stepsDescription[s] = response.data.instructions[s].description;
            }
            //console.log(stepsDescription);
            setSteps(stepsDescription);
          }
          if (response.data.includedIngredients.length > 0) {
            setIngredients(response.data.includedIngredients);
            //  console.log(response.data.includedIngredients);
          }
          // console.log(response.data);
          if (response.data.isPublished) {
            setPublished(true);
          }
          else
            setPublished(false);

          setLoading(false);
          // useForm().reset();

        }
        else {
          setLoading(false);
          // setResponseTxt('OOPS! Something Went Wrong. Try Again Please!');
          setError("noUser", 'no user', "no account uses this email");
        }
      }).catch(error => {
        setLoading(false);
        setResponseTxt('Oops! Somethings went wrong. Try Again Please');
        console.log("Error" + error);
      });
    }

  };

  const showChip = ingredients.map((ingredient, i) => {
    //console.log("New Ingredient", ingredient);
    if (!published) {
      return (

        <Chip children={<Text style={{ flex: 1, flexWrap: "wrap" }}> {ingredient.name}: {ingredient.amount} {ingredient.unit}</Text>} textStyle={{ flexWrap: "wrap" }} onClose={() => removeIngredient(i)} key={i} style={{ margin: 5, alignSelf: 'flex-start', flexWrap: "wrap" }}>
        </Chip>

      );
    }
    else {
      return (
        <Chip children={<Text style={{ flexWrap: "wrap" }}> {ingredient.name}: {ingredient.amount} {ingredient.unit}</Text>} textStyle={{ flexWrap: "wrap" }} key={i} style={{ margin: 5, alignSelf: 'flex-start', flexWrap: "wrap" }}>
        </Chip>
      )
    }

  });
  const showUpdateModal = (i) => {
    setCurrentStep(i);
    //setShowModal(true);
    setEditingStep(true);
    setDialog(true);
  }

  const showSteps = steps.map((step, i) => {
    return (
      <View>

        <View style={{ marginBottom: 10, backgroundColor: '#dddddd', padding: 6, zIndex: 1000 }} key={i} >
          <Subheading style={{ color: "#222222" }} >Step {i + 1}:</Subheading>
          <Subheading style={{ flexWrap: "wrap" }}>{step}</Subheading>
          <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
            <Button style={{ backgroundColor: '#D50000', height: 32, margin: 8 }} mode="contained" onPress={() => removeStep(i)}>
              Remove
        </Button>
            <Button style={{ backgroundColor: '#1DE9B6', height: 32, marginTop: 3 }} mode="contained" onPress={() => showUpdateModal(i)}>
              Edit
        </Button>
          </View>
        </View>

      </View>

    );

  });

  const removeIngredient = (i) => {

    let temp = [...ingredients];
    temp.splice(i, 1);
    setIngredients(temp);
  }

  const onIngredient = data => {
    setIngredientLoading(true);
    let isValid = true;
    console.log("Adding new ingredient", data);
    data.ingredientName = data.ingredientName.trim();
    if (data.ingredientName == "" || !data.ingredientName) {
      isValid = false;
      setError("ingredientText", 'ingredient', "Must enter the ingredient to add.");
    }
    else if (data.ingredientName.length < 1) {
      isValid = false;
      setError("ingredientShort", 'shortingredient', "Ingredient text is too short.");
    } else {
      for (var i in ingredients) {
        if (data.ingredientName.toLowerCase() == ingredients[i].name.toLowerCase()) {
          isValid = false;
          setError("ingredientUsed", 'usedingredient', "Ingredient name missing.");
        }
      }
    }
    if (data.ingredientQuantity == "" || data.ingredientQuantity <= 0) {
      isValid = false;
      setError("ingredientQuantity", 'quantityingredient', " Quantity must be greater than 0.");
    }
    if (isValid == true) {
      let temp = { name: data.ingredientName, amount: data.ingredientQuantity, unit: data.ingredientUnit };
      let tempArray = [...ingredients];
      tempArray[ingredients.length] = temp;
      setIngredients(tempArray);

      clearIngredientText();
    }
    setIngredientLoading(false);
  }

  const clearIngredientText = () => {
    setDefaultVar("aa");
  }

  const onStep = data => {
    setStepLoading(true);
    data.step = data.step.trim();
    if (data.step.length > 2) {
      let tempArray = [...steps];
      tempArray[steps.length] = data.step;
      setSteps(tempArray);
      //TODO clear step text
    } else {
      setError("stepShort", 'shortstep', "Step text is too short.");
    }
    setStepLoading(false);
  }

  const removeStep = (i) => {
    let temp = [...steps];
    temp.splice(i, 1);
    setSteps(temp);
  }

  const updateStep = (i) => {
    let temp = [...steps];

    temp[i] = newStep;
    setSteps(temp);
    // setShowModal(false);
    setEditingStep(false);
  };

  const onUnPublish = data => {
    unpublished = true;
    onSubmit(data);

  }

  const onPublish = data => {

    let isValid = true;
    console.log(data);
    if (data.recipeName) {
      if (data.recipeName.length < 2) {
        isValid = false;
        setError("recipeName", 'descname', "Publishing Error: You need to have a longer recipe name");
      }
    }

    else if (!data.recipeName || data.recipeName.trim() == "") {
      isValid = false;
      setError("recipeName", 'descname', "Publishing Error: You need to have a proper recipe name");
    }
    data.recipeDesc = data.recipeDesc.trim();
    if (!data.recipeDesc) {
      isValid = false;
      setError("recipeDesc", 'descname', "Publishing Error: You need to have description");
    }
    if (ingredients.length < 1) {
      isValid = false;
      setError("recipeIngredients", 'descname', "Publishing Error: You need to have atleast one ingredient");
    }
    if (steps.length < 1) {
      isValid = false;
      setError("step", 'descname', "Publishing Error: You need to have atleast one step");
    }
    if (data.readyInMinutes <= 0 || !(data.readyInMinutes)) {
      isValid = false;
      setError("readyInMinutes", 'descname', "Publishing Error: You need to provide time (more than 0) to ready the dish");
    }
    if (data.servings <= 0 || !(data.servings)) {
      isValid = false;
      setError("servings", 'descname', "Publishing Error: You need to provide number of servings to be more than 0");
    }
    if (!isValid) {
      setPubError("Oops! Looks Like You have not filled all the fields to publish recipe yet.");
    }
    if (isValid) {
      data.isPublished = true;
      setPublished(true);
      setPublishedPress(true);
      setIsChanged(true);
      setIsPublishing(true);
      publishing = true;
      updating = true;
      console.log("Published .... ", published);
      setPubError("");
      onSubmit(data);
    }
  }


  const onSubmit = data => {
    updating = true;

    setButtonLoading(true);
    console.log('DATA FORM ----- ');
    console.log(data);
    recipe.sourceName = data.recipeAuthor;
    console.log("Published ==== ", data.isPublished);
    if (data.isPublished) {
      recipe.isPublished = data.isPublished;

    }
    else {
      recipe.isPublished = false;

      setIsChanged(true);
    }
    if (data.recipeAuthor) {
      console.log('Trimmed auth')
      recipe.author = data.recipeAuthor.trim();
    }
    else if (data.recipeAuthor == "") {
      recipe.author = data.recipeAuthor.trim();
    }
    if (data.recipeName) {
      data.recipeName = data.recipeName.trim();
      if (data.recipeName == "") {
        data.recipeName = "New Recipe"
      }
    } else if (!data.recipeName) {
      data.recipeName = "New Recipe"
    }
    if (data.image) {
      data.image = data.image.trim();
      if (data.image == "") {
        data.image = null;
      }
    } else if (!data.image) {
      data.image = null;
    }

    if (data.cuisine) {
      data.cuisine = data.cuisine.trim();
      if (data.cuisine == "") {
        data.cuisine = null;
      }
    } else if (!data.cuisine) {
      data.cuisine = null;
    }

    if (data.mealType) {
      data.mealType = data.mealType.trim();
      if (data.mealType == "") {
        data.mealType = null;
      }
    } else if (!data.mealType) {
      data.mealType = null;
    }


    recipe.recipeTitle = data.recipeName;
    recipe.userId = userID;
    recipe.summary = data.recipeDesc;
    recipe.ingredients = ingredients;
    recipe.steps = steps;
    recipe.recipeImage = data.image;
    recipe.readyInMinutes = data.readyInMinutes;
    recipe.cuisine = data.cuisine;
    recipe.mealType = data.mealType;
    recipe.servings = data.servings;
    recipe.creationDate = new Date();
    console.log("Recipe successfully saved.");
    console.log("here's the recipe:" + JSON.stringify(recipe));

    if (mode == "create") {
      Axios.post(baseURL + 'recipes/createRecipe', recipe, {
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',

        }
      }).then((response) => {
        // if(response.data.uid ||;
        console.log(response);
        if (response.status == 200) {

          setButtonLoading(false);
          if (!publishedPressed)
            setResponseTxt("Saved Your Recipe!");
          // useForm().reset();


        }
        else {
          setLoading(false);
          setResponseTxt('OOPS! Something Went Wrong. Try Again Please!');
          setError("noUser", 'no user', "no account uses this email");
          setButtonLoading(false);
        }
      }).catch(error => {
        setLoading(false);
        console.log("Error" + error);
        setResponseTxt('Oops! Somethings went wrong. Try Again Please');

        setButtonLoading(false);
      });

    } else if (mode == "edit") {
      setLoading(true);
      console.log("Updating Recipe calling api");
      Axios.post(baseURL + 'recipes/updateRecipe', recipe, {
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',

        }
      }).then((response) => {
        // if(response.data.uid ||;
        console.log(response);
        if (response.status == 200) {

          setLoading(false);
          if (publishing && updating) {
            setResponseTxt("Updated and Published Your Recipe!");
            setButtonLoading(false);
            //setIsPublishing(false);
            publishing = false;
            updating = false;
          }
          else
            if (!publishing && updating) {
              if (unpublished) {
                //  setResponseTxt("Unpublished Your Recipe!");
                setPublished(false);
                setButtonLoading(false);
                setIsPublishing(false);
                updating = false;
                publishing = false;
              }
              else if (updating) {
                setResponseTxt("Updated Your Recipe!");
                setButtonLoading(false);
                setIsPublishing(false);
                updating = false;
                publishing = false;
              }
            }

          // useForm().reset();

        }
        else {
          setLoading(false);
          setResponseTxt('OOPS! Something Went Wrong. Try Again Please!');
          setError("noUser", 'no user', "no account uses this email");
          setButtonLoading(false);
        }
      }).catch(error => {
        setLoading(false);
        console.log("Error" + error);
        setResponseTxt('Oops! Somethings went wrong. Try Again Please');

        setButtonLoading(false);
      });
    }

  }
  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    };
  };

  const togglePublished = async () => {
    console.log('Toggle Publish');
    setPublished(false);

    handleSubmit(onSubmit)
  };
  if (loading) {
    return (
      <SafeAreaView style={{ flex: 3 }}>


        <PulseIndicator style={{ position: "relative" }} animating={true} size={180} color='#0D47A1' />

      </SafeAreaView>
    )
  }
  else if (responseStr) {
    return (

      <SafeAreaView>
        <Title style={{ color: "#FFFFFF", fontWeight: "600", fontSize: 24, margin: 10 }}>{responseStr}</Title>
        <Button style={{ margin: 10 }} mode="contained" onPress={() => nav.goBack()} >Go To Your Recipes ></Button>
      </SafeAreaView>
    );
  }
  else if (editingStep) {
    return (
      <SafeAreaView>
        <View>
          <Card.Content>
            <Title>Updating Step</Title>
            <View style={{ minHeight: 150 }}>
              <TextInput multiline={true} scrollEnabled={true} defaultValue={steps[currentStep]} editable={true} style={styles.multilineInput} onChangeText={text => setNewStep(text)} />

            </View>
            <Button style={{ backgroundColor: '#00BFA5', margin: 10 }} color='#FF00FF' mode="contained" onPress={() => updateStep(currentStep)}>Update </Button>
            <Button style={{ backgroundColor: '#C62828', margin: 10 }} color='#FF00FF' mode="contained" onPress={() => setEditingStep(false)}>Cancel </Button>

          </Card.Content>
        </View>
      </SafeAreaView>
    )
  }
  else {
    return (

      <KeyboardAvoidingView>
        <View style={styles.container}>
          {mode == "create" ?
            <Title style={{ color: '#1E88E5', fontSize: 30, marginTop: 20, alignSelf: 'center' }}>Create Recipe</Title> :
            <Title style={{ color: '#1E88E5', fontSize: 30, marginTop: 20, alignSelf: 'center' }}>Edit Recipe</Title>

          }
          {(published) ? <Text style={{ textAlign: "center" }}>To Edit this recipe please Unpublish it first.</Text> : <Text></Text>}
          <Subheading style={styles.label}>Recipe Name</Subheading>
          <Controller
            as={<TextInput disabled={published} style={(published) ? styles.disabledInput : styles.input} />}
            name="recipeName"
            defaultValue={recipe.recipeTitle}

            control={control}
            onChange={onChange}

          />
          {errors.recipeName && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}>{errors.recipeName.message}</Subheading>}

          <Subheading style={styles.label}>Recipe Author</Subheading>
          <Controller
            as={<TextInput disabled={published} style={(published) ? styles.disabledInput : styles.input} />}
            name="recipeAuthor"
            defaultValue={recipe.author}

            control={control}
            onChange={onChange}

          />

          <Subheading style={styles.label}>Short Description</Subheading>

          <Controller
            as={

              <TextInput multiline={true} scrollEnabled={true} disabled={published} style={(published) ? styles.descInputDisabled : styles.descInput} />}

            name="recipeDesc"
            defaultValue={recipe.summary}

            control={control}
            onChange={onChange}
          />

          {errors.recipeDesc && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}>
            {errors.recipeDesc.message}</ Subheading>}



          <Subheading style={styles.label}>Recipe Image URL</Subheading>
          <Controller
            as={<TextInput disabled={published} style={(published) ? styles.longInputDisabled : styles.longInput} />}

            multiline={true}
            name="image"
            defaultValue={recipe.recipeImage}
            control={control}
            onChange={onChange}
          />

          <Title style={{ justifyContent: "center", alignSelf: "center" }}>Recipe Ingredients</Title>

          <View style={{ flexDirection: "column", flexWrap: 'wrap' }}>
            {showChip}
          </View>
          <Subheading style={styles.label}>Ingredient Name</Subheading>
          <Controller
            as={<TextInput maxLength={22} defaultValue={defaultVar} disabled={published} style={(published) ? styles.disabledInput : styles.input} value={defaultVar} clearTextOnFocus={true} />}
            name="ingredientName"
            id="ingredientName"
            defaultValue=""

            control={control}
            onChange={onChange}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }} >
            <View style={{ flexDirection: 'column', justifyContent: 'center', marginHorizontal: 5, marginBottom: 10 }} >

              <Text style={{ justifyContent: 'center', color: '#FFFFFF' }}>Quantity</Text>
              <Controller
                as={<TextInput disabled={published} style={(published) ? styles.disabledInput : styles.input} clearTextOnFocus={true} defaultValue={""} />}
                name="ingredientQuantity"
                id="ingredientQuantity"
                defaultValue="0"
                keyboardType="numeric"
                control={control}
                onChange={onChange}

                maxLength={4}
                min="0" />

            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'center', marginHorizontal: 5, marginBottom: 10 }} >
              <Text style={{ justifyContent: 'center', color: '#FFFFFF' }}>Unit (optional)</Text>
              <Controller
                as={<TextInput maxLength={6} clearTextOnFocus={true} disabled={published} style={(published) ? styles.disabledInput : styles.input} />}
                name="ingredientUnit"
                id="ingredientUnit"
                defaultValue=""
                autoCapitalize="none"
                control={control}
                onChange={onChange}
                maxLength={8} />
            </View>

          </View>
          {errors.ingredientQuantity && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}>Quantity must be more than 0.</Subheading>}
          {errors.ingredientText && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}>Enter the ingredient in the above field.</Subheading>}
          {errors.ingredientShort && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}>Ingredient is too short.</Subheading>}
          {errors.ingredientUsed && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}>Ingredient name is Invalid</Subheading>}
          {errors.recipeIngredients && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}>{errors.recipeIngredients.message}
          </Subheading>}


          <Button disabled={published} loading={ingredientLoading} style={{ marginHorizontal: 10, marginTop: 12, backgroundColor: (!published) ? '#1DE9B6' : "#E0E0E0" }} mode="contained" onPress={handleSubmit(onIngredient)}>
            Add Ingredient

          </Button>

          <Title style={{ justifyContent: "center", alignSelf: "center" }}>Recipe Instructions</Title>



          {showSteps}
          <Subheading style={styles.label}>Step Description</Subheading>
          <Controller
            as={<TextInput clearTextOnFocus={true} placeholder="add a new step" disabled={published} style={(published) ? styles.longInputDisabled : styles.longInput} />}

            multiline={true}
            name="step"
            defaultValue=""
            placeholder="add a new step"
            control={control}
            onChange={onChange}

          />
          <Button disabled={published} loading={stepLoading} style={{ marginHorizontal: 10, marginTop: 20, backgroundColor: (!published) ? '#1DE9B6' : "#E0E0E0" }} mode="contained" onPress={handleSubmit(onStep)}>
            Add step
      </Button>

          {errors.step && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}>{errors.step.message}
          </Subheading>}
          {errors.stepShort && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}>Step text must be longer.</Subheading>}
          <Title style={{ justifyContent: "center", alignSelf: "center" }}>Recipe Info</Title>

          <Subheading style={styles.label}>Ready In Minutes</Subheading>
          <Controller
            as={<TextInput maxLength={4} defaultValue={String(recipe.readyInMinutes)}
              disabled={published} style={(published) ? styles.disabledInput : styles.input} />}
            name="readyInMinutes"
            defaultValue={String(recipe.readyInMinutes)}
            keyboardType="numeric"
            min={1}
            control={control}
            onChange={onChange}

          />
          {errors.readyInMinutes && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}>{errors.readyInMinutes.message}
          </Subheading>}

          <Subheading style={styles.label}>Servings</Subheading>
          <Controller
            as={<TextInput defaultValue={String(recipe.servings)} maxLength={5} keyboardType={"number-pad"} disabled={published} style={(published) ? styles.disabledInput : styles.input} />}
            name="servings"
            min={1}
            defaultValue={recipe.servings}
            keyboardType="numeric"
            control={control}
            onChange={onChange}

          />
          {errors.servings && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}>{errors.servings.message}
          </Subheading>}
          <Subheading style={styles.label}>Cuisine</Subheading>
          <Controller
            as={<TextInput maxLength={30} disabled={published} style={(published) ? styles.disabledInput : styles.input} />}
            name="cuisine"
            defaultValue={recipe.cuisine}

            control={control}
            onChange={onChange}
          />
          <Subheading style={styles.label}>Meal Type</Subheading>
          <Controller
            as={<TextInput maxLength={25} disabled={published} style={(published) ? styles.disabledInput : styles.input} />}
            name="mealType"
            defaultValue={recipe.mealType}
            control={control}
            onChange={onChange}
          />

          <View style={{ flexDirection: 'column', justifyContent: 'center' }}>

            {(mode == "create") ? <Button loading={buttonLoading} style={{ marginHorizontal: 10, marginTop: 20, backgroundColor: '#29D4FA' }} pre mode="contained" onPress={handleSubmit(onSubmit)}>
              Save Recipe
        </Button> : (!published) ? <Button loading={buttonLoading} style={{ marginHorizontal: 10, marginTop: 20, backgroundColor: '#29D4FA' }} pre mode="contained" onPress={handleSubmit(onSubmit)}>
                Update Recipe
        </Button> : <Text></Text>}

            {published ? <Button loading={buttonLoading} style={{ marginHorizontal: 10, marginTop: 20, backgroundColor: '#1DE9B6' }} mode="contained" onPress={handleSubmit(onUnPublish)}>
              UnPublish Recipe*
        </Button>
              :
              <View>
                <Button loading={buttonLoading} style={{ marginHorizontal: 10, marginTop: 20, backgroundColor: '#1DE9B6' }} mode="contained" onPress={handleSubmit(onPublish)}>
                  Publish Recipe*
        </Button>
                <Text style={{ margin: 10, color: "#D50000" }}>{pubError}</Text>
              </View>
            }
            {published ? <Text style={{ marginHorizontal: 10, marginTop: 5 }} mode="contained" >
              * Unpublishing will make the recipe unavailable to other users.
        </Text>
              : <Text style={{ marginHorizontal: 10, marginTop: 5 }} mode="contained" >
                * Publishing will make the recipe available to other users.
        </Text>
            }

          </View>
        </View>
        <Provider>
          <Portal>
            <Modal dismissable={false} visible={showModal} contentContainerStyle={styles.modalStyle}>
              <View>
                <Card.Content>
                  <Title>Updating Step</Title>
                  <View style={{ minHeight: 100 }}>
                    <TextInput multiline={true} scrollEnabled={true} defaultValue={steps[currentStep]} editable={true} style={styles.multilineInput} onChangeText={text => setNewStep(text)} />

                  </View>
                  <Button style={{ backgroundColor: '#00BFA5', margin: 10 }} color='#FF00FF' mode="contained" onPress={() => updateStep(currentStep)}>Update </Button>
                  <Button style={{ backgroundColor: '#C62828', margin: 10 }} color='#FF00FF' mode="contained" onPress={() => setShowModal(false)}>Cancel </Button>

                </Card.Content>
              </View>
            </Modal>

          </Portal>
        </Provider>

      </KeyboardAvoidingView>

    );
  }
}
export default EditRecipeForm;
