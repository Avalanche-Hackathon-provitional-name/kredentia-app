import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const StatusBadge = ({ 
  status, 
  text,
  customColor 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completado':
      case 'verificado':
        return '#2ECC71';
      case 'pendiente':
        return '#F39C12';
      case 'rechazado':
        return '#E74C3C';
      default:
        return customColor || '#95A5A6';
    }
  };

  return (
    <View style={[styles.badge, { backgroundColor: getStatusColor(status) }]}>
      <Text style={styles.badgeText}>{text || status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});

export default StatusBadge;
