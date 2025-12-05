import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { CommonHeader } from "@/components/CommonHeader";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAppMode } from "@/contexts/app-mode-context";
import { commonStyles } from "@/assets/css/common_styles";

export default function ProfileSetting() {
  const router = useRouter();
  const { toggleMode } = useAppMode();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");

  return (
    <View style={commonStyles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* COMMON HEADER */}
        <CommonHeader
          type="seller"
          userName="Randika Perera"
          greeting="Good Morning!"
          profileRoute="/buyer-profile"
        />

        {/* PAGE CONTENT */}
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <Text style={styles.pageTitle}>Profile Setting</Text>
          

          {/* Name */}
          <Text style={styles.label}>Your Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          {/* Contact Number */}
          <Text style={styles.label}>Default Contact Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter contact number"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={contactNumber}
            onChangeText={setContactNumber}
          />

          {/* Address */}
          <Text style={styles.label}>Default Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter address"
            placeholderTextColor="#999"
            value={address}
            onChangeText={setAddress}
          />

          {/* Update Button */}
          <TouchableOpacity style={styles.updateButton}>
            <Text style={styles.updateButtonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomNavContainer}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/")}>
          <FontAwesome5 name="home" size={24} color="#7A9B94" />
          <Text style={styles.navLabelInactive}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/fav-items")}
        >
          <FontAwesome5 name="heart" size={24} color="#7A9B94" />
          <Text style={styles.navLabelInactive}>Fav Items</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/add")}
        >
          <FontAwesome5 name="plus-circle" size={24} color="#7A9B94" />
          <Text style={styles.navLabelInactive}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/my-orders")}
        >
          <FontAwesome5 name="box" size={24} color="#7A9B94" />
          <Text style={styles.navLabelInactive}>My Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={toggleMode}>
          <FontAwesome5 name="retweet" size={24} color="#7A9B94" />
          <Text style={styles.navLabelInactive}>Seller</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2B2B2B",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F1F1F1",
    padding: 14,
    borderRadius: 8,
    fontSize: 15,
    marginBottom: 18,
  },
  updateButton: {
    backgroundColor: "#34C488",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  updateButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },

  /* Bottom Nav */
  bottomNavContainer: {
    height: 80,
    backgroundColor: "#1C6055",
    borderRadius: 30,
    marginHorizontal: 10,
    marginBottom: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 10,
  },
  navItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  navLabelInactive: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: "500",
    color: "#7A9B94",
  },
});
