import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export const options = {
  headerShown: false,
};

export default function BuyerProfileScreen() {
  const router = useRouter();

  const menuItems = [
    { id: 1, title: 'My Orders', icon: 'box', route: '/(tabs)/my-orders' },
    { id: 2, title: 'Favorite Items', icon: 'heart', route: '/(tabs)/fav-items' },
    { id: 3, title: 'Payment Methods', icon: 'creditcard', route: null },
    { id: 4, title: 'Addresses', icon: 'location', route: null },
    { id: 5, title: 'Settings', icon: 'gearshape', route: null },
    { id: 6, title: 'Help & Support', icon: 'questionmark.circle', route: null },
    { id: 7, title: 'Profile Setting', icon: 'person.crop.circle', route: '/ProfileSetting' },
    { id: 8, title: 'Help Desk', icon: 'person.crop.circle', route: '/HelpDesk' },

  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={20} color="#333" />
          </TouchableOpacity>
          <View style={styles.profileContent}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarRingContainer}>
                <Svg width={120} height={120} style={styles.avatarRing}>
                  <Circle
                    cx="60"
                    cy="60"
                    r="56"
                    fill="none"
                    stroke="#34C488"
                    strokeWidth="6"
                    strokeDasharray="330 120"
                    strokeDashoffset="0"
                    transform="rotate(-90 60 60)"
                  />
                </Svg>
              </View>
              <View style={styles.avatarContainer}>
                <Image
                  source={require('@/assets/images/dp.jpg')}
                  style={styles.avatar}
                />
              </View>
            </View>
            <Text style={styles.userName}>Randika Perera</Text>
            <View style={styles.accountStatusContainer}>
              <Text style={styles.accountStatusLabel}>Account status</Text>
              <View style={styles.buyerBadge}>
                <Text style={styles.buyerBadgeText}>Buyer</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => item.route && router.push(item.route as any)}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>
                  <IconSymbol name={item.icon as any} size={20} color="#34C488" />
                </View>
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <IconSymbol name="chevron.right" size={18} color="#999" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
    position: 'relative',
    minHeight: 200,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    zIndex: 10,
  },
  profileContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarWrapper: {
    position: 'relative',
    width: 120,
    height: 120,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarRingContainer: {
    position: 'absolute',
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarRing: {
    position: 'absolute',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#8B7FFF',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  accountStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  accountStatusLabel: {
    fontSize: 14,
    color: '#666',
  },
  buyerBadge: {
    backgroundColor: '#34C488',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  buyerBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  menuSection: {
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f8f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 30,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ff4444',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff4444',
  },
});

