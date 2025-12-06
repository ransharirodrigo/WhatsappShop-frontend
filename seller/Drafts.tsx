import { CommonHeader } from '@/components/CommonHeader';
import { commonStyles } from '@/assets/css/common_styles';
import { useAppMode } from '@/contexts/app-mode-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SellerDrafts() {
  const [sortBy, setSortBy] = useState('Latest');
  const router = useRouter();
  const { mode, toggleMode } = useAppMode();

  const draftProducts = [
    { id: 1, name: 'iPhone 16 Pro', price: '350,000', image: '📱' },
    { id: 2, name: 'Electric Cycle', price: '550,000', image: '🚴' },
    { id: 3, name: 'Portable mini car charger', price: '250,000', image: '🔌' },
    { id: 4, name: 'Mac mini M series', price: '450,000', image: '🖥️' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F7F7' }}>
      {/* Main Scroll Content */}
      <ScrollView 
        style={commonStyles.container} 
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <CommonHeader
          type="seller"
          userName="Randika Perera"
          greeting="Good Morning!"
          profileRoute="/seller-profile"
        />

        <View style={styles.content}>

          {/* Header */}
          <View style={styles.draftHeader}>
            <Text style={styles.draftTitle}>Your Draft</Text>

            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.sortButton}>
                <Text style={styles.sortText}>sort by</Text>
                <Text style={styles.sortValue}>{sortBy}</Text>
                <Text style={styles.sortIcon}>▼</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.listViewButton}>
                <View style={styles.listViewIcon}>
                  <View style={styles.listLine} />
                  <View style={styles.listLine} />
                  <View style={styles.listLine} />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Product Draft List */}
          <View style={styles.productsContainer}>
            {draftProducts.map(product => (
              <TouchableOpacity 
                key={product.id}
                style={styles.productCard}
              >
                <View style={styles.productImage}>
                  <Text style={styles.productEmoji}>{product.image}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>LKR {product.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 80,
  },

  draftHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  draftTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sortText: { fontSize: 14, color: '#888' },
  sortValue: { fontSize: 14, fontWeight: '600', color: '#34C488' },
  sortIcon: { fontSize: 10, color: '#34C488' },

  listViewButton: { padding: 8 },
  listViewIcon: { width: 22, height: 18, justifyContent: 'space-between' },
  listLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#333',
    borderRadius: 2,
  },

  productsContainer: { gap: 16 },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },

  productImage: {
    width: 62,
    height: 62,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  productEmoji: { fontSize: 32 },

  productName: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  productPrice: { fontSize: 14, color: '#666' },

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