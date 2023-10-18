import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import C from "./style";
import { Icon } from "@rneui/themed";

import { useStateValue } from "../../contexts/StateContext";
import api from "../../services/api";

import WarningItem from "../../components/WarningItem";

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  const [loading, steLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Livro de Ocorrências",
      headerRight: () => (
        <C.AddButton onPress={() => navigation.navigate("WarningAddScreen")}>
          <Icon name="add" size={35} color="#000" />
        </C.AddButton>
      ),
    });
    getWarnings();
  }, []);

  const getWarnings = async () => {
    setList([]);
    steLoading(true);
    const result = await api.getWarnings();
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
          <C.NoListText>Não há Ocorrências neste Hotel.</C.NoListText>
        </C.NoListArea>
      )}
      <C.List
        data={list}
        onRefresh={getWarnings}
        refreshing={loading}
        renderItem={({ item }) => <WarningItem data={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </C.Container>
  );
};
