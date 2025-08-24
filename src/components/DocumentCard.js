import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ProgressBar from './ProgressBar';
import StatusBadge from './StatusBadge';

const DocumentCard = ({ 
  document, 
  onPress, 
  showStatus = false,
  variant = 'default' // 'default', 'list'
}) => {
  const cardStyle = variant === 'list' ? styles.listCard : styles.defaultCard;
  
  return (
    <TouchableOpacity
      style={cardStyle}
      onPress={() => onPress(document)}
    >
      {variant === 'list' && (
        <View style={styles.listHeader}>
          <Text style={[styles.documentTitle, { flex: 1 }]}>{document.title}</Text>
          {showStatus && (
            <StatusBadge 
              status={document.status} 
              text={document.status}
            />
          )}
        </View>
      )}
      
      {variant === 'default' && (
        <Text style={styles.documentTitle}>{document.title}</Text>
      )}
      
      <Text style={styles.documentSubtitle}>{document.institution}</Text>
      
      <ProgressBar 
        progress={document.progress}
        showPercentage={true}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  defaultCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#4ECDC4',
  },
  listCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#4ECDC4',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  documentSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
});

export default DocumentCard;
