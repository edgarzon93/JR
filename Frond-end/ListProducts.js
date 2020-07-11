import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, View} from 'react-native';

import { Button, Divider, Icon, List, ListItem, TopNavigation, TopNavigationAction, Card, Modal, Text, useTheme, Input } from '@ui-kitten/components';
import GLOBAL from './global'



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
  const [title, setTitle] = useState('');
  const [item, setItem] = useState({});
  const [carrito, setcarrito] = useState([]);
  const [total, setTotal] = useState('')


  if (isLoading) {
    fetch('http://ec2-18-191-194-92.us-east-2.compute.amazonaws.com:3000/productos')
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

  const renderItemAccessory = (props) => (
    <Icon {...props} name='shopping-cart-outline' />
  );

  const actualizar = () => {

    console.log(GLOBAL)
    setData([])
    setLoading(true)
    fetch('http://ec2-18-191-194-92.us-east-2.compute.amazonaws.com:3000/productos')
      .then((response) => response.json())
      .then((json) => {
        setData(json.body)
        console.log(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error);
      });
      console.log(carrito)

  }


  const selected = (item) => (
    setVisible(true),
    console.log(item),
    setTitle(item.nombre),
    setItem(item)
    

  );

  const SendOrden = (cda) =>{    
  
    let dato = item 
    dato.quantity=cda.quantity 
    let arr = [...carrito, dato]
    setcarrito(arr)
    setVisible(false) 
    setQuantity('') 
    GLOBAL.carrito = arr  
    console.log(arr)
    return
        
    
  }

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
            title='PRODUCTOS'  alignment='center'       
            
          />
          <Divider />
          <List onPress={() => selected(item)}
            style={styles.container}
            data={data}
            renderItem={renderItem}
          />

          <Modal visible={visible}>
            <Card style={[styles2.Modal, { backgroundColor: "#AAC2F4"}]} level='1' disabled={true}>
            <Text style={{color:"black", textTransform:"uppercase", marginBottom:10}}>{title}</Text>   
             
              <Input style={{borderRadius: 10, margin:15}}
                placeholder='Cantidad'
                value={quantity}
                onChangeText={nextValue => setQuantity(nextValue)}
              />

            <Text style={{color:"black", textTransform:"uppercase", marginBottom:15, textAlign:"center"}}>${item.precio}</Text> 

             <View style={{display:"flex", flexDirection:"row"}}>
              <Button style={{flex:1, marginHorizontal:5}} onPress={()=>SendOrden({quantity})}>
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
