import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Icon, Layout, Text, TopNavigation, TopNavigationAction, Button, List, ListItem, Modal, Card, Input} from '@ui-kitten/components';
import GLOBAL from './global'



const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const DetailsScreen = ({ navigation }) => {

  const [visible, setVisible] = React.useState(false);
  const [res, setRes] = React.useState(false);
  const [observaciones, setObservaciones] = useState('')
  const [response, setResponse] = useState([])
  

  const navigateBack = () => {
    navigation.goBack();
  };

  const renderItemAccessory = (props) => (
    <Icon {...props} name='trash-outline'/>
  );

  const data = GLOBAL.carrito

  

  const rederItem = ({item}) =>(
    <ListItem
      title={item.nombre}
      description={`${'Cantidad: '} ${item.cantidad} ${'Total: '} ${item.precio*item.cantidad} `}
      accessoryRight={renderItemAccessory}
    />
    
  )
  
  const finalizarCompra = () => { 
    setVisible(true)
  }

  const modalFinal = () => {

    let body = {
      idCliente:1,      
      productos:GLOBAL.carrito,
      observaciones:observaciones
    }

    console.log(body)
    
    setVisible(false)

    fetch('http://ec2-18-191-194-92.us-east-2.compute.amazonaws.com:3000/tienda/compras',{
      method:'POST',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'

      }
    })
    
    .then(response => 
      response.json()     
    )
     .then((json) => { 
      console.log(json)             
      setResponse(json.body[0])
      setRes(true)
    })

    .catch((error) => {
      console.error(error);
    });
    
  }
 

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  const test = () => {
   
    console.log(response.nombre)
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation title='Compra' alignment='center' accessoryLeft={BackAction}/>
      <List
      style={{maxHeight: 500}}
      data={data}
      renderItem={rederItem}
      />
      <Modal visible={visible}>
        <Card style={{backgroundColor: "#AAC2F4",  minWidth: 300,  borderRadius: 35}} disabled={true}>
          <Text>Datos compras </Text>
          <Input style={{borderRadius: 10, margin:15}}
                placeholder='Observaciones'
                value={observaciones}
                onChangeText={nextValue => setObservaciones(nextValue)}
              />
          <Button style={{borderRadius:12, boxShadow: "0px 6px 0px #324CC2, 0px 3px 15px rgba(0,0,0,.4)"}}onPress={modalFinal}>
            Aceptar
          </Button>
        </Card>
      </Modal>

      <Modal visible={res}>
        <Card  style={{backgroundColor: "#AAC2F4",  minWidth: 300, minHeight: 350,  borderRadius: 35}} disabled={true}>
          <Text style={{padding:6, margin:0 ,fontSize:15, textTransform:"uppercase", textAlign:"center", backgroundColor:"#72DD5F", boxShadow: "0px 6px 0px #324CC2, 0px 3px 15px rgba(0,0,0,.4)" }}>Compra Realizada </Text>  
          <Text style={{padding:6, margin:7 ,fontSize:15}}>Nombre: {response.nombre}</Text> 
          <Text style={{padding:6, margin:7 ,fontSize:15}}>Observaciones: {response.observaciones}</Text> 
          <Text style={{padding:6, margin:7 ,fontSize:15}}>SubTtotal: ${response.subtotal}</Text> 
          <Text style={{padding:6, margin:7 ,fontSize:15}}>Iva: ${response.iva}</Text> 
          <Text style={{padding:6, margin:7 ,fontSize:15}}>Valor envio: ${response.vrenvio}</Text>
          <Text style={{padding:6, margin:7 ,fontSize:15}}>Total: ${response.total}</Text>
        
         
          <Button style={{borderRadius:12, boxShadow: "0px 6px 0px #324CC2, 0px 3px 15px rgba(0,0,0,.4)", marginTop:10}} onPress={() => setRes(false)}>
            Aceptar
          </Button>
        </Card>
      </Modal>

      <Text style={{textAlign:"center", marginBottom:40, backgroundColor:"#72DD5F", color:"white", textTransform:"uppercase", padding:10,  boxShadow: "0px 6px 0px #324CC2, 0px 3px 15px rgba(0,0,0,.4)"}}>
        Total de la compra es:
      </Text>
      <Button onPress={test}>test</Button>
      <Button onPress={finalizarCompra}>Finalizar compra</Button>
   
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});