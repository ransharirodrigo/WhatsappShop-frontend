import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function BuyerHomeScreen() {
  const router = useRouter();
  const [scrollY] = useState(new Animated.Value(0));
  
  const products = [
    { id: 1, name: 'Electric Bicycle', price: 'LKR 250,000', image: '🚴' },
    { id: 2, name: 'Mac Mini M4', price: 'LKR 370,000', image: '💻' },
    { id: 3, name: 'iPhone 15 pro', price: 'LKR 240,000', image: '📱' },
  ];

  const categories = [
    { id: 1, name: 'Hotel', icon: 'building.2.fill' },
    { id: 2, name: 'Vehicle', icon: 'car.fill' },
    { id: 3, name: 'Coffee', icon: 'cup.and.saucer.fill' },
    { id: 4, name: 'Electronics', icon: 'bolt.fill' },
    { id: 5, name: 'Bakery', icon: 'birthday.cake.fill' },
    { id: 6, name: 'Salon', icon: 'scissors' },
  ];

  const properties = [
    { id: 1, name: 'Heaven Garden', details: '1-2 rate • 1 Bathroom • 1 King Bed • 2 guest', price: 'LKR 80,000 night' },
    { id: 2, name: 'Iceland 3 stone', details: '1-2 rate • 1 Bathroom • 1 King Bed • 2 guest', price: 'LKR 500,000 night' },
  ];

  const HEADER_HEIGHT = 120;
  
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  const searchBarTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { transform: [{ translateY: headerTranslateY }] }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.userName}>Randika Perera</Text>
            <Text style={styles.greeting}>Good Morning!</Text>
          </View>
          <TouchableOpacity style={styles.avatar} onPress={() => router.push('/buyer-profile')}>
            <Image
              source={require('@/assets/images/dp.jpg')}
              style={styles.avatarImage}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.View style={[styles.stickySearchBar, { transform: [{ translateY: searchBarTranslateY }] }]}>
        <View style={styles.searchContainer}>
          <IconSymbol name="magnifyingglass" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="iPhone 16 Pro"
            placeholderTextColor="#999"
          />
        </View>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >

      <View style={styles.content}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsScroll}>
          {products.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productImage}>
                <Text style={styles.productEmoji}>{product.image}</Text>
                <TouchableOpacity style={styles.favoriteBtn}>
                  <IconSymbol name="heart" size={20} color="#666" />
                </TouchableOpacity>
              </View>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.categoriesHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <IconSymbol name="line.horizontal.3" size={24} color="#34C488" />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <IconSymbol name={category.icon as any} size={28} color="#fff" />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.propertiesGrid}>
          {properties.map((property) => (
            <View key={property.id} style={styles.propertyCard}>
              <View style={styles.propertyImage}>
                <Text style={styles.propertyImagePlaceholder}>🏠</Text>
                <TouchableOpacity style={styles.propertyFavoriteBtn}>
                  <IconSymbol name="heart.fill" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
              <View style={styles.propertyInfo}>
                <Text style={styles.propertyName}>{property.name}</Text>
                <Text style={styles.propertyDetails}>{property.details}</Text>
                <Text style={styles.propertyPrice}>{property.price}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#34C488',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 1000,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stickySearchBar: {
    position: 'absolute',
    top: 125,
    left: 0,
    right: 0,
    backgroundColor: '#34C488',
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 999,
  },
  scrollContent: {
    paddingTop: 210,
    flexGrow: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  greeting: {
    fontSize: 16,
    color: '#e0f2e0',
    marginTop: 4,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8B7FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    borderStyle: 'dashed',
  },
  avatarImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  avatarText: {
    fontSize: 30,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  content: {
    padding: 20,
  },
  productsScroll: {
    marginBottom: 20,
  },
  productCard: {
    width: 140,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  productEmoji: {
    fontSize: 50,
  },
  favoriteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#34C488',
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  categoriesScroll: {
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#34C488',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: '#666',
  },
  propertiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  propertyCard: {
    backgroundColor: '#333',
    borderRadius: 12,
    overflow: 'hidden',
    width: '47%',
    marginBottom: 15,
  },
  propertyImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  propertyImagePlaceholder: {
    fontSize: 60,
  },
  propertyFavoriteBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  propertyInfo: {
    padding: 15,
  },
  propertyName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  propertyDetails: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  propertyPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#34C488',
  },
});
