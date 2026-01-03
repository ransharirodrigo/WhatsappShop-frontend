import { CommonHeader } from '@/components/CommonHeader';
import { commonStyles } from '@/assets/css/common_styles';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
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
    /* ---------- GRID VIEW ---------- */
    if (viewMode === 'grid') {
      return (
        <View style={styles.gridItem}>
          <Image source={item.image} style={styles.gridImage} />

          <Text style={styles.gridName} numberOfLines={2}>
            {item.name}
          </Text>

          <Text style={styles.gridPrice}>{item.price}</Text>

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
      );
    }

    /* ---------- LIST VIEW ---------- */
    return (
      <View style={styles.productItem}>
        <Image source={item.image} style={styles.productImage} />

        <View style={styles.productDetails}>
          <Text style={styles.itemName}>{item.name}</Text>

          <View style={styles.metaRow}>
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
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtnBlue}>
            <Feather name="edit" size={13} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtnRed}>
            <Feather name="trash-2" size={13} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtnGreen}>
            <Feather name="eye" size={13} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={commonStyles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* COMMON HEADER (same as other screens) */}
        <CommonHeader
          type="seller"
          userName="WhatsAppShop"
          greeting="Good Morning!"
          profileRoute="/seller-profile"
        />

        {/* PAGE CONTENT */}
        <View style={styles.pageContent}>
          {/* TITLE + SORT + TOGGLE */}
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
            key={viewMode} // 🔥 required for layout switch
            numColumns={viewMode === 'grid' ? 2 : 1}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={false}
            columnWrapperStyle={
              viewMode === 'grid'
                ? { justifyContent: 'space-between' }
                : undefined
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}

/* -------------------- STYLES -------------------- */
const styles = StyleSheet.create({
  pageContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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

  /* ---------- LIST VIEW ---------- */

  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  productImage: {
    width: 56,
    height: 56,
    borderRadius: 10,
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
    marginBottom: 4,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  itemPrice: {
    fontSize: 13,
    color: '#9A9A9A',
  },

  status: {
    fontSize: 13,
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
    backgroundColor: '#2563EB',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionBtnRed: {
    backgroundColor: '#EF4444',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionBtnGreen: {
    backgroundColor: '#065F46',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ---------- GRID VIEW ---------- */

  gridItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
  },

  gridImage: {
    width: '100%',
    height: 110,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    marginBottom: 10,
  },

  gridName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2B2B2B',
    marginBottom: 4,
  },

  gridPrice: {
    fontSize: 12,
    color: '#9A9A9A',
    marginBottom: 4,
  },
});
