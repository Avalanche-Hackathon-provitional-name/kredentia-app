import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Clipboard,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { mockDocuments } from '../utils/mockData';

type DocumentDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DocumentDetail'
>;

type DocumentDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'DocumentDetail'
>;

interface Props {
  navigation: DocumentDetailScreenNavigationProp;
  route: DocumentDetailScreenRouteProp;
}

const DocumentDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { documentId } = route.params;
  const document = mockDocuments.find(doc => doc.id === documentId);

  if (!document) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Documento no encontrado</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleCopyToClipboard = (text: string) => {
    Clipboard.setString(text);
    Alert.alert('Copiado', 'Texto copiado al portapapeles');
  };

  const handleOpenCertificate = () => {
    Alert.alert(
      'Abrir Certificado',
      'Se abrirá el certificado en IPFS (funcionalidad no implementada en el mockup)'
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completado': return '#4CAF50';
      case 'pendiente': return '#FF9800';
      case 'rechazado': return '#F44336';
      default: return '#757575';
    }
  };

  const renderSignatureProgress = () => {
    const totalSignatures = document.signatures.length;
    const completedSignatures = document.signatures.filter(sig => sig.status === 'firmado').length;
    
    return (
      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Progreso de firmas</Text>
        <View style={styles.progressContainer}>
          {document.signatures.map((_, index) => (
            <View 
              key={index}
              style={[
                styles.progressDot,
                index < completedSignatures ? styles.completedDot : styles.pendingDot
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{document.type}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderSignatureProgress()}

        <View style={styles.signaturesSection}>
          <Text style={styles.sectionTitle}>Firmas realizadas</Text>
          {document.signatures.map((signature) => (
            <View key={signature.id} style={styles.signatureCard}>
              <View style={styles.signatureHeader}>
                <Text style={styles.signerName}>{signature.signerName}</Text>
                <View style={styles.signatureStatus}>
                  <Text style={styles.statusIcon}>
                    {signature.status === 'firmado' ? '✅' : '⏳'}
                  </Text>
                </View>
              </View>
              <Text style={styles.signerRole}>{signature.signerRole}</Text>
              {signature.signedAt && (
                <Text style={styles.signedDate}>
                  Firmado: {signature.signedAt.toLocaleDateString()}
                </Text>
              )}
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.certificateButton}
          onPress={handleOpenCertificate}
        >
          <Text style={styles.certificateButtonText}>Abrir Certificado</Text>
        </TouchableOpacity>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Información del documento</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Institución:</Text>
            <View style={styles.infoValue}>
              <Text style={styles.infoText}>{document.institution}</Text>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={() => handleCopyToClipboard(document.institution)}
              >
                <Text style={styles.copyIcon}>📋</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Emitido por:</Text>
            <View style={styles.infoValue}>
              <Text style={styles.infoText}>{document.issuedBy}</Text>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={() => handleCopyToClipboard(document.issuedBy)}
              >
                <Text style={styles.copyIcon}>📋</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Red:</Text>
            <View style={styles.infoValue}>
              <Text style={styles.infoText}>{document.network}</Text>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={() => handleCopyToClipboard(document.network)}
              >
                <Text style={styles.copyIcon}>📋</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>IPFS Hash:</Text>
            <View style={styles.infoValue}>
              <Text style={styles.infoText} numberOfLines={1}>
                {document.ipfsHash}
              </Text>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={() => handleCopyToClipboard(document.ipfsHash)}
              >
                <Text style={styles.copyIcon}>📋</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#4ECDC4',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  progressSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 4,
  },
  completedDot: {
    backgroundColor: '#4ECDC4',
  },
  pendingDot: {
    backgroundColor: '#E0E0E0',
  },
  signaturesSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  signatureCard: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 12,
  },
  signatureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  signerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  signatureStatus: {
    padding: 4,
  },
  statusIcon: {
    fontSize: 16,
  },
  signerRole: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  signedDate: {
    fontSize: 12,
    color: '#999',
  },
  certificateButton: {
    backgroundColor: '#4ECDC4',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  certificateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    width: 100,
  },
  infoValue: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  copyButton: {
    padding: 8,
  },
  copyIcon: {
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
  },
});

export default DocumentDetailScreen;
