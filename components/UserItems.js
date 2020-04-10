import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Platform, Text, Dimensions, ScrollView, SafeAreaView, ImageBackground, Image, TextInput, KeyboardAvoidingView } from 'react-native';
import '../configure/apiKey.json';
import { Title, Headline, Card, Button, Modal,Portal,Provider,Subheading } from 'react-native-paper';
import Firebase from 'firebase';
import { PulseIndicator } from 'react-native-indicators';
import { useForm, Controller } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


var apiKey = require('../configure/apiKey.json');
import axios from 'axios';

const styles = StyleSheet.create({
  buttonOuterLayout: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLayout: {
    marginBottom: 10
  },
  input: {
    backgroundColor: '#E1BEE7',

    borderWidth: 0,
    height: 40,
    padding: 6,
    borderRadius: 4,
    marginBottom: 14
  },
  longInput: {
    backgroundColor: '#E1BEE7',

    borderWidth: 0,
    height: 80,
    padding: 6,
    borderRadius: 4,
    marginBottom: 14
  },
  modalStyle: {
    zIndex: 1500,
    position: "absolute",
    flex: 3,
    justifyContent: 'center',
    alignContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    padding: 8,
    backgroundColor: '#FFFFFF',

    ...Platform.select({
      ios: {

        width: '100%',
        height: '80%'
      },
      web: {
        //  width: (Dimensions.get('window').width - 50),
        //  height: (Dimensions.get('window').height - 50)
      },
      android: {
        width: '100%',
        height: '80%'
      },
    })
  }
});
const customStyles = StyleSheet.create({
  defaultRounded: {
    margin: 6,
    marginTop: 12,
    borderWidth: 0,
    borderRadius: 10,
    padding: 8,
    height: 'auto',
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    backgroundColor: '#4FC3F7'
  },
  customStyle: {
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#81D4FA',
    margin: 18,
    height: 'auto',
    ...Platform.select({
      ios: {
        width: 400
      },
      android: {
        width: 400
      },
      web: {
        width: ((Dimensions.get('window').width) < 500) ? ((Dimensions.get('window').width) - 50) : 600,


      }
    }),
  },

  nestedCardStyle: {
    padding: 0,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    margin: 5,
    flexWrap: 'wrap',
    alignItems: "flex-start",
    height: 'auto',
    ...Platform.select({
      ios: {
        width: 270
      },
      android: {
        width: 270
      },
      web: {
        width: ((Dimensions.get('window').width) < 500) ? ((Dimensions.get('window').width) - 70) : 550,


      }

    }),
  },
  customListItemsStyle: {
    padding: 0,
    borderRadius: 10,
    backgroundColor: '#FCE4EC',
    margin: 5,
    flexWrap: 'wrap',
    alignItems: "flex-start",
    height: 'auto',
    ...Platform.select({
      ios: {
        width: 270
      },
      android: {
        width: 270
      },
      web: {
        width: ((Dimensions.get('window').width) < 500) ? ((Dimensions.get('window').width) - 70) : 550,


      }

    }),
  },
  viewBoxStyle: {
    marginTop: 10,
    backgroundColor: '#81D4FA',
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 0,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    height: 'auto',
    ...Platform.select({
      ios: {
        width: 300
      },
      android: {
        width: 300
      },
      web: {
        width: ((Dimensions.get('window').width) < 500) ? ((Dimensions.get('window').width) - 50) : 600,


      }
    }),
  }
});

const viewChildrenStyle = StyleSheet.create({
  sameRow: {
    margin: 12,
    flexDirection: "row",
    justifyContent: "center"
    , alignItems: "center",
    alignSelf: "center"
  },

  sameColumn: {
    margin: 12,
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center"
  }
});


