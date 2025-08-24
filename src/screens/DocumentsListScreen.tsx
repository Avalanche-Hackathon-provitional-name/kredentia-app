import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { mockDocuments } from '../utils/mockData';

type DocumentsListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DocumentDetail'
>;

interface Props {
  navigation: DocumentsListScreenNavigationProp;
}

const DocumentsListScreen: React.FC<Props> = ({ navigation }) => {
  const handleDocumentPress = (documentId: string) => {
    navigation.navigate('DocumentDetail', { documentId });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completado': return '#4CAF50';
      case 'pendiente': return '#FF9800';
      case 'rechazado': return '#F44336';
      default: return '#757575';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completado': return '✅';
      case 'pendiente': return '⏳';
      case 'rechazado': return '❌';
      default: return '📄';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Documentos</Text>
        <View style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.documentsList}>
          {mockDocuments.map((document) => (
            <TouchableOpacity
              key={document.id}
              style={styles.documentCard}
              onPress={() => handleDocumentPress(document.id)}
            >
              <View style={styles.documentHeader}>
                <Text style={styles.documentTitle}>{document.title}</Text>
                <View style={styles.documentStatus}>
                  <Text style={styles.statusIcon}>{getStatusIcon(document.status)}</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{document.status}</Text>
                  </View>
                </View>
              </View>
              
              <Text style={styles.documentSubtitle}>
                {document.issuedBy} - {document.institution}
              </Text>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${document.progress * 100}%`,
                        backgroundColor: getStatusColor(document.status)
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>
                  {Math.round(document.progress * 100)}%
                </Text>
              </View>

              <View style={styles.documentFooter}>
                <Text style={styles.dateText}>
                  Creado: {document.createdAt.toLocaleDateString()}
                </Text>
                <Text style={styles.networkText}>{document.network}</Text>
              </View>
            </TouchableOpacity>
          ))}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#4ECDC4',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  notificationButton: {
    padding: 8,
  },
  notificationIcon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  documentsList: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  documentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#4ECDC4',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  documentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  documentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 12,
  },
  documentStatus: {
    alignItems: 'center',
  },
  statusIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  statusBadge: {
    backgroundColor: '#E8F5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4ECDC4',
  },
  statusText: {
    fontSize: 12,
    color: '#4ECDC4',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  documentSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    minWidth: 40,
  },
  documentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  dateText: {
    fontSize: 12,
    color: '#999',
  },
  networkText: {
    fontSize: 12,
    color: '#4ECDC4',
    fontWeight: '600',
  },
});

export default DocumentsListScreen;
