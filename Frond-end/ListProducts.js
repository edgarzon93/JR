import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, View} from 'react-native';
import { Button, Divider, Icon, List, ListItem, TopNavigation, TopNavigationAction, Card, Modal, Text, useTheme, Input } from '@ui-kitten/components';



const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

const SettingsIcon = (props) => (
  <Icon {...props} name='settings' />
);


export const ListProducts = () => {

    const theme = useTheme();

  
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [visible, setVisible] = React.useState(false);
  const [quantity, setQuantity] = React.useState('');
  const [title, setTitle] = useState('hola')


  if (isLoading) {
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

  const renderSettingsAction = () => (
    <TopNavigationAction icon={SettingsIcon} />
  );

  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} />
  );

  const renderItemAccessory = (props) => (
    <Icon {...props} name='shopping-cart-outline' />
  );

  const actualizar = () => {
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


  const selected = (item) => (
    setVisible(true),
    console.log(item),
    setTitle(item.nombre)
    

  );


    
  

  const renderItem = ({ item }) => (

    <ListItem onPress={() => selected(item)}
      title={`${item.nombre}`}
      description={`$${item.precio}`}
      accessoryRight={renderItemAccessory}
    />


  );

  return (
    <React.Fragment>
      {isLoading ? <ActivityIndicator /> : (
        <>
          <TopNavigation
            title='Productos'
            accessoryLeft={renderBackAction}
            accessoryRight={renderSettingsAction}
          />
          <Divider />
          <List onPress={() => selected(item)}
            style={styles.container}
            data={data}
            renderItem={renderItem}
          />

          <Modal visible={visible}>
            <Card style={[styles2.Modal, { backgroundColor: "#AAC2F4"}]} level='1' disabled={true}>
            <Text style={{color:"white", textTransform:"uppercase"}}>{title}</Text>   
             
              <Input style={{borderRadius: 10, margin:10}}
                placeholder='Cantidad'
                value={quantity}
                onChangeText={nextValue => setQuantity(nextValue)}
              />
             <View style={{display:"flex", flexDirection:"row"}}>
              <Button style={{flex:1, marginHorizontal:5}}  onPress={() => setVisible(false)}>
                Acpetar
              </Button>
               <Button style={{flex:1, marginHorizontal:5}} onPress={() => setVisible(false)}>
                Cancelar
              </Button>
              </View>
            

            </Card>
          </Modal>

         

          <Button onPress={actualizar}>Actualizar</Button>
        </>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 400,
    cursor: "pointer"
  },
  button:{
    width:"40%",
    display:"flex",
    flexDirection:"row",
    margin:5

  }

});

const styles2 = StyleSheet.create({
  Modal: {
    minWidth: 300,
    minHeight: 200,    
    opacity: 0.9,
    borderRadius: 35
 
  },
});
