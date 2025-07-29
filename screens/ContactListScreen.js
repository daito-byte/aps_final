import React from 'react';
import {
  View, Text, TouchableOpacity, FlatList, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ContactListScreen({
  contacts, filter, setFilter, toggleFavorite, navigation,
}) {
  const filtered = filter === 'favorites'
    ? contacts.filter((c) => c.favorite)
    : contacts;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda de Contactos</Text>

      <View style={styles.filterContainer}>
        {['all', 'favorites'].map((mode) => (
          <TouchableOpacity
            key={mode}
            style={[styles.filterButton, filter === mode && styles.activeFilter]}
            onPress={() => setFilter(mode)}
          >
            <Text style={[styles.filterText, filter === mode && styles.activeFilterText]}>
              {mode === 'all' ? 'Todos' : 'Favoritos'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filtered.length === 0 ? (
        <Text>No hay contactos</Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.contactItem}>
              <View>
                <Text style={[styles.name, item.favorite && styles.favorite]}>
                  {item.name}
                </Text>
                <Text>{item.phone}</Text>
              </View>
              <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                <Ionicons
                  name={item.favorite ? 'star' : 'star-outline'}
                  size={24}
                  color={item.favorite ? 'gold' : 'gray'}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddContact')}
      >
        <Ionicons name="add-circle" size={56} color="#0078d4" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20 },
  title: { fontSize:24, fontWeight:'bold', marginBottom:16 },
  filterContainer: { flexDirection:'row', marginBottom:10 },
  filterButton: { flex:1, padding:10, borderWidth:1, borderColor:'#0078d4', marginRight:5, borderRadius:6 },
  activeFilter: { backgroundColor:'#0078d4' },
  filterText: { textAlign:'center', color:'#0078d4' },
  activeFilterText: { color:'#fff', fontWeight:'bold' },
  contactItem: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:10, padding:10, backgroundColor:'#fff', borderRadius:6 },
  name: { fontSize:16 },
  favorite: { fontWeight:'bold', color:'gold' },
  addButton: { position:'absolute', right:20, bottom:20 },
});
