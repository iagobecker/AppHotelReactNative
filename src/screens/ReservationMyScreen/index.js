import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import C from "./style";

import { useStateValue } from "../../contexts/StateContext";
import api from "../../services/api";

import MyReservationItem from "../../components/MyReservationItem";

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [loading, steLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Minhas Reservas",
    });
    getList();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getList();
    });
    return unsubscribe;
  }, [navigation]);

  const getList = async () => {
    setList([]);
    steLoading(true);
    const result = await api.getMyReservations();
    steLoading(false);
    if (result.error === "") {
      setList(result.list);
    } else {
      alert(result.error);
    }
  };

  return (
    <C.Container>
      {!loading && list.length === 0 && (
        <C.NoListArea>
          <C.NoListText>Não há Reservas.</C.NoListText>
        </C.NoListArea>
      )}
      <C.List
        data={list}
        onRefresh={getList}
        refreshing={loading}
        renderItem={({ item }) => (
          <MyReservationItem data={item} refreshFunction={getList} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </C.Container>
  );
};
