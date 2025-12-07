import { CommonHeader } from '@/components/CommonHeader';
import { commonStyles } from '@/assets/css/common_styles';
import { useAppMode } from '@/contexts/app-mode-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SellerDrafts() {
  const router = useRouter();
  const { mode } = useAppMode();

  const [sortBy, setSortBy] = useState('Latest');
  const [viewType, setViewType] = useState<'list' | 'grid'>('list');

  const toggleView = () => {
    setViewType(viewType === 'list' ? 'grid' : 'list');
  };

  const draftProducts = [
    { id: 1, name: 'iPhone 16 Pro', price: '350,000', image: '📱' },
    { id: 2, name: 'Electric Cycle', price: '550,000', image: '🚴' },
    { id: 3, name: 'Portable mini car charger', price: '250,000', image: '🔌' },
    { id: 4, name: 'Mac mini M series', price: '450,000', image: '🖥️' },
  ];

  // Navigate to single draft view
  const openDraft = (id: number) => {
    router.push(`/SellerPublishDraft/${id}`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F7F7' }}>
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

          {/* HEADER */}
          <View style={styles.draftHeader}>
            <Text style={styles.draftTitle}>Your Draft</Text>

            <View style={styles.sortContainer}>
              <Text style={styles.sortLabel}>sort by</Text>

              <TouchableOpacity style={styles.sortDropdown}>
                <Text style={styles.sortValue}>{sortBy} ▾</Text>
              </TouchableOpacity>

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

          {/* PRODUCTS */}
          {viewType === 'list' ? (
            <View style={styles.productsContainer}>
              {draftProducts.map(product => (
                <TouchableOpacity
                  key={product.id}
                  style={styles.productCard}
                  onPress={() => openDraft(product.id)}
                >
                  <View style={styles.productImage}>
                    <Text style={styles.productEmoji}>{product.image}</Text>
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={[styles.productName, { textAlign: 'left' }]}>{product.name}</Text>
                    <Text style={[styles.productPrice, { textAlign: 'left' }]}>LKR {product.price}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.gridContainer}>
              {draftProducts.map(product => (
                <TouchableOpacity
                  key={product.id}
                  style={styles.gridItem}
                  onPress={() => openDraft(product.id)}
                >
                  <View style={styles.productImage}>
                    <Text style={styles.productEmoji}>{product.image}</Text>
                  </View>

                  <Text style={[styles.productName, { textAlign: 'center' }]}>{product.name}</Text>
                  <Text style={[styles.productPrice, { textAlign: 'center' }]}>LKR {product.price}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
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

  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  sortLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },

  sortValue: {
    fontSize: 11,
    color: '#494949',
  },

  sortDropdown: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  viewIcon: {
    width: 24,
    height: 24,
    marginLeft: 8,
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

  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
  },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
});
