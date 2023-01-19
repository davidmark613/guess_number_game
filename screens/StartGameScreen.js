import { useState } from "react";
import { View, TextInput, StyleSheet, Alert, useWindowDimensions, KeyboardAvoidingView, ScrollView } from "react-native";
import { Card } from "../components/ui/Card";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { Title } from "../components/ui/Title";
import { InstructionText } from "../components/ui/InstructionText";
import { Colors } from "../utils/colors";

export function StartGameScreen({ onPickNumber }) {
  const [inputValue, setInputValue] = useState('');

  const { width, height } = useWindowDimensions();

  function changeHandler(enteredValue) {
    setInputValue(enteredValue);
  }

  function resetHandler() {
    setInputValue('');
  }

  function confirmHandler() {
    const chosenNumber = parseInt(inputValue);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99.',
        [{text: 'Okay', style: 'destructive', onPress: resetHandler}],
      );
      return;
    }

    onPickNumber(chosenNumber);
  }

  const marginTopDistance = height < 380 ? 30 : 100;
    
  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior='position'>
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={changeHandler}
              value={inputValue}
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetHandler}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmHandler}>Confirm</PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },  
  rootContainer: {
    flex: 1,
    alignItems: 'center',
  },
  numberInput: {
    height: 50,
    width: 50,
    marginVertical: 8,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
});