import React from 'react';
import { SafeAreaView, StyleSheet, View, Image } from 'react-native';
import { Button, Divider, Layout, TopNavigation, useTheme, ListItem } from '@ui-kitten/components';
import { ListProducts } from './ListProducts'

export const HomeScreen = ({ navigation }) => {

  const navigateDetails = () => {
    navigation.navigate('Details');
  };
  const theme = useTheme();

  return (    
   
    
      <SafeAreaView style={[styles.container, { backgroundColor: theme['color-primary-default'] }]}>
        <TopNavigation />

        <Image
          style={{
            resizeMode: "contain",
            height: 50,
          }}
          source={require("./assets/JR.png")}
        />

        <ListProducts />

        <Divider />
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button style={styles.button} onPress={navigateDetails}>Abrir tienda</Button>
        </Layout>
      </SafeAreaView>

   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,     
  },
  button:{
    borderRadius: 20
  }

});


