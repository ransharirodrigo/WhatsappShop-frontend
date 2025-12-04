import { CommonHeader } from '@/components/CommonHeader';
import { commonStyles } from '@/assets/css/common_styles';
import { useAppMode } from '@/contexts/app-mode-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function OrderConfirmationScreen() {
  const router = useRouter();
  const { toggleMode } = useAppMode();
  const { price } = useLocalSearchParams<{ price?: string }>();

  const displayPrice = price ?? '0';

  const handleConfirm = () => {
    // Placeholder: you can hook actual order logic here
    router.back();
  };

  return (
    <View style={commonStyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.headerWrapper}>
          <CommonHeader
            type="seller"
            userName="Randika Perera"
            greeting="Good Morning!"
            profileRoute="/buyer-profile"
          />
        </View>

        <View style={styles.content}>
          <View style={styles.illustrationCircle}>
            <Image
              source={require('@/assets/order_confirmation_page_images/circle with checkmark.png')}
              style={styles.illustrationImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Order Confirmation</Text>
          <Text style={styles.subtitle}>
            Fill in the details below to confirm your order.
          </Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              placeholderTextColor="#BDBDBD"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Address"
              placeholderTextColor="#BDBDBD"
            />
            <TouchableOpacity style={styles.secondaryLink}>
              <Text style={styles.secondaryLinkText}>+ Send to a Different Address</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Mobile</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Mobile Number"
              keyboardType="phone-pad"
              placeholderTextColor="#BDBDBD"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Select Payment Method</Text>
            <View style={styles.paymentRow}>
              <View style={styles.paymentCard}>
                <Image
                  source={require('@/assets/order_confirmation_page_images/Cash.png')}
                  style={styles.paymentImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.paymentCard}>
                <Image
                  source={require('@/assets/order_confirmation_page_images/Card.png')}
                  style={styles.paymentImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.paymentCard}>
                <Image
                  source={require('@/assets/order_confirmation_page_images/Koko.png')}
                  style={styles.paymentImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.paymentCard}>
                <Image
                  source={require('@/assets/order_confirmation_page_images/Mint.png')}
                  style={styles.paymentImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>

          <Text style={styles.totalPriceLabel}>LKR {displayPrice}</Text>

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
            activeOpacity={0.9}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
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
  headerWrapper: {
    marginBottom: 16,
  },
  content: {
    paddingHorizontal: 20,
  },
  illustrationCircle: {
    width: 90,
    height: 90,
    marginBottom: 20,
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#9E9E9E',
    marginBottom: 24,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  fieldLabel: {
    fontSize: 13,
    color: '#494949',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333333',
    backgroundColor: '#FAFAFA',
  },
  secondaryLink: {
    marginTop: 8,
    alignItems: 'flex-end',
  },
  secondaryLinkText: {
    fontSize: 12,
    color: '#2B2B2B',
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 10,
  },
  paymentCard: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    overflow: 'hidden',
  },
  paymentImage: {
    width: '100%',
    height: '100%',
  },
  totalPriceLabel: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: '700',
    color: '#34C488',
  },
  confirmButton: {
    marginTop: 12,
    backgroundColor: '#34C488',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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


