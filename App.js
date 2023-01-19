import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useEffect, useState, useCallback } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { StartGameScreen } from "./screens/StartGameScreen";
import { GameScreen } from "./screens/GameScreen";
import { GameOverScreen } from "./screens/GameOverScreen";
import { Colors } from "./utils/colors";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [userNumber, setUserNumber] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
          "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  function restartHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }

  function pickHandler(number) {
    setUserNumber(number);
    setGameIsOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  let screen = <StartGameScreen onPickNumber={pickHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        rounds={guessRounds}
        userNumber={userNumber}
        onRestart={restartHandler}
      />
    );
  }

  return (
    <>
      <StatusBar style="light"/>
      <LinearGradient
        colors={[Colors.primary800, Colors.accent500]}
        style={styles.appContainer}
        onLayout={onLayoutRootView}
      >
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          style={styles.appContainer}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.appContainer}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
