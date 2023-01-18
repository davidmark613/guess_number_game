import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../utils/colors";

export function NumberContainer({children}) {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    borderRadius: 8,
    padding: 24,
    margin: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontFamily: 'open-sans-bold',
    fontSize: 36,
    color: Colors.accent500,
  },
});