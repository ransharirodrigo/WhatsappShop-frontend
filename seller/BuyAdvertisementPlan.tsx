import { CommonHeader } from '@/components/CommonHeader';
import { commonStyles } from '@/assets/css/common_styles';
import { useAppMode } from '@/contexts/app-mode-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

/* -------------------- DATA -------------------- */
const ADVERTISEMENT_PLANS = [
  {
    id: '1',
    name: 'Free Plan',
    price: null,
    backgroundColor: '#34C488',
    textColor: '#FFFFFF',
    priceColor: '#FFFFFF',
    count: 3,
    duration: '30 days',
  },
  {
    id: '2',
    name: 'Starter',
    price: 'LKR 1500',
    backgroundColor: '#E8E8E8',
    textColor: '#2B2B2B',
    priceColor: '#1C6055',
    count: 15,
    duration: '30 days',
  },
  {
    id: '3',
    name: 'Pro',
    price: 'LKR 5000',
    backgroundColor: '#E8E8E8',
    textColor: '#2B2B2B',
    priceColor: '#1C6055',
    count: 50,
    duration: '30 days',
  },
  {
    id: '4',
    name: 'Dealer',
    price: 'LKR 10,000',
    backgroundColor: '#E8E8E8',
    textColor: '#2B2B2B',
    priceColor: '#1C6055',
    count: 200,
    duration: '30 days',
  },
];

const PAYMENT_METHODS = [
  {
    id: '1',
    name: 'Cash',
    image: require('@/assets/images/order_confirmation_page_images/Cash.png'),
  },
  {
    id: '2',
    name: 'Card',
    image: require('@/assets/images/order_confirmation_page_images/Card.png'),
  },
  {
    id: '3',
    name: 'Koko',
    image: require('@/assets/images/order_confirmation_page_images/Koko.png'),
  },
  {
    id: '4',
    name: 'Mint',
    image: require('@/assets/images/order_confirmation_page_images/Mint.png'),
  },
];

/* -------------------- SCREEN -------------------- */
export default function AdvertisementPlan() {
  const router = useRouter();
  const { toggleMode } = useAppMode();

  const [selectedPlan, setSelectedPlan] = useState<string | null>('1');
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const handleBuyPlan = () => {
    if (!selectedPlan) {
      alert('Please select a plan');
      return;
    }
    if (!selectedPayment) {
      alert('Please select a payment method');
      return;
    }
    // Handle purchase logic here
    alert('Purchase initiated!');
  };

  return (
    <View style={commonStyles.container}>
      {/* HEADER */}
      <CommonHeader
        type="buyer"
        userName="WhatsAppShop"
        greeting="Good Morning!"
        profileRoute="/buyer-profile"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* TITLE & SUBTITLE */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Buy Advertisement Plan</Text>
          <Text style={styles.subtitle}>
            Choose a advertisement plan for grow your income
          </Text>
        </View>

        {/* PLANS GRID */}
        <View style={styles.plansGrid}>
          {ADVERTISEMENT_PLANS.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                { backgroundColor: plan.backgroundColor },
              ]}
              onPress={() => setSelectedPlan(plan.id)}
              activeOpacity={0.8}
            >
              <View style={styles.planContent}>
                <Text
                  style={[styles.planName, { color: plan.textColor }]}
                >
                  {plan.name}
                </Text>
                {plan.price && (
                  <Text
                    style={[styles.planPrice, { color: plan.priceColor }]}
                  >
                    {plan.price}
                  </Text>
                )}
              </View>

              <View style={styles.planDetails}>
                <Text
                  style={[
                    styles.planDetailText,
                    { color: plan.textColor, opacity: 0.8 },
                  ]}
                >
                  Advertisement count {plan.count}
                </Text>
                <Text
                  style={[
                    styles.planDetailText,
                    { color: plan.textColor, opacity: 0.8 },
                  ]}
                >
                  Duration {plan.duration}
                </Text>
              </View>

              <View style={styles.radioButtonContainer}>
                <View
                  style={[
                    styles.radioButton,
                    selectedPlan === plan.id && styles.radioButtonSelected,
                    {
                      borderColor:
                        plan.id === '1' ? '#FFFFFF' : '#CCCCCC',
                    },
                  ]}
                >
                  {selectedPlan === plan.id && (
                    <View
                      style={[
                        styles.radioButtonInner,
                        {
                          backgroundColor:
                            plan.id === '1' ? '#FFFFFF' : '#34C488',
                        },
                      ]}
                    />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* PAYMENT METHOD SECTION */}
        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Select Payment Method</Text>

          <View style={styles.paymentRow}>
            {PAYMENT_METHODS.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentCard,
                  selectedPayment === method.id &&
                    styles.paymentCardSelected,
                ]}
                onPress={() => setSelectedPayment(method.id)}
                activeOpacity={0.8}
              >
                <Image
                  source={method.image}
                  style={styles.paymentImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* BUY BUTTON */}
        <TouchableOpacity
          style={styles.buyButton}
          onPress={handleBuyPlan}
          activeOpacity={0.8}
        >
          <Text style={styles.buyButtonText}>Buy Plan</Text>
        </TouchableOpacity>
      </ScrollView>

  
    </View>
  );
}

/* -------------------- STYLES -------------------- */
const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  titleSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2B2B2B',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#777777',
    lineHeight: 18,
  },

  plansGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  planCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    position: 'relative',
    minHeight: 140,
  },
  planContent: {
    marginBottom: 12,
  },
  planName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  planPrice: {
    fontSize: 16,
    fontWeight: '700',
  },
  planDetails: {
    gap: 4,
  },
  planDetailText: {
    fontSize: 11,
    fontWeight: '400',
  },

  radioButtonContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#34C488',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  paymentSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B2B2B',
    marginBottom: 16,
  },

  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  paymentCard: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  paymentCardSelected: {
    borderColor: '#34C488',
    backgroundColor: '#F0FAF7',
  },
  paymentImage: {
    width: '80%',
    height: '80%',
  },

  buyButton: {
    backgroundColor: '#34C488',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  bottomNavContainer: {
    height: 80,
    backgroundColor: '#1C6055',
    borderRadius: 30,
    margin: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
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