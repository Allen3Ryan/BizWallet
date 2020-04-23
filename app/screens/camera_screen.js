import React from 'react';
import {
  TouchableOpacity,
  View,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {RNCamera as Camera} from 'react-native-camera';
import RNTextDetector from 'react-native-text-detector';

import style, {screenHeight, screenWidth} from '../styles';

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

  /**
   * reset
   *
   * Handles error situation at any stage of the process
   *
   * @param {string} [error="OTHER"]
   * @memberof App
   */
  reset(error = 'OTHER') {
    this.setState(
      {
        loading: false,
        image: null,
        error,
      },
      () => {
        // setTimeout(() => this.camera.startPreview(), 500);
      },
    );
  }

  /**
   * takePicture
   *
   * Responsible for getting image from react native camera and
   * starting image processing.
   *
   * @param {*} camera
   * @author Zain Sajjad
   */
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

  /**
   * processImage
   *
   * Responsible for getting image from react native camera and
   * starting image processing.
   *
   * @param {string} uri              Path for the image to be processed
   * @param {object} imageProperties  Other properties of image to be processed
   * @memberof App
   * @author Zain Sajjad
   */
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
    this.setState({
      visionResp: this.mapVisionRespToScreen(visionResp, imageProperties),
    });

    this.props.navigation.navigate('ContactConfirm', {
      name: name,
      email: email,
      phone_number: phone_number,
    });
  };

  /**
   * mapVisionRespToScreen
   *
   * Converts RNTextDetectors response in representable form for
   * device's screen in accordance with the dimensions of image
   * used to processing.
   *
   * @param {array}  visionResp       Response from RNTextDetector
   * @param {object} imageProperties  Other properties of image to be processed
   * @memberof App
   */
  mapVisionRespToScreen = (visionResp, imageProperties) => {
    const IMAGE_TO_SCREEN_Y = screenHeight / imageProperties.height;
    const IMAGE_TO_SCREEN_X = screenWidth / imageProperties.width;

    return visionResp.map((item) => {
      return {
        ...item,
        position: {
          width: item.bounding.width * IMAGE_TO_SCREEN_X,
          left: item.bounding.left * IMAGE_TO_SCREEN_X,
          height: item.bounding.height * IMAGE_TO_SCREEN_Y,
          top: item.bounding.top * IMAGE_TO_SCREEN_Y,
        },
      };
    });
  };

  /**
   * React Native render function
   *
   * @returns ReactNode or null
   * @memberof App
   */
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
        {this.state.image ? (
          <ImageBackground
            source={{uri: this.state.image}}
            style={style.imageBackground}
            key="image"
            resizeMode="cover">
            {this.state.visionResp.map((item) => {
              return (
                <TouchableOpacity
                  style={[style.boundingRect, item.position]}
                  key={item.text}
                />
              );
            })}
          </ImageBackground>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});
