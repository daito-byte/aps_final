import React, { useState } from 'react';
import {
  View, TextInput, Button, Text, StyleSheet, Switch,
} from 'react-native';

export default function AddContactScreen({ navigation, addContact }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [favorite, setFavorite] = useState(false);

  const handleSave = () => {
    if (!name || !phone) return;
    addContact({ name, phone, favorite });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Teléfono:</Text>
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <View style={styles.switchContainer}>
        <Text>Favorito:</Text>
        <Switch value={favorite} onValueChange={setFavorite} />
      </View>
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20 },
  label: { fontWeight:'bold', marginTop:10 },
  input: { borderWidth:1, borderColor:'#ccc', padding:8, borderRadius:6, marginBottom:12 },
  switchContainer: { flexDirection:'row', alignItems:'center', marginBottom:20, justifyContent:'space-between' },
});
