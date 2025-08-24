import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const ProgressBar = ({ 
  progress, 
  showPercentage = true,
  height = 6,
  backgroundColor = '#E0E0E0',
  fillColor = '#4ECDC4'
}) => {
  const percentage = Math.round(progress * 100);
  
  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, { height, backgroundColor }]}>
        <View 
          style={[
            styles.progressFill,
            { 
              width: `${percentage}%`,
              backgroundColor: fillColor,
              height
            }
          ]} 
        />
      </View>
      {showPercentage && (
        <Text style={styles.progressText}>
          {percentage}%
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    borderRadius: 3,
    marginRight: 12,
  },
  progressFill: {
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
});

export default ProgressBar;
