import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/common/header'
import gameRules from '../constants/game-rules';
import Spacer from '../components/common/spacer';
import IconButton from '../components/common/icon-button';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* <Header title={"Welcome"} /> */}

      <View style={styles.content}>
        <Text style={[styles.text, { fontWeight: "bold" }]}>Welcome to the game.</Text>

        <Text style={styles.text}>Guess the number between{" "}
          {gameRules.downLimit}-{gameRules.upLimit}{" "}
          in {gameRules.totalTime} seconds and{" "}
          you have {gameRules.totalShot} shots.</Text>

        <Spacer />

        <IconButton
          title="Start Game"
          icon="play"
          onPress={() => {
      
            navigation.navigate("Game");

          }}
        />
      </View>

    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  text: {
    textAlign: "center"
  }
})