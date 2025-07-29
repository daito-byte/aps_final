import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaContactos from './screens/ListaContactos';
import AgregarContacto from './screens/AgregarContacto';

const Stack = createNativeStackNavigator();

export default function App() {
  const [contactos, setContactos] = useState([]);
  const [filtro, setFiltro] = useState('todos');

  const agregarContacto = (contacto) => {
    setContactos([...contactos, { ...contacto, id: Date.now() }]);
  }

  const alternarFavorito = (id) => {
    setContactos((prev) =>
      prev.map((c) => (c.id === id ? { ...c, favorito: !c.favorito } : c))
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ListaContactos">
          {(props) => (
            <ListaContactos
              {...props}
              contactos={contactos}
              filtro={filtro}
              setFiltro={setFiltro}
              alternarFavorito={alternarFavorito}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="AgregarContacto">
          {(props) => (
            <AgregarContacto {...props} agregarContacto={agregarContacto} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
