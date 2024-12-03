import { Image, StyleSheet, Platform, FlatList, ActivityIndicator, View } from 'react-native'; 
import React, { useEffect, useState } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk memanggil API
  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const json = await response.json();
      setData(json); // Simpan data ke state
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading menjadi false
    }
  };

  useEffect(() => {
    fetchData(); // Panggil API saat komponen pertama kali dimuat
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* Loading Indicator */}
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ThemedView style={styles.item}>
              <ThemedText type="subtitle">{item.title}</ThemedText>
              <ThemedText>{item.body}</ThemedText>
            </ThemedView>
          )}
        />
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  item: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2,
  },
});