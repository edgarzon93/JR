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
            height: 40,
          }}
          source={require("./assets/JR.png")}
        />

        <ListProducts />

        <Divider />
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button style={styles.button} onPress={navigateDetails}>CONTINUAR COMPRA</Button>
        </Layout>
      </SafeAreaView>

   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,     
  },
  button:{
    borderRadius: 15,
    width:"90%",
    backgroundColor: "#72DD5F",
    boxShadow: "0px 6px 0px #324CC2, 0px 3px 15px rgba(0,0,0,.4)"
  }

});


