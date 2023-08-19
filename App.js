import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import colors from './constants/colors';
import { useState } from 'react';
import GameScreen from './screens/GameScreen';
import SummaryScreen from './screens/SummaryScreen';
import gameRules from './constants/game-rules';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GameContext from "./store";

const Stack = createNativeStackNavigator();

export default function App() {
  const [gameResult, setGameResult] = useState(""); // win | lost
  const [shotCount, setShotCount] = useState(gameRules.totalShot);
  const [randomNumber, setRandomNumber] = useState();
  const [timer, setTimer] = useState(gameRules.totalTime);
  const [point, setPoint] = useState(0);

  const contextValues = {
    gameResult,
    shotCount,
    randomNumber,
    timer,
    point,
    setGameResult,
    setShotCount,
    setRandomNumber,
    setTimer,
    setPoint,
  };

  return (
    <GameContext.Provider value={contextValues}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Welcome'
          screenOptions={{ headerStyle: styles.header, headerTintColor: "white", headerTitleAlign: "center" }}
        >

          <Stack.Screen
            name='Welcome'
            component={WelcomeScreen}
            options={{ title: "Welcome to the Game" }}
          />

          <Stack.Screen
            name='Game'
            component={GameScreen}
          />

          <Stack.Screen
            name='Summary'
            component={SummaryScreen}
          />

        </Stack.Navigator>
      </NavigationContainer>

      <Toast />
    </GameContext.Provider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  header: {
    backgroundColor: colors.color1,
    padding: 20,
    alignItems: "center"
  }
});
