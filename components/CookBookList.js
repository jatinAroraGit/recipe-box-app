import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, Button, Switch, Platform, Dimensions, TouchableOpacity, Alert, TouchableHighlight } from "react-native";
import { FAB, Title, Headline, Subheading, Surface, Provider, Modal, Portal, Card } from 'react-native-paper';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

export default function CookBookList(props) {

    console.log('This is the props in CookBookList', props.recipeNum);

    const [cookBookListState, setCookBookListState] = useState({
        cookBookList: []
    });

    useEffect(()=> {
        addRecipe(props.recipeNum);
    }, []);

    function addRecipe(id) {

        let tempCookBook = cookBookListState.cookBookList;

        tempCookBook.push(id);

        setCookBookListState(prevState => ({...prevState, cookBookList: tempCookBook}))

        // setCookBookListState({
        //     cookBookList: tempCookBook
        // })
    }

    return (
        <View>
            {console.log('This is the recipe that user has added', props)}
           <Text>This is cookbooklist page</Text>
           {cookBookListState.cookBookList.map((recipeID, index) => {
               <Text key={index +1 }>{recipeID}</Text>

           })}
        </View>
    )
};