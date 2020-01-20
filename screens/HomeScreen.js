import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {Title, Headline, Subheading, Surface, Button } from 'react-native-paper';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView
} from 'react-native';

import { MonoText } from '../components/StyledText';

const viewChildrenStyle = StyleSheet.create({
sameRow: {
  flex:1,
  margin:12,
  flexDirection:"row",
  justifyContent:"center"
  ,alignItems:"center",
  alignSelf: "center"
},

sameColumn:{
  margin:12,  
  flexDirection:"column",
  justifyContent:"center",
  alignSelf: "center"
}
});

const surfaceCustom = StyleSheet.create({
  defaultRounded: {
  margin:2,
  borderWidth:0,
  borderRadius:10,
    padding: 4,
    height: 'auto',
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    backgroundColor:'#EC407A'
  },
  surface: {
    margin:18,
    padding: 3,
    height: 'auto',
    ...Platform.select({
     ios: { width: 300 
     },
      android: { width: 300 
     },
      web: { width: 'auto' 
     }
    }),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    backgroundColor:'#FFF59D'
  },
});

export default function HomeScreen() {
  return (
     <SafeAreaView  style={{flex:3}}>
       <View style={{flex:2, margin:"3%",marginBottom:"1%",borderWidth:0, borderRadius:30, overflow:"hidden", position:"relative" }}>
        <ImageBackground source={require('../assets/images/landingCover.jpg')} style={{width: '100%', height: '190%', position:"relative" }} ></ImageBackground>
     <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
     <Headline style={{color:'white', fontSize:30, fontWeight:"500" }}>Recipe Box</Headline>
     <Headline>A box full of recipes for you.</Headline>
     <Image source={require('../assets/images/splash.png')} style={{width: 200, height: 200, position:"relative" }}></Image>
    <Surface style={surfaceCustom.defaultRounded}>
     <Text style={{color:'#ffffff'}}>Scroll Below To Know More
     </Text>
    
  </Surface>
   </View>
  
     </View>
       <ScrollView style={{flex:1}}>
      { 
        
        // <View style={{flex:3, margin:'5%', borderWidth:0, borderRadius:30,borderBottomEndRadius:30, 
      // borderBottomLeftRadius:30, overflow:'hidden', backgroundColor: '#00FF00' }}>
      }
      <View style={viewChildrenStyle.sameColumn}> 
 <Surface style={surfaceCustom.surface}>
   <Headline style={{color:'#F06292', fontWeight:"600"}}>Search Recipes</Headline>
   <Title>Search thousands of recipes from different cuisine and cultures</Title>
     <Subheading>{'\u2B24'} Search For Recipes based on the ingredients you have, author of recipes or title of dish.</Subheading>
     <Subheading>{'\u2B24'} Filter recipes by excluding any ingredients, diet, allergens and cuisine</Subheading>
     <Subheading>{'\u2B24'} Explore recipes of the day</Subheading>

  </Surface>
  <Surface style={surfaceCustom.surface}>
     <Headline style={{color:'#F06292', fontWeight:"600"}}>Store Recipes</Headline>
     <Title>You won't need to manage any notebook to write any recipes ever again.</Title>
     <Subheading>{'\u2B24'} Store your own recipes by just simply filling out the details and pressing upload</Subheading>
     <Subheading>{'\u2B24'} Your recipes are stored privately and never shared with anyone else.</Subheading>
     <Subheading>{'\u2B24'} You can save recipes as draft.</Subheading>
  </Surface>
  </View>
   <View style={viewChildrenStyle.sameColumn}> 
  <Surface style={surfaceCustom.surface}>
     <Headline style={{color:'#F06292', fontWeight:"600"}}>Share Recipes</Headline>
     <Title>Share with others on the app or send your friends a link to your dish.</Title>
     <Subheading>{'\u2B24'} Make your recipes available to other users by a single click.</Subheading>
     <Subheading>{'\u2B24'} Look at others recipe and modify it to save it as your own.</Subheading>
     <Subheading>{'\u2B24'} Rate other recipes</Subheading>
  </Surface>
  <Surface style={surfaceCustom.surface}>
 <Headline style={{color:'#F06292', fontWeight:"600"}}>Much More...</Headline>
     <Subheading>{'\u2B24'} Define your own quick filters</Subheading>
     <Subheading>{'\u2B24'} Create Cookbooks: A collection of your recipes</Subheading>
     <Subheading>{'\u2B24'} Download recipes for offline use.</Subheading>
  </Surface>
  </View>
<View style={viewChildrenStyle.sameColumn}> 
 <Button icon="magnify" mode="contained" style={{marginBottom:5}} onPress={() => console.log('Pressed')}>
    Start Searching
  </Button>
  <Button icon="comment-question" mode="contained" style={{marginBottom:5}} onPress={() => console.log('Pressed')}>
    Know More About Recipe Box
  </Button>
</View>
</ScrollView>
</SafeAreaView>

  )
  /*return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          <DevelopmentModeNotice />

          <Text style={styles.getStartedText}>Get started by opening</Text>

          <View
            style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
            <MonoText>screens/HomeScreen.js</MonoText>
          </View>

          <Text style={styles.getStartedText}>
            Change this text and your app will automatically reload.
          </Text>
        </View>

        <View style={styles.helpContainer}>
          <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>
              Help, it didn’t automatically reload!
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>
          This is a tab bar. You can edit it in:
        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <MonoText style={styles.codeHighlightText}>
            navigation/BottomNavigationBar.js
          </MonoText>
        </View>
      </View>
    </View>
  );*/
}

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
