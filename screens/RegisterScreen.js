import * as React from 'react';
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, StyleSheet,Button } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import RegisterForm from '../components/RegisterForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
/*
const myAsyncPDFFunction = async () => {
	try {
		const options = {
			imagePaths: imagePaths: ['/path/to/image1.png','/path/to/image2.png'],
			name: name: 'PDFName',
			maxSize: { // optional maximum image dimension - larger images will be resized
				width: 900,
				height: Math.round(deviceHeight() / deviceWidth() * 900),
			},
			quality: .7, // optional compression paramter
		};
		const pdf = await RNImageToPdf.createPDFbyImages(options);
		
		console.log(pdf.filePath);
	} catch(e) {
		console.log(e);
	}
}
*/
const baseStyle = StyleSheet.create({
  scrollViewBase: {
    elevation: 5,
    margin: 8,
    marginBottom: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 6,
    borderColor: 'transparent',
    borderTopColor: 'transparent',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  }
});

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,

    }
  }
  capturePrint = async() => {
   
    this.refs.captureView.capture().then(uri => {
      console.log("do something with ", uri);
      try {
        const options = {
          imagePaths: [uri],
          name: 'PDFName',
          maxSize: { // optional maximum image dimension - larger images will be resized
            width: 900,
            height: 1000,
          },
          quality: .7, // optional compression paramter
        };
         const pdf =  RNImageToPdf.createPDFbyImages(options);
        
        console.log(pdf.filePath);
      } catch(e) {
        console.log(e);
      }
    });
  };
  callbackFunction = (childData) => {
    this.setState({ login: childData });
    console.log("login complete!")
  }

  render() {

    return (

      <SafeAreaView style={{
        flex: 3,
      }}>
        <TopNavbar title='Register'></TopNavbar>
        <KeyboardAwareScrollView extraScrollHeight={Platform.OS === 'ios' ? 70 : 180} enableResetScrollToCoords={false} enableOnAndroid={true} o>
        <Button onPress={this.capturePrint} title="screenshot"></Button>
          <ScrollView style={baseStyle.scrollViewBase}>
        
            <View  style={{ marginStart: 10, marginTop: 10, marginEnd: 10, position: 'relative', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderRadius: 10, marginBottom: 15, overflow: "hidden" }}>


              <RegisterForm nav={this.props.navigation}></RegisterForm>

            </View>

          </ScrollView>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

RegisterScreen.navigationOptions = {
  header: null,
};
export default RegisterScreen;