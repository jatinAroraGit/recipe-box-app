import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, Button, Switch, Platform, Dimensions } from "react-native";
import { FAB, Title, Headline, Subheading, Surface, Card } from 'react-native-paper';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
// import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import MyView from './MyView';

function ViewRecipe({ navigation, recipeDetail }) {
    recipeDetail = JSON.parse(recipeDetail.props);
    // console.log('navigation in ViewRecipe - start');
    // console.log(navigation);
    // console.log('navigation in ViewRecipe - end')

    console.log('Showing the id of the recipe - start');
    console.log(recipeDetail)
    console.log('Showing the id of the recipe - end')

    //const baseUri = `https://spoonacular.com/recipeImages/`;
    const [iconName, setIconName] = useState('playlist-plus');
    const [ingred, setIngred] = useState([]); //setIngred is such a '=' sign to connect ingred and ingredientsArray to pass the ingredientsArray to ingred.
    const [step, setStep] = useState([]);
    let [noSteps, setNoSteps] = useState(false);
    const [prepareMinute, setPrepareMinute] = useState(0);
    const [healthScore, setHealthScore] = useState(0);
    const [cookingMinute, setCookingMinute] = useState(0);
    var ingredientsArray = [];
    var stepArray = [];
    var noInstruction = true;
    // let noSteps = false;

    useEffect(() => {
        console.log('useEffect has been called');
        console.log(recipeDetail);
        let ingredients = "apples,+flour,+sugar"
        let apiKey = require('../configure/apiKey.json');
        let recipeId = recipeDetail.id;
        if (ingredients) {
            console.log('If statement is called');
            // axios.get('https://api.spoonacular.com/recipes/495111/information?apiKey=5c0548b90b2f4c1aa183c5b455dea8da')

            //axios.get('https://api.spoonacular.com/recipes/' + recipeId + '/analyzedInstructions?apiKey=' + apiKey.key) //Need to change the id and apiKey
            axios.get('https://api.spoonacular.com/recipes/' + recipeId + '/information?apiKey=' + apiKey.key)
                .then(res => {
                    console.log('Receipe API is called');
                    const prepareMin = res.data.preparationMinutes;
                    setPrepareMinute(prepareMin)
                    const hScore = res.data.healthScore;
                    setHealthScore(hScore);
                    const cookingMin = res.data.cookingMinutes;
                    setCookingMinute(cookingMin);
                    const ingredients = res.data.extendedIngredients;
                    console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
                    console.log(ingredients);
                    extractIngredients(ingredients)

                    if (res.data.analyzedInstructions.length != 0) {
                        const info = res.data.analyzedInstructions[0].steps;
                        extractRecipeInformation(info);
                        // console.log('HAS STUFF')
                    } else {
                        setNoSteps(() => {
                            noSteps = true;
                        });
                        console.log(noSteps);
                        console.log('Hi bro');
                    }

                    // console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
                    // console.log(res.data.preparationMinutes);



                })
        }


    }, []);

    const extractRecipeInformation = (info) => {


        for (let i = 0; i < info.length; i++) {
            stepArray.push(info[i].step);
            // console.log(info[i].step);
        }

        setStep(stepArray);



    };

    const extractIngredients = (ingreds) => {

        for (let i = 0; i < ingreds.length; i++) {
            ingredientsArray.push(

                {
                    id: ingreds[i].id,
                    name: ingreds[i].name,
                    count: 0

                }

            );
        }
        // console.log(`YOOOOOO`)
        // console.log(ingredientsArray)

        // for (let i = 0; i < ingreds.length; i++) {
        //     for (let j = 0; j < ingreds[i].ingredients.length; j++) {
        //         ingreds[i].ingredients[j].count = 0;
        //         ingredientsArray.push(ingreds[i].ingredients[j]); //IngredientsArray currently holds a collection of ingredients' objects
        //     }
        // }

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
        } else {
            console.log('Hey you should pick at least one of the ingredients.');
        }

        return JsonObject;

    }

    const addToList = () => {
        if (iconName == 'bookmark-plus')
            setIconName('bookmark-check');
        else
            setIconName('bookmark-plus');

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
                        <Image source={{ uri: recipeDetail.image }} style={styles.image} resizeMode="center"></Image>
                    </View>
                    <View style={styles.dm}>
                        <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
                    </View>
                    <View style={styles.active}></View>
                    <View style={styles.add}>
                        <FAB icon={iconName} small={false} size={48} color="#DFD8C8" onPress={addToList} style={{ marginTop: 6, marginLeft: 2 }}> </FAB>
                        {/* <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons> */}
                    </View>
                </View>


                <View style={styles.infoContainer}>
                    <Headline style={{ color: '#000000', fontWeight: "600" }}>{recipeDetail.title}</Headline>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>World Best!</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>{prepareMinute} Min</Text>
                        <Text style={[styles.text, styles.subText]}>Prepare Minute</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFDBCB", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>{cookingMinute} Min</Text>
                        <Text style={[styles.text, styles.subText]}>Cooking Minute</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>{healthScore} Point</Text>
                        <Text style={[styles.text, styles.subText]}>Health Score</Text>
                    </View>
                </View>

                <View style={{ marginTop: 32 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {/* 
                        <View style={styles.mediaImageContainer}>
                            <Image source={{ uri: recipeDetail.image }} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../assets/images/background.jpg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../assets/images/background.jpg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../assets/images/background.jpg")} style={styles.image} resizeMode="cover"></Image>
                        </View> */}

                    </ScrollView>
                    {/* <View style={styles.mediaCount}>
                        <Text style={[styles.text, { fontSize: 24, color: "#DFD8C8", fontWeight: "300" }]}>70</Text>
                        <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" }]}>Media</Text>
                    </View> */}
                </View>

                <View style={styles.viewBoxStyle}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Headline style={{ color: '#FFFFFF', fontWeight: "600" }}>Ingredients</Headline>
                        {console.log(ingred, 'removed dupes')}
                        {ingred.map((oneIngred, index) => {
                            return (
                                <Card key={index + 1} style={styles.nestedCardStyle}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={styles.recentItemIndicator}></View>
                                        <Text style={{ color: '#000000', fontWeight: "400" }}>{oneIngred.name}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Button title='-' onPress={() => {
                                                decrementCountHandler(oneIngred);
                                            }}></Button>
                                            <Text>{oneIngred.count}</Text>
                                            <Button style={styles.buttonHover} title='+' onPress={() => {
                                                incrementCountHandler(oneIngred)
                                            }}></Button>
                                        </View>
                                    </View>
                                </Card>

                            )
                        })}

                        <Button title="View Shopping List" onPress={() => {
                            navigation.navigate('Shopping', makeJsontoObject(ingred));
                            console.log('Button is clicked');
                            console.log(ingred);
                            console.log('Bye Button');
                        }}></Button>

                    </View >
                </View>


                <View style={styles.viewBoxStyle}>
                    <MyView>
                        <Headline style={{ color: '#FFFFFF', fontWeight: "600", alignItems: 'center' }}>View Instruction</Headline>
                        {/* <Headline style={{ color: '#FFFFFF', fontWeight: "600" }}>Shopping Ingredients</Headline> */}

                        <Switch onValueChange={value => setNoSteps(value)} value={noSteps} />
                        {!noSteps ?
                            <MyView hide={!noSteps} >
                                <Text>No Instruction Included</Text>
                            </MyView>
                            // <MyView hide>
                            //     <Text>This is always hidden</Text>
                            // </MyView>
                            :
                            <MyView hide={!noSteps}>
                                {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}> */}
                                {step.map((step, index) => {
                                    return (
                                        <View key={index}>
                                            <View key={index} style={styles.nestedCardStyle}>
                                                <Text style={{ color: '#000000', fontWeight: "400"}}>{index + 1}. {step}</Text>
                                            </View>
                                        </View>
                                    )
                                })}
                            </MyView>

                        }
                    </MyView>
                </View>

                {/* {
                    noSteps ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', fontSize: 100 }}><Text>No Steps Included</Text></View> :  
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                    {step.map((step, index) => {
                        return (
                            <View key={index} style={{ flexDirection: "row" }}>
                                <Text style={[styles.text, { fontSize: 14 }]}>{index + 1}: {step}</Text>
                            </View>

                        )
                    })}
                </View>
                } */}




                <Text style={{ alignItems: "right" }, [styles.subText, styles.recent]}>Recent Activity</Text>
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
    viewBoxStyle: {
        marginTop: 10,
        backgroundColor: '#99ccff',
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
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "rgb(82, 87, 93)",
        textAlign: "center"
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
        // backgroundColor: "#41444B",
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

    },
    buttonHover: {
        color: "#CABFAB"
    }

});