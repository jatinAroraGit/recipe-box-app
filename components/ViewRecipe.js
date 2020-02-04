import React from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";

function ViewRecipe(props) {
  return (
    <ScrollView>
      <Image style={styles.cardImage} source={this.props.item.url}    />
      <Text>{props.item.title}</Text>

      {/*as we are not using class, we are not allowed to use 'this'*/}

      <Text>Hi</Text>
      <Button title="Save"></Button>
      <Button title="Download"></Button>
      <Button title="Print"></Button>

      <Title>Ingredients</Title>

      <Title>Directions</Title>
      <Button title="Save"></Button>
      <Button title="Download"></Button>
      <Button title="Print"></Button>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginBottom: 10,
    marginLeft: "2%",
    width: "96%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 3,
      height: 3
    }
  },
  cardImage: {
    width: 80,
    height: 60,
    borderRadius: 10,
    alignItems: "center"
    //resizeMode:'cover'
  },
  cardText: {
    padding: 10,
    fontSize: 16
  },
  title: {
    alignItems: "flex-start",
    top: -10
  }
});

export default ViewRecipe;
