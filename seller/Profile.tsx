import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export const options = {
  headerShown: false,
};

export default function SellerProfileScreen() {
  const router = useRouter();
  const [sellerMode, setSellerMode] = useState(true);
  const [notification, setNotification] = useState(true);

  const menuItems = [
    { id: 1, title: 'Orders', icon: 'box', route: '/(tabs)/my-orders' },
    { id: 2, title: 'Top Selling Items', icon: 'chart.bar', route: '/(tabs)/top-selling' },
    { id: 3, title: 'Shop Settings', icon: 'gearshape', route: '/ShopSettings' },
    { id: 4, title: 'Help Desk', icon: 'questionmark.circle', route: '/HelpDesk' },
    { id: 5, title: 'Profile Setting', icon: 'person.crop.circle', route: '/ProfileSetting' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Profile Section */}
        <View style={styles.profileSection}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={20} color="#333" />
          </TouchableOpacity>

          {/* Avatar + Name */}
          <View style={styles.profileContent}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarRingContainer}>
                <Svg width={120} height={120}>
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

            {/* Account Status */}
            <View style={styles.accountStatusContainer}>
              <Text style={styles.accountStatusLabel}>Account status</Text>
              <View style={styles.sellerBadge}>
                <Text style={styles.sellerBadgeText}>Seller</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Seller Mode Toggle */}
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Seller Mode</Text>
          <Switch
            value={sellerMode}
            onValueChange={setSellerMode}
            trackColor={{ false: '#ccc', true: '#A5E6C5' }}
            thumbColor={sellerMode ? '#34C488' : '#999'}
          />
        </View>

        {/* Notification Toggle */}
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Notification</Text>
          <TouchableOpacity
            style={[styles.notificationBadge, notification && styles.notificationBadgeActive]}
            onPress={() => setNotification(!notification)}
          >
            <Text style={styles.notificationText}>{notification ? "02" : "00"}</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
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

        {/* Log Out */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* Extra bottom spacing for global bottom navigation */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollView: { flex: 1 },

  profileSection: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
    position: 'relative',
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

  profileContent: { width: '100%', alignItems: 'center' },

  avatarWrapper: {
    position: 'relative',
    width: 120,
    height: 120,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarRingContainer: { position: 'absolute', width: 120, height: 120 },

  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#8B7FFF',
  },

  avatar: { width: 100, height: 100, borderRadius: 50 },

  userName: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 12 },

  accountStatusContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },

  accountStatusLabel: { fontSize: 14, color: '#666' },

  sellerBadge: {
    backgroundColor: '#34C488',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },

  sellerBadgeText: { color: '#fff', fontSize: 14, fontWeight: '600' },

  switchRow: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  switchLabel: { fontSize: 16, color: '#333', fontWeight: '500' },

  notificationBadge: {
    width: 40,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },

  notificationBadgeActive: { backgroundColor: '#34C488' },

  notificationText: { color: '#fff', fontWeight: '600' },

  menuSection: { backgroundColor: '#fff', marginBottom: 20 },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  menuItemLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },

  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f8f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  menuItemText: { fontSize: 16, color: '#333', fontWeight: '500' },

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

  logoutText: { fontSize: 16, fontWeight: '600', color: '#ff4444' },

  bottomSpacing: { height: 80 },
});
