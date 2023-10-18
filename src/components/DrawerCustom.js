import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import { Icon } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

import { useStateValue } from "../contexts/StateContext";

const DrawerArea = styled.View`
  flex: 1;
  background-color: #fff;
`;

const DrawerLogoArea = styled.View`
  padding: 10px 20px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const DrawerLogo = styled.Image`
  width: 200px;
  height: 200px;
  top: 1px;
  left: 16px;
`;

const DrawerScroller = styled.ScrollView`
  flex: 1;
  margin: 20px 0;
`;

const ChangeUnitArea = styled.View`
  margin: 10px;
`;

const ChangeUnitButton = styled.TouchableOpacity`
  background-color: #2e406b;
  padding: 12px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const ChangeUnitButtonText = styled.Text`
  color: #fff;
  font-size: 15px;
  font-weight: bold;
`;

const FooterArea = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FooterInfo = styled.View``;

const FooterProfile = styled.Text`
  font-size: 15px;
  color: #000;
`;

const FooterUnitText = styled.Text`
  font-size: 15px;
  color: #666e78;
`;

const FooterUnitButton = styled.TouchableOpacity``;
const MenuButton = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 5px;
  border-radius: 5px;
  align-items: center;
`;
const MenuSquare = styled.View`
  width: 5px;
  height: 35px;
  margin-left: 20px;
  background-color: transparent;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
`;
const MenuButtonText = styled.Text`
  font-size: 15px;
  margin-left: 10px;
  color: #666e78;
`;

export default (props) => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();
  const [dataLoaded, setDataLoaded] = useState(false);

  const menus = [
    { title: "Mural de Avisos", icon: "inbox", screen: "WallScreen" },
    { title: "Documentos", icon: "folder", screen: "DocumentScreen" },
    { title: "Reservas", icon: "event", screen: "ReservationScreen" },
    {
      title: "Livro de Ocorrências",
      icon: "book",
      screen: "WarningScreen",
    },
    {
      title: "Achados e Perdidos",
      icon: "search",
      screen: "FoundAndLostScreen",
    },
    { title: "Boletos", icon: "description", screen: "BilletScreen" },
    { title: "Perfil", icon: "people", screen: "ProfileScreen" },
  ];

  const handleChangeUnit = async () => {
    await AsyncStorage.removeItem("property");
    navigation.reset({
      index: 1,
      routes: [{ name: "ChoosePropertyScreen" }],
    });
  };

  const handleLogoutButton = async () => {
    await api.logout();
    navigation.reset({
      index: 1,
      routes: [{ name: "LoginScreen" }],
    });
  };

  useEffect(() => {
    async function loadAssetsAsync() {
      // Carregando a fonte MaterialIcons
      await Font.loadAsync({
        MaterialIcons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf"),
      });
      // Marcar que os dados estão carregados
      setDataLoaded(true);
    }
    // Carregar as fontes e outros recursos assincronamente
    loadAssetsAsync();
  }, []);

  if (!dataLoaded) {
    return null; // Ou qualquer componente de carregamento que você desejar
  }

  return (
    <DrawerArea>
      <DrawerLogoArea>
        <DrawerLogo
          source={require("../assets/vega.png")}
          resizeMode="contain"
        />
      </DrawerLogoArea>
      <DrawerScroller>
        {menus.map((menuItem, index) => (
          <MenuButton
            key={index}
            onPress={() => navigation.navigate(menuItem.screen)}
          >
            <MenuSquare></MenuSquare>
            <Icon name={menuItem.icon} size={20} color="#2e406b" />
            <MenuButtonText>{menuItem.title}</MenuButtonText>
          </MenuButton>
        ))}
        <MenuButton onPress={handleLogoutButton}>
          <MenuSquare></MenuSquare>
          <Icon name="logout" size={20} color="#2e406b" />
          <MenuButtonText>Sair</MenuButtonText>
        </MenuButton>
      </DrawerScroller>
      <ChangeUnitArea>
        <ChangeUnitButton onPress={handleChangeUnit}>
          <ChangeUnitButtonText>Trocar Unidade</ChangeUnitButtonText>
        </ChangeUnitButton>
      </ChangeUnitArea>
      <FooterArea>
        <FooterInfo>
          <FooterProfile>Olá {context.user.user.name}</FooterProfile>
          <FooterUnitText>Hotel {context.user.property.name}</FooterUnitText>
        </FooterInfo>
        <FooterUnitButton onPress={() => navigation.navigate("UnitScreen")}>
          <Icon name="settings" size={24} color="#666e78" />
        </FooterUnitButton>
      </FooterArea>
    </DrawerArea>
  );
};
