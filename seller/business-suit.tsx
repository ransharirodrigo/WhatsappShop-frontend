import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const products = [
  {
    id: 1,
    name: 'iPhone 16 Pro',
    price: 'LKR 350,000',
    status: 'Active',
    statusColor: '#16A34A',
    image: require('@/assets/images/android-icon-foreground.png'),
  },
  {
    id: 2,
    name: 'Electric Cycle',
    price: 'LKR 550,000',
    status: 'Active',
    statusColor: '#16A34A',
    image: require('@/assets/images/react-logo.png'),
  },
  {
    id: 3,
    name: 'Portable mini car charg...',
    price: 'LKR 250,000',
    status: 'Deactivate',
    statusColor: '#DC2626',
    image: require('@/assets/images/android-icon-background.png'),
  },
  {
    id: 4,
    name: 'Mac mini M series',
    price: 'LKR 450,000',
    status: 'Active',
    statusColor: '#16A34A',
    image: require('@/assets/images/favicon.png'),
  },
];

export default function BusinessSuitScreen() {
  return (
    <ThemedView style={styles.screen}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.userName}>Randika Perera</Text>
            <Text style={styles.greeting}>Good Morning!</Text>
          </View>
          <Image source={require('@/assets/images/dp.jpg')} style={styles.avatar} />
        </View>

        {/* Seller brand card */}
        <View style={styles.brandCard}>
          <View style={styles.brandLeft}>
            <View style={styles.brandLogoCircle}>
              <Text style={styles.brandLogo}></Text>
            </View>
          </View>
          <View style={styles.brandRight}>
            <Text style={styles.brandName}>AppleAsia</Text>
            <Text style={styles.brandDescription} numberOfLines={3}>
              Apple Asia is the Popular Seller in Sri Lanka and we strive to bring the Apple
              products you love closer to you.
            </Text>
            <TouchableOpacity>
              <Text style={styles.readMore}>read more</Text>
            </TouchableOpacity>

            <View style={styles.categoryRow}>
              <Text style={styles.categoryLabel}>Category</Text>
              <View style={styles.categoryPill}>
                <Text style={styles.categoryText}>Electrical</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>Active Products</Text>
            <Text style={styles.statValue}>20</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>draft</Text>
            <Text style={styles.statValue}>03</Text>
          </View>
          <View style={styles.shopSettings}>
            <TouchableOpacity>
              <Text style={styles.shopSettingsLink}>Shop{'\n'}Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Products list */}
        <View style={styles.productsHeaderRow}>
          <ThemedText style={styles.productsTitle}>Your products</ThemedText>
          <View style={styles.sortRow}>
            <Text style={styles.sortLabel}>sort by</Text>
            <TouchableOpacity style={styles.sortPill}>
              <Text style={styles.sortText}>Latest ▾</Text>
            </TouchableOpacity>
            <View style={styles.sortIconBox}>
              <Text style={styles.sortIcon}>☰</Text>
            </View>
          </View>
        </View>

        <View>
          {products.map((product) => (
            <View key={product.id} style={styles.productRow}>
              <Image source={product.image} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
                <Text style={[styles.productStatus, { color: product.statusColor }]}>
                  {product.status}
                </Text>
              </View>
              <TouchableOpacity style={styles.deleteButton}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 32,
    gap: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  greeting: {
    color: '#6B7280',
    marginTop: 4,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#D1FAE5',
  },
  brandCard: {
    flexDirection: 'row',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
    alignItems: 'center',
  },
  brandLeft: {
    marginRight: 16,
  },
  brandLogoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandLogo: {
    fontSize: 64,
  },
  brandRight: {
    flex: 1,
    gap: 6,
  },
  brandName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  brandDescription: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
  readMore: {
    fontSize: 12,
    color: '#0A7EA4',
    fontWeight: '600',
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 8,
  },
  categoryLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  categoryPill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#059669',
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statBlock: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 12,
  },
  shopSettings: {
    alignItems: 'flex-end',
  },
  shopSettingsLink: {
    fontSize: 12,
    color: '#0A7EA4',
    textAlign: 'right',
  },
  productsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  productsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sortLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  sortPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  sortText: {
    fontSize: 12,
    color: '#111827',
  },
  sortIconBox: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortIcon: {
    fontSize: 14,
    color: '#6B7280',
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  productPrice: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  productStatus: {
    fontSize: 12,
    marginTop: 2,
  },
  deleteButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#F97373',
  },
  deleteText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
