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
import { mockIdentifications } from '../utils/mockData';

type IdentificationsListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'IdentificationDetail'
>;

interface Props {
  navigation: IdentificationsListScreenNavigationProp;
}

const IdentificationsListScreen: React.FC<Props> = ({ navigation }) => {
  const handleIdentificationPress = (identificationId: string) => {
    navigation.navigate('IdentificationDetail', { identificationId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Identificaciones</Text>
        <View style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.identificationsList}>
          {mockIdentifications.map((identification) => (
            <TouchableOpacity
              key={identification.id}
              style={styles.identificationCard}
              onPress={() => handleIdentificationPress(identification.id)}
            >
              <View style={styles.cardHeader}>
                <View style={styles.institutionBadge}>
                  <Text style={styles.institutionText}>{identification.type}</Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  identification.isExpired ? styles.expiredBadge : styles.activeBadge
                ]}>
                  <Text style={[
                    styles.statusText,
                    identification.isExpired ? styles.expiredText : styles.activeText
                  ]}>
                    {identification.isExpired ? '🔒' : '✅'}
                  </Text>
                </View>
              </View>
              
              <View style={styles.cardBody}>
                <View style={styles.photoPlaceholder}>
                  <Text style={styles.photoIcon}>👤</Text>
                </View>
                
                <View style={styles.identificationInfo}>
                  <Text style={styles.holderName}>{identification.holderName}</Text>
                  <Text style={styles.identificationDetail}>
                    {identification.institution}
                  </Text>
                  <Text style={styles.identificationDetail}>
                    Exp: {identification.expiresAt.toLocaleDateString()}
                  </Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.networkText}>{identification.network}</Text>
                <Text style={styles.statusDescription}>
                  {identification.isExpired ? 'Expirado' : 'Activo'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {mockIdentifications.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🆔</Text>
            <Text style={styles.emptyTitle}>No hay identificaciones</Text>
            <Text style={styles.emptyMessage}>
              Las identificaciones digitales aparecerán aquí cuando las recibas.
            </Text>
          </View>
        )}
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
  identificationsList: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  identificationCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#4ECDC4',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  institutionBadge: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  institutionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeBadge: {
    backgroundColor: '#E8F5E8',
  },
  expiredBadge: {
    backgroundColor: '#FFE8E8',
  },
  statusText: {
    fontSize: 16,
  },
  activeText: {
    color: '#4CAF50',
  },
  expiredText: {
    color: '#F44336',
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  photoPlaceholder: {
    width: 60,
    height: 75,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#4ECDC4',
  },
  photoIcon: {
    fontSize: 24,
    color: '#4ECDC4',
  },
  identificationInfo: {
    flex: 1,
  },
  holderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  identificationDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  networkText: {
    fontSize: 12,
    color: '#4ECDC4',
    fontWeight: '600',
  },
  statusDescription: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 20,
  },
});

export default IdentificationsListScreen;
