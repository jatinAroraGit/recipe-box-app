import * as React from 'react';
import { useState, useEffect } from 'react';

import { View, StyleSheet, Platform, Text, Dimensions, KeyboardAvoidingView, TouchableHighlight, ProgressViewIOSComponent } from 'react-native';
import { Button, TextInput, Title, Subheading, Provider, Modal, Portal, Card } from 'react-native-paper';

export default function CookbookModal(props) {
  const [modalVisible, setModalVisible] = useState(props.show);
  // initially should be false.

  useEffect(()=> {
    setModalVisible(props.show);
    console.log(props.show);
    console.log(modalVisible);
  }, [])

  return (
    <Provider>
      <Portal>
        <Modal dismissable={false} visible={props.show} contentContainerStyle={styles.modalStyle}>
          {console.log('ModalVisible in visible', modalVisible)}
          <View >
            <Card.Content>
              <Title style={{ fontSize: 30 }}>Cookbook List</Title>
              <Subheading style={{ fontSize: 20, color: '#000000', marginTop: 10 }}>You need to verify your account to proceed further</Subheading>
              <Subheading style={{ fontSize: 20, color: '#E91E63', marginTop: 10 }}>A verification email has been sent to your email.</Subheading>
              <Subheading style={{ fontSize: 20, color: '#E91E63', marginTop: 10 }}>Email:</Subheading>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  // props.show = false;
                  setModalVisible(!modalVisible);
                  {console.log('ModalVisible when user clicks hide', modalVisible)}
                }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
              {/* <Button style={{ backgroundColor: '#C62828' }} color='#FF00FF' mode="contained">Close and ReLogin </Button> */}
            </Card.Content>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  label: {
    color: '#FFFFFF',
    margin: 20,
    marginLeft: 0
  },
  button: {
    marginTop: 40,
    height: 20,
    backgroundColor: '#1DE9B6',
    borderRadius: 4
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 3,
    padding: 8,
    backgroundColor: '#263238',
    borderRadius: 10,
    height: 'auto',
    ...Platform.select({
      ios: {
        width: 320
      },
      web: {
        width: ((Dimensions.get('window').width) < 500) ? ((Dimensions.get('window').width) - 50) : 600,
      },
      android: {
        width: 320
      },
    })
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    height: 30,
    padding: 5,
    borderRadius: 4,
  },
  modalStyle: {
    flex: 3,
    justifyContent: 'center',
    paddingTop: 3,
    padding: 8,
    backgroundColor: '#FFFFFF',

    ...Platform.select({
      ios: {
        //  width: (Dimensions.get('screen').width - 50),
        // height: (Dimensions.get('screen').height - 50)
      },
      web: {
        width: (Dimensions.get('window').width - 50),
        height: (Dimensions.get('window').height - 50)
      },
      android: {
        // width: (Dimensions.get('screen').width - 50),
        // height: (Dimensions.get('screen').height - 50)
      },
    })
  }
});