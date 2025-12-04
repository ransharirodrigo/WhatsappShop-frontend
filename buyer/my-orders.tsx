import { commonStyles } from '@/assets/css/common_styles';
import { CommonHeader } from '@/components/CommonHeader';
import { useAppMode } from '@/contexts/app-mode-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type OrderStatus = 'on the way' | 'delivered' | 'processing' | 'pending' | 'cancelled';

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: string;
  image: any;
  status: OrderStatus;
}

export default function MyOrdersScreen() {
  const router = useRouter();
  const { toggleMode } = useAppMode();
  const [viewMode, setViewMode] = useState('list');
  const [sortBy, setSortBy] = useState('Latest');

  const orders: OrderItem[] = [
    {
      id: 1,
      name: 'iPhone 16 pro',
      quantity: 1,
      price: 'LKR 320,000',
      image: require('@/assets/images/order_confirmation_page_images/Plus Math.png'),
      status: 'on the way',
    },
    {
      id: 2,
      name: 'Forrero Rocher',
      quantity: 1,
      price: 'LKR 7,000',
      image: require('@/assets/images/order_confirmation_page_images/Cash.png'),
      status: 'delivered',
    },
  ];

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return '#34C488';
      case 'on the way':
        return '#FFA500';
      case 'processing':
        return '#4A90E2';
      case 'pending':
        return '#FFA500';
      case 'cancelled':
        return '#ff4444';
      default:
        return '#666';
    }
  };

  const getStatusBackgroundColor = (status: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return '#E8F5E9';
      case 'on the way':
        return '#FFF3E0';
      case 'processing':
        return '#E3F2FD';
      case 'pending':
        return '#FFF3E0';
      case 'cancelled':
        return '#FFEBEE';
      default:
        return '#F5F5F5';
    }
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
          <View style={styles.headerRow}>
            <Text style={styles.sectionTitle}>My Orders</Text>
            <View style={styles.headerControls}>
              <View style={styles.sortRow}>
                <Text style={styles.sortLabel}>sort by</Text>
                <TouchableOpacity style={styles.sortDropdown}>
                  <Text style={styles.sortValue}>{sortBy} ▾</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.viewToggleButton}
                onPress={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
              >
                <Image
                  source={viewMode === 'list'
                    ? require('@/assets/images/my_orders_images/Grid.png')
                    : require('@/assets/images/my_orders_images/List.png')
                  }
                  style={styles.toggleIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={viewMode === 'grid' ? styles.ordersGrid : styles.ordersList}>
            {orders.map((order) => (
              <View
                key={order.id}
                style={viewMode === 'grid' ? styles.orderGridCard : styles.orderCard}
              >
                <View style={viewMode === 'grid' ? styles.gridItemContent : styles.orderItemContent}>
                  <View style={viewMode === 'grid' ? styles.gridImageContainer : styles.imageContainer}>
                    <Image
                      source={order.image}
                      style={styles.orderImage}
                      resizeMode="cover"
                    />
                  </View>

                  <View style={viewMode === 'grid' ? styles.gridOrderInfo : styles.orderInfo}>
                    <Text
                      style={[
                        styles.orderName,
                        viewMode === 'list' && styles.orderNameListLeft
                      ]}
                      numberOfLines={viewMode === 'grid' ? 2 : 1}
                    >
                      {order.name}
                    </Text>
                    <View
                      style={[
                        styles.statusBadge,
                        viewMode === 'grid' && styles.statusBadgeGridCenter,
                        { backgroundColor: getStatusBackgroundColor(order.status) },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusBadgeText,
                          { color: getStatusColor(order.status) },
                        ]}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Text>
                    </View>
                  </View>
                </View>

                {viewMode === 'list' && (
                  <View style={styles.priceContainer}>
                    <Text style={styles.orderPrice}>{order.price}</Text>
                  </View>
                )}

                {viewMode === 'grid' && (
                  <View style={styles.gridPriceContainer}>
                    <Text style={styles.orderPrice}>{order.price}</Text>
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
          <FontAwesome5 name="home" size={24} color="#7A9B94" />
          <Text style={styles.navLabelInactive}>Home</Text>
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
          <FontAwesome5 name="box" size={24} color="#34C488" />
          <Text style={styles.navLabelActive}>My orders</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={toggleMode}
        >
          <FontAwesome5 name="retweet" size={24} color="#7A9B94" />
          <Text style={styles.navLabelInactive}>Become a Seller</Text>
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
  headerRow: {
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
  headerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
  ordersList: {
    gap: 12,
  },
  ordersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  orderCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
  },
  orderGridCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  orderItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  gridItemContent: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  imageContainer: {
    width: 64,
    height: 64,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 12,
    backgroundColor: '#F5F5F5',
  },
  gridImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: '#F5F5F5',
  },
  orderImage: {
    width: '100%',
    height: '100%',
  },
  orderInfo: {
    flex: 1,
  },
  gridOrderInfo: {
    width: '100%',
    alignItems: 'center',
  },
  orderName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2B2B2B',
    marginBottom: 6,
    textAlign: 'center',
  },
  orderNameListLeft: {
    textAlign: 'left',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgeGridCenter: {
    alignSelf: 'center',
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  priceContainer: {
    marginLeft: 10,
  },
  gridPriceContainer: {
    width: '100%',
    marginTop: 12,
    alignItems: 'center',
  },
  orderPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#34C488',
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
    fontSize: 10,
    fontWeight: '500',
    color: '#34C488',
  },
  navLabelInactive: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: '500',
    color: '#7A9B94',
  },
});
