import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Title, Headline, Subheading, Surface, Button, Card } from 'react-native-paper';
import { createAnimatableComponent, View } from 'react-native-animatable';
import { withNavigation } from 'react-navigation';

import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,

  SafeAreaView,
  Dimensions
} from 'react-native';
import TopNavbar from '../components/TopNavbar';
import UserProfileScreen from './UserProfileFormScreen';

const AnimatableSectionList = createAnimatableComponent(Image);

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

const customStyles = StyleSheet.create({
  defaultRounded: {
    margin: 2,
    borderWidth: 0,
    borderRadius: 10,
    padding: 4,
    height: 'auto',
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    backgroundColor: '#EC407A'
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

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props.navigation;
    return (

      <SafeAreaView style={{ flex: 3 }}>
        <TopNavbar title='Home'></TopNavbar>

        <ScrollView >

          <View style={{ flex: 3, margin: '3%', marginBottom: "1%", marginStart: '5%', marginEnd: '5%', minHeight: 400, borderWidth: 0, borderRadius: 30, overflow: "hidden" }}>

            <ImageBackground source={require('../assets/images/landingCover.jpg')} style={{ width: '100%', height: '100%', position: "absolute" }} ></ImageBackground>

            <View style={{ position: 'relative', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
              <Headline style={{ color: 'white', marginTop: 25, fontSize: 30, fontWeight: "500" }}>Recipe Box</Headline>
              <Headline>A box full of recipes for you.</Headline>
              <Image source={require('../assets/images/splash.png')} style={{ width: 200, height: 200, position: "relative" }}></Image>


              <Surface style={customStyles.defaultRounded}>
                <Text onPress={() => this.props.navigation.navigate('Login')} style={{ color: '#ffffff', fontSize: 18 }}>Create Account
     </Text>

              </Surface>

              <Text style={{ color: '#00000', fontWeight: "600", margin: 10 }}>Scroll  To Know More
     </Text>


            </View>

          </View>


          <View animation="fadeIn" style={viewChildrenStyle.sameColumn}>
            <View style={{ alignContent: "center", justifyContent: "center", alignItems: "center" }}>
              <View style={customStyles.viewBoxStyle}>
                <Headline style={{ color: '#FFFFFF', fontWeight: "600" }}>Search Recipes</Headline>
                <Title>Search recipes of different cuisine and cultures by our users </Title>
                <Card style={customStyles.nestedCardStyle}>
                  <Card.Content>
                    <Subheading style={{ justifyContent: "flex-start" }}>Search For Recipes based on the ingredients you have, cuisine of recipe or meal type</Subheading>

                  </Card.Content>
                </Card>

                <Card style={customStyles.nestedCardStyle}>
                  <Card.Content>
                    <Subheading style={{ justifyContent: "flex-start" }}>Filter recipes by  ingredients and meal type</Subheading>
                  </Card.Content>
                </Card>

              </View>
              <View style={customStyles.viewBoxStyle}>

                <Headline style={{ color: '#FFFFFF', fontWeight: "600" }}>Store Recipes</Headline>
                <Title>You won't need to manage a notebook to write any recipes ever again.</Title>

                <Card style={customStyles.nestedCardStyle}>
                  <Card.Content>
                    <Subheading style={{ justifyContent: "flex-start" }}>Store your own recipes by just simply filling out the details and pressing upload</Subheading>
                  </Card.Content>
                </Card>

                <Card style={customStyles.nestedCardStyle}>
                  <Card.Content>
                    <Subheading style={{ justifyContent: "flex-start" }}>Your recipes are stored privately and never shared with anyone else.</Subheading>
                  </Card.Content>
                </Card>
                <Card style={customStyles.nestedCardStyle}>
                  <Card.Content>
                    <Subheading style={{ justifyContent: "flex-start" }}>You can save recipes as draft.</Subheading>
                  </Card.Content>
                </Card>
              </View>
            </View>
          </View>
          <View style={viewChildrenStyle.sameColumn}>
            <View style={{ alignContent: "center", justifyContent: "center", alignItems: "center" }}>
              <View style={customStyles.viewBoxStyle}>

                <Headline style={{ color: '#FFFFFF', fontWeight: "600" }}>Share Recipes</Headline>
                <Title>Share with others on the app </Title>

                <Card style={customStyles.nestedCardStyle}>
                  <Card.Content>
                    <Subheading style={{ justifyContent: "flex-start" }}>Make your recipes available to other users by a single click.</Subheading>
                  </Card.Content>
                </Card>


                <Card style={customStyles.nestedCardStyle}>
                  <Card.Content>
                    <Subheading style={{ justifyContent: "flex-start" }}>Look at others recipe and modify it to save it as your own.</Subheading>
                  </Card.Content>
                </Card>

              </View>

            </View>
          </View>
          <View style={viewChildrenStyle.sameColumn}>


          </View>

        </ScrollView>
      </SafeAreaView>


    )
  }
};

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
export default HomeScreen;