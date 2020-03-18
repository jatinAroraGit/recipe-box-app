//If shoppingList can manage the number of the product, then there is no point of having homescreen. So I just have separeted both functionalities.


import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Platform, Dimensions } from 'react-native';
import { Title, Headline, Subheading, Surface, Card } from 'react-native-paper';
import { createAnimatableComponent } from 'react-native-animatable';



export default function ShoppingList({ navigation, ingredSent }) {

  console.log('what are the inside in ingredSent - start');
  console.log(JSON.parse(ingredSent[0]));
  console.log('what are the inside in ingredSent - end');


  var noJSON = [];


  ingredSent = extractJSON(ingredSent);

  function extractJSON(ingredSent) {
    for (let i = 0; i < ingredSent.length; i++) {
      noJSON[i] = JSON.parse(ingredSent[i]);

      console.log('Hi ingredSent'); //whenever I change I need to go back to the first page, otherwise it would not be called at all.
      console.log(JSON.parse(ingredSent[i]));
      console.log('Bye ingredSent');
    }



    console.log('Hi noJSON');
    console.log(noJSON)
    console.log('Bye noJSON');

    return noJSON;

  }

  console.log('Start - shoppingList');
  console.log(ingredSent);
  console.log('end - shoppingList');

  //const { ingredSent } = route.params;
  // const [noZero, setnoZero] = useState([]);
  let noZero = [];

  removeZero(ingredSent);




  function removeZero(ingredArray) {

    let ingredCopy = [];

    console.log('Hello the function removeZero is called successfully');
    console.log(ingredArray);
    console.log('IngredArray is called');


    ingredArray.forEach((oneIngred) => {
      console.log('Hi this is oneIngred');
      console.log(oneIngred);
      console.log('Bye oneIngred');
      if (oneIngred.count > 0) {
        ingredCopy.push(oneIngred);
      }
    })

    noZero = ingredCopy;
    // setnoZero(ingredCopy);

    console.log('Hi this is ingredCopy');
    console.log(ingredCopy);
    console.log('Bye ingredCopy');
  }




  console.log('Hi this is no zero');
  console.log(noZero);
  console.log('Bye noZero');



  return (
    <View>
      {/* <Text>This is Shopping List Page</Text> */}

      <View style={styles.viewBoxStyle}>
        <Headline style={{ color: '#FFFFFF', fontWeight: "600" }}>Shopping Ingredients</Headline>
        {noZero.map((oneIngred) => {
          return (
            <View key={oneIngred.id} >
              <Card style={styles.nestedCardStyle}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.recentItemIndicator}></View>
                  <Subheading style={{ justifyContent: "flex-start" }} >{oneIngred.name} : {oneIngred.count}</Subheading>
                </View>
              </Card>
            </View>

          )
        })}
      </View>
    </View >

  )
}

const styles = StyleSheet.create({
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
        width: 300
      },
      android: {
        width: 300
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

})
