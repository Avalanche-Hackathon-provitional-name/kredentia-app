import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { mockIdentifications } from '../utils/mockData';

type IdentificationDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'IdentificationDetail'
>;

type IdentificationDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'IdentificationDetail'
>;

interface Props {
  navigation: IdentificationDetailScreenNavigationProp;
  route: IdentificationDetailScreenRouteProp;
}

const IdentificationDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { identificationId } = route.params;
  const identification = mockIdentifications.find(id => id.id === identificationId);
  const [showBack, setShowBack] = useState(false);

  if (!identification) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Identificación no encontrada</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleCardPress = () => {
    setShowBack(!showBack);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{identification.type}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.cardContainer}
          onPress={handleCardPress}
          activeOpacity={0.8}
        >
          <View style={styles.idCard}>
            {!showBack ? (
              // Lado frontal
              <View style={styles.cardFront}>
                <View style={styles.cardHeader}>
                  <Text style={styles.institutionName}>{identification.institution}</Text>
                  <Text style={styles.cardType}>{identification.type}</Text>
                </View>
                
                <View style={styles.cardBody}>
                  <View style={styles.photoPlaceholder}>
                    <Text style={styles.photoIcon}>👤</Text>
                  </View>
                  
                  <View style={styles.cardInfo}>
                    <Text style={styles.holderName}>{identification.holderName}</Text>
                    <Text style={styles.cardDetail}>
                      Exp: {identification.expiresAt.toLocaleDateString()}
                    </Text>
                    <Text style={styles.cardDetail}>
                      Red: {identification.network}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.cardFooter}>
                  <Text style={styles.cardFooterText}>
                    Emitido por: {identification.issuedBy}
                  </Text>
                </View>
              </View>
            ) : (
              // Lado posterior
              <View style={styles.cardBack}>
                <View style={styles.backHeader}>
                  <Text style={styles.backTitle}>Información Técnica</Text>
                </View>
                
                <View style={styles.backContent}>
                  <View style={styles.qrPlaceholder}>
                    <Text style={styles.qrIcon}>⬛⬜⬛⬜⬛</Text>
                    <Text style={styles.qrIcon}>⬜⬛⬜⬛⬜</Text>
                    <Text style={styles.qrIcon}>⬛⬜⬛⬜⬛</Text>
                  </View>
                  
                  <View style={styles.technicalInfo}>
                    <Text style={styles.techLabel}>IPFS Hash:</Text>
                    <Text style={styles.techValue} numberOfLines={2}>
                      {identification.ipfsHash}
                    </Text>
                    
                    <Text style={styles.techLabel}>Estado:</Text>
                    <Text style={[
                      styles.techValue,
                      { color: identification.isExpired ? '#F44336' : '#4CAF50' }
                    ]}>
                      {identification.isExpired ? 'Expirado' : 'Activo'}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.backFooter}>
                  <Text style={styles.backFooterText}>
                    Toca para ver el frente
                  </Text>
                </View>
              </View>
            )}
          </View>
        </TouchableOpacity>

        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            {showBack ? 'Mostrando parte posterior' : 'Mostrando parte frontal'}
          </Text>
          <Text style={styles.instructionSubtext}>
            Toca la tarjeta para voltearla
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const cardWidth = width - 40;
const cardHeight = (cardWidth * 0.63); // Proporción de tarjeta de crédito

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
    alignItems: 'center',
    paddingTop: 40,
  },
  cardContainer: {
    width: cardWidth,
    height: cardHeight,
    marginBottom: 30,
  },
  idCard: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  cardFront: {
    flex: 1,
    backgroundColor: '#4ECDC4',
    borderRadius: 16,
    padding: 20,
  },
  cardBack: {
    flex: 1,
    backgroundColor: '#2A9D8F',
    borderRadius: 16,
    padding: 20,
  },
  cardHeader: {
    marginBottom: 20,
  },
  institutionName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  cardType: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.8,
  },
  cardBody: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  photoPlaceholder: {
    width: 80,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  photoIcon: {
    fontSize: 40,
    color: '#4ECDC4',
  },
  cardInfo: {
    flex: 1,
  },
  holderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  cardDetail: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 4,
    opacity: 0.9,
  },
  cardFooter: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.3)',
  },
  cardFooterText: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.8,
  },
  backHeader: {
    marginBottom: 20,
  },
  backTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  backContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  qrPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  qrIcon: {
    fontSize: 8,
    color: '#333',
    lineHeight: 8,
  },
  technicalInfo: {
    flex: 1,
  },
  techLabel: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 4,
    opacity: 0.8,
  },
  techValue: {
    fontSize: 11,
    color: '#fff',
    marginBottom: 12,
  },
  backFooter: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.3)',
  },
  backFooterText: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.8,
  },
  instructionContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  instructionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  instructionSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
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

export default IdentificationDetailScreen;
