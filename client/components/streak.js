// StreakComponent.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const StreakComponent = ({ streak }) => {
  // Ensure there are at least 30 items in the streakData
  const last30DaysStreak = Array.from({ length: 30 }, (_, index) => streak[index] || { active: false });

  const renderStreakDay = (item, index) => {
    const isActive = item.active;

    let gradientColors = ['lightgrey', 'grey']; // Default for inactive
    if (isActive) {
      gradientColors = ['lightgreen', 'green']; // Gradient for active
    }

    return (
      <LinearGradient
        key={index}
        colors={gradientColors}
        style={styles.streakBox}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
    );
  };

  return (
    <View style={styles.streakContainer}>
      <View style={styles.streakBoxContainer}>{last30DaysStreak.map(renderStreakDay)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden', // Ensure that anything overflowing is hidden
  },
  streakBoxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft:47, // Wrap items to the next line if they exceed the width
  },
  streakBox: {
    width: 20,
    height: 20,
    margin: 5,
    borderRadius: 5,
  },
});

export default StreakComponent;
