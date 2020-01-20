import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function DevScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text>Not Yet Developed</Text>

    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
