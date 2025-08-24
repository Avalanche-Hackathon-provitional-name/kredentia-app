import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Componente temporal simple para mostrar las pantallas
const TempScreen = ({ title }: { title: string }) => (
  <View style={styles.tempContainer}>
    <Text style={styles.tempTitle}>{title}</Text>
    <Text style={styles.tempSubtitle}>Esta pantalla estará disponible próximamente</Text>
  </View>
);

const AppNavigator = () => {
  return (
    <TempScreen title="KredentiaApp - Credenciales Digitales" />
  );
};

const styles = StyleSheet.create({
  tempContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  tempTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4ECDC4',
    textAlign: 'center',
    marginBottom: 16,
  },
  tempSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default AppNavigator;
