import React from "react";
import styled from "styled-components/native";
import { Icon } from "@rneui/themed";

const Box = styled.View``;
const Item = styled.View`
  background-color: #fff;
  border-width: 1px;
  border-color: #2e406b;
  border-radius: 5px;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;
const InfoArea = styled.View`
  flex: 1;
`;
const StrongText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #000;
`;
const RegularText = styled.Text`
  font-size: 14px;
  color: #9c9db9;
`;
const RemoveButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
`;

export default ({ list }) => {
  return (
    <Box>
      {list.map((item, index) => (
        <Item key={index}>
          <InfoArea>
            <StrongText>{item.name}</StrongText>
            <RegularText>Data de nascimento: {item.birthdate}</RegularText>
          </InfoArea>
          <RemoveButton onPress={null}>
            <Icon name="close" color="#ff0000" size={24} />
          </RemoveButton>
        </Item>
      ))}
    </Box>
  );
};
