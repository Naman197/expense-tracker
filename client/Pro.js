import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProfileComponent = () => {
  return (
    <View style={styles.profileContainer}>
      <Image
        source={require("./istockphoto-1300512215-612x612.jpg")}
        style={styles.profileImage}
      />
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>John Doe</Text>
        <Text style={styles.profileEmail}>john.doe@example.com</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    opacity:0.8,
    marginTop:20,
    padding: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 25,
    marginRight: 10,
    marginLeft:30,
   
  },
  profileInfo: {
    flexDirection: "column",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  profileEmail: {
    fontSize: 14,
    color: "#ffffff",
  },
});

export default ProfileComponent;
