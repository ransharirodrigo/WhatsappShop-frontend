import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { ScrollView, StyleSheet } from 'react-native';

export default function BusinessSuitScreen() {
  const [sortBy, setSortBy] = useState('Latest');
  const [viewType, setViewType] = useState<'list' | 'grid'>('list');
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'iPhone 16 Pro', price: 'LKR 350,000', status: 'Active', image: null },
    { id: '2', name: 'Electric Cycle', price: 'LKR 550,000', status: 'Active', image: null },
    { id: '3', name: 'Portable mini car cha...', price: 'LKR 250,000', status: 'Deactive', image: null },
    { id: '4', name: 'Mac mini M series', price: 'LKR 450,000', status: 'Active', image: null },
  ]);

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const toggleView = () => {
    setViewType(viewType === 'list' ? 'grid' : 'list');
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title">Business Suit</ThemedText>
        <ThemedView style={styles.section}>
          <ThemedText>Business analytics and tools</ThemedText>
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