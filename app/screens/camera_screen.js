import React from 'react';
import {
  TouchableOpacity,
  View,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {RNCamera as Camera} from 'react-native-camera';
import RNTextDetector from 'react-native-text-detector';
import Dimensions from "./Dimensions"
export const screenHeight = Dimensions.screenHeight;
export const screenWidth = Dimensions.screenWidth;



const PICTURE_OPTIONS = {
  quality: 1,
  fixOrientation: true,
  forceUpOrientation: true,
};

name = '';
email = '';
phone_number = '';

export default class CameraScreen extends React.Component {
  state = {
    loading: false,
    image: null,
    error: null,
    visionResp: [],
  };

  
  takePicture = async (camera) => {
    this.setState({
      loading: true,
    });
    try {
      const data = await camera.takePictureAsync(PICTURE_OPTIONS);
      if (!data.uri) {
        throw 'OTHER';
      }
      this.setState(
        {
          image: data.uri,
        },
        () => {
          console.log('URI to be sent for processing: ', data.uri);
          this.processImage(data.uri, {
            height: data.height,
            width: data.width,
          });
        },
      );
    } catch (e) {
      console.warn(e);
      this.reset(e);
    }
  };

  
  processImage = async (uri, imageProperties) => {
    name = '';
    email = '';
    phone_number = '';
    const visionResp = await RNTextDetector.detectFromUri(uri);
    var nameCheck = 0;
    visionResp.forEach((item) => {
      if (String(item.text).includes('@')) {
        email = String(item.text);
        console.log('Email: ', email);
      }
      if (/\d\d\d\d/.test(item.text)) {
        var temp = String(item.text).replace(/\D/g, '');
        if (temp.length == 10 || temp.length == 11) {
          phone_number = temp;
          console.log('Phone Number: ', phone_number);
        }
      }
      if (String(item.text).split(/\W+/).length == 2 && nameCheck == 0) {
        name = String(item.text);
        console.log('Name: ', name);
        nameCheck = 1;
      }
    });
    if (!(visionResp && visionResp.length > 0)) {
      throw 'UNMATCHED';
    }
    

    this.props.navigation.navigate('ContactConfirm', {
      name: name,
      email: email,
      phone_number: phone_number,
    });
  };

  


  
  render() {
    return (
      <View style={style.screen}>
        {!this.state.image ? (
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            key="camera"
            style={style.camera}
            notAuthorizedView={null}
            playSoundOnCapture>
            {({camera, status}) => {
              if (status !== 'READY') {
                return null;
              }
              return (
                <View style={style.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => this.takePicture(camera)}
                    style={style.button}
                  />
                </View>
              );
            }}
          </Camera>
        ) : null}
        
      </View>
    );
  }
}

const style = StyleSheet.create({
  screen: {
    backgroundColor: 'black',
    flex: 1
  },
  camera: {
    position: "absolute",
    width: Dimensions.screenWidth,
    height: Dimensions.screenHeight,
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    left: 0,
    flex: 1
  },
  imageBackground: {
    position: "absolute",
    width: Dimensions.screenWidth,
    height: Dimensions.screenHeight,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    top: 0,
    left: 0
  },
  buttonContainer: {
    width: 70,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 35,
    position: "absolute",
    bottom: 36,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    width: 64,
    height: 64,
    backgroundColor: 'white',
    borderRadius: 32,
    borderWidth: 4,
    borderColor: 'black'
  },
  
});

