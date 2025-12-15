import { CommonHeader } from '@/components/CommonHeader';
import { commonStyles } from '@/assets/css/common_styles';
import { useAppMode } from '@/contexts/app-mode-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

/* -------------------- DATA -------------------- */
const CART_ITEMS = [
  {
    id: '1',
    name: 'iPhone 16 Pro',
    price: 'LKR 350,000',
    image: require('../assets/images/no_product_image.jpg'),
  },
  {
    id: '2',
    name: 'Electric Cycle',
    price: 'LKR 550,000',
    image: require('../assets/images/no_product_image.jpg'),
  },
  {
    id: '3',
    name: 'Portable mini car charger',
    price: 'LKR 250,000',
    image: require('../assets/images/no_product_image.jpg'),
  },
  {
    id: '4',
    name: 'Mac mini M series',
    price: 'LKR 450,000',
    image: require('../assets/images/no_product_image.jpg'),
  },
];

/* -------------------- SCREEN -------------------- */
export default function Cart() {
  const router = useRouter();
  const { toggleMode } = useAppMode();

  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const renderItem = ({ item }: any) => {
    if (viewMode === 'grid') {
      return (
        <View style={styles.gridCard}>
          <Image source={item.image} style={styles.gridImage} />

          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{item.price}</Text>
        </View>
      );
    }

    return (
      <View style={styles.cartItem}>
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{item.price}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={commonStyles.container}>
      {/* HEADER */}
      <CommonHeader
        type="buyer"
        userName="WhatsAppShop"
        greeting="Good Morning!"
        profileRoute="/buyer-profile"
      />

      {/* TITLE + SORT + VIEW TOGGLE */}
      <View style={styles.cartHeader}>
        <Text style={styles.cartTitle}>Your Cart</Text>

        <View style={styles.sortRow}>
          <Text style={styles.sortText}>sort by</Text>

          <TouchableOpacity style={styles.sortDropdown}>
            <Text style={styles.sortValue}>Latest ▾</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewToggleButton}
            onPress={() =>
              setViewMode(viewMode === 'list' ? 'grid' : 'list')
            }
          >
            <Image
              source={
                viewMode === 'list'
                  ? require('../assets/images/cart_images/Grid.png')
                  : require('../assets/images/cart_images/List.png')
              }
              style={styles.toggleIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* CART LIST */}
      <FlatList
        data={CART_ITEMS}
        key={viewMode} // IMPORTANT: forces re-render on layout change
        numColumns={viewMode === 'grid' ? 2 : 1}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={
          viewMode === 'grid'
            ? { justifyContent: 'space-between' }
            : undefined
        }
        showsVerticalScrollIndicator={false}
      />

      {/* BOTTOM NAV */}
      <View style={styles.bottomNavContainer}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/')}>
          <FontAwesome5 name="home" size={22} color="#7A9B94" />
          <Text style={styles.navLabelInactive}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <FontAwesome5 name="th-large" size={22} color="#7A9B94" />
          <Text style={styles.navLabelInactive}>Category</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <FontAwesome5 name="shopping-cart" size={22} color="#34C488" />
          <Text style={styles.navLabelActive}>Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/my-orders')}
        >
          <FontAwesome5 name="box" size={22} color="#7A9B94" />
          <Text style={styles.navLabelInactive}>Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={toggleMode}>
          <FontAwesome5 name="user" size={22} color="#7A9B94" />
          <Text style={styles.navLabelInactive}>Become a Seller</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* -------------------- STYLES -------------------- */
const styles = StyleSheet.create({
  cartHeader: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2B2B2B',
  },

  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sortText: {
    fontSize: 11,
    color: '#777',
  },
  sortDropdown: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  sortValue: {
    fontSize: 11,
    color: '#494949',
  },
  viewToggleButton: {
    padding: 6,
  },
  toggleIcon: {
    width: 18,
    height: 18,
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  /* LIST VIEW */
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  itemImage: {
    width: 52,
    height: 52,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  itemDetails: {
    marginLeft: 14,
  },

  /* GRID VIEW */
  gridCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },
  gridImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#F0F0F0',
  },

  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2B2B2B',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#34C488',
  },

  bottomNavContainer: {
    height: 80,
    backgroundColor: '#1C6055',
    borderRadius: 30,
    margin: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
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
