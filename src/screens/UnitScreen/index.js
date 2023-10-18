import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import C from "./style";
import { useStateValue } from "../../contexts/StateContext";
import api from "../../services/api";

import UnitPeopleSection from "../../components/UnitPeopleSection";

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [loading, steLoading] = useState(true);
  const [peopleList, setPeopleList] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const [petList, setPetList] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `Dados do Hotel (${context.user.property.name})`,
    });
    getUnitInfo();
  }, []);

  const getUnitInfo = async () => {
    steLoading(true);
    const result = await api.getUnitInfo();
    steLoading(false);
    if (result.error === "") {
      setPeopleList(result.peoples);
      setVehicleList(result.vehicles);
      setPetList(result.pets);
    } else {
      alert(result.error);
    }
  };

  return (
    <C.Container>
      <C.Scroller>
        {loading && <C.LoadingIcon color="#2e406b" size="large" />}
        {!loading && (
          <>
            <C.TitleArea>
              <C.Title>Proprietários</C.Title>
              <C.TitleAddButton onPress={null}>
                <Icon name="add" size={24} color="#000" />
              </C.TitleAddButton>
            </C.TitleArea>
            <C.ListArea>
              <UnitPeopleSection list={peopleList} />
            </C.ListArea>

            <C.TitleArea>
              <C.Title>Veículos</C.Title>
              <C.TitleAddButton onPress={null}>
                <Icon name="add" size={24} color="#000" />
              </C.TitleAddButton>
            </C.TitleArea>
            <C.ListArea></C.ListArea>

            <C.TitleArea>
              <C.Title>Pets</C.Title>
              <C.TitleAddButton onPress={null}>
                <Icon name="add" size={24} color="#000" />
              </C.TitleAddButton>
            </C.TitleArea>
            <C.ListArea></C.ListArea>
          </>
        )}
      </C.Scroller>
    </C.Container>
  );
};
