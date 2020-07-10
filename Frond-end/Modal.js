
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Layout, Modal, Text } from '@ui-kitten/components';

export const ModalProducts = () => {

  const [visible, setVisible] = React.useState(true);

   {/*   <Button onPress={() => setVisible(true)}>
    TOGGLE MODAL
    </Button> */}
  

  return (
   
 
         <Modal visible={visible}>
        <Card style={styles.container} level='1' disabled={true}>
          <Text>Welcome to UI Kitten 😻</Text>
          <Button onPress={() => setVisible(false)}>
            DISMISS
          </Button>
        </Card>
      </Modal>

    
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 400,
    backgroundColor: 'red'
  },
});