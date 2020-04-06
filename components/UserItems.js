import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Platform, Text, Dimensions, ScrollView, SafeAreaView, ImageBackground, Image } from 'react-native';
import '../configure/apiKey.json';
import { Title, Headline, Card } from 'react-native-paper';

const styles = StyleSheet.create({
    buttonOuterLayout: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonLayout: {
      marginBottom: 10
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

    for(var i in recipes) {

        recipes[i] = JSON.parse(recipes[i]);

    }

    var cookbooks = [];
    cookbooks = props.state.params.cookbooks;

    for(var i in cookbooks) {

        cookbooks[i] = JSON.parse(cookbooks[i]);

    }

    let recipeFlatList =
        <FlatList
        style={styles.container}
        ListEmptyComponent={<Card style={customStyles.nestedCardStyle}><Card.Content><Title style={{ justifyContent: "center" }}>No Recipes Saved</Title></Card.Content></Card>}
        snapToAlignment={"center"}
        horizontal={((Platform.OS == 'web') ? false : true)}
        data={recipes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={
            ({ item }) =>

            <Card onPress={() => props.navigate('ViewRecipe', { props: JSON.stringify(item) })} style={customStyles.nestedCardStyle}>

                <Card.Content>

                <Title style={{ justifyContent: "flex-start" }}>{item.title}</Title>
                <Image source={{uri: item.uri,}}></Image>
                </Card.Content>
            </Card>
        }


        />
    ;

    let cookBookFlatList =
        <FlatList
        style={styles.container}
        ListEmptyComponent={<Card style={customStyles.nestedCardStyle}><Card.Content><Title style={{ justifyContent: "center" }}>No Cookbooks Saved</Title></Card.Content></Card>}
        snapToAlignment={"center"}
        horizontal={((Platform.OS == 'web') ? false : true)}
        data={cookbooks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={
            ({ item }) =>

            <Card onPress={() => props.navigate('PageNotFound', { props: JSON.stringify(item) })} style={customStyles.nestedCardStyle}>

                <Card.Content>

                <Title style={{ justifyContent: "flex-start" }}>{item.title}</Title>
                <Image source={{uri: item.uri,}}></Image>
                </Card.Content>
            </Card>
        }


        />
    ;
    


    return (
        
          <SafeAreaView style={{ flex: 3 }}>

            <ScrollView >

              <View animation="fadeIn" style={viewChildrenStyle.sameColumn}>
                <View style={{ alignContent: "center", justifyContent: "center", alignItems: "center" }}>
                  <View style={customStyles.viewBoxStyle}>
                    <Headline style={{ color: '#FFFFFF', fontWeight: "600" }}>Your Saved Recipes</Headline>

                    {recipeFlatList}

                  </View>

                </View>
              </View>

              <View animation="fadeIn" style={viewChildrenStyle.sameColumn}>
                <View style={{ alignContent: "center", justifyContent: "center", alignItems: "center" }}>
                  <View style={customStyles.viewBoxStyle}>
                    <Headline style={{ color: '#FFFFFF', fontWeight: "600" }}>Your Saved Cookbooks</Headline>

                    {cookBookFlatList}

                  </View>

                </View>
              </View>

            </ScrollView>

          </SafeAreaView>
      );

}
export default UserItems;