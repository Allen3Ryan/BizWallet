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
      </View>
      <View style={styles.button}>
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
    marginBottom: 20,
    
  },
  button: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 10,
    textAlign:'center',
  },
});
