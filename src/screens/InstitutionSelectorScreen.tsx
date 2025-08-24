import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { mockInstitutions } from '../utils/mockData';

type InstitutionSelectorScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'InstitutionSelector'
>;

interface Props {
  navigation: InstitutionSelectorScreenNavigationProp;
}

const InstitutionSelectorScreen: React.FC<Props> = ({ navigation }) => {
  const handleInstitutionSelect = (institutionId: string) => {
    if (institutionId === 'home') {
      navigation.navigate('Home');
    } else {
      // Por ahora todas las instituciones llevan al home
      navigation.navigate('Home');
    }
  };

  const handleAddQR = () => {
    navigation.navigate('QRScanner');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Donde deseas entrar</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddQR}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.institutionsContainer}>
          {mockInstitutions.map((institution) => (
            <TouchableOpacity
              key={institution.id}
              style={[
                styles.institutionButton,
                institution.id === 'home' && styles.homeButton
              ]}
              onPress={() => handleInstitutionSelect(institution.id)}
            >
              <View style={styles.institutionContent}>
                {institution.id === 'home' ? (
                  <View style={styles.homeIcon}>
                    <Text style={styles.homeIconText}>🏠</Text>
                  </View>
                ) : (
                  <View style={styles.institutionCircle}>
                    <Text style={styles.institutionInitials}>
                      {institution.shortName}
                    </Text>
                  </View>
                )}
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
    paddingTop: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    flex: 1,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333',
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  institutionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    gap: 30,
  },
  institutionButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeButton: {
    marginBottom: 20,
  },
  institutionContent: {
    alignItems: 'center',
  },
  homeIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#333',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  homeIconText: {
    fontSize: 48,
  },
  institutionCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#333',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  institutionInitials: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default InstitutionSelectorScreen;
