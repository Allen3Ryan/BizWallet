import React from 'react';
import {StyleSheet, View, Text, Button, Image} from 'react-native';


export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      
      <Image style = {styles.image} source={require ('../theme/bizLogo.png')} />

      <View style={styles.button}>
        <Button
          style={styles.button}
          title="Add Contact"
          onPress={() => navigation.navigate('Camera')}></Button>
      </View>
      
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    backgroundColor: '#F0A868',
    marginTop: 150
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
    marginTop: 150,
    marginRight: 50,
    marginLeft: 50,
    
    
  },
  image: {
    marginTop: -100,
    marginBottom: 350,
    
  },
    
    
    
  
});
