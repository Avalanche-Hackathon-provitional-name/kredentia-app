import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const BottomTabBar = ({ currentView, onTabPress }) => {
  const tabs = [
    { id: 'home', icon: '🏠', label: 'Inicio' },
    { id: 'documents', icon: '📄', label: 'Documentos' },
    { id: 'identifications', icon: '🆔', label: 'IDs' },
    { id: 'settings', icon: '⚙️', label: 'Ajustes' },
  ];

  return (
    <View style={styles.bottomTabBar}>
      {tabs.map((tab) => (
        <TouchableOpacity 
          key={tab.id}
          style={[
            styles.tabItem, 
            currentView === tab.id && styles.tabItemActive
          ]} 
          onPress={() => onTabPress(tab.id)}
        >
          <Text style={[
            styles.tabIcon, 
            currentView === tab.id && styles.tabIconActive
          ]}>
            {tab.icon}
          </Text>
          <Text style={[
            styles.tabLabel, 
            currentView === tab.id && styles.tabLabelActive
          ]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#4ECDC4',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabItemActive: {
    backgroundColor: '#E8F9F7',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  tabIconActive: {
    color: '#4ECDC4',
  },
  tabLabel: {
    fontSize: 12,
    color: '#666',
  },
  tabLabelActive: {
    color: '#4ECDC4',
    fontWeight: 'bold',
  },
});

export default BottomTabBar;
