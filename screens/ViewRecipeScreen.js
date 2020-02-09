import React from 'react';
<<<<<<< HEAD


import { Title, Headline, Subheading, Surface, Button, Drawer, Appbar } from 'react-native-paper';
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
=======
import ViewRecipe from '../component/ViewRecipe';


import { Title, Headline, Subheading, Surface, Button, Drawer, Appbar } from 'react-native-paper';
import { Image, ImageBackground, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView} from 'react-native';
>>>>>>> 56a0e331ee5b0d503b1ce37fcb362ead19f96178
import TopNavbar from '../components/TopNavbar';

export default function PageNotFound() {
  return (
    <SafeAreaView style={{flex:3}}>
  <TopNavbar title='Home'></TopNavbar>
    <ScrollView>
      <ViewRecipe style={{margin:10}}>Not Found. Check back later.</ViewRecipe>
    </ScrollView>
    </SafeAreaView>
  );
}

PageNotFound.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});