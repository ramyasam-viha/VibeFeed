import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import * as Haptics from 'expo-haptics';
import { theme } from '../../constants/theme';
import { trendingHashtags, categories, videos, formatCount, TrendingHashtag, Category } from '../../services/mockData';

function CategoryChip({ category, active, onPress }: { category: Category; active: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={() => { onPress(); Haptics.selectionAsync(); }}
      style={[styles.categoryChip, active && styles.categoryChipActive]}
    >
      <MaterialIcons name={category.icon as any} size={16} color={active ? '#FFF' : theme.textSecondary} />
      <Text style={[styles.categoryChipText, active && styles.categoryChipTextActive]}>
        {category.name}
      </Text>
    </Pressable>
  );
}

function TrendingCard({ hashtag }: { hashtag: TrendingHashtag }) {
  return (
    <Pressable style={styles.trendingCard}>
      <Image
        source={{ uri: hashtag.thumbnail }}
        style={styles.trendingImage}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.trendingOverlay}>
        <Text style={styles.trendingName} numberOfLines={1}>#{hashtag.name}</Text>
        <Text style={styles.trendingViews}>{hashtag.views} views</Text>
      </View>
    </Pressable>
  );
}

function VideoGridItem({ thumbnail, views }: { thumbnail: string; views: string }) {
  return (
    <Pressable style={styles.gridItem}>
      <Image
        source={{ uri: thumbnail }}
        style={styles.gridImage}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.gridOverlay}>
        <Ionicons name="play" size={12} color="#FFF" />
        <Text style={styles.gridViews}>{views}</Text>
      </View>
    </Pressable>
  );
}

export default function DiscoverScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('c1');

  const trendingVideos = videos.slice(0, 12).map(v => ({
    id: v.id,
    thumbnail: v.thumbnail,
    views: formatCount(Math.floor(Math.random() * 2000000) + 50000),
  }));

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={theme.textTertiary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search videos, users, sounds..."
              placeholderTextColor={theme.textTertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color={theme.textTertiary} />
              </Pressable>
            )}
          </View>
        </View>

        {/* Category Chips */}
        <View style={styles.categoriesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
          >
            {categories.map(cat => (
              <CategoryChip
                key={cat.id}
                category={cat}
                active={activeCategory === cat.id}
                onPress={() => setActiveCategory(cat.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Trending Hashtags */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending</Text>
            <Pressable>
              <Text style={styles.seeAll}>See all</Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          >
            {trendingHashtags.slice(0, 6).map(hashtag => (
              <TrendingCard key={hashtag.id} hashtag={hashtag} />
            ))}
          </ScrollView>
        </View>

        {/* Video Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Videos</Text>
            <Pressable>
              <Ionicons name="options-outline" size={20} color={theme.textSecondary} />
            </Pressable>
          </View>
          <View style={styles.videoGrid}>
            {trendingVideos.map((video) => (
              <VideoGridItem
                key={video.id}
                thumbnail={video.thumbnail}
                views={video.views}
              />
            ))}
          </View>
        </View>

        {/* Trending Sounds */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Sounds</Text>
            <Pressable>
              <Text style={styles.seeAll}>See all</Text>
            </Pressable>
          </View>
          {['Blinding Lights — The Weeknd', 'Levitating — Dua Lipa', 'Bad Guy — Billie Eilish', 'Dance Monkey — Tones And I'].map((sound, i) => (
            <Pressable key={i} style={styles.soundItem} onPress={() => Haptics.selectionAsync()}>
              <View style={styles.soundIcon}>
                <Ionicons name="musical-notes" size={20} color={theme.primary} />
              </View>
              <View style={styles.soundInfo}>
                <Text style={styles.soundName}>{sound.split(' — ')[0]}</Text>
                <Text style={styles.soundArtist}>{sound.split(' — ')[1]}</Text>
              </View>
              <View style={styles.soundMeta}>
                <Text style={styles.soundCount}>{formatCount(Math.floor(Math.random() * 500000) + 10000)}</Text>
                <Ionicons name="chevron-forward" size={16} color={theme.textTertiary} />
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.surfaceLight,
    borderRadius: theme.radius.full,
    paddingHorizontal: 16,
    height: 44,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: theme.textPrimary,
    height: 44,
  },
  categoriesContainer: {
    height: 42,
    marginBottom: 16,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: theme.radius.full,
    backgroundColor: theme.surface,
    borderWidth: 1,
    borderColor: theme.border,
  },
  categoryChipActive: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.textSecondary,
  },
  categoryChipTextActive: {
    color: '#FFF',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.primary,
  },
  trendingCard: {
    width: 160,
    height: 200,
    borderRadius: theme.radius.medium,
    overflow: 'hidden',
  },
  trendingImage: {
    width: '100%',
    height: '100%',
  },
  trendingOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  trendingName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },
  trendingViews: {
    fontSize: 11,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  videoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    gap: 4,
  },
  gridItem: {
    width: '32.5%',
    aspectRatio: 0.65,
    borderRadius: theme.radius.small,
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  gridOverlay: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  gridViews: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFF',
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  soundItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  soundIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(254,44,85,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  soundInfo: {
    flex: 1,
  },
  soundName: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  soundArtist: {
    fontSize: 13,
    fontWeight: '400',
    color: theme.textSecondary,
    marginTop: 2,
  },
  soundMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  soundCount: {
    fontSize: 13,
    fontWeight: '500',
    color: theme.textSecondary,
  },
});
