import React, { useState } from "react";
import styled from "styled-components/native";
import { Icon, Tile } from "@rneui/themed";
import { Linking } from "react-native";

import api from "../services/api";

const Box = styled.TouchableOpacity`
  background-color: #fff;
  border-width: 2px;
  border-color: #2e406b;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
`;
const Title = styled.Text`
  font-size: 15px;
  color: #000;
  margin-left: 10px;
`;

export default ({ data }) => {
  const handleClick = async () => {
    const supported = await Linking.canOpenURL(data.fileurl);
    if (supported) {
      await Linking.openURL(data.fileurl);
    }
  };

  return (
    <Box onPress={handleClick}>
      <Icon name="description" size={35} color="#2e406b" />
      <Title>{data.title}</Title>
    </Box>
  );
};