function UserItems({ props }) {

  var recipes = [];
  recipes = props.state.params.recipes;
  const { control, handleSubmit, errors, setError, reset } = useForm({ mode: 'onChange' });
  const [userRecipes, setUserRecipes] = useState([]); //useState is initial state to manage items being updated.
  const [userCookbooks, setUserCookbooks] = useState([]);
  const [cookbookRecipes, setCookbookRecipes] = useState([]);
  const [activeCookbook, setActiveCookbook] = useState({});
 // Different Screens and Status States 
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCookbooks, setEditingCookbook] = useState(false);

  
  let [responseStr, setResponseTxt] = useState();

  let userId = Firebase.auth().currentUser.uid;

  useEffect(() => {
    var baseURL = apiKey.baseURL;
    let userId = Firebase.auth().currentUser.uid;


    let sendData = {
      userId: userId
    }

    axios.post(baseURL + 'recipes/allUserRecipes', sendData, {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: false,
    },
    ).then((response) => {
      // console.log(response);
      if (response.data) {
        //  console.log(response.data);
        const items = response.data;
        //   console.log(items);
        setUserRecipes(items);
        // setItemCount(items.length);
        setLoading(false);

      }
      else {
        setResponseTxt("Oops!, Something Went Wrong, Try Again Please.");
        setError("noUser", 'no user', "no account uses this email");
      }
    }).catch(error => {
      console.log("AXIOS CAUGHT ERROR ::::::::::::::::::::");
      setResponseTxt("Oops!, Something Went Wrong, Try Again Please.");
      setLoading(false);
      console.log(error);
    });
// Getting Cookbooks
    setLoading(true);
    axios.post(baseURL + 'cookbooks/allCookbooksByUserId', sendData, {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: false,
    },
    ).then((response) => {
      // console.log(response);
      if (response.data) {
        //  console.log(response.data);
        const items = response.data;
        //   console.log(items);
        setUserCookbooks(items);
        // setItemCount(items.length);
        setLoading(false);

      }
      else {
        setResponseTxt("Oops!, Something Went Wrong, Try Again Please.");
        setError("noUser", 'no user', "no account uses this email");
      }
    }).catch(error => {
      console.log("AXIOS CAUGHT ERROR ::::::::::::::::::::");
      setResponseTxt("Oops!, Something Went Wrong, Try Again Please.");
      setLoading(false);
      console.log(error);
    });




  },[]);

 
  const editCookbook = async (cookbook) => {
    setBtnLoading(true);
    var baseURL = apiKey.baseURL;
    let userId = Firebase.auth().currentUser.uid;

    let sendData={
    cookbookId: cookbook.cookbookId
    }   
    setActiveCookbook(cookbook)
    axios.post(baseURL + 'cookbooks/cookbookDetail', sendData, {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: false,
    },
    ).then((response) => {
      // console.log(response);
      if (response.data) {
        //  console.log(response.data);
        const items = response.data;
        console.log('COOKBOOK RECIPES ', response.data.cookbookRecipes);
      if (response.data.cookbookRecipes)
        setCookbookRecipes(response.data.cookbookRecipes);
        
        //   console.log(items);
       // setUserRecipes(items);
        setLoading(false);
       // setShowEditModal(true);
        setBtnLoading(false);
      setEditingCookbook(true);

      }
      else {
        setResponseTxt("Oops!, Something Went Wrong, Try Again Please.");
        setError("noUser", 'no user', "no account uses this email");
        setLoading(false);
      }
    }).catch(error => {
      console.log("AXIOS CAUGHT ERROR ::::::::::::::::::::");
      setResponseTxt("Oops!, Something Went Wrong, Try Again Please.");
      setLoading(false);
      console.log(error);
    });

  };
  

 const deleteRecipeFromCookbook= async(recipe, i)=>{
   var baseURL = apiKey.baseURL;
   let userId = Firebase.auth().currentUser.uid;

   console.log("recipe To Delete " + i);
   console.log(recipe);
   let userRecipesList = userRecipes;

 
   let sendData = {
     cookbookId: activeCookbook.cookbookId,
     userId: userId,
     recipeId: recipe.id
   }
   console.log('Deleting: ' + baseURL + 'cookbooks/deleteCookbookRecipe', sendData);
   //setRefresh(!refresh);

   axios.post(baseURL + 'cookbooks/deleteCookbookRecipe', sendData, {
     headers: {
       'content-type': 'application/json',
       'Access-Control-Allow-Origin': '*',
     },
     withCredentials: false,
   },
   ).then((response) => {
     console.log(response);
     if (response.data == 'Success') {
       console.log(response.data);
       let cookbookRecipesList = cookbookRecipes;
       cookbookRecipesList.splice(i, 1)
       setCookbookRecipes(cookbookRecipesList);
       setRefresh(!refresh);
       // setItemCount(items.length);
       setLoading(false);
     }
     else {
       //  setResponseTxt("Oops!, Something Went Wrong, Try Again Please.");
       // setError("noUser", 'no user', "no account uses this email");
     }
   }).catch(error => {
     console.log("AXIOS CAUGHT ERROR ::::::::::::::::::::");
     //setResponseTxt("Oops!, Something Went Wrong, Try Again Please.");
     setLoading(false);
     console.log(error);
   });

  }

  const deleteUserRecipe = async (recipe, i) => {
    var baseURL = apiKey.baseURL;
    let userId = Firebase.auth().currentUser.uid;

    console.log("recipe To Delete " + i);
    console.log(recipe);
    let userRecipesList = userRecipes;


    let sendData = {
      uid: recipe.uid,
      userId: userId,
    }
    console.log('Deleting: ' + baseURL + 'recipes/deleteRecipe', sendData);
    //setRefresh(!refresh);

    axios.post(baseURL + 'recipes/deleteRecipe', sendData, {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: false,
    },
    ).then((response) => {
      console.log(response);
      if (response.data == 'Success') {
        console.log(response.data);
        let userRecipesList = userRecipes;
        userRecipesList.splice(i, 1)
        setUserRecipes(userRecipesList);
        setRefresh(!refresh);
        // setItemCount(items.length);
        setLoading(false);
      }
      else {
        //  setResponseTxt("Oops!, Something Went Wrong, Try Again Please.");
        // setError("noUser", 'no user', "no account uses this email");
      }
    }).catch(error => {
      console.log("AXIOS CAUGHT ERROR ::::::::::::::::::::");
      //setResponseTxt("Oops!, Something Went Wrong, Try Again Please.");
      setLoading(false);
      console.log(error);
    });

  }

  
  const deleteCookbook = async (cookbook, i) => {
    var baseURL = apiKey.baseURL;
    let userId = Firebase.auth().currentUser.uid;

    let sendData = {
      cookbookId: cookbook.cookbookId,
      userId: userId,
    }
    console.log('Deleting: ' + baseURL + 'cookbooks/deleteCookbook', sendData);
    //setRefresh(!refresh);

    axios.post(baseURL + 'cookbooks/deleteCookbook', sendData, {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: false,
    },
    ).then((response) => {
      console.log(response);
      if (response.data == 'Success') {
        console.log(response.data);
        let newCookbooksList = userCookbooks;
        newCookbooksList.splice(i, 1)
        setUserCookbooks(newCookbooksList);
        setRefresh(!refresh);
        // setItemCount(items.length);
        setLoading(false);
      }
      else {
        //  setResponseTxt("Oops!, Something Went Wrong, Try Again Please.");
        // setError("noUser", 'no user', "no account uses this email");
      }
    }).catch(error => {
      console.log("AXIOS CAUGHT ERROR ::::::::::::::::::::");
      //setResponseTxt("Oops!, Something Went Wrong, Try Again Please.");
      setLoading(false);
      console.log(error);
    });

  }

