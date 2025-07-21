import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, StyleSheet, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';

const FOLDER_NAME = 'MyAppImages';
const folderUri = FileSystem.documentDirectory + FOLDER_NAME + '/';

export function GalleryScreen() {
  const [imageUris, setImageUris] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await ensureFolderExists();
      const uris = await loadImages();
      setImageUris(uris);
      setLoading(false);
    })();
  }, []);

  async function ensureFolderExists() {
    const folderInfo = await FileSystem.getInfoAsync(folderUri);
    if (!folderInfo.exists) {
      await FileSystem.makeDirectoryAsync(folderUri, { intermediates: true });
    }
  }

  async function loadImages(): Promise<string[]> {
    const files = await FileSystem.readDirectoryAsync(folderUri);
    return files
      .filter(name => /\.(jpg|jpeg|png|webp)$/i.test(name)) // optional: only image files
      .map(name => folderUri + name);
  }

  const renderItem = ({ item }: { item: string }) => (
    <Image source={{ uri: item }} style={styles.image} />
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Loading images...</Text>
      ) : imageUris.length === 0 ? (
        <Text style={styles.emptyText}>No images found.</Text>
      ) : (
        <FlatList
          data={imageUris}
          keyExtractor={(uri) => uri}
          renderItem={renderItem}
          numColumns={3}
          contentContainerStyle={styles.grid}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    backgroundColor: '#fff',
  },
  grid: {
    paddingHorizontal: 8,
  },
  image: {
    width: 110,
    height: 110,
    margin: 4,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 16,
    color: '#888',
  },
});
