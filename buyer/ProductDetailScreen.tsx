import { useAppMode } from '@/contexts/app-mode-context';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const MOCK_PRODUCTS: Record<string, {
  name: string;
  price: string;
  currency: string;
  stock: number;
  description: string;
  mainImage?: string;
  thumbnails?: Array<{ id: number; src: string }>;
}> = {
  '1': { 
    name: 'Electric Bicycle', 
    price: '250,000', 
    currency: 'LKR', 
    stock: 15,
    description: 'A sleek, lightweight electric bicycle with a powerful motor and long-lasting battery, perfect for city commutes or weekend rides. A sleek, lightweight electric bicycle with a powerful motor and long-lasting battery, perfect for city commutes or weekend rides. ',
    mainImage: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800',
    thumbnails: [
      { id: 1, src: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=200' },
      { id: 2, src: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200' },
      { id: 3, src: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=200' },
    ],
  },
  '2': { 
    name: 'Mac Mini M4', 
    price: '370,000', 
    currency: 'LKR', 
    stock: 10,
    description: 'The latest Mac Mini powered by the M4 chip, offering blazing fast performance in a compact, energy-efficient design for professionals.',
    mainImage: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800',
    thumbnails: [
      { id: 1, src: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200' },
      { id: 2, src: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200' },
      { id: 3, src: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200' },
    ],
  },
  '3': { 
    name: 'iPhone 16 Pro', 
    price: '350,000', 
    currency: 'LKR', 
    stock: 32,
    description: 'The iPhone 16 Pro features a 6.3-inch Super Retina XDR display, powered by the A18 Pro chip, offering exceptional performance and advanced camera capabilities.',
    mainImage: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800',
    thumbnails: [
      { id: 1, src: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200' },
      { id: 2, src: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200' },
      { id: 3, src: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200' },
      { id: 4, src: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200' },
    ],
  },
};

const NO_PRODUCT_IMAGE = require('@/assets/images/no_product_image.jpg');

const DEFAULT_PRODUCT_DATA = { 
    name: 'Product Loading...', 
    price: '0', 
    currency: 'LKR', 
    stock: 0,
    description: 'Fetching product details...',
    mainImage: undefined, 
    thumbnails: []
};


export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { toggleMode } = useAppMode();
  const productId = id ? String(id) : null;

  const initialData = (productId && MOCK_PRODUCTS[productId]) 
    ? MOCK_PRODUCTS[productId]
    : DEFAULT_PRODUCT_DATA;

  const [productData, setProductData] = useState(initialData);
  const [unitCount, setUnitCount] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (productId && MOCK_PRODUCTS[productId]) {
        setProductData(MOCK_PRODUCTS[productId]);
        setUnitCount(1);
    } else if (!productId) {
         setProductData(DEFAULT_PRODUCT_DATA);
    }
  }, [productId]);
  
  
  const increaseUnit = () => setUnitCount(prev => (prev < productData.stock ? prev + 1 : prev));
  const decreaseUnit = () => setUnitCount(prev => (prev > 1 ? prev - 1 : prev));

  const goBack = () => router.back();
  const shareProduct = () => console.log('Share Product');
  const chatWithSeller = () => console.log('Chat with Seller');

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [currentMainImage, setCurrentMainImage] = useState<string | undefined>(productData.mainImage);

  useEffect(() => {
    if (productData.mainImage) {
      setCurrentMainImage(productData.mainImage);
      setImageError(false);
      setSelectedImageIndex(0);
    }
  }, [productData.mainImage]);

  const mainImageSource = currentMainImage 
    ? { uri: currentMainImage }
    : NO_PRODUCT_IMAGE;

  const thumbnailImages = productData.thumbnails && productData.thumbnails.length > 0
    ? productData.thumbnails.slice(0, 4) // Maximum 4 images
    : [];

  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
     
        <View style={styles.imageGallery}>
          <Image
            source={imageError ? NO_PRODUCT_IMAGE : mainImageSource}
            style={styles.mainImage}
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        </View>

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
        
        {thumbnailImages.length > 0 && (
          <View style={styles.thumbnailRow}>
            {thumbnailImages.map((thumb, index) => (
              <TouchableOpacity
                key={thumb.id}
                style={[
                  styles.thumbnailContainer,
                  selectedImageIndex === index && styles.thumbnailSelected
                ]}
                onPress={() => {
                  setSelectedImageIndex(index);
                  setImageError(false);
                  if (thumb.src) {
                    setCurrentMainImage(thumb.src);
                  }
                }}
              >
                <Image
                  source={thumb.src ? { uri: thumb.src } : NO_PRODUCT_IMAGE}
                  style={styles.thumbImage}
                  resizeMode="cover"
                  onError={() => {}}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.content}>
          <View style={styles.priceRow}>
            <View style={styles.titlePrice}>
              <Text style={styles.productTitle} numberOfLines={1} ellipsizeMode="tail">{productData.name}</Text> 
              <Text style={styles.productPrice}>{productData.currency} {productData.price}</Text>
            </View>
            <View style={styles.rightActions}>
              <View style={styles.iconRow}>
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
              </View>
              <View style={styles.unitContainer}>
                <Text style={styles.unitLabel}>unit</Text>
                <View style={styles.unitSelector}>
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
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={[styles.actionButton, styles.buyNowButton]}>
              <Text style={styles.buyNowText}>Buy Now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.codButton]}>
              <Text style={styles.codText}>COD</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.chatButtonContainer}>
            <TouchableOpacity onPress={chatWithSeller} style={styles.chatLink}>
              <FontAwesome5 name="whatsapp" size={14} color="#494949" />
              <Text style={styles.chatLinkText}>Chat with Seller</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>{productData.description}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNavContainer}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/')}
        >
          <FontAwesome5 name="home" size={24} color="#34C488" />
          <Text style={styles.navLabelActive}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/fav-items')}
        >
          <FontAwesome5 name="heart" size={24} color="#7A9B94" />
          <Text style={styles.navLabelInactive}>Fav Items</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/add')}
        >
          <FontAwesome5 name="plus-circle" size={24} color="#7A9B94" />
          <Text style={styles.navLabelInactive}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/my-orders')}
        >
          <FontAwesome5 name="box" size={24} color="#7A9B94" />
          <Text style={styles.navLabelInactive}>My Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={toggleMode}
        >
          <FontAwesome5 name="retweet" size={24} color="#7A9B94" />
          <Text style={styles.navLabelInactive}>Seller</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageGallery: {
    width: '100%',
    height: 380, 
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {
    width: '100%',
    height: '100%',
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
    borderColor: '#ddd',
    overflow: 'hidden',
    marginRight: 10,
  },
  thumbnailSelected: {
    borderColor: '#34C488',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
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
    color: '#34C488',
  },
  rightActions: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 10,
    marginTop: 5,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  shareIcon: {
    marginRight: 0,
  },
  favoriteIcon: {
    marginRight: 0,
  },
  unitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  unitLabel: {
    fontSize: 12,
    color: '#999',
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
  chatButtonContainer: {
    alignItems: 'flex-end',
    marginBottom: 25,
  },
  chatLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  chatLinkText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#494949',
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