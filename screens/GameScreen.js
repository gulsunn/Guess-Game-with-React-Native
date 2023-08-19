import { StyleSheet, Text, TextInput, View } from 'react-native'
import { useEffect, useState, useCallback, useContext } from 'react'
import IconButton from '../components/common/icon-button'
import Header from '../components/common/header'
import Card from '../components/common/card'
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Spacer from '../components/common/spacer'
import colors from '../constants/colors'
import gameRules from '../constants/game-rules'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import GameContext from '../store'

const GameScreen = () => {
  const context = useContext(GameContext);
  const navigation = useNavigation();

  const {
    shotCount,
    randomNumber,
    timer,
    setGameResult,
    setShotCount,
    setRandomNumber,
    setTimer,
    setPoint,
  } = context;



  const [number, setNumber] = useState("");


  useFocusEffect(
    useCallback(
      () => {

        // resetlemeler
        setTimer(gameRules.totalTime);
        setShotCount(gameRules.totalShot);
        setPoint(0);

        // rastgele sayı oluştur
        const rn =
          Math.floor(Math.random() * (gameRules.upLimit - gameRules.downLimit) + gameRules.downLimit);

        setRandomNumber(rn);

        // süreyi başlat
        const interval = setInterval(() => {
          setTimer((prev) => prev - 1);

        }, 1000);

        return () => {
          clearInterval(interval);
        };
      }, [])
  );

  useEffect(() => {
    if (timer <= 0) {
      endGame("lost");
    }

    return () => { }
  }, [timer]);


  const guess = () => {
    if (number.length === 0) { // tahmin kısmı boş mu
      console.log("BİR TAHMİN YAP!");
      Toast.show({ text1: "Tahmin kısmı boş bırakılamaz.", position: "bottom" });
    }
    else {
      if (number == randomNumber) { // doğru bildi
        endGame("win");
      }
      else { // yanlış
        if (shotCount - 1 === 0) { // can kaldı mı kontrolü
          setShotCount(0);

          endGame("lost");
        }
        else {
          if (number < randomNumber) {
            Toast.show({ text1: "Daha büyük bir tahmin yap.", position: "bottom" });
          }
          else {
            Toast.show({ text1: "Daha küçük bir tahmin yap.", position: "bottom" });
          }
          setShotCount(shotCount - 1);
        }
      }

      // inputu temizle
      setNumber("");
    }
  }

  const endGame = (result) => {
    setGameResult(result);
    setPoint(timer * shotCount);

    navigation.navigate("Summary");
  }

  return (
    <View>
      {/* <Header
        title={"Guess the Number"}
      /> */}

      <Spacer />

      <View style={styles.cardsLine} gap={20}>
        <Card>
          <View style={{
            flexDirection: "row", justifyContent: "center", alignItems: "center"
          }}>
            <Icon name='timer-outline' />
            <Text>{timer}</Text>
          </View>
        </Card>

        <Card>
          <View style={{
            flexDirection: "row", justifyContent: "center", alignItems: "center"
          }}>
            <Icon name='heart' />
            <Text>{shotCount}</Text>
          </View>
        </Card>
      </View>

      <Spacer size={40} />


      <Card style={{ marginHorizontal: 40 }}>
        <Text style={{ textAlign: "center" }}>Select a Number</Text>
        <TextInput
          style={styles.input}
          value={number}
          onChangeText={(text) => setNumber(text)}
          onSubmitEditing={guess}
          keyboardType='number-pad'
        />
        <Spacer />
        <IconButton
          title="Guess"
          onPress={guess}

        />
      </Card>



      {/* <IconButton
        title="Geri"
        onPress={() => setGameStatus("welcome")}
      /> */}


    </View>
  )
}

export default GameScreen

const styles = StyleSheet.create({
  cardsLine: {
    flexDirection: "row",
    justifyContent: "center"
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.bgColor,
    fontSize: 24,
    padding: 10,
  }
})