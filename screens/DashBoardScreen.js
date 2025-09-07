import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const DADOS_EXEMPLO = [
  { id: '1', descricao: 'Salário', valor: 2500, tipo: 'receita' },
  { id: '2', descricao: 'Aluguel', valor: -800, tipo: 'despesa' },
  { id: '3', descricao: 'Freelance', valor: 600, tipo: 'receita' },
  { id: '4', descricao: 'Supermercado', valor: -150, tipo: 'despesa' },
];  

const ItemLancamento = ({ descricao, valor, tipo }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.itemDescricao}>{descricao}</Text>
    <Text style={tipo === 'Receita' ? styles.itemValorReceita : styles.itemValorDespesa}>
      R$ {valor.toFixed(2)}
    </Text>
  </View>
);

export default function DashBoardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Corre</Text>

      <FlatList
        data={DADOS_EXEMPLO}
        renderItem={({ item }) => <ItemLancamento descricao={item.descricao} valor={item.valor} tipo={item.tipo} />}
        keyExtractor={item => item.id}
        style={styles.list}
      />

      <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('AddLancamento')}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  list: {
    flex: 1, // Faz a lista ocupar o espaço disponível
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2, // Sombra no Android
  },
  itemDescricao: {
    fontSize: 16,
  },
  itemValorReceita: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  itemValorDespesa: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  button: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
  },
});