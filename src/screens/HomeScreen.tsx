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
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { RootStackParamList, BottomTabParamList } from '../types';
import { mockUser, mockDocuments, mockNotifications } from '../utils/mockData';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'HomeTab'>,
  StackNavigationProp<RootStackParamList>
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const completedDocs = mockDocuments.filter(doc => doc.status === 'completado').length;
  const pendingDocs = mockDocuments.filter(doc => doc.status === 'pendiente').length;
  const rejectedDocs = mockDocuments.filter(doc => doc.status === 'rechazado').length;
  const totalDocs = mockDocuments.length;
  const unreadNotifications = mockNotifications.filter(notif => !notif.read).length;

  const recentDocuments = mockDocuments.slice(0, 3);

  const handleNotificationsPress = () => {
    navigation.navigate('Notifications');
  };

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
        <Text style={styles.greeting}>Hola John</Text>
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={handleNotificationsPress}
        >
          <Text style={styles.notificationIcon}>🔔</Text>
          {unreadNotifications > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>{unreadNotifications}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumen</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>{totalDocs}</Text>
              <Text style={styles.summaryLabel}>Activos</Text>
            </View>
            <View style={styles.summaryDetails}>
              <View style={styles.summaryDetailRow}>
                <Text style={styles.summaryDetailNumber}>{pendingDocs}</Text>
                <Text style={styles.summaryDetailLabel}>Pendientes</Text>
              </View>
              <View style={styles.summaryDetailRow}>
                <Text style={styles.summaryDetailNumber}>{completedDocs}</Text>
                <Text style={styles.summaryDetailLabel}>Completados</Text>
              </View>
              <View style={styles.summaryDetailRow}>
                <Text style={styles.summaryDetailNumber}>{rejectedDocs}</Text>
                <Text style={styles.summaryDetailLabel}>Rechazado</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Documentos Recientes</Text>
          {recentDocuments.map((doc) => (
            <TouchableOpacity
              key={doc.id}
              style={styles.documentCard}
              onPress={() => handleDocumentPress(doc.id)}
            >
              <View style={styles.documentHeader}>
                <Text style={styles.documentTitle}>{doc.title}</Text>
                <View style={styles.documentStatus}>
                  <Text style={styles.statusIcon}>{getStatusIcon(doc.status)}</Text>
                  <Text style={styles.statusText}>{doc.status}</Text>
                </View>
              </View>
              
              <Text style={styles.documentSubtitle}>
                {doc.issuedBy} - {doc.status === 'pendiente' ? 'Pendiente' : 'Completado'}
              </Text>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${doc.progress * 100}%`,
                        backgroundColor: getStatusColor(doc.status)
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>
                  {Math.round(doc.progress * 100)}%
                </Text>
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
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationIcon: {
    fontSize: 24,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF3030',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  summaryCard: {
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
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    alignItems: 'center',
    marginRight: 30,
  },
  summaryNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4ECDC4',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  summaryDetails: {
    flex: 1,
  },
  summaryDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryDetailNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryDetailLabel: {
    fontSize: 14,
    color: '#666',
  },
  recentSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  documentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#4ECDC4',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
  },
  documentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  documentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
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
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
});

export default HomeScreen;
