import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';

const CustomAlert = ({ 
  visible, 
  title, 
  message, 
  onCancel, 
  onConfirm,
  cancelText = 'Cancelar',
  confirmText = 'OK',
  showCancel = true 
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.alertOverlay}>
        <View style={styles.alertContainer}>
          <Text style={styles.alertTitle}>{title}</Text>
          <Text style={styles.alertMessage}>{message}</Text>
          <View style={styles.alertButtons}>
            {showCancel && (
              <TouchableOpacity
                style={[styles.alertButton, styles.alertButtonCancel]}
                onPress={onCancel}
              >
                <Text style={styles.alertButtonTextCancel}>{cancelText}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[
                styles.alertButton, 
                styles.alertButtonConfirm,
                !showCancel && styles.alertButtonSingle
              ]}
              onPress={onConfirm}
            >
              <Text style={styles.alertButtonTextConfirm}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  alertOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    margin: 20,
    minWidth: 280,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  alertMessage: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  alertButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  alertButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  alertButtonSingle: {
    flex: 1,
  },
  alertButtonCancel: {
    backgroundColor: '#f5f5f5',
  },
  alertButtonConfirm: {
    backgroundColor: '#4ECDC4',
  },
  alertButtonTextCancel: {
    color: '#666',
    fontWeight: 'bold',
  },
  alertButtonTextConfirm: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CustomAlert;
