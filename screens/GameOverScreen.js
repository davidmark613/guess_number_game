import { View, Image, StyleSheet, Text, useWindowDimensions, ScrollView } from "react-native";
import { Title } from "../components/ui/Title";
import { Colors } from "../utils/colors";
import { PrimaryButton } from "../components/ui/PrimaryButton";

export function GameOverScreen({ rounds, userNumber, onRestart }) {
  const { width, height } = useWindowDimensions();

  let imageSize = 300;

  if (width < 380) {
    imageSize = 150;
  }

  if (height < 380) {
    imageSize = 80;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>GAME OVER!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            style={styles.image}
            source={require("../assets/images/success.png")}
          />
        </View>
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.highlight}>{rounds}</Text>{" "}
          rounds to guess the number{" "}
          <Text style={styles.highlight}>{userNumber}</Text>.
        </Text>
        <PrimaryButton onPress={onRestart}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },  
  rootContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: Colors.primary800,
    margin: 36,

  },
  image: {
    width: '100%',
    height: '100%',
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500,
  },
});
