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
// import * as DocumentPicker from "expo-document-picker";
import { useRouter } from "expo-router";
import { commonStyles } from "@/assets/css/common_styles";
import { useAppMode } from "@/contexts/app-mode-context";

export default function HelpDesk() {
  const router = useRouter();
  const { toggleMode } = useAppMode();

  const [issue, setIssue] = useState("Technical");
  const [reason, setReason] = useState("");
  const [fileName, setFileName] = useState("");

  // Pick file
//   const pickDocument = async () => {
//     try {
//       const res = await DocumentPicker.getDocumentAsync({});
//       if (res.assets && res.assets.length > 0) {
//         setFileName(res.assets[0].name);
//       }
//     } catch (error) {
//       console.log("File pick error", error);
//     }
//   };

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

        {/* CONTENT */}
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <Text style={styles.pageTitle}>Help Desk</Text>
         
          {/* Account */}
          <Text style={styles.label}>Account</Text>
          <TextInput
            editable={false}
            value="Randika Perera"
            style={[styles.input, { backgroundColor: "#F1F1F1", color: "#555" }]}
          />

          {/* Issue */}
          <Text style={styles.label}>Issue</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>{issue}</Text>
            <FontAwesome5 name="chevron-down" size={16} color="#555" />
          </TouchableOpacity>

          {/* Reason */}
          <Text style={styles.label}>Reason</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Enter reason"
            placeholderTextColor="#999"
            multiline
            value={reason}
            onChangeText={setReason}
          />

          {/* Attachment */}
          <Text style={styles.label}>Attachment</Text>
          {/* <TouchableOpacity style={styles.attachmentBox} onPress={pickDocument}>
            <Text style={styles.attachmentText}>
              {fileName || "File name"}
            </Text>
            <FontAwesome5 name="paperclip" size={18} color="#555" />
          </TouchableOpacity> */}

          {/* Send Button */}
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
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

        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/add")}>
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
  dropdown: {
    backgroundColor: "#F1F1F1",
    padding: 14,
    borderRadius: 8,
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 15,
    color: "#555",
  },
  textArea: {
    backgroundColor: "#F1F1F1",
    padding: 14,
    borderRadius: 8,
    fontSize: 15,
    height: 120,
    textAlignVertical: "top",
    marginBottom: 18,
  },
  attachmentBox: {
    backgroundColor: "#F1F1F1",
    padding: 14,
    borderRadius: 8,
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  attachmentText: {
    fontSize: 15,
    color: "#555",
  },
  sendButton: {
    backgroundColor: "#28C76F",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },

  /* ---------------- Bottom Nav ---------------- */
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
    alignItems: "center",
    justifyContent: "center",
  },
  navLabelInactive: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: "500",
    color: "#7A9B94",
  },
});
