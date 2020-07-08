import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Divider, Icon, List, ListItem, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back'/>
);

const SettingsIcon = (props) => (
  <Icon {...props} name='settings'/>
);

const data = [
  {
    nombre:"Gaseosa",
    precio:"1.500"
  },
  {
    nombre:"Papas",
    precio:"2.000"
  },
  {
    nombre:"Chocorramo",
    precio:"3.000"
  },
  {
    nombre:"Nucita",
    precio:"500"
  }
]

export const TopNavigationDividerShowcase = () => {

  const renderSettingsAction = () => (
    <TopNavigationAction icon={SettingsIcon}/>
  );

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon}/>
  );

  const renderItemAccessory = (props) => (
    <Icon {...props} name='shopping-cart-outline'/>
  );



  const selected = (props) => {
    console.log(props)
  }

  const renderItem = ({ item }) => (
    
      <ListItem  onPress={()=>selected(item)}
        title={`${item.nombre}`}
        description={`$${item.precio}`}       
        accessoryRight={renderItemAccessory}
      />
   
   
  );

  return (
    <React.Fragment>
      <TopNavigation
        title=''
        accessoryLeft={renderBackAction}
        accessoryRight={renderSettingsAction}
      />
      <Divider/>
      <List
        style={styles.container}
        data={data}
        renderItem={renderItem}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 320,
  },
});

