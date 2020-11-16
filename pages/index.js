// @generated: @expo/next-adapter@2.1.41
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Page from './page';

export default function App() {
  function renderContent() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to Expo + Next.js 👋</Text>
      </View>
    );
  }

  return <Page content={renderContent()} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});
