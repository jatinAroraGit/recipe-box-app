//If shoppingList can manage the number of the product, then there is no point of having homescreen. So I just have separeted both functionalities.


import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Platform, Dimensions, TouchableOpacity, TextInput, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { Title, Headline, Subheading, Surface, Button, Card, Provider, Portal, Modal } from 'react-native-paper';
import { createAnimatableComponent } from 'react-native-animatable';
import Firebase from '../configure/Firebase';
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios';
let apiKey = require('../configure/apiKey.json');

export default function ShoppingList({ navigation, ingredSent }) {

  const [noZero, setnoZero] = useState([]);
  const [listItems, setListItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currItem, setCurrItem] = useState({});
  const { control, handleSubmit, errors, setError, reset } = useForm({ mode: 'onChange' });
  const [loading, setLoading] = useState(false);
  const [resText, setResText] = useState("");
  let userId = Firebase.auth().currentUser.uid;

  // const [hasZero, setHasZero] = useState(ingredSent);
  let ingredCopy = [];

  useEffect(() => {
    let sendData = {
      userId: userId
    }
    setLoading(true);
    console.log('SUBMIT');
    axios.post(apiKey.baseURL + 'shoppingList/getShoppingList', sendData, {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: false,
    },
    ).then((res) => {

      if (res.data) {
        console.log('Recipe Added To User List');
        console.log(res.data);
        setListItems(res.data.items);
        //console.log(res);
        // setListModal(false);
        // setIsFound(true);
        //setRecipeInfo(res.data);
        if (res.status == 200) {

        }


        setLoading(false);
      }
      else {
        setLoading(false);

        setResText("Oops!, Something Went Wrong, Try Again Please.");
        setError("noUser", 'no user', "no account uses this email");
      }
    }).catch(error => {
      setResText("Oops!, Something Went Wrong, Try Again Please.");


      console.log("AXIOS CAUGHT ERROR ::::::::::::::::::::");
      //  setResponseTxt("Oops!, Something Went Wrong, Try Again Please.");
      setLoading(false);
      console.log(error);

    });



    // extractJSON(ingredSent);
  }, [])

  // when we create the useState of noZero, it loops infinitively because whenever the noZero is being called, it re-render the whole component
  // To prevent infinit loop, we added the useEffect to prevent. 
  // Let's say the user put the setState function out of the component function, then it loops again and again. But by using the useEffect function, which is special function to render the compoent, it blocks looping.


  const onSubmit = async data => {
    if (data.listQuantity < 0.5) {
      setError("quantityShort", 'quantityShort', "Ingredient text is too short.");

    }
    else {
      console.log('before' + data.listUnit);
      // data.listUnit = data.listUnit.trim();
      console.log('After', data.listUnit);
      if (!data.listUnit) {
        data.listUnit = '';
      }
      let item = currItem.name + ' ' + data.listQuantity + ' ' + data.listUnit.toUpperCase();
      console.log('Sendign To List: ' + item);
      let finalUnit = data.listUnit.toUpperCase();
      console.log('SUBMIT');
      console.log(finalUnit);
      let sendData = {
        userId: userId,
        name: currItem.name,
        quantity: data.listQuantity,
        unit: finalUnit
      }
      console.log('SUBMIT');
      console.log(sendData);
      axios.post(apiKey.baseURL + 'shoppingList/updateShoppingListOneItem', sendData, {
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        withCredentials: false,
      },
      ).then((res) => {

        if (res.data) {
          console.log('Recipe Added To User List');
          //console.log(res);
          // setListModal(false);
          // setIsFound(true);
          //setRecipeInfo(res.data);
          if (res.status == 200) {

          }
          // console.log(recipeInfo);
          console.log("Complete Recipe Info Object: ");
          setShowModal(false);

          /************** */

          let sendData = {
            userId: userId
          }
          console.log('SUBMIT');
          axios.post(apiKey.baseURL + 'shoppingList/getShoppingList', sendData, {
            headers: {
              'content-type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            withCredentials: false,
          },
          ).then((res) => {

            if (res.data) {
              console.log('Recipe Added To User List');
              console.log(res.data);
              setListItems(res.data.items.reverse());
              //console.log(res);
              // setListModal(false);
              // setIsFound(true);
              //setRecipeInfo(res.data);
              if (res.status == 200) {

              }
              console.log(recipeInfo);
              console.log("Complete Recipe Info Object: ");

              setLoading(false);
            }
            else {
              setLoading(false);

              // setResponseTxt("Oops!, Something Went Wrong, Try Again Please.");
              setError("noUser", 'no user', "no account uses this email");
            }
          }).catch(error => {


            console.log("AXIOS CAUGHT ERROR ::::::::::::::::::::");
            //  setResponseTxt("Oops!, Something Went Wrong, Try Again Please.");
            setLoading(false);
            console.log(error);
          });



          /*************** */

          setLoading(false);
        }
        else {
          setLoading(false);
          //  setIsFound(false);
          //   setResponseTxt("Oops!, Something Went Wrong, Try Again Please.");
          setError("noUser", 'no user', "no account uses this email");
          setResText("Oops!, Something Went Wrong, Try Again Please.");

        }
      }).catch(error => {

        // setIsFound(false);
        console.log("AXIOS CAUGHT ERROR ::::::::::::::::::::");
        setResText("Oops!, Something Went Wrong, Try Again Please.");
        setLoading(false);
        console.log(error);
      });
    }

  }



  const onChange = args => {
    return {
      value: args[0].nativeEvent.text,
    };
  };



  //  extractJSON(hasZero);

  function extractJSON(arr) {

    let noJSON = [];

    for (let i = 0; i < arr.length; i++) {

      noJSON.push(JSON.parse(arr[i]));
    }

    // return noJSON;
    removeZero(noJSON);

  }

  //const { ingredSent } = route.params;
  // const [noZero, setnoZero] = useState([]);


  // let noZero = [];

  function removeZero(ingredArray) {

    ingredArray.forEach((oneIngred) => {
      if (oneIngred.count > 0) {
        ingredCopy.push(oneIngred);
      }
    })

    // noZero = ingredCopy;
    setnoZero(ingredCopy);

  }


  const deleteIngredients = (oneIngred, i) => {
    console.log(oneIngred, i);
    setLoading(true);
    if (!oneIngred.unit) {
      oneIngred.unit = '';
    }
    let item = oneIngred.name + ' ' + oneIngred.quantity + ' ' + oneIngred.unit;
    console.log('Sendign To List: ' + item);
    let sendData = {
      userId: userId,
      name: oneIngred.name,
      quantity: oneIngred.quantity,
      unit: oneIngred.unit
    }
    console.log('SUBMIT');
    axios.post(apiKey.baseURL + 'shoppingList/deleteShoppingListItem', sendData, {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      withCredentials: false,
    },
    ).then((res) => {

      if (res.data) {
        console.log('Recipe Added To User List');
        //console.log(res);
        // setListModal(false);
        // setIsFound(true);
        //setRecipeInfo(res.data);
        if (res.status == 200) {
          let shopItems = listItems;
          shopItems.splice(i, 1);
          setListItems(shopItems);
          setShowModal(false);
        }
        // con
        setLoading(false);
      }
      else {
        setLoading(false);
        //  setIsFound(false);
        //   setResponseTxt("Oops!, Something Went Wrong, Try Again Please.");
        setError("noUser", 'no user', "no account uses this email");
      }
    }).catch(error => {

      // setIsFound(false);
      console.log("AXIOS CAUGHT ERROR ::::::::::::::::::::");
      // setResponseTxt("Oops!, Something Went Wrong, Try Again Please.");
      setLoading(false);
      console.log(error);
    });

    // noZero = _.reject(noZero, function(el) { return el.id === oneIngred.id });
  };

  const editListItem = (oneIngred) => {
    setCurrItem(oneIngred);
    console.log('CurrITem');

    console.log(currItem);
    setShowModal(true);
  };
  if (resText) {
    return (
      <SafeAreaView>
        <Title>{resText}</Title>
      </SafeAreaView>
    )
  } else
    if (showModal) {
      return (

        <SafeAreaView>
          <Title style={{ color: '#B50900' }}>Editing Shopping List Item</Title>
          <Subheading style={{ textAlign: "center", fontSize: 20, fontWeight: "500" }}>{currItem.name}</Subheading>
          <KeyboardAvoidingView>

            <View style={{ marginBottom: 10 }}>
              <Subheading style={styles.label}>Quantity</Subheading>
              <Text style={{ color: "#FFC300" }}>Should be atleast 0.5</Text>


              <Controller
                as={<TextInput keyboardType="decimal-pad" maxLength={6} style={customStyles.input} />}
                name="listQuantity"
                defaultValue={currItem.quantity}
                control={control}
                onChange={onChange}
                rules={{ min: 0.5, required: true }}

              />
              {errors.quantityShort && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}>Value Must be Atleast 0.5
            </Subheading>}
              {errors.listQuantity && <Subheading style={{ color: '#BF360C', fontSize: 15, fontWeight: '300' }}>Value Must be Atleast 0.5
            </Subheading>}
              <Subheading style={styles.label}>Unit Of Quantity</Subheading>
              <Controller
                as={<TextInput editable={false} maxLength={25} style={customStyles.disabledInput} />}
                name="listUnit"
                defaultValue={currItem.unit}
                control={control}
                onChange={onChange}


              />

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
              <Button loading={loading} style={{ marginHorizontal: 10, marginTop: 20, backgroundColor: '#1DE9B6' }} color="#FFFFFF" onPress={handleSubmit(onSubmit)}>
                Update

            </Button>
              <Button disabled={loading} style={{ marginHorizontal: 10, marginTop: 20, backgroundColor: '#81D4FA' }} color="#FFFFFF" onPress={() => setShowModal(false)} >
                Cancel
            </Button>

            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>

      )
    }

    else if (!showModal)
      return (
        <View>

          {/* TODO:
      Support showing unit as well
      create a string which is combination of name, quantity and unit
      throw that into array.
      send that array to back end.
      */}

          <View style={styles.viewBoxStyle}>
            <Headline style={{ color: '#FFFFFF', fontWeight: "600" }}>Shopping Ingredients</Headline>

            {listItems.map((oneIngred, i) => {
              return (
                <View key={oneIngred.id} >
                  <Card style={styles.nestedCardStyle}>
                    <View style={{ flexDirection: 'column', padding: 10 }}>
                      <View style={{ flexDirection: 'row' }}>

                        <Subheading style={{ justifyContent: "center", textAlign: "center" }} >{oneIngred.name} : {oneIngred.quantity} {oneIngred.unit} </Subheading>
                      </View>
                      <View style={{ justifyContent: 'flex-end', flexDirection: "row" }}>
                        <TouchableOpacity style={styles.button} title='Delete' onPress={() => {
                          editListItem(oneIngred);
                        }}><Text>Edit</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.button} title='Delete' onPress={() => {
                          deleteIngredients(oneIngred, i);
                        }}><Text style={{ color: '#D50000' }}>Delete</Text></TouchableOpacity>
                      </View>
                    </View>
                    {/* <View>
                  
                </View> */}
                  </Card>
                </View>

              )
            })}
          </View>

        </View >

      )
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#F8BBD0",
    padding: 10,
    borderRadius: 10,
    justifyContent: 'flex-end',
    marginRight: 10
  },
  recentItemIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20


  },
  viewBoxStyle: {
    marginTop: 10,
    backgroundColor: '#ccccff',
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 0,
    padding: 18,
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
        width: 380
      },
      android: {
        width: 380
      },
      web: {
        width: ((Dimensions.get('window').width) < 500) ? ((Dimensions.get('window').width) - 50) : 600,


      }
    })

  },
  nestedCardStyle: {
    padding: 0,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    margin: 5,
    height: 'auto',
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        width: 360
      },
      android: {
        width: 360
      },
      web: {
        width: ((Dimensions.get('window').width) < 500) ? ((Dimensions.get('window').width) - 70) : 550,


      }

    }),
  },

})

const customStyles = StyleSheet.create({
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

        width: 'auto',
        height: 'auto'
      },
      web: {
        //  width: (Dimensions.get('window').width - 50),
        //  height: (Dimensions.get('window').height - 50)
      },
      android: {
        width: 330,
        height: 600
      },
    })
  },
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
  },
  input: {
    backgroundColor: '#B2DFDB',
    borderWidth: 0,
    height: 40,
    padding: 5,
    width: "auto",
    borderRadius: 4,
    alignSelf: "stretch"
  },
  disabledInput: {
    backgroundColor: '#BDBDBD',
    borderWidth: 0,
    height: 40,
    padding: 5,
    width: "auto",
    borderRadius: 4,
    alignSelf: "stretch"
  },
});
