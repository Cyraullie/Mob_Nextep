import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ImageBackground } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { TouchableOpacity } from "react-native-gesture-handler";

import APIKit from "../../components/Api";

export default function PhotoScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null);
  let camera;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    const options = { quality: 0.7 };
    if(!camera) return
    const photo = await camera.takePictureAsync(options)
    console.log(photo)
    setPreviewVisible(true)
    setCapturedImage(photo)
  }

  const retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
  }

  const __savePhoto = () => {
    MediaLibrary.saveToLibraryAsync(capturedImage.uri).then(() => {
      setPhoto(undefined);
    });
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
            flex: 1,
            justifyContent: "flex-end"
          }}
        >
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
          marginLeft: 10,
          marginRight: 10,
        }}>
        <TouchableOpacity
          onPress={retakePicture}>
          <Text style={{color: "#FFFFFF"}}>refaire</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={savePhoto}>
          <Text style={{color: "#FFFFFF"}}>utiliser</Text>
        </TouchableOpacity>
        </View>
        </ImageBackground>
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
        <CameraPreview photo={capturedImage}  savePhoto={__savePhoto} retakePicture={__retakePicture}/>
      ) : (
        <>
          <Camera
            style={StyleSheet.absoluteFillObject}
            type={CameraType.front}
            ref={(r) => {
              camera = r
            }}
          />
          <View style={styles.button}>
          <TouchableOpacity 
            style={styles.littleButton}
            onPress={() => {props.navigation.reset({
              index: 0,
              routes: [{ name: 'EditProfile'}], 
            })}}>
            <Image style={styles.littleButton} source={require("../../assets/back-arrow.png") } />
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
  littleButton: {
    height: 50,
    width: 58
  },  
  button: {
    flexDirection: "row",
    marginRight: 10,
    marginTop: 30,
    justifyContent: "flex-end"
  }
});
