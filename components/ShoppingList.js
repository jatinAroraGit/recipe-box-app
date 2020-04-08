//If shoppingList can manage the number of the product, then there is no point of having homescreen. So I just have separeted both functionalities.


import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Platform, Dimensions, TouchableOpacity } from 'react-native';
import { Title, Headline, Subheading, Surface, Card } from 'react-native-paper';
import { createAnimatableComponent } from 'react-native-animatable';


export default function ShoppingList({ navigation, ingredSent }) {

  const [noZero, setnoZero] = useState([]);
  // const [hasZero, setHasZero] = useState(ingredSent);
  let ingredCopy = [];

  useEffect(() => {
    extractJSON(ingredSent);
  }, [])

  // when we create the useState of noZero, it loops infinitively because whenever the noZero is being called, it re-render the whole component
  // To prevent infinit loop, we added the useEffect to prevent. 
  // Let's say the user put the setState function out of the component function, then it loops again and again. But by using the useEffect function, which is special function to render the compoent, it blocks looping.








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


  const deleteIngredients = (oneIngred) => {
    let deletedArr = noZero.filter(element => element.id !== oneIngred.id);
    setnoZero(deletedArr);

    // noZero = _.reject(noZero, function(el) { return el.id === oneIngred.id });
  };



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
        {noZero.map((oneIngred) => {
          return (
            <View key={oneIngred.id} >
              <Card style={styles.nestedCardStyle}>
                <View style={{ flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.recentItemIndicator}></View>
                  <Subheading style={{ justifyContent: "flex-start" }} >{oneIngred.name} : {oneIngred.count}</Subheading>
                </View>
                <View style={{justifyContent: 'flex-end'}}>
                <TouchableOpacity style={styles.button} title='Delete' onPress={ ()=> {
                    deleteIngredients(oneIngred);
                  }}><Text>Delete</Text></TouchableOpacity>
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
    backgroundColor: "#f9deff",
    padding: 10,
    borderRadius: 10,
    justifyContent: 'flex-end'
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
