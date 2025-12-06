import { commonStyles } from '@/assets/css/common_styles';
import { useAppMode } from '@/contexts/app-mode-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';

export default function UpdateShopScreen() {
  const [shopName, setShopName] = useState('');
  const [businessCategory, setBusinessCategory] = useState('');
  const [aboutBusiness, setAboutBusiness] = useState('');
  const [logoImage, setLogoImage] = useState(null);
  const router = useRouter();
  const { mode, toggleMode } = useAppMode();

  const handleLogoSelect = () => {
    // Implement logo selection functionality
    console.log('Select logo');
  };

  const handleSubmit = () => {
    console.log('Shop info updated:', { shopName, businessCategory, aboutBusiness, logoImage });
  };

  return (
    <View style={commonStyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <FontAwesome5 name="arrow-left" size={20} color="#2B2B2B" />
          </TouchableOpacity>
        </View>

        {/* Page Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>Update Your</Text>
          <Text style={styles.pageTitle}>Shop Info</Text>
        </View>

        {/* Logo Upload Section */}
        <View style={styles.logoContainer}>
          <TouchableOpacity style={styles.logoCircle} onPress={handleLogoSelect}>
            {logoImage ? (
              <Image source={{ uri: logoImage }} style={styles.logoImage} />
            ) : (
              <FontAwesome5 name="store" size={40} color="#B0B0B0" />
            )}
          </TouchableOpacity>
          <Text style={styles.logoLabel}>Select your Logo</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Shop name</Text>
            <TextInput
              style={styles.input}
              value={shopName}
              onChangeText={setShopName}
              placeholder=""
              placeholderTextColor="#C0C0C0"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Business Category</Text>
            <TouchableOpacity style={styles.dropdownInput}>
              <TextInput
                style={styles.dropdownText}
                value={businessCategory}
                onChangeText={setBusinessCategory}
                placeholder=""
                placeholderTextColor="#C0C0C0"
                editable={false}
              />
              <FontAwesome5 name="chevron-down" size={14} color="#7A9B94" style={styles.dropdownIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>About Your Business</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={aboutBusiness}
              onChangeText={setAboutBusiness}
              placeholder=""
              placeholderTextColor="#C0C0C0"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Request to submit</Text>
        </TouchableOpacity>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  titleContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2B2B2B',
    lineHeight: 36,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    overflow: 'hidden',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  logoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34C488',
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2B2B2B',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#2B2B2B',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  dropdownText: {
    flex: 1,
    fontSize: 14,
    color: '#2B2B2B',
    padding: 0,
  },
  dropdownIcon: {
    marginLeft: 8,
  },
  textArea: {
    height: 100,
    paddingTop: 14,
  },
  submitButton: {
    marginHorizontal: 20,
    backgroundColor: '#34C488',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bottomNavContainer: {
    height: 80,
    backgroundColor: '#1C6055',
    borderTopWidth: 0,
    borderRadius: 30,
    marginHorizontal: 10,
    marginBottom: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
  navItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navLabelActive: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: '500',
    color: '#34C488',
  },
  navLabelInactive: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: '500',
    color: '#7A9B94',
  },
});