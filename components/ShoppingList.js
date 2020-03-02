//If shoppingList can manage the number of the product, then there is no point of having homescreen. So I just have separeted both functionalities.


import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

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
      <Text>This is Shopping List Page</Text>

      {noZero.map((oneIngred) => {
        return (
          <View key={oneIngred.id} style={{flexDirection: "row"}}>
            <Text>{oneIngred.name}</Text>
            <Text> : </Text>
            <Text>{oneIngred.count}</Text>
          </View>

        )
      })}
    </View>

  )
}