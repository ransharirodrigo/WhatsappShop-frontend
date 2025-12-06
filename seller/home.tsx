// SellerHomeScreen.js

import { commonStyles } from '@/assets/css/common_styles'; // <-- Import Common Styles
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SellerHomeScreen() {
  // ... (Keep existing data definitions)
  const stats = [
    { id: 1, icon: '🛒', label: 'Active\nProducts', value: '24', color: '#34C488' },
    { id: 2, icon: '📦', label: 'New\nOrders', value: '8', color: '#34C488' },
    { id: 3, icon: '💬', label: 'New\nChats', value: '12', color: '#34C488' },
    { id: 4, icon: '💰', label: 'Earnings\n(This Month)', value: '45,200\nLKR', color: '#34C488' },
  ];

  const orders = [
    { id: '#1023', buyer: 'Tharushi', total: '1500', status: 'Pending', date: '10/20' },
    { id: '#1022', buyer: 'Randika', total: '2000', status: 'Completed', date: '10/19' },
    { id: '#1021', buyer: 'Batman', total: '1750', status: 'Shipped', date: '10/18' },
  ];

  const products = [
    { id: 1, name: 'Iphone 16 pro', price: '350,000', stock: '32', image: '📱' },
    { id: 2, name: 'Cotton T-Shirt', price: '1200', stock: '32', image: '👕' },
    { id: 3, name: 'Cotton T-Shirt', price: '1200', stock: '32', image: '👕' },
  ];
  // ... (End of existing data definitions)

  return (
    <ScrollView style={commonStyles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.userName}>Randika Perera</Text>
          <Text style={styles.greeting}>Good Morning!</Text>
        </View>
        <Image source={require('@/assets/images/dp.jpg')} style={styles.avatar} />
      </View>

      <View style={styles.content}>
        {/* ... (Rest of the screen content) ... */}
        <Text style={styles.sectionTitle}>Quick Stats</Text>

        <View style={styles.statsGrid}>
          {stats.map((stat) => (
            <View key={stat.id} style={styles.statCard}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All Orders</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colOrderId]}>Order ID</Text>
            <Text style={[styles.tableHeaderText, styles.colBuyer]}>Buyer</Text>
            <Text style={[styles.tableHeaderText, styles.colTotal]}>Total</Text>
            <Text style={[styles.tableHeaderText, styles.colStatus]}>Status</Text>
            <Text style={[styles.tableHeaderText, styles.colDate]}>Date</Text>
          </View>
          {orders.map((order) => (
            <View key={order.id} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.colOrderId]}>{order.id}</Text>
              <Text style={[styles.tableCell, styles.colBuyer]}>{order.buyer}</Text>
              <Text style={[styles.tableCell, styles.colTotal]}>{order.total}</Text>
              <Text style={[styles.tableCell, styles.colStatus, styles.statusText]}>{order.status}</Text>
              <Text style={[styles.tableCell, styles.colDate]}>{order.date}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Products</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All Products</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colProduct]}>Product</Text>
            <Text style={[styles.tableHeaderText, styles.colProductName]}>Product name</Text>
            <Text style={[styles.tableHeaderText, styles.colPrice]}>Price</Text>
            <Text style={[styles.tableHeaderText, styles.colStock]}>Stock</Text>
          </View>
          {products.map((product) => (
            <View key={product.id} style={styles.tableRow}>
              <View style={[styles.colProduct, styles.productImageContainer]}>
                <View style={styles.productImage}>
                  <Text style={styles.productEmoji}>{product.image}</Text>
                </View>
              </View>
              <Text style={[styles.tableCell, styles.colProductName]}>{product.name}</Text>
              <Text style={[styles.tableCell, styles.colPrice]}>{product.price}</Text>
              <Text style={[styles.tableCell, styles.colStock]}>{product.stock}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Only keep styles unique to SellerHomeScreen, referencing commonStyles for the rest.
  // The header-specific styles and container style are now in common.styles.js

  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    marginBottom: 30,
  },
  statCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'flex-start',
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    lineHeight: 16,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 36,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  viewAllText: {
    fontSize: 14,
    color: '#34C488',
    fontWeight: '600',
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
    marginBottom: 10,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
  },
  tableCell: {
    fontSize: 14,
    color: '#666',
  },
  colOrderId: {
    width: '18%',
  },
  colBuyer: {
    width: '22%',
  },
  colTotal: {
    width: '18%',
  },
  colStatus: {
    width: '25%',
  },
  colDate: {
    width: '17%',
  },
  statusText: {
    color: '#999',
  },
  colProduct: {
    width: '20%',
  },
  colProductName: {
    width: '35%',
  },
  colPrice: {
    width: '25%',
  },
  colStock: {
    width: '20%',
  },
  productImageContainer: {
    justifyContent: 'center',
  },
  productImage: {
    width: 50,
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productEmoji: {
    fontSize: 24,
  },
});