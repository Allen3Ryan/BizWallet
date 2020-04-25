import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

export default function ContactConfirm({route, navigation}) {
  const {name, email, phone_number} = route.params;

  

  return (
    <View style={styles.container}>
      <Text>Name: {name}</Text>
      <Text>Email: {email}</Text>
      <Text>Phone Number: {phone_number}</Text>
      <Button title="Confirm" onPress={ () => 
        
        
      navigation.navigate('ContactBrowse')
        
        
        }/>
    </View>
  );

  
}










const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});
