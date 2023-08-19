import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Card from '../components/common/card';
import Spacer from '../components/common/spacer';
import IconButton from '../components/common/icon-button';
import colors from '../constants/colors';
import gameRules from '../constants/game-rules';
import GameContext from '../store';
import { useNavigation } from '@react-navigation/native';
import ConfettiCannon from "react-native-confetti-cannon";

const SummaryScreen = () => {
  const context = useContext(GameContext);
  const navigation = useNavigation();

  const {
    gameResult,
    shotCount,
    randomNumber,
    timer,
    setTimer,
    point,
  } = context;

  restartGame = () => {
    setTimer(gameRules.totalTime);
    navigation.navigate("Game");
  }

  return (
    <View style={{ flex: 1 }}>

      {gameResult=="win" ? <ConfettiCannon count={500} origin={{x: -10, y: 0}} explosionSpeed={500}/>: <View></View>}

      <View style={styles.content}>

        {
          gameResult === "win"
            ?
            <Text style={styles.title}>YOU WIN</Text>
            :
            <Text style={styles.title}>YOU LOST</Text>
        }

        <Card style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 28, fontWeight: "bold" }}>{point}</Text>
          <Text style={{ fontSize: 18 }}>Point</Text>
        </Card>

        <Spacer />

        <Text style={{ fontWeight: "bold" }}>Summary</Text>
        <Text>The number was: {randomNumber}</Text>
        <Text>Kalan time: {timer}/{gameRules.totalTime}</Text>
        <Text>Kalan shot: {shotCount}/{gameRules.totalShot}</Text>

        <Spacer />

        <IconButton
          title="Play Again"
          style={{ backgroundColor: colors.color2 }}
          textStyle={{ color: colors.color4 }}
          onPress={restartGame}
        />
      </View>
    </View>
  )
}

export default SummaryScreen

const styles = StyleSheet.create({
  content: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold"
  }
})