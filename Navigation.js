import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Button, Divider, Icon, List, ListItem, TopNavigation, TopNavigationAction } from '@ui-kitten/components';




const BackIcon = (props) => (
  <Icon {...props} name='arrow-back'/>
);

const SettingsIcon = (props) => (
  <Icon {...props} name='settings'/>
);


export const TopNavigationDividerShowcase = () => {

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  fetch('http://localhost:3000/productos')
    .then((response) => response.json())
    .then((json) => {  
      setData(json.body)
      console.log(data)
      setLoading(false)
    })
    .catch((error) => {
      console.error(error);
    });

  const renderSettingsAction = () => (
    <TopNavigationAction icon={SettingsIcon}/>
  );

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon}/>
  );

  const renderItemAccessory = (props) => (
    <Icon {...props} name='shopping-cart-outline'/>
  );

  const actualizar = () =>{
    setData([])
    setLoading(true)
    fetch('http://localhost:3000/productos')
    .then((response) => response.json())
    .then((json) => {  
      setData(json.body)
      console.log(data)
      setLoading(false)
    })
    .catch((error) => {
      console.error(error);
    });
  
  }


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
      {isLoading?<ActivityIndicator/>:(
        <>
          <TopNavigation
            title=''
            accessoryLeft={renderBackAction}
            accessoryRight={renderSettingsAction}
          />
          <Divider />
          <List
            style={styles.container}
            data={data}
            renderItem={renderItem}
          />

          <Button onPress={actualizar}>Actualizar</Button>
        </>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 320,
  },
});

