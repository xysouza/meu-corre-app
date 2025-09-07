import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';

export default function AddLancamentoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Lançamento</Text>

      <TextInput 
      style={styles.input}
      placeholder="Valor (Ex: 25.50)" 
      placeholderTextColor="#888"
      keyboardType="numeric"
      />

      <TextInput
      style={styles.input}
      placeholder="Descrição (Ex: Gasolina)"
      placeholderTextColor="#888"      
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'orange',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});