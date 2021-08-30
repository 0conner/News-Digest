import React, {useState} from 'react';
import {gql, useMutation} from '@apollo/client';
import {StyleSheet, View, Button, Alert} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const Add_Pic = gql`
  mutation addProfilePicture($id: ID!, $uri: String!) {
    addProfilePicture(id: $id, photo: $uri) {
      id
    }
  }
`;
const EditPicture = (props) => {
  const [curUri, setCurUri] = useState('');
  const [addPhoto] = useMutation(Add_Pic, {
    variables: {
      id: props.id,
      uri: curUri,
    },
  });
  const editProfilePic = () => {
    Alert.alert(
      'Edit Profile Picture',
      'Choose an Option',
      [
        {
          text: 'No photo',
          onPress: () => {
            addPhoto();
            setCurUri('');
            props.onResponse('');
          },
        },
        {
          text: 'Choose from Gallery',
          onPress: () => {
            ImagePicker.openPicker({
              width: 250,
              height: 250,
              cropping: true,
            }).then((image) => {
              setCurUri(image.path);
              addPhoto();
              props.onResponse(image.path);
            });
          },
        },
        {
          text: 'Open Camera',
          onPress: () => {
            ImagePicker.openCamera({
              width: 250,
              height: 250,
              cropping: true,
            }).then((image) => {
              setCurUri(image.path);
              addPhoto();
              props.onResponse(image.path);
            });
          },
        },
      ],
      {cancelable: true},
    );
  };
  return (
    <View style={styles.button_bottomsheet}>
      <Button
        title="Edit Profile Picture"
        onPress={editProfilePic}
        color="#fca311"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button_bottomsheet: {
    marginTop: 20,
    marginHorizontal: 10,
  },
});

export default EditPicture;