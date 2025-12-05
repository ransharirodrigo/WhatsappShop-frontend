import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CommonHeader } from '@/components/CommonHeader';
import { commonStyles } from '@/assets/css/common_styles';

interface Product {
  id: string;
  name: string;
  price: string;
  status: 'Active' | 'Deactive';
  image: any;
}

export default function BusinessSuitScreen() {
  const [sortBy, setSortBy] = useState('Latest');
  const [viewType, setViewType] = useState<'list' | 'grid'>('list');
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'iPhone 16 Pro', price: 'LKR 350,000', status: 'Active', image: null },
    { id: '2', name: 'Electric Cycle', price: 'LKR 550,000', status: 'Active', image: null },
    { id: '3', name: 'Portable mini car cha...', price: 'LKR 250,000', status: 'Deactive', image: null },
    { id: '4', name: 'Mac mini M series', price: 'LKR 450,000', status: 'Active', image: null },
  ]);

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const toggleView = () => {
    setViewType(viewType === 'list' ? 'grid' : 'list');
  };

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
        <View style={styles.contentWrapper}>
          {/* Business Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Ionicons name="logo-apple" size={60} color="#000" />
              </View>
            </View>
            <View style={styles.businessInfo}>
              <Text style={styles.businessName}>AppleAsia</Text>
              <Text style={styles.businessDescription}>
                Apple Asia is the Popular Seller in Sri Lanka and we strive to bring the Apple products you love
              </Text>
              <TouchableOpacity>
                <Text style={styles.readMore}>read more</Text>
              </TouchableOpacity>
              <View style={styles.categoryContainer}>
                <Text style={styles.categoryLabel}>Category</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>Electrical</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Stats and Settings */}
          <View style={styles.statsContainer}>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Active Products</Text>
                <Text style={styles.statValue}>20</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>draft</Text>
                <Text style={styles.statValue}>03</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.shopSettings}>
              <Text style={styles.shopSettingsText}>Shop{'\n'}Settings</Text>
            </TouchableOpacity>
          </View>

          {/* Your Products Section */}
          <View style={styles.productsHeader}>
            <Text style={styles.productsTitle}>Your products</Text>
            <View style={styles.sortContainer}>
              <Text style={styles.sortLabel}>sort by</Text>
              <TouchableOpacity style={styles.sortDropdown}>
                <Text style={styles.sortValue}>Latest ▾</Text>
              </TouchableOpacity>

              {/* Single Toggle Button */}
              <TouchableOpacity onPress={toggleView}>
                <Image
                  source={
                    viewType === 'list'
                      ? require('@/assets/images/business_suit_images/Grid.png')
                      : require('@/assets/images/business_suit_images/List.png')
                  }
                  style={styles.viewIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Products List */}
          <View style={styles.productsList}>
            {viewType === 'list' ? (
              products.map(product => (
                <View key={product.id} style={styles.productItem}>
                  <View style={styles.productImage}>
                    <View style={styles.imagePlaceholder} />
                  </View>
                  <View style={styles.productDetails}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <View style={styles.productMeta}>
                      <Text style={styles.productPrice}>{product.price}</Text>
                      <Text
                        style={[
                          styles.productStatus,
                          product.status === 'Deactive' && styles.productStatusDeactive,
                        ]}
                      >
                        {product.status}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteProduct(product.id)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <View style={styles.gridContainer}>
                {products.map(product => (
                  <View key={product.id} style={styles.gridItem}>
                    <View style={styles.productImage}>
                      <View style={styles.imagePlaceholder} />
                    </View>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>{product.price}</Text>
                    <Text
                      style={[
                        styles.productStatus,
                        product.status === 'Deactive' && styles.productStatusDeactive,
                      ]}
                    >
                      {product.status}
                    </Text>
                    <TouchableOpacity
                      style={[styles.deleteButton, { marginTop: 8, paddingHorizontal: 16, paddingVertical: 6 }]}
                      onPress={() => deleteProduct(product.id)}
                    >
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20
  },
  logoContainer: { marginRight: 16 },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center'
  },
  businessInfo: { flex: 1 },
  businessName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8
  },
  businessDescription: {
    fontSize: 13,
    color: '#8E8E93',
    lineHeight: 18,
    marginBottom: 4
  },
  readMore: {
    fontSize: 13,
    color: '#10B981',
    fontWeight: '500',
    marginBottom: 12
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  categoryLabel: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    marginRight: 8
  },
  categoryBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8
  },
  categoryText: {
    fontSize: 13,
    color: '#FFF',
    fontWeight: '600'
  },

  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center'
  },
  statsRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  statItem: { flex: 1 },
  statLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4
  },
  statValue: {
    fontSize: 32,
    fontWeight: '600',
    color: '#000'
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E5EA',
    marginHorizontal: 20
  },
  shopSettings: {
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  shopSettingsText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 18
  },

  productsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  productsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000'
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  sortLabel: {
    fontSize: 14,
    color: '#8E8E93'
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  sortValue: {
    fontSize: 11,
    color: '#494949',
  },
  viewIcon: {
    width: 24,
    height: 24,
    marginLeft: 8
  },

  productsList: { gap: 12 },
  productItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    marginRight: 12,
    overflow: 'hidden'
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E5E5EA'
  },
  productDetails: { flex: 1 },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4
  },
  productMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  productPrice: {
    fontSize: 14,
    color: '#8E8E93'
  },
  productStatus: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981'
  },
  productStatusDeactive: {
    color: '#EF4444'
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF'
  },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 0
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center'
  },
  sortDropdown: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});