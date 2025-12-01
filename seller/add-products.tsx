import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ScrollView, StyleSheet } from 'react-native';

export default function AddProductsScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title">Add Products</ThemedText>
        <ThemedView style={styles.section}>
          <ThemedText>Create and list new products for sale</ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  section: {
    gap: 8,
    marginTop: 16,
  },
});
