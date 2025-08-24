import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

type QRScannerScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'QRScanner'
>;

interface Props {
  navigation: QRScannerScreenNavigationProp;
}

const QRScannerScreen: React.FC<Props> = ({ navigation }) => {
  const [scanning, setScanning] = useState(false);

  const handleQRScan = (data: string) => {
    setScanning(false);
    // Por ahora solo verificamos que sea un QR válido (mockup)
    if (data && data.length > 0) {
      Alert.alert(
        'QR Detectado',
        'QR válido detectado. Navegando a selección de institución.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('InstitutionSelector')
          }
        ]
      );
    } else {
      Alert.alert('Error', 'QR no válido');
    }
  };

  const simulateQRScan = () => {
    setScanning(true);
    // Simular detección de QR después de 2 segundos
    setTimeout(() => {
      handleQRScan('mock_qr_data');
    }, 2000);
  };

  const openGallery = () => {
    Alert.alert(
      'Abrir Galería',
      'Funcionalidad de galería no implementada en el mockup',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Escanear QR</Text>
        <Text style={styles.subtitle}>
          Escanea el código QR para unirte a una organización
        </Text>
      </View>

      <View style={styles.scannerContainer}>
        <View style={styles.scannerFrame}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
          
          {scanning ? (
            <View style={styles.scanningIndicator}>
              <Text style={styles.scanningText}>Escaneando...</Text>
            </View>
          ) : (
            <View style={styles.cameraPlaceholder}>
              <Text style={styles.placeholderText}>📷</Text>
              <Text style={styles.instructionText}>
                Apunta la cámara hacia el código QR
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.scanButton}
          onPress={simulateQRScan}
          disabled={scanning}
        >
          <Text style={styles.scanButtonText}>
            {scanning ? 'Escaneando...' : 'Simular Escaneo'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.galleryButton} onPress={openGallery}>
          <Text style={styles.galleryButtonText}>Seleccionar de Galería</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');
const scannerSize = width * 0.7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  scannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerFrame: {
    width: scannerSize,
    height: scannerSize,
    position: 'relative',
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#4ECDC4',
    borderWidth: 3,
  },
  topLeft: {
    top: 10,
    left: 10,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 10,
    right: 10,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 10,
    left: 10,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 10,
    right: 10,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  cameraPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  placeholderText: {
    fontSize: 48,
    marginBottom: 16,
  },
  instructionText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  scanningIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  scanningText: {
    color: '#4ECDC4',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 12,
  },
  scanButton: {
    backgroundColor: '#4ECDC4',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  galleryButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4ECDC4',
  },
  galleryButtonText: {
    color: '#4ECDC4',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default QRScannerScreen;
