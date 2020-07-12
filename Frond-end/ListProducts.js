import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, View} from 'react-native';
import { Button, Divider, Icon, List, ListItem, TopNavigation, TopNavigationAction, Card, Modal, Text, useTheme, Input } from '@ui-kitten/components';
import GLOBAL from './global'



export const ListProducts = () => {

  const theme = useTheme();

  
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [visible, setVisible] = React.useState(false);
  const [cantidad, setcantidad] = React.useState(1);
  const [title, setTitle] = useState('');
  const [item, setItem] = useState({});
  const [carrito, setcarrito] = useState([]);
  const [total, setTotal] = useState()


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
    setTitle(item.nombre),
    setItem(item),
    setTotal(item.precio)
    

  );

  const SendOrden = () =>{    
  
    let dato = item 
    dato.cantidad=cantidad 
    let arr = [...carrito, dato]
    setcarrito(arr)
    setVisible(false) 
    setcantidad(1) 
    GLOBAL.carrito = arr  
    console.log(arr)
    return
      
  }

  const CancelOrden = () => (
    setVisible(false),
    setcantidad(1)
  )

  const renderItem = ({ item }) => (

    <ListItem onPress={() => selected(item)}
      title={`${item.nombre}`}
      description={`$${item.precio}`}
      accessoryRight={renderItemAccessory}
    />

  );


  const amunetar = () => {
    
   let number = cantidad 
   number = number +1
   setcantidad(number)
   let mul = item.precio * number
   setTotal(mul)
  
  }

  const disminuir = () => {
   let number = 0 
   number = cantidad - 1
   setcantidad(number)
   let mul = item.precio * number
   setTotal(mul)

  }

 
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

            <Text style={{color:"black", fontSize:15, textAlign:"center", textTransform:"uppercase", marginBottom:30}}>{title}</Text>  

         
              <View style={{display:"flex", flexDirection:"row"}} >
              <Button style={{flex:1, marginHorizontal:5, borderRadius:10, backgroundColor:"#72DD5F", boxShadow: "0px 6px 0px #324CC2, 0px 3px 15px rgba(0,0,0,.4)"}} onPress={disminuir}>-</Button>
                <Text style={{flex:2, textAlign:"center", fontSize:20}}>
                  {cantidad}
                </Text>               
                <Button style={{flex:1, marginHorizontal:5, borderRadius:10, backgroundColor:"#72DD5F", boxShadow: "0px 6px 0px #324CC2, 0px 3px 15px rgba(0,0,0,.4)"}} onPress={amunetar}>+</Button>
              </View>

            <Text style={{color:"black", fontSize:20, textTransform:"uppercase", marginBottom:40, textAlign:"center"}}>${total}</Text> 

             <View style={{display:"flex", flexDirection:"row"}}>             
               <Button style={{flex:1, marginHorizontal:5, borderRadius:12, boxShadow: "0px 6px 0px #324CC2, 0px 3px 15px rgba(0,0,0,.4)"}} onPress={() => CancelOrden()}>
                Cancelar
              </Button>
              <Button style={{flex:1, marginHorizontal:5, borderRadius:12, boxShadow: "0px 6px 0px #324CC2, 0px 3px 15px rgba(0,0,0,.4)"}} onPress={()=>SendOrden()}>
                Aceptar
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
    maxHeight: "35%",
    cursor: "pointer"
  },
 

});

const styles2 = StyleSheet.create({
  Modal: {
    minWidth: 300,
    minHeight: 200,    
    opacity: 0.9,
    borderRadius: 35
 
  },
});
