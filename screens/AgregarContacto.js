import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Switch,
} from 'react-native';

export default function AgregarContacto({ navigation, agregarContacto }) {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [favorito, setFavorito] = useState(false);

  const manejarAgregar = () => {
    if (nombre && telefono) {
      agregarContacto({ nombre, telefono, favorito });
      setNombre('');
      setTelefono('');
      setFavorito(false);
      navigation.goBack();
    }
  };

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Nuevo Contacto</Text>
      <TextInput
        placeholder="Nombre"
        style={estilos.entrada}
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        placeholder="Teléfono"
        style={estilos.entrada}
        keyboardType="phone-pad"
        value={telefono}
        onChangeText={setTelefono}
      />
      <View style={estilos.filaFavorito}>
        <Text>¿Favorito?</Text>
        <Switch value={favorito} onValueChange={setFavorito} />
      </View>
      <Button title="Guardar Contacto" onPress={manejarAgregar} />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  entrada: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 40,
  },
  filaFavorito: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
});
