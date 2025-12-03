import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function AddProductsScreen() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [regularPrice, setRegularPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const togglePlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.userName}>Randika Perera</Text>
            <Text style={styles.greeting}>Good Morning!</Text>
          </View>
          <View style={styles.avatar}>
            <View style={styles.avatarCircle} />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Add New Product/Service</Text>

        {/* Product Images */}
        <View style={styles.section}>
          <Text style={styles.label}>Product Images</Text>
          <View style={styles.imageGrid}>
            {[1, 2, 3].map((_, index) => (
              <View key={index} style={styles.imageBox}>
                <View style={styles.imagePlaceholder} />
              </View>
            ))}
            <TouchableOpacity style={styles.selectImagesBox}>
              <Text style={styles.selectImagesText}>Select{'\n'}Images</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Product/Service Name */}
        <View style={styles.section}>
          <Text style={styles.label}>Product/Service Name</Text>
          <TextInput
            style={styles.input}
            placeholder="iPhone 16 Pro"
            placeholderTextColor="#C7C7CD"
            value={productName}
            onChangeText={setProductName}
          />
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="The iPhone 16 Pro features a 6.3-inch Super Retina XDR display, powered by the A18 Pro chip, and offers advanced camera capabilities, including a triple-camera system."
            placeholderTextColor="#C7C7CD"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Price Row */}
        <View style={styles.priceRow}>
          <View style={styles.priceColumn}>
            <Text style={styles.label}>Purchase Price</Text>
            <View style={styles.priceInputContainer}>
              <TextInput
                style={styles.priceInput}
                placeholder="350,000"
                placeholderTextColor="#C7C7CD"
                value={purchasePrice}
                onChangeText={setPurchasePrice}
                keyboardType="numeric"
              />
              <Text style={styles.priceDecimal}>.00</Text>
            </View>
          </View>
          <View style={styles.priceColumn}>
            <Text style={styles.label}>Regular Price (LKR)</Text>
            <View style={styles.priceInputContainer}>
              <TextInput
                style={styles.priceInput}
                placeholder="350,000"
                placeholderTextColor="#C7C7CD"
                value={regularPrice}
                onChangeText={setRegularPrice}
                keyboardType="numeric"
              />
              <Text style={styles.priceDecimal}>.00</Text>
            </View>
          </View>
        </View>

        {/* Sell Price */}
        <View style={styles.section}>
          <Text style={styles.label}>Sell Price (LKR)</Text>
          <View style={styles.priceInputContainer}>
            <TextInput
              style={styles.priceInput}
              placeholder="350,000"
              placeholderTextColor="#C7C7CD"
              value={sellPrice}
              onChangeText={setSellPrice}
              keyboardType="numeric"
            />
            <Text style={styles.priceDecimal}>.00</Text>
          </View>
        </View>

        {/* Discount Row */}
        <View style={styles.discountRow}>
          <View style={styles.discountColumn}>
            <Text style={styles.label}>Discount(Optional)</Text>
            <View style={styles.discountInputContainer}>
              <TextInput
                style={styles.discountInput}
                placeholder="10"
                placeholderTextColor="#C7C7CD"
                value={discount}
                onChangeText={setDiscount}
                keyboardType="numeric"
              />
              <Text style={styles.percentSymbol}>%</Text>
            </View>
          </View>
          <View style={styles.amountColumn}>
            <Text style={styles.amountLabel}>Amount</Text>
          </View>
        </View>

        {/* Coupe code */}
        <View style={styles.section}>
          <Text style={styles.label}>Coupe code(Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            placeholderTextColor="#C7C7CD"
            value={couponCode}
            onChangeText={setCouponCode}
          />
        </View>

        {/* Publish with */}
        <View style={styles.section}>
          <Text style={styles.label}>Publish with</Text>
          <View style={styles.platformRow}>
            <TouchableOpacity
              style={[
                styles.platformButton,
                selectedPlatforms.includes('WhatsApp') && styles.platformButtonActive,
              ]}
              onPress={() => togglePlatform('WhatsApp')}
            >
              <Text style={styles.platformText}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.platformButton,
                selectedPlatforms.includes('Facebook') && styles.platformButtonActive,
              ]}
              onPress={() => togglePlatform('Facebook')}
            >
              <Text style={styles.platformText}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.platformButton,
                selectedPlatforms.includes('Instagram') && styles.platformButtonActive,
              ]}
              onPress={() => togglePlatform('Instagram')}
            >
              <Text style={styles.platformText}>Instagram</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.draftButton}>
            <Text style={styles.draftButtonText}>Save to Draft</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.publishButton}>
            <Text style={styles.publishButtonText}>Publish</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  greeting: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#7C3AED',
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#C7C7CD',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    marginBottom: 10,
  },
  imageGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  imageBox: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#E5E5EA',
    overflow: 'hidden',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#D1D1D6',
  },
  selectImagesBox: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectImagesText: {
    fontSize: 12,
    color: '#007AFF',
    textAlign: 'center',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: '#000',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  priceRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  priceColumn: {
    flex: 1,
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  priceInput: {
    flex: 1,
    fontSize: 15,
    color: '#000',
    paddingVertical: 16,
  },
  priceDecimal: {
    fontSize: 15,
    color: '#000',
    marginLeft: 4,
  },
  discountRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  discountColumn: {
    flex: 1,
  },
  amountColumn: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  amountLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#007AFF',
    textAlign: 'right',
    marginBottom: 10,
  },
  discountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  discountInput: {
    flex: 1,
    fontSize: 15,
    color: '#000',
    paddingVertical: 16,
  },
  percentSymbol: {
    fontSize: 15,
    color: '#000',
    marginLeft: 4,
  },
  platformRow: {
    flexDirection: 'row',
    gap: 12,
  },
  platformButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#E5E5EA',
  },
  platformButtonActive: {
    backgroundColor: '#D1D1D6',
  },
  platformText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginTop: 10,
  },
  draftButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  draftButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  publishButton: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#10B981',
    alignItems: 'center',
  },
  publishButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  bottomSpacing: {
    height: 40,
  },
});
