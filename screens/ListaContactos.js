import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default function ListaContactos({
  navigation,
  contactos,
  filtro,
  setFiltro,
  alternarFavorito,
}) {
  const [busqueda, setBusqueda] = useState('');

  const contactosFiltrados =
    filtro === 'favoritos'
      ? contactos.filter((c) => c.favorito)
      : contactos;

  const contactosFiltradosYBuscados = contactosFiltrados.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Agenda de Contactos</Text>

      <View style={estilos.barraBusqueda}>
        <TextInput
          placeholder="Buscar por nombre"
          style={estilos.inputBusqueda}
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      <View style={estilos.filtros}>
        <Button
          title="Todos"
          onPress={() => setFiltro('todos')}
          color={filtro === 'todos' ? '#2196F3' : '#B0BEC5'}
        />
        <Button
          title="Favoritos"
          onPress={() => setFiltro('favoritos')}
          color={filtro === 'favoritos' ? '#FFD700' : '#B0BEC5'}
        />
      </View>

      {contactosFiltradosYBuscados.length === 0 ? (
        <Text style={estilos.mensaje}>No hay contactos.</Text>
      ) : (
        <FlatList
          data={contactosFiltradosYBuscados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={estilos.contacto}>
              <TouchableOpacity onPress={() => alternarFavorito(item.id)}>
                <Text style={estilos.estrella}>
                  {item.favorito ? '★' : '☆'}
                </Text>
              </TouchableOpacity>
              <Text
                style={[
                  estilos.textoContacto,
                  item.favorito && estilos.favorito,
                ]}
              >
                {item.nombre} - {item.telefono}
              </Text>
            </View>
          )}
        />
      )}

      <Button
        title="Agregar Contacto"
        onPress={() => navigation.navigate('AgregarContacto')}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAFAFA',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  barraBusqueda: {
    marginBottom: 10,
  },
  inputBusqueda: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  filtros: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  mensaje: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  contacto: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  estrella: {
    fontSize: 20,
    marginRight: 10,
  },
  textoContacto: {
    fontSize: 16,
  },
  favorito: {
    fontWeight: 'bold',
    color: '#FF9800',
  },
});
