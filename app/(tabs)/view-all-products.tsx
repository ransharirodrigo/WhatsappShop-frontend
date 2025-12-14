import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export const options = {
  headerShown: false,
};

interface Product {
  id: number;
  name: string;
  price: string;
  status: 'Active' | 'Deactive';
  image: any;
}

export default function ViewAllProductsScreen() {
  const router = useRouter();
  const [sortBy, setSortBy] = useState('Latest');

  const products: Product[] = [
    {
      id: 1,
      name: 'iPhone 16 Pro',
      price: 'LKR 350,000',
      status: 'Active',
      image: require('@/assets/images/no_product_image.jpg'),
    },
    {
      id: 2,
      name: 'Electric Cycle',
      price: 'LKR 550,000',
      status: 'Active',
      image: require('@/assets/images/no_product_image.jpg'),
    },
    {
      id: 3,
      name: 'Portable mini car charger',
      price: 'LKR 250,000',
      status: 'Deactive',
      image: require('@/assets/images/no_product_image.jpg'),
    },
    {
      id: 4,
      name: 'Mac mini M series',
      price: 'LKR 450,000',
      status: 'Active',
      image: require('@/assets/images/no_product_image.jpg'),
    },
  ];

  const handleEdit = (productId: number) => {
    // Navigate to edit product screen
    console.log('Edit product:', productId);
  };

  const handleDelete = (productId: number) => {
    // Handle product deletion
    console.log('Delete product:', productId);
  };

  const handleView = (productId: number) => {
    // Navigate to product details
    console.log('View product:', productId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.appName}>WhatsAppShop</Text>
          <Text style={styles.greeting}>Good Morning!</Text>
        </View>
        
        <View style={styles.profileContainer}>
          <View style={styles.profileRing}>
            <Image
              source={require('@/assets/images/dp.jpg')}
              style={styles.profileImage}
            />
          </View>
        </View>
      </View>

      {/* Title and Controls */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>All Products</Text>
        
        <View style={styles.controls}>
          <TouchableOpacity style={styles.sortButton}>
            <Text style={styles.sortText}>sort by</Text>
            <Text style={styles.sortValue}>{sortBy}</Text>
            <Ionicons name="chevron-down" size={16} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.viewToggle}>
            <Ionicons name="list" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Products List */}
      <ScrollView style={styles.productsList} showsVerticalScrollIndicator={false}>
        {products.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <View style={styles.productInfo}>
              <Image source={product.image} style={styles.productImage} />
              
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
                <View style={styles.statusContainer}>
                  <Text style={[
                    styles.statusText,
                    product.status === 'Active' ? styles.activeStatus : styles.deactiveStatus
                  ]}>
                    {product.status}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.editButton]}
                onPress={() => handleEdit(product.id)}
              >
                <Ionicons name="create-outline" size={16} color="white" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => handleDelete(product.id)}
              >
                <Ionicons name="trash-outline" size={16} color="white" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, styles.viewButton]}
                onPress={() => handleView(product.id)}
              >
                <Ionicons name="eye-outline" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        
        {/* Bottom spacing for tab bar */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  appName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  greeting: {
    fontSize: 14,
    color: '#6b7280',
  },
  profileContainer: {
    position: 'relative',
  },
  profileRing: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#8b5cf6',
    padding: 2,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sortText: {
    fontSize: 14,
    color: '#6b7280',
  },
  sortValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  viewToggle: {
    padding: 4,
  },
  productsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 6,
  },
  statusContainer: {
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  activeStatus: {
    color: '#059669',
    backgroundColor: '#d1fae5',
  },
  deactiveStatus: {
    color: '#dc2626',
    backgroundColor: '#fee2e2',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: '#3b82f6',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
  },
  viewButton: {
    backgroundColor: '#059669',
  },
  bottomSpacing: {
    height: 100, // Space for the tab bar
  },
});