const getUpdatedCookbooks = async(cookbookId)=>{
  var baseURL = apiKey.baseURL;
 setLoading(true);
  let sendData={
    cookbookId: cookbookId,
    userId : userId
  }

  axios.post(baseURL + 'cookbooks/allCookbooksByUserId', sendData, {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    withCredentials: false,
  },
  ).then((response) => {
    // console.log(response);
    if (response.data) {
      //  console.log(response.data);
      const items = response.data;
      //   console.log(items);
      setUserCookbooks(items);
      // setItemCount(items.length);
      setLoading(false);

    }
    else {
      setResponseTxt("Oops!, Something Went Wrong, Try Again Please.");
      setError("noUser", 'no user', "no account uses this email");
    }
  }).catch(error => {
    console.log("AXIOS CAUGHT ERROR ::::::::::::::::::::");
    setResponseTxt("Oops!, Something Went Wrong, Try Again Please.");
    setLoading(false);
    console.log(error);
  });

}


  const onUpdate = async data => {
    setLoading(true);
    var baseURL = apiKey.baseURL;
    let userId = Firebase.auth().currentUser.uid;
    let sendData = {
      userId: userId,
      title: data.title,
      description: data.description,
      recipes: cookbookRecipes
    }
    if (data.title) {
      console.log('Calling Api ' + baseURL + 'cookbooks/updateCookbook', sendData);
      axios.post(baseURL + 'cookbooks/createCookbook', sendData, {
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: false,
      },
      ).then((response) => {
        // console.log(response);
        if (response.data) {
          let cookbooksList = userCookbooks;
          cookbooksList.push(response.data);
          setUserCookbooks(cookbooksList);
          setRefresh(!refresh);
          setLoading(false);

        }
        else {
          setResponseTxt("Oops!, Something Went Wrong, Try Again Please.");
          setError("noUser", 'no user', "no account uses this email");
          setLoading(false);
        }
      }).catch(error => {
        console.log("AXIOS CAUGHT ERROR ::::::::::::::::::::");
        setResponseTxt("Oops!, Something Went Wrong, Try Again Please.");
        setLoading(false);
        console.log(error);
      });
      setShowModal(false);
      setLoading(false);
    }
    else {
      setLoading(false);


    }
  }
  const onSubmit = async data => {
   
    setLoading(true);
    var baseURL = apiKey.baseURL;
    let userId = Firebase.auth().currentUser.uid;
     let sendData = {
       userId: userId,
       title: data.title,
       description: data.description
     }
    if (data.title) {
    
      let cookbookUrl='';
      if(editingCookbooks)
                {
        sendData = {
          userId: userId,
          title: data.title,
          description: data.description,
          cookbookId: activeCookbook.cookbookId
          
        }
         cookbookUrl = baseURL + 'cookbooks/updateCookbookInfo'
                  
                
                }
      else if (!editingCookbooks){
        sendData = {
          userId: userId,
          title: data.title,
          description: data.description
        }
       cookbookUrl =  baseURL + 'cookbooks/createCookbook'
      }
      console.log('Calling Api ' + cookbookUrl, sendData);
      axios.post(cookbookUrl, sendData, {
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: false,
      },
      ).then((response) => {
        // console.log(response);
        if (response.data) {
          if(!editingCookbooks){
          let cookbooksList = userCookbooks;
          console.log('Pushing..');
          cookbooksList.push(response.data);
          setUserCookbooks(cookbooksList);
          setShowModal(false)
           setEditingCookbook(false);
        }
          else if (editingCookbooks){
            setRefresh(!refresh);
        getUpdatedCookbooks(activeCookbook.cookbookId);
          setShowEditModal(false);
            setEditingCookbook(false);
         
        }
        }
        else {
          setResponseTxt("Oops!, Something Went Wrong, Try Again Please.");
          setError("noUser", 'no user', "no account uses this email");
          setLoading(false);
        }
      }).catch(error => {
        console.log("AXIOS CAUGHT ERROR ::::::::::::::::::::");
        setResponseTxt("Oops!, Something Went Wrong, Try Again Please.");
        setLoading(false);
        console.log(error);
      });
     setShowModal(false);
      setLoading(false);
    }
    else {
      setLoading(false);
     

    }

  }
  const closeEditModal = ()=>{
    console.log('cancel');
    setShowEditModal(false);
  }
  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    };
  };
  for (var i in recipes) {

    // recipes[i] = JSON.parse(recipes[i]);

  }

  var cookbooks = [];
  cookbooks = props.state.params.cookbooks;

  for (var i in cookbooks) {

    cookbooks[i] = JSON.parse(cookbooks[i]);

  }

  let recipeFlatList =
  
    <FlatList
    scrollEnabled={true}
      initialNumToRender={1}
      style={styles.container}
      extraData={refresh}
      ListHeaderComponent={<Text style={{textAlign:"center",color:"#FFFFFF", fontWeight:'600',fontSize:18}}>{userRecipes.length} Saved Recipes</Text>}
      ListEmptyComponent={<Card style={customStyles.nestedCardStyle}><Card.Content><Title style={{ justifyContent: "center" }}>No Recipes Saved</Title></Card.Content></Card>}
      snapToAlignment={"center"}
      horizontal={((Platform.OS == 'web') ? false : false)}
      data={userRecipes}
      keyExtractor={(item, index) => index.toString()}
      renderItem={
        ({ item, index }) =>

          <Card onPress={() => props.navigate('ViewRecipe', { props: item })} style={customStyles.nestedCardStyle}>

            <Card.Content>
              {item.isPublished ? <Text style={{ color: "#45D000", textAlign: "left", fontWeight: "600" }}>Public</Text> : <Text style={{ color: "#D50010", textAlign: "left", fontWeight: "600" }}>Private</Text>}

              <Subheading style={{ justifyContent: "flex-start", fontWeight: "500"  }}>{item.recipeTitle}</Subheading>
              
            </Card.Content>
            <Card.Actions>
              <Button mode={"contained"} style={{ marginEnd: 5, backgroundColor: "#00BFA5" }} onPress={() => props.navigate('EditRecipe', { mode: 'edit', uid: item.uid })}>Edit</Button>
              <Button mode={"contained"} style={{ marginEnd: 5, backgroundColor: "#D50000" }} onPress={() => deleteUserRecipe(item, index)}>Delete</Button>
            </Card.Actions>
          </Card>
      }


    />
    

  let cookBookFlatList =
    <FlatList
      style={styles.container}
      extraData={refresh}
      ListEmptyComponent={<Card style={customStyles.nestedCardStyle}><Card.Content><Title style={{ justifyContent: "center" }}>No Cookbooks Saved</Title></Card.Content></Card>}
      snapToAlignment={"center"}
      data={userCookbooks}
      keyExtractor={(item, index) => index.toString()}
      renderItem={
        ({ item,index }) =>

          <Card onPress={() => props.navigate('PageNotFound', { props: JSON.stringify(item) })} style={customStyles.nestedCardStyle}>

            <Card.Content>

              <Title style={{ justifyContent: "flex-start" }}>{item.title}</Title>
              
            </Card.Content>
            <Card.Actions>
              <Button loading={btnLoading} mode={"contained"} style={{ marginEnd: 5, backgroundColor: "#00BFA5" }} onPress={() => editCookbook(item)}>Edit </Button>
              <Button disabled={btnLoading} mode={"contained"} style={{ marginEnd: 5, backgroundColor: "#D50000" }} onPress={() => deleteCookbook(item, index)}>Delete ck</Button>
            </Card.Actions>
          </Card>
      }


    />
    

  let cookbookRecipesList =
    <FlatList
      scrollEnabled={false}
      initialNumToRender={1}
      style={styles.container}
      extraData={refresh}
      ListHeaderComponent={<Subheading style={{textAlign:"center", fontWeight:"500"}}>List Of Recipes In The Cookbook</Subheading>}
      ListEmptyComponent={<Card style={customStyles.nestedCardStyle}><Card.Content><Title style={{ justifyContent: "center" }}>No Recipes Added To This Cookbook</Title></Card.Content></Card>}
      snapToAlignment={"center"}
      data={cookbookRecipes}
      keyExtractor={(item, index) => index.toString()}
      renderItem={
        ({ item, index }) =>

          <Card  style={customStyles.customListItemsStyle}>

            <Card.Content>
              {item.isPublished ? <Text style={{ color: "#45D000", textAlign: "left", fontWeight: "600" }}>Public</Text> : <Text style={{ color: "#D50010", textAlign: "left", fontWeight: "600" }}>Private</Text>}

              <Title style={{ justifyContent: "flex-start" }}>{item.title}</Title>
              <Text>{item.uid}</Text>
            </Card.Content>
            <Card.Actions>
            
              <Button mode={"contained"} style={{ marginEnd: 5, backgroundColor: "#D50000" }} onPress={() => deleteRecipeFromCookbook(item, index)}>Remove From Cookbok</Button>
            </Card.Actions>
          </Card>
      }


    />



  if (loading) {
    return (
      <SafeAreaView style={{ flex: 3 }}>


        <PulseIndicator style={{ position: "relative" }} animating={true} size={180} color='#69F0AE' />

      </SafeAreaView>
    )
  }
