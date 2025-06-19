// components/ui/CommonLoader.tsx
import React from 'react';
import {
  Modal,
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';

interface Props {
  visible: boolean;
  text?: string;
}

const CommonLoader: React.FC<Props> = ({ visible, text }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#007AFF" />
          {text && <Text style={styles.text}>{text}</Text>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
});

export default CommonLoader;
