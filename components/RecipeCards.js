import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View, Dimensions, Platform } from 'react-native';
import { Subheading, Title, Headline } from 'react-native-paper';
//import {NavigationContainer} from '@react-navigation/navigate';
//import {Thumbnail, Left, Right} from 'native-base';

export default class RecipeCards extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      baseUri: `https://spoonacular.com/recipeImages/`,
      sendItem: JSON.stringify(this.props.oneitem),
      defImage: true
      // navigation: this.props.navigation,
    }

  }
  // source={`${this.state.baseUri}${this.props.oneitem.image}`} 
  render() {


    var id = JSON.stringify(this.props.oneitem);
    return (
      <View>

        <TouchableOpacity style={(this.props.oneitem.userRecipe) ? styles.card : styles.userRecipeCard} onPress={() => this.props.navigation.navigate('ViewAdvancedRecipe', { props: id })}>

          <Text style={styles.cardTitle}>{this.props.oneitem.title}</Text>
          <View style={{ flexDirection: "row" }}>

            {this.state.defImage ? <Image source={{ uri: (this.props.oneitem.image) ? this.props.oneitem.image : "https://zabas.com/wp-content/uploads/2014/09/Placeholder-food.jpg" }} style={styles.cardImage} onError={(error) => this.setState({ defImage: false })} resizeMode="center"></Image> :
              <Image source={{ uri: "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png" }} style={styles.cardImage} resizeMode="center"></Image>
            }


            {/* <Image style={styles.cardImage} source={this.props.oneitem.image} /> */}
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.cardText}>Serving Size: {this.props.oneitem.servings}</Text>
              <Text style={styles.cardText}>Ready in minutes: {this.props.oneitem.readyInMinutes}</Text>

              <Text style={{ color: "#00BFA5", textAlign: "center", fontSize: 18, fontWeight: "500" }}>{(this.props.oneitem.userRecipe) ? "From Our User" : ""}</Text>
            </View>

          </View>

        </TouchableOpacity>

      </View>
    );
  }
}
// I don not know the reason why but when I tried to wraip the Thumbnail component with the Left component, It aligns the image on the middle of the cardlists.

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    marginLeft: '2%',
    flexWrap: 'wrap',
    alignItems: "flex-start",
    ...Platform.select({
      ios: {
        width: "auto"
      },
      android: {
        width: "auto"
      },
      web: {
        width: ((Dimensions.get('window').width) < 500) ? ((Dimensions.get('window').width) - 50) : 700,
      }
    }),
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    flexDirection: "row",
    shadowOffset: {
      width: 3,
      height: 3
    },
    padding: 4,
    //  flexDirection: "row"
  },
  userRecipeCard: {
    backgroundColor: '#F06292',
    marginBottom: 10,
    marginLeft: '2%',
    flexWrap: 'wrap',
    alignItems: "flex-start",
    ...Platform.select({
      ios: {
        width: "auto"
      },
      android: {
        width: "auto"
      },
      web: {
        width: ((Dimensions.get('window').width) < 500) ? ((Dimensions.get('window').width) - 50) : 700,
      }
    }),
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    flexDirection: "row",
    shadowOffset: {
      width: 3,
      height: 3
    },
    padding: 4,
    //  flexDirection: "row"
  },
  cardImage: {
    width: 100,
    height: 80,
    borderRadius: 10
    //resizeMode:'cover'
  },
  cardTitle: {
    padding: 10,
    fontWeight: "600",
    fontSize: 16
  },
  cardText: {
    padding: 10,
    fontSize: 16

  },
  title: {
    alignItems: 'flex-start',
    top: -10
  }
});
