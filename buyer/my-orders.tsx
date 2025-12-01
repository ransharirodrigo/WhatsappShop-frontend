import { IconSymbol } from '@/components/ui/icon-symbol';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: Array<{ name: string; quantity: number; price: string; image: string }>;
  total: string;
  orderNumber: string;
}

export default function MyOrdersScreen() {
  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 'LKR 250,000',
      items: [
        { name: 'Electric Bicycle', quantity: 1, price: 'LKR 250,000', image: '🚴' },
      ],
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 'LKR 240,000',
      items: [
        { name: 'iPhone 15 pro', quantity: 1, price: 'LKR 240,000', image: '📱' },
      ],
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      date: '2024-01-08',
      status: 'processing',
      total: 'LKR 370,000',
      items: [
        { name: 'Mac Mini M4', quantity: 1, price: 'LKR 370,000', image: '💻' },
      ],
    },
  ];

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return '#34C488';
      case 'shipped':
        return '#4A90E2';
      case 'processing':
        return '#FFA500';
      case 'pending':
        return '#FFA500';
      case 'cancelled':
        return '#ff4444';
      default:
        return '#666';
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return 'checkmark.circle.fill';
      case 'shipped':
        return 'shippingbox.fill';
      case 'processing':
        return 'clock.fill';
      case 'pending':
        return 'hourglass';
      case 'cancelled':
        return 'xmark.circle.fill';
      default:
        return 'circle';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
        <Text style={styles.headerSubtitle}>{orders.length} orders</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {orders.length === 0 ? (
          <View style={styles.emptyState}>
            <IconSymbol name="box" size={64} color="#ccc" />
            <Text style={styles.emptyTitle}>No Orders Yet</Text>
            <Text style={styles.emptyText}>Your order history will appear here</Text>
          </View>
        ) : (
          <View style={styles.ordersList}>
            {orders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <View>
                    <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                    <Text style={styles.orderDate}>Ordered on {order.date}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
                    <IconSymbol
                      name={getStatusIcon(order.status) as any}
                      size={14}
                      color={getStatusColor(order.status)}
                    />
                    <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Text>
                  </View>
                </View>

                <View style={styles.orderItems}>
                  {order.items.map((item, index) => (
                    <View key={index} style={styles.orderItem}>
                      <View style={styles.orderItemImage}>
                        <Text style={styles.orderItemEmoji}>{item.image}</Text>
                      </View>
                      <View style={styles.orderItemInfo}>
                        <Text style={styles.orderItemName}>{item.name}</Text>
                        <Text style={styles.orderItemDetails}>
                          Qty: {item.quantity} • {item.price}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>

                <View style={styles.orderFooter}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalAmount}>{order.total}</Text>
                </View>

                <View style={styles.orderActions}>
                  {order.status === 'delivered' && (
                    <TouchableOpacity style={styles.actionButton}>
                      <Text style={styles.actionButtonText}>Reorder</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity style={[styles.actionButton, styles.viewDetailsButton]}>
                    <Text style={styles.viewDetailsText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#34C488',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e0f2e0',
  },
  scrollView: {
    flex: 1,
  },
  ordersList: {
    padding: 20,
    gap: 15,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    color: '#666',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  orderItems: {
    marginBottom: 16,
    gap: 12,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderItemImage: {
    width: 50,
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  orderItemEmoji: {
    fontSize: 24,
  },
  orderItemInfo: {
    flex: 1,
  },
  orderItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  orderItemDetails: {
    fontSize: 12,
    color: '#666',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    marginBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34C488',
  },
  orderActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#34C488',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  viewDetailsButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#34C488',
  },
  viewDetailsText: {
    color: '#34C488',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
