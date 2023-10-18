import styled from "styled-components/native";

export default {
  Container: styled.SafeAreaView`
    flex: 1;
    background-color: #f5f6fa;
  `,
  Scroller: styled.ScrollView`
    flex: 1;
    padding: 20px;
  `,
  LoadingIcon: styled.ActivityIndicator``,
  HeadTitle: styled.Text`
    font-size: 16px;
    color: #000;
    text-align: center;
    margin-top: 10px;
  `,
  NoListArea: styled.View`
    justify-content: center;
    align-items: center;
    padding: 30px;
  `,
  NoListText: styled.Text`
    font-size: 15px;
    color: #000;
  `,
  Title: styled.Text`
    font-size: 17px;
    padding: 10px 0;
  `,
  ButtonArea: styled.TouchableOpacity`
    background-color: #2e406b;
    padding: 12px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
  `,
  ButtonText: styled.Text`
    color: #fff;
    font-size: 15px;
    font-weight: bold;
  `,
};
