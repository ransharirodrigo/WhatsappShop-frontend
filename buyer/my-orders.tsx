import { commonStyles } from '@/assets/css/common_styles';
import { CommonHeader } from '@/components/CommonHeader';
import { useAppMode } from '@/contexts/app-mode-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  const openOrderDetails = (order: OrderItem) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedOrder(null);
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
              <TouchableOpacity
                key={order.id}
                style={viewMode === 'grid' ? styles.orderGridCard : styles.orderCard}
                onPress={() => openOrderDetails(order)}
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
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Order Details</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <FontAwesome5 name="times" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {selectedOrder && (
              <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                <View style={styles.modalImageContainer}>
                  <Image
                    source={selectedOrder.image}
                    style={styles.modalImage}
                    resizeMode="cover"
                  />
                  <View style={[styles.statusBadgeModal, { backgroundColor: getStatusBackgroundColor(selectedOrder.status) }]}>
                    <Text style={[styles.statusBadgeText, { color: getStatusColor(selectedOrder.status) }]}>
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalDetails}>
                  <View style={styles.modalTitlePriceRow}>
                    <Text style={styles.modalProductName}>{selectedOrder.name}</Text>
                    <Text style={styles.modalProductPrice}>{selectedOrder.price}</Text>
                  </View>

                  <View style={styles.modalInfoRowHorizontal}>
                    <View style={styles.modalInfoColumn}>
                      <Text style={styles.modalInfoLabel}>Seller</Text>
                      <Text style={styles.modalInfoValue}>AppMoto</Text>
                    </View>

                    <View style={styles.modalInfoColumn}>
                      <Text style={styles.modalInfoLabel}>Order Date</Text>
                      <Text style={styles.modalInfoValue}>2025-01-20</Text>
                    </View>

                    {selectedOrder.status === 'delivered' && (
                      <View style={styles.modalInfoColumn}>
                        <Text style={styles.modalInfoLabel}>Delivered Date</Text>
                        <Text style={styles.modalInfoValue}>2025-01-23</Text>
                      </View>
                    )}
                  </View>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>


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


  // ⭐ NEW CENTERED MODAL ⭐
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',   // Center vertically
    alignItems: 'center',       // Center horizontally
  },

  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '90%',               // Popup width
    maxHeight: '80%',           // Prevent oversized modal
    paddingBottom: 20,
    overflow: 'hidden',
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  closeButton: {
    padding: 12,
    marginRight: -12,
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modalImageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  statusBadgeModal: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  modalDetails: {
    marginBottom: 20,
  },
  modalTitlePriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  modalProductName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    flex: 1,
  },
  modalProductPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#34C488',
    marginLeft: 10,
  },
  modalInfoRowHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12,
  },
  modalInfoColumn: {
    flex: 1,
  },
  modalInfoLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
    marginBottom: 4,
  },
  modalInfoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  modalActionButton: {
    paddingVertical: 14,
    backgroundColor: '#34C488',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalActionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});