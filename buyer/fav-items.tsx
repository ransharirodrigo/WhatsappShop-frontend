import { IconSymbol } from '@/components/ui/icon-symbol';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FavItemsScreen() {
  const favoriteItems = [
    { id: 1, name: 'Electric Bicycle', price: 'LKR 250,000', image: '🚴', seller: 'Bike Store' },
    { id: 2, name: 'Mac Mini M4', price: 'LKR 370,000', image: '💻', seller: 'Tech Hub' },
    { id: 3, name: 'iPhone 15 pro', price: 'LKR 240,000', image: '📱', seller: 'Mobile World' },
    { id: 4, name: 'Heaven Garden', price: 'LKR 80,000/night', image: '🏠', seller: 'Property Rentals' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorite Items</Text>
        <Text style={styles.headerSubtitle}>{favoriteItems.length} items saved</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {favoriteItems.length === 0 ? (
          <View style={styles.emptyState}>
            <IconSymbol name="heart" size={64} color="#ccc" />
            <Text style={styles.emptyTitle}>No Favorites Yet</Text>
            <Text style={styles.emptyText}>Items you favorite will appear here</Text>
          </View>
        ) : (
          <View style={styles.itemsList}>
            {favoriteItems.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <View style={styles.itemImage}>
                  <Text style={styles.itemEmoji}>{item.image}</Text>
                  <TouchableOpacity style={styles.removeFavoriteBtn}>
                    <IconSymbol name="heart.fill" size={20} color="#ff4444" />
                  </TouchableOpacity>
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemSeller}>{item.seller}</Text>
                  <View style={styles.itemFooter}>
                    <Text style={styles.itemPrice}>{item.price}</Text>
                    <TouchableOpacity style={styles.buyButton}>
                      <Text style={styles.buyButtonText}>Buy Now</Text>
                    </TouchableOpacity>
                  </View>
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
  itemsList: {
    padding: 20,
    gap: 15,
  },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 120,
    height: 120,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  itemEmoji: {
    fontSize: 50,
  },
  removeFavoriteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  itemSeller: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34C488',
  },
  buyButton: {
    backgroundColor: '#34C488',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buyButtonText: {
    color: '#fff',
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
