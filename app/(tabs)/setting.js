import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/Color";
const setting = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const handleSwitch = () => {
    setIsEnabled((prev) => !prev);
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
        }}
      />
      <View style={styles.container}>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnText}>About</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnText}>Send Feedback</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnText}>Privacy Policy</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={styles.itemBtnText}>Terms of Use</Text>
          <MaterialIcons name="arrow-forward-ios" size={16} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn} onPress={handleSwitch}>
          <Text style={styles.itemBtnText}>Darkmode</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#3e3e3e" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            value={isEnabled}
            onValueChange={handleSwitch}
            style={{
              transform: [{ scale: 0.6 }],
              marginBottom: -15,
              marginRight: -8,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBtn}>
          <Text style={[styles.itemBtnText, { color: "red " }]}>Logout</Text>
          <MaterialIcons name="logout" size={16} color="red" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default setting;

const styles = StyleSheet.create({
  container: {
    felx: 1,
    padding: 20,
  },
  itemBtn: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 20,
    justifyContent: "space-between",
    borderBottomColor: Colors.background,
    borderBottomWidth: 1,
  },
  itemBtnText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.black,
  },
});
