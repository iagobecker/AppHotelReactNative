import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import C from "./style";

import { useStateValue } from "../../contexts/StateContext";
import api from "../../services/api";

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [loading, steLoading] = useState(true);

  useEffect(() => {
    const checkPropertySel = async () => {
      let property = await AsyncStorage.getItem("property");
      if (property) {
        property = JSON.parse(property);
        await chooseProperty(property);
        //Escolher hotel
      }
      steLoading(false);
    };
    checkPropertySel();
  }, []);

  const handleLogoutButton = async () => {
    await api.logout();
    navigation.reset({
      index: 1,
      routes: [{ name: "LoginScreen" }],
    });
  };

  const chooseProperty = async (property) => {
    await AsyncStorage.setItem("property", JSON.stringify(property));

    dispatch({
      type: "setPropert",
      payload: {
        property,
      },
    });

    navigation.reset({
      index: 1,
      routes: [{ name: "MainDrawer" }],
    });
  };

  return (
    <C.Container>
      <C.Scroller>
        {loading && <C.LoadingIcon color="#2e406b" size="large" />}
        {!loading && context.user.user.properties.length > 0 && (
          <>
            <C.HeadTitle>Olá {context.user.user.name}</C.HeadTitle>
            <C.HeadTitle>Escolha um de seus hoteis</C.HeadTitle>

            <C.PropertyList>
              {context.user.user.properties.map((item, index) => (
                <C.ButtonArea key={index} onPress={() => chooseProperty(item)}>
                  <C.ButtonText>{item.name}</C.ButtonText>
                </C.ButtonArea>
              ))}
            </C.PropertyList>
          </>
        )}
        {!loading && context.user.user.properties.length <= 0 && (
          <C.BigArea>
            <C.HeadTitle>
              {context.user.user.name}, parabéns pelo cadastro.
            </C.HeadTitle>
            <C.HeadTitle>
              Agora a administração precisa liberar seu acesso, Após ser
              liberado fique a vontada para explorar e encontrar seu hotel ideal
            </C.HeadTitle>
          </C.BigArea>
        )}
      </C.Scroller>
      <C.ExitButtonArea onPress={handleLogoutButton}>
        <C.ExitButtonText>Sair</C.ExitButtonText>
      </C.ExitButtonArea>
    </C.Container>
  );
};
