import React from 'react';
//import ViewRecipe from '../component/ViewRecipe';


import { Title, Headline, Subheading, Surface, Button, Drawer, Appbar } from 'react-native-paper';
import { Image, ImageBackground, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import TopNavbar from '../components/TopNavbar';

export default function ViewRecipeScreen() {
  return (
    <SafeAreaView style={{ flex: 3 }}>
      <TopNavbar title='Not Found'></TopNavbar>
      <ScrollView>
        <Title style={{ margin: 10 }}>Not Found. Check back later.</Title>
      </ScrollView>
    </SafeAreaView>
  );
}

ViewRecipeScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});