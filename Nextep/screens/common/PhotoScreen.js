import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, Dimensions } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { TouchableOpacity } from "react-native-gesture-handler";

import APIKit from "../../components/Api";
const FormData = require('form-data');

export default function PhotoScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null);
  let camera;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    const options = { quality: 0.7 };
    if(!camera) return
    const photo = await camera.takePictureAsync(options)
    setPreviewVisible(true)
    setCapturedImage(photo)
  }

  const retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
  }

  const savePhoto = () => {
    const data = new FormData(),
          filename = capturedImage.uri.split("/").pop()

    let picture = {
      uri: capturedImage.uri,
      type: "image/jpeg",
      name: filename
    }
    data.append('photo', picture);

    APIKit.updatePhoto(data).then(res => {props.navigation.reset({
      index: 0,
      routes: [{ name: 'EditProfile'}], 
    })})
  }

  const CameraPreview = ({photo, savePhoto, retakePicture}) => {
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          width: '100%',
          height: '100%',
        }}
      >
        <ImageBackground
          
          source={{uri: photo && photo.uri}}
          style={{
            width: "100%",
            aspectRatio: 2 / 3,
            marginTop: 100
          }}
        />
        <View style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            height: 50
          }}>
          <TouchableOpacity
            onPress={retakePicture}
            style={styles.previewButton}>
            <Text style={{color: "#FFFFFF"}}>refaire</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={savePhoto}
            style={styles.previewButton}>
            <Text style={{color: "#FFFFFF"}}>utiliser</Text>
          </TouchableOpacity>
          </View>
      </View>
    )
  }


  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {previewVisible && capturedImage ? (
        <CameraPreview photo={capturedImage}  savePhoto={savePhoto} retakePicture={retakePicture}/>
      ) : (
        <>
        <View style={styles.buttonBack}>
          <TouchableOpacity 
            style={styles.littleButton}
            onPress={() => {props.navigation.reset({
              index: 0,
              routes: [{ name: 'EditProfile'}], 
            })}}>
            <Image style={styles.littleButton} source={require("../../assets/back-arrow.png") } />
          </TouchableOpacity>
        </View>
        <Camera
          style={styles.cameraStyle}
          type={CameraType.front}
          ref={(r) => {
            camera = r
          }}
        />
        <View style={styles.button}>
          <TouchableOpacity 
            style={styles.littleButton}
            onPress={takePicture}>
            <Image style={styles.littleButton} source={require("../../assets/camera.png") } />
          </TouchableOpacity>
          </View>
        </>
          )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  previewButton: {
    backgroundColor: 'blue',
    width: (Dimensions.get('window').width / 2) - 2,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  cameraStyle: {
    width: "100%",
    aspectRatio: 2 / 3,
    marginTop: "auto",
    marginBottom: "auto"
  },
  littleButton: {
    height: 51,
    width: 58
  },  
  button: {
    flexDirection: "row",
    marginRight: 10,
    marginTop: 10,
    justifyContent: "center"
  },
  buttonBack: {
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 40,
    marginBottom: 10,
    justifyContent: "flex-start"
  }
});
