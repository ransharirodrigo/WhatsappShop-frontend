import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const publishOptions = ['WhatsApp', 'Facebook', 'Instagram'];
const imageSamples = [
  require('@/assets/images/react-logo.png'),
  require('@/assets/images/android-icon-background.png'),
  require('@/assets/images/android-icon-foreground.png'),
];

export default function AddProductsScreen() {
  const [selectedTargets, setSelectedTargets] = useState<string[]>(['WhatsApp']);

  const toggleTarget = (target: string) => {
    setSelectedTargets((prev) =>
      prev.includes(target) ? prev.filter((item) => item !== target) : [...prev, target],
    );
  };

  return (
    <ThemedView style={styles.screen}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerRow}>
          <View>
            <ThemedText style={styles.userName}>Randika Perera</ThemedText>
            <ThemedText style={styles.greeting}>Good Morning!</ThemedText>
          </View>
          <Image source={require('@/assets/images/dp.jpg')} style={styles.avatar} />
        </View>

        <ThemedText style={styles.pageTitle}>Add New Product/Service</ThemedText>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Product Images</ThemedText>
          <View style={styles.imagesRow}>
            {imageSamples.map((source, index) => (
              <Image
                key={index}
                source={source}
                style={[styles.imageTile, index === 2 && styles.activeImageTile]}
              />
            ))}
            <TouchableOpacity style={[styles.imageTile, styles.emptyImageTile]}>
              <ThemedText style={styles.selectImagesLabel}>Select Images</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Product/Service Name</ThemedText>
          <TextInput
            placeholder="iPhone 16 Pro"
            placeholderTextColor="#9AA0A6"
            style={styles.input}
          />
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Description</ThemedText>
          <TextInput
            multiline
            numberOfLines={4}
            placeholder="The iPhone 16 Pro features..."
            placeholderTextColor="#9AA0A6"
            style={[styles.input, styles.textArea]}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.section}>
          <View style={styles.priceRow}>
            <View style={styles.priceBlock}>
              <ThemedText style={styles.sectionTitle}>Purchase Price</ThemedText>
              <View style={styles.amountField}>
                <TextInput placeholder="350,000" placeholderTextColor="#5B6672" style={styles.priceInput} />
                <ThemedText style={styles.trailingDecimal}>.00</ThemedText>
              </View>
            </View>
            <View style={styles.priceBlock}>
              <ThemedText style={styles.sectionTitle}>Regular Price (LKR)</ThemedText>
              <View style={styles.amountField}>
                <TextInput placeholder="350,000" placeholderTextColor="#5B6672" style={styles.priceInput} />
                <ThemedText style={styles.trailingDecimal}>.00</ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.priceBlock}>
            <ThemedText style={styles.sectionTitle}>Sell Price (LKR)</ThemedText>
            <View style={styles.amountField}>
              <TextInput placeholder="350,000" placeholderTextColor="#5B6672" style={styles.priceInput} />
              <ThemedText style={styles.trailingDecimal}>.00</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.labelRow}>
            <ThemedText style={styles.sectionTitle}>Discount (Optional)</ThemedText>
            <ThemedText style={styles.sectionLink}>Amount</ThemedText>
          </View>
          <View style={styles.discountRow}>
            <TextInput placeholder="10" placeholderTextColor="#5B6672" style={styles.discountInput} />
            <View style={styles.percentChip}>
              <ThemedText style={styles.percentText}>%</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Coupon code (Optional)</ThemedText>
          <TextInput placeholder="Enter code" placeholderTextColor="#9AA0A6" style={styles.input} />
        </View>

        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Publish with</ThemedText>
          <View style={styles.publishRow}>
            {publishOptions.map((option) => {
              const isActive = selectedTargets.includes(option);
              return (
                <TouchableOpacity
                  key={option}
                  style={[styles.publishOption, isActive && styles.publishOptionActive]}
                  onPress={() => toggleTarget(option)}
                >
                  <ThemedText style={[styles.publishLabel, isActive && styles.publishLabelActive]}>
                    {option}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity>
            <ThemedText style={styles.draftLink}>Save to Draft</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.publishButton}>
            <ThemedText style={styles.publishButtonText}>Publish</ThemedText>
          </TouchableOpacity>
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
    paddingBottom: 48,
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
  pageTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },
  imagesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  imageTile: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#ECEFF3',
  },
  activeImageTile: {
    borderWidth: 2,
    borderColor: '#22C55E',
  },
  emptyImageTile: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDF1F7',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  selectImagesLabel: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    color: '#0A7EA4',
  },
  input: {
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
  },
  textArea: {
    minHeight: 110,
  },
  priceRow: {
    flexDirection: 'row',
    gap: 12,
  },
  priceBlock: {
    flex: 1,
    gap: 8,
  },
  amountField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  priceInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  trailingDecimal: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionLink: {
    color: '#0A7EA4',
    fontWeight: '600',
  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  discountInput: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
  },
  percentChip: {
    width: 58,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#0FAD66',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  publishRow: {
    flexDirection: 'row',
    gap: 12,
  },
  publishOption: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  publishOptionActive: {
    backgroundColor: '#DCFCE7',
    borderColor: '#22C55E',
    borderWidth: 1,
  },
  publishLabel: {
    color: '#6B7280',
    fontWeight: '600',
  },
  publishLabelActive: {
    color: '#065F46',
  },
  actions: {
    gap: 12,
  },
  draftLink: {
    color: '#6B7280',
    fontWeight: '600',
    textAlign: 'center',
  },
  publishButton: {
    backgroundColor: '#22C55E',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  publishButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