else if(editingCookbooks){
  return(
    <SafeAreaView style={{backgroundColor:'#FFFFFF', borderRadius:10, width:'100%', padding:8}}>
     <KeyboardAvoidingView>

         
          <Title style={{ color: '#9575CD', fontSize: 20, marginTop: 30, fontWeight: '500', marginBottom: 10,textAlign:'center' }}>Editing Cookbook</Title>

          <View style={{ marginBottom: 1 }}>
            <Subheading style={styles.label}>Title</Subheading>
            <Controller
              as={<TextInput maxLength={140}  disabled={loading} style={styles.input} />}
              name="title"
              defaultValue={activeCookbook.title}
              control={control}
              onChange={onChange}
              rules={{ min:1,required:true }}
            />
            {errors.title && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}>Must be atleast one character</Subheading>}

            <Subheading style={styles.label}>Description (Optional)</Subheading>
            <Controller
              as={<TextInput multiline={true}  maxLength={225} disabled={loading} style={styles.longInput} secureTextEntry={true} />}
              name="description"
                    defaultValue={activeCookbook.description}
              control={control}
              onChange={onChange}

              rules={{ required: false }}
            />


          </View>
<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 1 }}>
            <Button loading={loading} style={{ marginHorizontal: 10, marginTop: 5, backgroundColor: '#1DE9B6' }} color="#FFFFFF" onPress={handleSubmit(onSubmit)}>
             Update Info
  
            </Button>
            <Button  style={{ marginHorizontal: 10, marginTop: 5, backgroundColor: '#D50000' }} color="#FFFFFF" onPress={() => setEditingCookbook(false)}>
              Cancel
            </Button>

          </View>
            {cookbookRecipesList}
          
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
else if(showModal){
  return(
    <SafeAreaView>
             <KeyboardAvoidingView style={{padding:10}}>
  
         
          <Title style={{ color: '#FFFFFF', fontSize: 20, marginTop: 30, fontWeight: '500', marginBottom: 10,textAlign:'center' }}>Create A Cookbook</Title>

          <View style={{ marginBottom: 10 }}>
            <Subheading style={styles.label}>Title</Subheading>
            <Controller
              as={<TextInput maxLength={140}  disabled={loading} style={styles.input} />}
              name="title"

              control={control}
              onChange={onChange}
              rules={{ min:1,required:true }}
            />
            {errors.title && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}>Must be atleast one character</Subheading>}

            <Subheading style={styles.label}>Description (Optional)</Subheading>
            <Controller
              as={<TextInput multiline={true}  maxLength={225} disabled={loading} style={styles.longInput} secureTextEntry={true} />}
              name="description"

              control={control}
              onChange={onChange}

              rules={{ required: false }}
            />


          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            <Button loading={loading} style={{ marginHorizontal: 10, marginTop: 20, backgroundColor: '#1DE9B6' }} color="#FFFFFF" onPress={handleSubmit(onSubmit)}>
             Done
  
            </Button>
            <Button disabled={loading} style={{ marginHorizontal: 10, marginTop: 20, backgroundColor: '#D50000' }} color="#FFFFFF" onPress={() => setShowModal(false)}>
              Cancel
            </Button>

          </View>
      </KeyboardAvoidingView>
</SafeAreaView>
  )
}
else if(showEditModal){
  return (
    <SafeAreaView style={{ padding: 20 }}>
             <KeyboardAvoidingView style={{margin:20}}>
         
          <Title style={{ color: '#9575CD', fontSize: 20, marginTop: 30, fontWeight: '500', marginBottom: 10,textAlign:'center' }}>Editing Cookbook</Title>

          <View style={{ marginBottom: 10, padding:8 }}>
            <Subheading style={styles.label}>Title</Subheading>
            <Controller
              as={<TextInput maxLength={140}  disabled={loading} style={styles.input} />}
              name="title"
              defaultValue={activeCookbook.title}
              control={control}
              onChange={onChange}
              rules={{ min:1,required:true }}
            />
            {errors.title && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}>Must be atleast one character</Subheading>}

            <Subheading style={styles.label}>Description (Optional)</Subheading>
            <Controller
              as={<TextInput multiline={true}  maxLength={225} disabled={loading} style={styles.longInput} secureTextEntry={true} />}
              name="description"
                    defaultValue={activeCookbook.description}
              control={control}
              onChange={onChange}

              rules={{ required: false }}
            />


          </View>

            {cookbookRecipesList}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            <Button loading={loading} style={{ marginHorizontal: 10, marginTop: 20, backgroundColor: '#1DE9B6' }} color="#FFFFFF" onPress={handleSubmit(onSubmit)}>
             Update
  
            </Button>
            <Button disabled={loading} style={{ marginHorizontal: 10, marginTop: 20, backgroundColor: '#D50000' }} color="#FFFFFF" 
            onPress={() => closeEditModal()}>
              Cancel
            </Button>

          </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
  else if(!loading) {
    return (

      <SafeAreaView style={{ flex: 3 }}>

       

          <View animation="fadeIn" style={viewChildrenStyle.sameColumn}>
            <View style={{ alignContent: "center", justifyContent: "center", alignItems: "center" }}>
              <View style={customStyles.viewBoxStyle}>
                <View style={{ flexDirection: "column" }}>
                  <Button onPress={()=> props.navigate('ViewCookbook')}>View Your Cookbook</Button>
                  <Headline style={{ color: '#FFFFFF', fontWeight: "600", textAlign: "left" }}>Your Saved Recipes</Headline>
                  <Button style={{ marginHorizontal: 10, backgroundColor: '#F48FB1',marginBottom:10 }} color="#FFFFFF" onPress={() => props.navigate('EditRecipe', { mode: 'create' })}>
                    Create Recipe
            </Button>
                </View>
              <Subheading>Scroll Through Your Favorites</Subheading>
                <ScrollView style={{maxHeight:350}} indicatorStyle={"blue"}>
                {recipeFlatList}
              </ScrollView>
              </View>

            </View>
          </View>

          <View animation="fadeIn" style={viewChildrenStyle.sameColumn}>
            <View style={{ alignContent: "center", justifyContent: "center", alignItems: "center" }}>
              <View style={customStyles.viewBoxStyle}>
                <View style={{ flexDirection: "column" }}>
                  <Headline style={{ color: '#FFFFFF', fontWeight: "600" }}>Your Cookbooks</Headline>
                  <Button style={{ marginHorizontal: 10, backgroundColor: '#FF9800' }} color="#FFFFFF" onPress={() => setShowModal(true)}>
                    Create Cookbook
            </Button>
                </View>
                {cookBookFlatList}

              </View>

            </View>
          </View>

      

          <Provider>
            <Portal>
              <Modal visible={false} contentContainerStyle={styles.modalStyle}>

              <KeyboardAwareScrollView extraScrollHeight={Platform.OS === 'ios' ? 170 : 180} enableResetScrollToCoords={false} enableOnAndroid={true} >
  
         
          <Title style={{ color: '#9575CD', fontSize: 20, marginTop: 30, fontWeight: '500', marginBottom: 10,textAlign:'center' }}>Create A Cookbook</Title>

          <View style={{ marginBottom: 10 }}>
            <Subheading style={styles.label}>Title</Subheading>
            <Controller
              as={<TextInput maxLength={140}  disabled={loading} style={styles.input} />}
              name="title"

              control={control}
              onChange={onChange}
              rules={{ min:1,required:true }}
            />
            {errors.title && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '600' }}>Must be atleast one character</Subheading>}

            <Subheading style={styles.label}>Description (Optional)</Subheading>
            <Controller
              as={<TextInput multiline={true}  maxLength={225} disabled={loading} style={styles.longInput} secureTextEntry={true} />}
              name="description"

              control={control}
              onChange={onChange}

              rules={{ required: false }}
            />


          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            <Button loading={loading} style={{ marginHorizontal: 10, marginTop: 20, backgroundColor: '#1DE9B6' }} color="#FFFFFF" onPress={handleSubmit(onSubmit)}>
             Done
  
            </Button>
            <Button disabled={loading} style={{ marginHorizontal: 10, marginTop: 20, backgroundColor: '#D50000' }} color="#FFFFFF" onPress={() => setShowModal(false)}>
              Cancel
            </Button>

          </View>

            </KeyboardAwareScrollView>

              </Modal>

            </Portal>
          </Provider>

      </SafeAreaView>
    );
  }
}
export default UserItems;