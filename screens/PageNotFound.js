import React from 'react';


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
import TopNavbar from '../components/TopNavbar';
import { PulseIndicator } from 'react-native-indicators';

export default function PageNotFound() {
  return (
    <SafeAreaView style={{ flex: 3 }}>
      <TopNavbar title='Page Not Found'></TopNavbar>

      <View style={{ marginStart: 10, marginEnd: 10, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 30, overflow: "hidden" }}>
        <PulseIndicator style={{ position: "absolute" }} animating={true} size={180} color='#2196F3' />
        <Title style={{ position: "relative" }}>In Dev</Title>

      </View>



      <Headline style={{ margin: 10 }}>Not Found. Check back later.</Headline>


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