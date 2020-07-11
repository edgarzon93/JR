import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Icon, Layout, Text, TopNavigation, TopNavigationAction, Button, List, ListItem, Modal, Card, Input} from '@ui-kitten/components';
import GLOBAL from './global'
import { set } from 'react-native-reanimated';


const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const DetailsScreen = ({ navigation }) => {

  const [visible, setVisible] = React.useState(false);
  const [observaciones, setObservaciones] = useState('')

  

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
      description={`${item.precio} ${'Cantidad: '}${item.quantity}`}
      accessoryRight={renderItemAccessory}
    />
  )
  const finalizarCompra = () => { 
    setVisible(true)
    let body = {
      idCliente:1,
      producto:GLOBAL.carrito,
      observaciones:observaciones     
    }
    console.log(body)
    return
  }
 

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation title='Compra' alignment='center' accessoryLeft={BackAction}/>
      <List
      style={{maxHeight: 500}}
      data={data}
      renderItem={rederItem}
      />
      <Modal visible={visible}>
        <Card disabled={true}>
          <Text>Compra Realizada </Text>
          <Input style={{borderRadius: 10, margin:15}}
                placeholder='Observaciones'
                value={observaciones}
                onChangeText={nextValue => setQuantity(nextValue)}
              />
          <Button onPress={() => setVisible(false)}>
            Aceptar
          </Button>
        </Card>
      </Modal>

      <Button onPressIn={finalizarCompra}> Finalizar compra</Button>
   
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});