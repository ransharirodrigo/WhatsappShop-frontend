import { commonStyles } from '@/assets/css/common_styles';
import { CommonHeader } from '@/components/CommonHeader';
import { useAppMode } from '@/contexts/app-mode-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const initialFavoriteItems = [
  {
    id: 1,
    name: 'iPhone 16 pro',
    price: 'LKR 320,000',
    image: require('@/assets/images/order_confirmation_page_images/Plus Math.png'),
  },
  {
    id: 2,
    name: 'Forrero Rocher',
    price: 'LKR 7,000',
    image: require('@/assets/images/order_confirmation_page_images/Cash.png'),
  },
  {
    id: 3,
    name: 'iPhone 16 pro',
    price: 'LKR 320,000',
    image: require('@/assets/images/order_confirmation_page_images/Plus Math.png'),
  },
  {
    id: 4,
    name: 'Forrero Rocher',
    price: 'LKR 7,000',
    image: require('@/assets/images/order_confirmation_page_images/Cash.png'),
  },
  {
    id: 5,
    name: 'iPhone 16 pro',
    price: 'LKR 320,000',
    image: require('@/assets/images/order_confirmation_page_images/Plus Math.png'),
  },
  {
    id: 6,
    name: 'Forrero Rocher',
    price: 'LKR 7,000',
    image: require('@/assets/images/order_confirmation_page_images/Cash.png'),
  },
  {
    id: 7,
    name: 'iPhone 16 pro',
    price: 'LKR 320,000',
    image: require('@/assets/images/order_confirmation_page_images/Plus Math.png'),
  },
  {
    id: 8,
    name: 'Forrero Rocher',
    price: 'LKR 7,000',
    image: require('@/assets/images/order_confirmation_page_images/Cash.png'),
  },
];

export default function FavItemsScreen() {
  const [viewMode, setViewMode] = useState('list');
  const [favoriteItems, setFavoriteItems] = useState(initialFavoriteItems);
  const router = useRouter();
  const { toggleMode } = useAppMode();

  const removeFromFavorites = (itemId: number) => {
    setFavoriteItems(favoriteItems.filter(item => item.id !== itemId));
  };

  return (
    <View style={commonStyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View>
          <CommonHeader
            type="seller"
            userName="Randika Perera"
            greeting="Good Morning!"
            profileRoute="/buyer-profile"
          />
        </View>

        <View style={styles.content}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Favorite Items</Text>

            <View style={styles.sortRow}>
              <Text style={styles.sortLabel}>sort by</Text>
              <TouchableOpacity style={styles.sortDropdown}>
                <Text style={styles.sortValue}>Latest ▾</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.viewToggleButton}
                onPress={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
              >
                <Image
                  source={viewMode === 'list' 
                    ? require('@/assets/images/fav_items_images/Grid.png')
                    : require('@/assets/images/fav_items_images/List.png')
                  }
                  style={styles.toggleIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={viewMode === 'grid' ? styles.itemsGrid : styles.itemsList}>
            {favoriteItems.map((item) => (
              <View
                key={item.id}
                style={viewMode === 'grid' ? styles.itemGridCard : styles.itemRow}
              >
                <View style={viewMode === 'grid' ? styles.gridItemLeft : styles.itemLeft}>
                  <Image source={item.image} style={styles.itemImage} resizeMode="cover" />
                </View>

                {viewMode === 'list' && (
                  <>
                    <View style={styles.itemCenter}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemPrice}>{item.price}</Text>
                    </View>

                    <TouchableOpacity 
                      style={styles.heartButton}
                      onPress={() => removeFromFavorites(item.id)}
                    >
                      <Image
                        source={require('@/assets/images/fav_items_images/Heart.png')}
                        style={styles.heartImage}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </>
                )}

                {viewMode === 'grid' && (
                  <View style={styles.gridItemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>{item.price}</Text>
                    <TouchableOpacity 
                      style={styles.heartButton}
                      onPress={() => removeFromFavorites(item.id)}
                    >
                      <Image
                        source={require('@/assets/images/fav_items_images/Heart.png')}
                        style={styles.heartImage}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
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
  scrollContent: {
    paddingBottom: 120,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2B2B2B',
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sortLabel: {
    fontSize: 11,
    color: '#777777',
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
  itemsList: {
    gap: 12,
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
  },
  itemGridCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
  },
  itemLeft: {
    width: 64,
    height: 64,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 12,
  },
  gridItemLeft: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 8,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemCenter: {
    flex: 1,
  },
  gridItemInfo: {
    width: '100%',
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
    marginBottom: 8,
  },
  heartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF1F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartImage: {
    width: 22,
    height: 22,
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
