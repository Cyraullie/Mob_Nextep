import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground, Dimensions, Platform } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { TouchableOpacity } from "react-native-gesture-handler";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { BASE_URL } from "@env"
import * as ImagePicker from 'expo-image-picker';

const FormData = require('form-data');

export default function PhotoScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null);
  const [userToken, setUserToken] = useState(null)

  let camera;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');

      setUserToken(await SecureStore.getItemAsync("user_token"))
    })();
    
  }, []);
  
  const takePicture = async () => {
    const options = { quality: 0.7 };
    if(!camera) return
    const photo = await camera.takePictureAsync(options)

    setPreviewVisible(true)
    setCapturedImage(photo)    
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setPreviewVisible(true)
      setCapturedImage(result)
    }
  };  

  const retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
  }

  const savePhoto = () => {
    const data = new FormData(),
    filename = capturedImage.uri.split("/").pop()

    let picture = {}

    if(Platform.OS === 'ios'){
      //TODO save photo on ios doesn't work for picture take now
      console.log("ios")
      console.log(capturedImage)  
      
      picture = {
        uri: capturedImage.uri,
        type: "image/jpg",
        name: filename
      }
    }else if(Platform.OS === 'android') {
      console.log("android")
      console.log(capturedImage) 
      picture = {
        uri: capturedImage.uri,
        type: "image/jpeg",
        name: filename
      }
    }




    data.append('photo', picture);


    console.log(Platform.OS)
    console.log(data)

    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", 
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + userToken,
      },   
    };

    axios.post(BASE_URL + "profile/photo", data, config)
    .then(() => {
      props.navigation.reset({
        index: 0,
        routes: [{ name: 'EditProfile'}], 
    })})
  }

  const CameraPreview = ({photo, savePhoto, retakePicture}) => {
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          marginTop: "auto",
          marginBottom: "auto"
        }}
      >
        <ImageBackground
          
          source={{uri: photo && photo.uri}}
          style={{
            width: "100%",
            aspectRatio: 2 / 3,
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
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={pickImage}>
          <Image style={styles.littleButton} source={require("../../assets/picture.png") } />
        </TouchableOpacity>
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
