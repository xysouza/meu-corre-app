import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { COLORS } from '../constants'; // Importe a paleta de cores
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ItemLancamento = ({ item }) => {

  const valorNumerico = Number(item.valor) || 0;

  return (
  <View style={styles.itemContainer}>
      {/* Container para o ícone */}
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons 
          name={item.icon} 
          size={24} 
          color={item.tipo === 'Receita' ? COLORS.income : COLORS.expense} 
        />
      </View>
      {/* Container para a descrição e categoria */}
      <View style={styles.itemDetails}>
        <Text style={styles.itemDescricao}>{item.descricao}</Text>
        <Text style={styles.itemCategoria}>{item.categoria}</Text>
      </View>
      {/* O valor do lançamento */}
      <Text style={item.tipo === 'Receita' ? styles.itemValorReceita : styles.itemValorDespesa}>
        {item.tipo === 'Receita' ? '+ ' : '- '}
        R$ {valorNumerico.toFixed(2).replace('.', ',')}
      </Text>
    </View>
  );
};

export default function DashBoardScreen({ navigation }) {
  const [lancamentos, setLancamentos] = useState([]);
  const isFocused = useIsFocused();

  const buscarDados = async () => {
    try {
      const dadosSalvos = await AsyncStorage.getItem('lancamentos');
      const dadosLista = dadosSalvos ? JSON.parse(dadosSalvos) : [];
      setLancamentos(dadosLista);
    } catch (error) {
      console.log('Erro ao buscar dados: ', error);
    }
  };

  const handleLimparDados = async () => {
    try {
      await AsyncStorage.clear(); // Comando que apaga TUDO do AsyncStorage
      alert('Dados limpos com sucesso!');
      // Chame o buscarDados() de novo para atualizar a lista na tela e deixá-la vazia
      buscarDados();
    } catch (error) {
      alert('Erro ao limpar os dados.');
    }
  };

  useEffect(() => {
    if (isFocused) {
      buscarDados();
    }
  }, [isFocused]);

  const receitas = lancamentos.filter(item => item.tipo === 'Receita');
  const totalReceitas = receitas.reduce((soma, item) => soma + item.valor, 0);
  
  const despesas = lancamentos.filter(item => item.tipo === 'Despesa');
  const totalDespesas = despesas.reduce((soma, item) => soma + item.valor, 0);

  const lucroLiquido = totalReceitas - totalDespesas;


  
   return (
    <View style={styles.container}>
      {/* A StatusBar controla a cor dos ícones de bateria, wifi, etc. */}
      <StatusBar barStyle="light-content" />
      
      {/* Este View é o nosso cabeçalho fixo com os cards de resumo */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Resumo</Text>
        
        <View style={styles.lucroCard}>
          <Text style={styles.cardTitle}>Lucro Líquido</Text>
          {/* Aqui exibimos o resultado do nosso cálculo */}
          <Text style={styles.lucroValor}>R$ {lucroLiquido.toFixed(2).replace('.', ',')}</Text>
        </View>

        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Ganhos</Text>
            <Text style={styles.cardValorReceita}>R$ {totalReceitas.toFixed(2).replace('.', ',')}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Gastos</Text>
            <Text style={styles.cardValorDespesa}>R$ {totalDespesas.toFixed(2).replace('.', ',')}</Text>
          </View>
        </View>
        <Text style={styles.listHeader}>Lançamentos</Text>
      </View>
      
      {/* A FlatList agora fica aqui, separada do cabeçalho */}
      <FlatList
        data={lancamentos}
        renderItem={({ item }) => <ItemLancamento item={item} />}
        keyExtractor={item => item.id}
        style={styles.list}
        // Este espaçamento no final da lista evita que o último item
        // fique escondido atrás do botão flutuante.
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity
        style={styles.clearButton} // Usaremos um estilo diferente
        onPress={handleLimparDados}
      >
        <Text style={styles.clearButtonText}>Limpar</Text>
      </TouchableOpacity>

      {/* O Botão Flutuante (FAB) para adicionar novos lançamentos */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('AddLancamento')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  headerContainer: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
  },
  lucroCard: {
    backgroundColor: COLORS.secondary,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    color: COLORS.placeholder,
    fontSize: 14,
  },
  lucroValor: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: 'bold',
  },
  cardsContainer: {
    flexDirection: 'row',
  },
  card: {
    backgroundColor: COLORS.secondary,
    borderRadius: 15,
    padding: 20,
    flex: 1,
    alignItems: 'center',
  },
  // Adicionei um espaçamento entre os cards de Ganhos e Gastos
  card: {
    backgroundColor: COLORS.secondary,
    borderRadius: 15,
    padding: 20,
    flex: 1,
    alignItems: 'center',
    // Adicionado para dar espaço entre os cards
    marginHorizontal: 5,
  },
  cardValorReceita: {
    color: COLORS.income,
    fontSize: 22,
    fontWeight: 'bold',
  },
  cardValorDespesa: {
    color: COLORS.expense,
    fontSize: 22,
    fontWeight: 'bold',
  },
  listHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 20,
    marginBottom: 10,
  },
  list: {
    paddingHorizontal: 20,
  },
  // Estilo do item da lista, agora com ícone
  itemContainer: {
    backgroundColor: COLORS.secondary,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1, // Faz esta View ocupar o espaço disponível
  },
  itemDescricao: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
  itemCategoria: {
    color: COLORS.placeholder,
    fontSize: 12,
    marginTop: 2,
  },
  itemValorReceita: {
    color: COLORS.income,
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemValorDespesa: {
    color: COLORS.expense,
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Estilo do Botão Flutuante, agora com ícone
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  clearButton: {
    position: 'absolute',
    bottom: 100, // Posição um pouco acima do botão '+'
    right: 30,
    backgroundColor: 'red', // Deixei vermelho para ser um botão de "cuidado"
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 8,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});