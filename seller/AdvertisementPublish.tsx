import { commonStyles } from '@/assets/css/common_styles';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CommonHeader } from '@/components/CommonHeader';
import { useAppMode } from '@/contexts/app-mode-context';

interface ProductImage {
  id: string;
  uri: string;
}

export default function AdvertisementPublish() {
  // ✅ App Mode (used but not applied yet)
  const { mode, toggleMode } = useAppMode();

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [regularPrice, setRegularPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [thumbnails, setThumbnails] = useState<ProductImage[]>([]);

  const router = useRouter();

  /** IMAGE PICKER */
  const handleImageSelect = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      if (!mainImage)
        setMainImage(result.assets[0].uri);
      else if (thumbnails.length < 4)
        setThumbnails([
          ...thumbnails,
          { uri: result.assets[0].uri, id: Date.now().toString() }
        ]);
    }
  };

  const removeThumbnail = (id: string) => {
    setThumbnails(thumbnails.filter((t) => t.id !== id));
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
        <CommonHeader
          type="seller"
          userName="Randika Perera"
          greeting="Good Morning!"
          subTitle="Add New Product/Service"
          profileRoute="/SellerProfile"
        />

        {/* Image Section */}
        <View style={styles.imageSection}>
          <TouchableOpacity style={styles.mainImageWrap} onPress={handleImageSelect}>
            {mainImage ? (
              <Image source={{ uri: mainImage }} style={styles.mainImage} />
            ) : (
              <View style={styles.mainImagePlaceholder}>
                <FontAwesome5 name="image" size={42} color="#9ea8aa" />
                <Text style={styles.placeholderText}>Select Images</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.thumbnailRow}>
            {[0, 1, 2, 3].map((i) => {
              const thumb = thumbnails[i];
              if (thumb)
                return (
                  <View key={i} style={styles.thumbSlot}>
                    <Image source={{ uri: thumb.uri }} style={styles.thumbImage} />
                    <TouchableOpacity
                      style={styles.thumbRemove}
                      onPress={() => removeThumbnail(thumb.id)}
                    >
                      <FontAwesome5 name="times" size={10} color="#fff" />
                    </TouchableOpacity>
                  </View>
                );

              return (
                <TouchableOpacity
                  key={i}
                  style={styles.thumbEmpty}
                  onPress={handleImageSelect}
                />
              );
            })}
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Product/Service Name</Text>
          <TextInput
            style={styles.input}
            value={productName}
            onChangeText={setProductName}
            placeholder="Enter product name"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            multiline
            placeholder="Enter description"
          />

          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Purchase Price</Text>
              <TextInput
                style={styles.input}
                value={purchasePrice}
                onChangeText={setPurchasePrice}
                keyboardType="numeric"
                placeholder="0.00"
              />
            </View>

            <View style={styles.col}>
              <Text style={styles.label}>Regular Price (LKR)</Text>
              <TextInput
                style={styles.input}
                value={regularPrice}
                onChangeText={setRegularPrice}
                keyboardType="numeric"
                placeholder="0.00"
              />
            </View>
          </View>

          <Text style={styles.label}>Sell Price (LKR)</Text>
          <TextInput
            style={styles.input}
            value={sellPrice}
            onChangeText={setSellPrice}
            keyboardType="numeric"
            placeholder="0.00"
          />

          <Text style={styles.label}>Discount (Optional)</Text>
          <View style={styles.discountRow}>
            <TextInput
              style={[styles.input, styles.discountInput]}
              value={discount}
              onChangeText={setDiscount}
              keyboardType="numeric"
              placeholder="0"
            />
            <Text style={styles.percent}>%</Text>
          </View>

          <Text style={styles.label}>Publish with</Text>
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn}>
              <Text style={styles.socialText}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Text style={styles.socialText}>Instagram</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.publishRow}>
            <Text style={styles.saveDraftText}>Save to Draft</Text>
            <TouchableOpacity style={styles.publishMainBtn}>
              <Text style={styles.publishMainText}>Publish</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

/* --------------------------- STYLES --------------------------- */
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    paddingBottom: 30,
  },

  imageSection: { paddingHorizontal: 20 },

  mainImageWrap: {
    width: "100%",
    height: 230,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 10,
    backgroundColor: "#f2f4f5",
    justifyContent: "center",
    alignItems: "center",
  },

  mainImage: { width: "100%", height: "100%" },

  mainImagePlaceholder: { justifyContent: "center", alignItems: "center" },

  placeholderText: { marginTop: 5, color: "#9ea8aa", fontSize: 13 },

  thumbnailRow: { flexDirection: "row", justifyContent: "space-between" },

  thumbSlot: {
    width: 70,
    height: 70,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#ddd",
  },

  thumbImage: { width: "100%", height: "100%" },

  thumbRemove: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },

  thumbEmpty: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: "#e8eef0",
  },

  form: { paddingHorizontal: 20, marginTop: 20 },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4c4c4c",
    marginBottom: 6,
  },

  input: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#f7f7f7",
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#eaeaea",
    marginBottom: 14,
  },

  textArea: {
    minHeight: 100,
    paddingVertical: 12,
  },

  row: { flexDirection: "row", gap: 15 },

  col: { flex: 1 },

  discountRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  discountInput: { flex: 1 },

  percent: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
    color: "#666",
  },

  socialRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },

  socialBtn: {
    backgroundColor: "#f3f3f3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  socialText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
  },

  publishRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 40,
  },

  saveDraftText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4c4c4c",
  },

  publishMainBtn: {
    backgroundColor: "#34C488",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 12,
  },

  publishMainText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
