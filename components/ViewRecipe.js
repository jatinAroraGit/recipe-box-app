import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, Button } from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import axios from 'axios';

function ViewRecipe({ navigation, recipeDetail }) {
    recipeDetail = JSON.parse(recipeDetail.props);
    // console.log('navigation in ViewRecipe - start');
    // console.log(navigation);
    // console.log('navigation in ViewRecipe - end')

    console.log('Showing the id of the recipe - start');
    console.log(recipeDetail)
    console.log('Showing the id of the recipe - end')

    //const baseUri = `https://spoonacular.com/recipeImages/`;

    const [ingred, setIngred] = useState([]); //setIngred is such a '=' sign to connect ingred and ingredientsArray to pass the ingredientsArray to ingred.
    var ingredientsArray = [];

    useEffect(() => {
        console.log('useEffect has been called');
        console.log(recipeDetail);
        let ingredients = "apples,+flour,+sugar"
        let apiKey = require('../configure/apiKey.json');
        let recipeId = recipeDetail.id;
        if (ingredients) {
            console.log('If statement is called');
            // axios.get('https://api.spoonacular.com/recipes/findByIngredients?apiKey=' + apiKey.key + '&ingredients=' + ingredients + '&number=2')
            axios.get('https://api.spoonacular.com/recipes/' + recipeId + '/analyzedInstructions?apiKey=' + apiKey.key) //Need to change the id and apiKey
                .then(res => {
                    console.log('axios is called');
                    const ingreds = res.data[0].steps;
                    console.log('HiHello');
                    console.log(res.data[0]);
                    console.log('HiBye');
                    // console.log(items)
                    extractIngredients(ingreds);
                })
        }


    }, []);

    const extractIngredients = (ingreds) => {

        for (let i = 0; i < ingreds.length; i++) {
            for (let j = 0; j < ingreds[i].ingredients.length; j++) {
                ingreds[i].ingredients[j].count = 0;
                ingredientsArray.push(ingreds[i].ingredients[j]); //IngredientsArray currently holds a collection of ingredients' objects
            }
        }

        ingredientsArray = ingredientsArray.filter((ingredElement, index, self) =>
            index === self.findIndex((t) => (
                t.id === ingredElement.id
            ))
        )

        //ingredElement is each element of ingredientsArray, index is 0,1,2..., self is ingredientsArray, t is basically same as the ingredElement
        // if the index is not matching returned number made by self.findIndex, it would not return. 

        console.log('Hello no dupes', ingredientsArray)

        setIngred(ingredientsArray);


        /*
        ingred - an array of steps. 
        each step is another object, object has an array of ingredients. 
        the ingredients array has many objects that has name as name of ingred. 
        */
    };

    const incrementCountHandler = (incomingIngred) => {

        let ingredsCopy = Array.from(ingred);

        ingredsCopy.forEach((curr) => {
            if (curr.id === incomingIngred.id) {
                if (curr.count >= 0) {
                    curr.count = curr.count + 1;
                }
            }
        })

        setIngred(ingredsCopy);
    };


    const decrementCountHandler = (incomingIngred) => {

        let ingredsCopy = Array.from(ingred);

        ingredsCopy.forEach((curr) => {
            if (curr.id === incomingIngred.id) {
                if (curr.count > 0) {
                    curr.count = curr.count - 1;
                }
            }

        })
        setIngred(ingredsCopy);
    };

    const makeJsontoObject = (JsonObject) => {
        if (JsonObject.length != 0) {
            for (let i = 0; i < JsonObject.length; i++) {
                JsonObject[i] = JSON.stringify(JsonObject[i]);
            }
        }else {
            console.log('Hey you should pick at least one of the ingredients.');
        }

        return JsonObject;

    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleBar}>
                    <Ionicons name="ios-arrow-back" size={24} color="rgb(82,87,93)"></Ionicons>
                    <Ionicons name="md-more" size={24} color="rgb(82,87,93)"></Ionicons>
                </View>

                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image source={{uri: recipeDetail.image}} style={styles.image} resizeMode="center"></Image>
                    </View>
                    <View style={styles.dm}>
                        <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
                    </View>
                    <View style={styles.active}></View>
                    <View style={styles.add}>
                        <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                    </View>
                </View>


                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 15 }]}>{recipeDetail.title}</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>World Best!</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>483</Text>
                        <Text style={[styles.text, styles.subText]}>Posts</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFDBCB", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>45,844</Text>
                        <Text style={[styles.text, styles.subText]}>Followers</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>302</Text>
                        <Text style={[styles.text, styles.subText]}>Following</Text>
                    </View>
                </View>

                <View style={{ marginTop: 32 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../assets/images/background.jpg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../assets/images/background.jpg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../assets/images/background.jpg")} style={styles.image} resizeMode="cover"></Image>
                        </View>

                    </ScrollView>
                    <View style={styles.mediaCount}>
                        <Text style={[styles.text, { fontSize: 24, color: "#DFD8C8", fontWeight: "300" }]}>70</Text>
                        <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" }]}>Media</Text>
                    </View>
                </View>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Ingredients</Text>
                    {console.log(ingred, 'removed dupes')}


                    {ingred.map((oneIngred, index) => {
                        return (
                            <View key={oneIngred.id} style={{flexDirection: "row"}}>
                                <Text>{index + 1}: {oneIngred.name}</Text>
                                <Button title='-' onPress={() => {
                                    decrementCountHandler(oneIngred);
                                }}></Button>
                                <Text>{oneIngred.count}</Text>
                                <Button title='+' onPress={() => {
                                    incrementCountHandler(oneIngred)
                                }}></Button>
                            </View>

                        )
                    })}

                    <Button title="View Shopping List" onPress={() => {
                        navigation.navigate('Shopping', makeJsontoObject(ingred));
                        console.log('Button is clicked');
                        console.log(ingred);
                        console.log('Bye Button');
                    }}></Button>

                </View >


                <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>

                <View style={{ alignItems: "center" }}>
                    <View style={styles.recentItem}>
                        <View style={styles.recentItemIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "rgb(65,68,75)", fontWeight: "300" }]}>
                                Started Following{" "}
                                <Text style={{ fontWeight: "400" }}>
                                    Jason, Jatin, Sanghyuk Lee, Narma, Patrick <Text style={{ fontWeight: "400" }}>GroupQuattro</Text>
                                </Text>
                            </Text>
                        </View>
                    </View>

                    <View style={styles.recentItem}>
                        <View style={styles.recentItemIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                Started Following <Text style={{ fontWeight: "400" }}> Recipe2 </Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
}

export default ViewRecipe;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "rgb(82, 87, 93)"
    },
    subText: {
        fontSize: 12,
        color: "#rgb(174, 181, 188)",
        textTransform: "uppercase",
        fontWeight: "500"

    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "rgb(65,68,75)",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FF89",
        position: "absolute",
        bottom: 20,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10

    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"

    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32

    },
    statsBox: {
        alignItems: "center",
        flex: 1

    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0 ,0 ,0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1

    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    recentItemIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20

    }

});