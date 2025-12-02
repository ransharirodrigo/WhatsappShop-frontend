import React, { useState, useEffect } from 'react'; // <-- Import useEffect
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar 
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'; 
import { useLocalSearchParams } from 'expo-router'; // <--- NEW: Import useLocalSearchParams

// Mock Data Structure (we will use the ID to pretend to fetch data)
const MOCK_PRODUCTS = {
  '1': { 
    name: 'Electric Bicycle', price: '250,000', currency: 'LKR', stock: 15,
    description: 'A sleek, lightweight electric bicycle with a powerful motor and long-lasting battery, perfect for city commutes or weekend rides. A sleek, lightweight electric bicycle with a powerful motor and long-lasting battery, perfect for city commutes or weekend rides. ',
  },
  '2': { 
    name: 'Mac Mini M4', price: '370,000', currency: 'LKR', stock: 10,
    description: 'The latest Mac Mini powered by the M4 chip, offering blazing fast performance in a compact, energy-efficient design for professionals.',
  },
  '3': { 
    name: 'iPhone 15 Pro', price: '240,000', currency: 'LKR', stock: 32,
    description: 'The iPhone 15 Pro features a 6.1-inch Super Retina XDR display and the A17 Bionic chip, renowned for its camera and durability.',
  },
};

// Common thumbnail data for all products (for demonstration)
const COMMON_THUMBNAILS = [
    { id: 1, src: 'placeholder_thumb_1' },
    { id: 2, src: 'placeholder_thumb_2' },
    { id: 3, src: 'placeholder_thumb_3' },
];

// Default data in case no ID is found
const DEFAULT_PRODUCT_DATA = { 
    name: 'Product Loading...', price: '0', currency: 'LKR', stock: 0,
    description: 'Fetching product details...',
    mainImage: 'placeholder_main', 
    thumbnails: COMMON_THUMBNAILS
};


export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const productId = id ? String(id) : null;

  // FIX 2: Initialize state based on the ID or default data
  const initialData = MOCK_PRODUCTS[productId] 
    ? { ...MOCK_PRODUCTS[productId], mainImage: 'placeholder_main', thumbnails: COMMON_THUMBNAILS }
    : DEFAULT_PRODUCT_DATA;

  const [productData, setProductData] = useState(initialData);
  const [unitCount, setUnitCount] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // FIX 3: Use useEffect to "fetch" the product data when the ID is available/changes
  useEffect(() => {
    if (productId && MOCK_PRODUCTS[productId]) {
        setProductData({
            ...MOCK_PRODUCTS[productId],
            mainImage: 'placeholder_main', 
            thumbnails: COMMON_THUMBNAILS 
        });
        setUnitCount(1);
    } else if (!productId) {
         setProductData(DEFAULT_PRODUCT_DATA);
    }
  }, [productId]);
  
  // ... (rest of the component logic) ...
  
  const increaseUnit = () => setUnitCount(prev => (prev < productData.stock ? prev + 1 : prev));
  const decreaseUnit = () => setUnitCount(prev => (prev > 1 ? prev - 1 : prev));

  // Placeholder functions for navigation/actions
  const goBack = () => console.log('Go Back Pressed');
  const shareProduct = () => console.log('Share Product');
  const chatWithSeller = () => console.log('Chat with Seller');

  // --- Mock Image Component ---
 // Inside ProductDetailScreen.tsx

