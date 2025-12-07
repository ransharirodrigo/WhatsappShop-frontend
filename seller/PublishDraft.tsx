import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAppMode } from '@/contexts/app-mode-context';

interface ProductImage {
  id: string;
  uri: string;
}

export default function DraftPublishView() {
  const { mode, toggleMode } = useAppMode();


  const [mainImage, setMainImage] = useState<string>(
    'https://via.placeholder.com/400x400'
  );

  const [thumbnails, setThumbnails] = useState<ProductImage[]>([
    { id: '1', uri: 'https://via.placeholder.com/70' },
    { id: '2', uri: 'https://via.placeholder.com/70' },
    { id: '3', uri: 'https://via.placeholder.com/70' },
    { id: '4', uri: 'https://via.placeholder.com/70' },
  ]);

  const productName = 'iPhone 16 Pro';
  const price = '350,000';
  const description =
    'The iPhone 16 Pro features a 6.3-inch Super Retina XDR display, powered by the A18 Pro chip, and offers advanced camera capabilities, including a triple-camera system.';
  const unitCount = 10;

  const extraCount = thumbnails.length > 3 ? thumbnails.length - 3 : 0;

  return (
    <View
      style={[
        styles.screenContainer
      ]}
    >
      {/* Mode Toggle (optional – useful for testing) */}
      <TouchableOpacity
        onPress={toggleMode}
        style={styles.modeToggle}
      >
        <FontAwesome5
      
          size={18}

        />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Main Image */}
        <Image source={{ uri: mainImage }} style={styles.mainImage} />

        {/* Thumbnails */}
        <View style={styles.thumbnailRow}>
          {thumbnails.slice(0, 3).map((thumb) => (
            <Image
              key={thumb.id}
              source={{ uri: thumb.uri }}
              style={styles.thumbnail}
            />
          ))}

          {extraCount > 0 && (
            <View style={[styles.thumbnail, styles.extraThumbnail]}>
              <Text style={styles.extraText}>+{extraCount} more</Text>
            </View>
          )}
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text
            style={[
              styles.productName,
            ]}
          >
            {productName}
          </Text>

          <Text style={styles.price}>LKR {price}</Text>

          <Text
            style={[
              styles.unit,
            ]}
          >
            unit {unitCount}
          </Text>

          <Text
            style={[
              styles.description,
            ]}
          >
            {description}
          </Text>
        </View>

        {/* Publish Button */}
        <TouchableOpacity
          style={[
            styles.publishBtn,
          ]}
        >
          <Text style={styles.publishText}>Publish now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  modeToggle: {
    position: 'absolute',
    top: 45,
    right: 20,
    zIndex: 10,
  },
  mainImage: {
    width: '100%',
    height: 300,
  },
  thumbnailRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 10,
    gap: 10,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  extraThumbnail: {
    backgroundColor: '#34C488',
    justifyContent: 'center',
    alignItems: 'center',
  },
  extraText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  infoSection: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
  productName: {
    fontSize: 20,
    fontWeight: '700',
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#34C488',
    marginTop: 5,
  },
  unit: {
    fontSize: 14,
    marginTop: 2,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  publishBtn: {
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  publishText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
