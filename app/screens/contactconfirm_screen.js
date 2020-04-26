import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

export default function ContactConfirm({route, navigation}) {
  const {name, email, phone_number} = route.params;

  

  return (
    <View style={styles.container}>
      <Text style = {styles.text2} >Name: {name}</Text>
      <Text style = {styles.text}>Email: {email}</Text>
      <Text style = {styles.text}>Phone Number: {phone_number}</Text>
      <View style={styles.button}>
        <Button
          style={styles.button}
          title="Confirm"
          onPress={() => navigation.navigate('Home')
                  }></Button>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  
  container: {
    
    flex: 1,
    backgroundColor: '#F0A868',
    marginTop: 0
  },
  button: {
    color: 'black',
    backgroundColor: 'white',
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 50,
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    marginTop: 450,
    marginRight: 50,
    marginLeft: 50,
    fontFamily: 'Futura'
  },
  text: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 20,
    color: 'green',
    fontFamily: 'Futura'
  },
  text2: {
    marginTop: 100,
    textAlign: 'center',
    fontSize: 20,
    color: 'green',
    fontFamily: 'Futura'
  },
  
  
});
