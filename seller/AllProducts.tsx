import { CommonHeader } from '@/components/CommonHeader';
import { commonStyles } from '@/assets/css/common_styles';
import { FontAwesome5, Feather } from '@expo/vector-icons';
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
const PRODUCTS = [
  {
    id: '1',
    name: 'iPhone 16 Pro',
    price: 'LKR 350,000',
    status: 'Active',
    image: require('../assets/images/no_product_image.jpg'),
  },
  {
    id: '2',
    name: 'Electric Cycle',
    price: 'LKR 550,000',
    status: 'Active',
    image: require('../assets/images/no_product_image.jpg'),
  },
  {
    id: '3',
    name: 'Portable mini car charger',
    price: 'LKR 250,000',
    status: 'Deactive',
    image: require('../assets/images/no_product_image.jpg'),
  },
  {
    id: '4',
    name: 'Mac mini M series',
    price: 'LKR 450,000',
    status: 'Active',
    image: require('../assets/images/no_product_image.jpg'),
  },
];

/* -------------------- SCREEN -------------------- */
export default function AllProducts() {
  const router = useRouter();
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
      <View style={styles.productItem}>
        <Image source={item.image} style={styles.productImage} />

        <View style={styles.productDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>{item.price}</Text>

          <Text
            style={[
              styles.status,
              item.status === 'Active'
                ? styles.active
                : styles.deactive,
            ]}
          >
            {item.status}
          </Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtnBlue}>
            <Feather name="edit" size={14} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtnRed}>
            <Feather name="trash-2" size={14} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtnGreen}>
            <Feather name="eye" size={14} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={commonStyles.container}>
      {/* HEADER */}
      <CommonHeader
        type="seller"
        userName="WhatsAppShop"
        greeting="Good Morning!"
        profileRoute="/seller-profile"
      />

      {/* TITLE + SORT + VIEW */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>All Products</Text>

        <View style={styles.sortRow}>
          <Text style={styles.sortText}>sort by</Text>

          <TouchableOpacity style={styles.sortDropdown}>
            <Text style={styles.sortValue}>Latest ▾</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewToggle}
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

      {/* PRODUCT LIST */}
      <FlatList
        data={PRODUCTS}
        key={viewMode}
        numColumns={viewMode === 'grid' ? 2 : 1}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}
        columnWrapperStyle={
          viewMode === 'grid'
            ? { justifyContent: 'space-between' }
            : undefined
        }
        showsVerticalScrollIndicator={false}
      />

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome5 name="home" size={22} color="#7A9B94" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <FontAwesome5 name="box" size={22} color="#34C488" />
          <Text style={styles.navTextActive}>Store</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <FontAwesome5 name="plus-circle" size={22} color="#7A9B94" />
          <Text style={styles.navText}>Add</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <FontAwesome5 name="comments" size={22} color="#7A9B94" />
          <Text style={styles.navText}>Chats</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* -------------------- STYLES -------------------- */
const styles = StyleSheet.create({
  headerRow: {
    paddingHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
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
  viewToggle: {
    padding: 6,
  },
  toggleIcon: {
    width: 18,
    height: 18,
  },

  /* LIST ITEM */
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  productImage: {
    width: 52,
    height: 52,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  productDetails: {
    flex: 1,
    marginLeft: 14,
  },

  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2B2B2B',
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: '#34C488',
    marginTop: 2,
  },

  status: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  active: {
    color: '#34C488',
  },
  deactive: {
    color: '#E74C3C',
  },

  actionRow: {
    flexDirection: 'row',
    gap: 6,
  },
  actionBtnBlue: {
    backgroundColor: '#3B82F6',
    padding: 6,
    borderRadius: 6,
  },
  actionBtnRed: {
    backgroundColor: '#EF4444',
    padding: 6,
    borderRadius: 6,
  },
  actionBtnGreen: {
    backgroundColor: '#10B981',
    padding: 6,
    borderRadius: 6,
  },

  /* GRID */
  gridCard: {
    width: '48%',
    backgroundColor: '#fff',
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

  /* BOTTOM NAV */
  bottomNav: {
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
  navText: {
    fontSize: 11,
    marginTop: 4,
    color: '#7A9B94',
  },
  navTextActive: {
    fontSize: 11,
    marginTop: 4,
    color: '#34C488',
  },
});
