import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';
import { TopNavigationDividerShowcase } from './Navigation'

export const HomeScreen = ({ navigation }) => {

  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  return (    
    
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='JR' alignment='center'/>
      
      <TopNavigationDividerShowcase />
      
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={navigateDetails}>Abrir tienda</Button>
      </Layout>
    </SafeAreaView>
  );
};