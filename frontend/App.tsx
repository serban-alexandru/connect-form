import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import ConnectForm from "./src/components/forms/ConnectForm";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ConnectForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: "500",
  },
});
