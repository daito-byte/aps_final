import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactListScreen from './screens/ContactListScreen';
import AddContactScreen from './screens/AddContactScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('all');

  const addContact = (contact) => {
    setContacts([...contacts, { ...contact, id: Date.now() }]);
  };

  const toggleFavorite = (id) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c))
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="lista de contactos">
          {(props) => (
            <ContactListScreen
              {...props}
              contacts={contacts}
              filter={filter}
              setFilter={setFilter}
              toggleFavorite={toggleFavorite}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="contacto nuevo">
          {(props) => (
            <AddContactScreen {...props} addContact={addContact} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}