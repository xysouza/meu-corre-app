import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { COLORS, CATEGORY_ICONS, INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../constants'; 

export default function AddLancamentoScreen({ navigation }) {
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipo, setTipo] = useState('Receita'); // 'entrada' para receitas, 'saida' para despesas
  const [categoria, setCategoria] = useState(INCOME_CATEGORIES[0]);

  const handleAdicionar = async () => {
    if (!valor || !descricao) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    
    const novoLancamento = {
      id: new Date().getTime().toString(),
      valor: Math.abs(parseFloat(valor.replace(',', '.'))),
      descricao: descricao,
      tipo: tipo,
      categoria: categoria,
      icon: CATEGORY_ICONS[categoria] || 'cash',
      data: new Date(),

    };

    try {
      const lancamentosAnteriores = await AsyncStorage.getItem('lancamentos');

      const listaAnterior = lancamentosAnteriores ? JSON.parse(lancamentosAnteriores) : [];

      const novaLista = [novoLancamento, ...listaAnterior];

      await AsyncStorage.setItem('lancamentos', JSON.stringify(novaLista));

      navigation.goBack();
    } catch (error) {
      console.log('Erro ao salvar: ', error);
      alert('Ocorreu um erro ao salvar o lançamento.');
    }

  };

  const categoriasAtuais = tipo === 'Receita' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;


  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.selectorContainer}>
            <TouchableOpacity
                style={[styles.selectorButton, tipo === 'Receita' && styles.receitaActive]}
                onPress={() => {
                  setTipo('Receita');
                  setCategoria(INCOME_CATEGORIES[0]); // Reseta a categoria
                }}
            >
                <Text style={styles.selectorText}>Receita</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.selectorButton, tipo === 'Despesa' && styles.despesaActive]}
                onPress={() => {
                  setTipo('Despesa');
                  setCategoria(EXPENSE_CATEGORIES[0]); // Reseta a categoria
                }}
            >
                <Text style={styles.selectorText}>Despesa</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.amountInputContainer}>
          <Text style={styles.amountSymbol}>R$</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0,00"
            placeholderTextColor={COLORS.placeholder}
            keyboardType="numeric"
            value={valor}
            onChangeText={setValor}
            autoFocus={true}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Descrição (Ex: Corrida para o centro)"
          placeholderTextColor={COLORS.placeholder}
          value={descricao}
          onChangeText={setDescricao}
        />

        <Text style={styles.categoryLabel}>Categoria</Text>
        <View style={styles.categoryOptions}>
          {categoriasAtuais.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                categoria === cat && styles.categoryChipSelected
              ]}
              onPress={() => setCategoria(cat)}
            >
              <Text style={styles.categoryChipText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.saveButton} onPress={handleAdicionar}>
        <Text style={styles.saveButtonText}>Salvar Lançamento</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  content: {
      padding: 20,
  },
  selectorContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    borderRadius: 15,
    marginBottom: 20,
  },
  selectorButton: {
    flex: 1,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  selectorText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  receitaActive: {
    backgroundColor: COLORS.income,
  },
  despesaActive: {
    backgroundColor: COLORS.expense,
  },
  amountInputContainer: {
    backgroundColor: COLORS.secondary,
    borderRadius: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  amountSymbol: {
    color: COLORS.placeholder,
    fontSize: 30,
    marginRight: 10,
  },
  amountInput: {
    color: COLORS.text,
    fontSize: 40,
    fontWeight: 'bold',
    flex: 1,
    paddingVertical: 20,
  },
  input: {
    backgroundColor: COLORS.secondary,
    borderRadius: 15,
    padding: 20,
    color: COLORS.text,
    fontSize: 16,
    marginBottom: 20,
  },
  categoryLabel: {
    color: COLORS.placeholder,
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 5,
  },
  categoryOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  categoryChip: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    margin: 5,
  },
  categoryChipSelected: {
    backgroundColor: COLORS.accent,
  },
  categoryChipText: {
    color: COLORS.text,
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    margin: 20,
  },
  saveButtonText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
});