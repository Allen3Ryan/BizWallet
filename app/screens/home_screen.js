import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          style={styles.button}
          title="Add Contact"
          onPress={() => navigation.navigate('Camera')}></Button>
        <Button
          style={styles.button}
          title="Browse Contacts"
          onPress={() => navigation.navigate('ContactBrowse')}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  button: {
    color: 'red',
    marginTop: 20,
    padding: 20,
    backgroundColor: 'green',
  },
});