const MockImage = ({ type, style }) => (
  <View style={[styles.mockImageBase, type === 'main' ? styles.mainImage : styles.thumbImage, style]}>
    {/* 🎯 FIX: Provide a non-empty string inside the Text component */}
    <Text style={styles.mockImageText}>
      {/* Use a placeholder string */}
      {productData.name} Image Placeholder
    </Text> 
  </View>
);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ... (rest of the JSX is the same) ... */}
        {/* Main Product Image Area */}
        <View style={styles.imageGallery}>
          <MockImage type="main" />
        </View>

        {/* Floating Header/Navigation */}
        <View style={styles.floatingHeader}>
          <TouchableOpacity onPress={goBack} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={shareProduct} style={styles.iconButton}>
              <FontAwesome name="share-alt" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Thumbnails */}
        <View style={styles.thumbnailRow}>
          {productData.thumbnails.map((thumb) => (
            <MockImage key={thumb.id} type="thumb" style={styles.thumbnailContainer} />
          ))}
          <View style={styles.moreThumbnail}>
             <Text style={styles.moreThumbnailText}>+1</Text>
          </View>
        </View>

        {/* Product Info Section */}
        <View style={styles.content}>
          <View style={styles.priceRow}>
            <View style={styles.titlePrice}>
              <Text style={styles.productTitle}>{productData.name} (ID: {productId || 'N/A'})</Text> {/* Debug display */}
              <Text style={styles.productPrice}>{productData.currency} {productData.price}</Text>
            </View>
            {/* ... (rest of the priceRow and actions) ... */}
            <View style={styles.rightActions}>
              <TouchableOpacity onPress={shareProduct} style={styles.shareIcon}>
                <FontAwesome name="share-square-o" size={24} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)} style={styles.favoriteIcon}>
                <FontAwesome 
                  name={isFavorite ? 'heart' : 'heart-o'} 
                  size={24} 
                  color={isFavorite ? '#E53935' : '#333'} 
                />
              </TouchableOpacity>
              <View style={styles.unitSelector}>
                <Text style={styles.unitText}>unit</Text>
                <TouchableOpacity onPress={decreaseUnit} disabled={unitCount === 1}>
                  <Ionicons name="chevron-down" size={14} color="#333" />
                </TouchableOpacity>
                <Text style={styles.unitValue}>{unitCount}</Text>
                <TouchableOpacity onPress={increaseUnit} disabled={unitCount === productData.stock}>
                  <Ionicons name="chevron-up" size={14} color="#333" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={[styles.actionButton, styles.buyNowButton]}>
              <Text style={styles.buyNowText}>Buy Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.codButton]}>
              <Text style={styles.codText}>COD</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={chatWithSeller} style={styles.chatButton}>
            <Ionicons name="chatbubble-ellipses-outline" size={18} color="#999" />
            <Text style={styles.chatText}>Chat with Seller</Text>
          </TouchableOpacity>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{productData.description}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNavPlaceholder}>
        <Text style={styles.bottomNavText}>[Bottom Tab Bar Here]</Text>
      </View>
    </View>
  );
}

// ... (Styles object remains the same) ...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // ... (rest of the styles are unchanged) ...
  imageGallery: {
    width: '100%',
    height: 380, 
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockImageBase: {
    backgroundColor: '#e0e0e0', 
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ddd',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderWidth: 0,
  },
  mockImageText: {
    fontSize: 12,
    color: '#666',
  },
  floatingHeader: {
    position: 'absolute',
    top: StatusBar.currentHeight || 40, 
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  thumbnailRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: -50, 
    gap: 10,
  },
  thumbnailContainer: {
    width: 70,
    height: 70,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#34C488', 
    overflow: 'hidden',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
    borderWidth: 0,
  },
  moreThumbnail: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#34C488',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreThumbnailText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  content: {
    padding: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  titlePrice: {
    flex: 1,
    paddingRight: 15,
  },
  productTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 5,
  },
  shareIcon: {
    marginRight: 5,
  },
  favoriteIcon: {
    marginRight: 10,
  },
  unitSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  unitText: {
    fontSize: 12,
    color: '#999',
    marginRight: 5,
  },
  unitValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 5,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buyNowButton: {
    backgroundColor: '#34C488',
  },
  buyNowText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  codButton: {
    backgroundColor: '#27474E',
  },
  codText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    marginBottom: 25,
  },
  chatText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#999',
  },
  descriptionContainer: {
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  bottomNavPlaceholder: {
    height: 80, 
    backgroundColor: '#27474E',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  bottomNavText: {
    color: '#fff',
    fontSize: 14,
  }
});