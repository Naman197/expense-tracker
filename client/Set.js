import React from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, Linking } from "react-native";

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const openRateUsLink = () => {
    const appStoreUrl = "https://apps.apple.com/app/your-app-id"; 

    Linking.openURL(appStoreUrl).catch(() => {
      console.error("Unable to open the app store link");
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Text style={styles.settingLabel}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>

      <TouchableOpacity style={styles.settingItem} onPress={openRateUsLink}>
        <Text style={styles.settingLabel}>Rate Us</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#041C32",
    margin: 0,
    padding:17,
  },
  text: {
    fontSize: 20,
    color: "#ffffff",
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    margin: 47,
    padding: 10,
  },
  settingLabel: {
    fontSize: 16,
    color: "#ffffff",
  },
});

export default SettingsScreen;
