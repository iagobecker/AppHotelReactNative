import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import C from "./style";
import { Icon } from "@rneui/themed";
import { launchCameraAsync } from "expo-image-picker";
//import { launchCamera } from "react-native-image-picker";
import { useStateValue } from "../../contexts/StateContext";
import api from "../../services/api";

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [warnText, setWarnText] = useState("");
  const [photoList, setPhotoList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Adicionar uma Ocorrência",
    });
  }, []);

  const handleAddPhoto = async () => {
    launchCameraAsync(
      {
        mediaType: "photo",
        maxWidth: 1280,
      },
      async (response) => {
        if (!response.canceled) {
          setLoading(true);
          let result = await api.addWarningFile(response);
          setLoading(false);
          if (result.error === "") {
            let list = [...photoList];
            list.push(result.photo);
            setPhotoList(list);
          } else {
            alert(result.error);
          }
        }
      }
    );
  };

  const handleDelPhoto = (url) => {
    let list = [...photoList];
    list = list.filter((value) => value !== url);
    setPhotoList(list);
  };

  return (
    <C.Container>
      <C.Scroller>
        <C.Title>Descreva a Ocorrência </C.Title>
        <C.Field
          placeholder="Ex: Este móvel está com defeito."
          value={warnText}
          onChangeText={(t) => setWarnText(t)}
        />

        <C.Title>Fotos Relacionadas</C.Title>
        <C.PhotoArea>
          <C.PhotoScroll horizontal={true}>
            <C.PhotoAddButton onPress={handleAddPhoto}>
              <Icon name="photo-camera" size={24} color="#000" />
            </C.PhotoAddButton>
            {photoList.map((item, index) => (
              <C.PhotoItem key={index}>
                <C.Photo source={{ uri: item }} />
                <C.PhotoRemoveButton onPress={() => handleDelPhoto(item)}>
                  <Icon name="remove" size={16} color="#ff0000" />
                </C.PhotoRemoveButton>
              </C.PhotoItem>
            ))}
          </C.PhotoScroll>
        </C.PhotoArea>
        {loading && <C.LoadingText>Enviando foto. Aguarde.</C.LoadingText>}

        <C.ButtonArea onPress={null}>
          <C.ButtonText>Salvar</C.ButtonText>
        </C.ButtonArea>
      </C.Scroller>
    </C.Container>
  );
};
