import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { theme } from '../../constants/theme';
import { currentUser, myVideos, likedVideos, formatCount } from '../../services/mockData';
import { useApp } from '../../contexts/AppContext';

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <Pressable style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Pressable>
  );
}

function VideoGrid({ videos }: { videos: typeof myVideos }) {
  const { width } = useWindowDimensions();
  const itemWidth = (width - 4) / 3;

  return (
    <View style={styles.gridContainer}>
      {videos.map((video) => (
        <Pressable
          key={video.id}
          style={[styles.gridItem, { width: itemWidth, height: itemWidth * 1.35 }]}
          onPress={() => Haptics.selectionAsync()}
        >
          <Image
            source={{ uri: video.thumbnail }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            transition={200}
          />
          <View style={styles.gridViewsContainer}>
            <Ionicons name="play" size={12} color="#FFF" />
            <Text style={styles.gridViewsText}>{video.views}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'videos' | 'liked'>('videos');
  const { followedUsers } = useApp();

  const tabIndicatorX = useSharedValue(0);
  const { width: screenWidth } = useWindowDimensions();

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tabIndicatorX.value }],
  }));

  const handleTabPress = useCallback((tab: 'videos' | 'liked') => {
    setActiveTab(tab);
    tabIndicatorX.value = withTiming(tab === 'videos' ? 0 : screenWidth / 2, { duration: 200 });
    Haptics.selectionAsync();
  }, [screenWidth]);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Actions */}
        <View style={styles.headerActions}>
          <Pressable style={styles.headerBtn}>
            <Ionicons name="person-add-outline" size={22} color="#FFF" />
          </Pressable>
          <Text style={styles.headerUsername}>@{currentUser.username}</Text>
          <Pressable style={styles.headerBtn}>
            <Ionicons name="menu-outline" size={26} color="#FFF" />
          </Pressable>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: currentUser.avatar }}
              style={styles.avatar}
              contentFit="cover"
            />
            <View style={styles.avatarBadge}>
              <Ionicons name="add" size={14} color="#FFF" />
            </View>
          </View>

          <Text style={styles.displayName}>{currentUser.displayName}</Text>

          {/* Stats */}
          <View style={styles.statsRow}>
            <StatItem value={formatCount(currentUser.following)} label="Following" />
            <View style={styles.statDivider} />
            <StatItem value={formatCount(currentUser.followers)} label="Followers" />
            <View style={styles.statDivider} />
            <StatItem value={formatCount(currentUser.likes)} label="Likes" />
          </View>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            <Pressable
              style={styles.editButton}
              onPress={() => Haptics.selectionAsync()}
            >
              <Text style={styles.editButtonText}>Edit profile</Text>
            </Pressable>
            <Pressable
              style={styles.shareButton}
              onPress={() => Haptics.selectionAsync()}
            >
              <Ionicons name="share-social-outline" size={18} color="#FFF" />
            </Pressable>
            <Pressable
              style={styles.shareButton}
              onPress={() => Haptics.selectionAsync()}
            >
              <Ionicons name="bookmark-outline" size={18} color="#FFF" />
            </Pressable>
          </View>

          {/* Bio */}
          <Text style={styles.bioText}>{currentUser.bio}</Text>
        </View>

        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          <Pressable
            style={styles.tabButton}
            onPress={() => handleTabPress('videos')}
          >
            <Ionicons
              name="grid"
              size={20}
              color={activeTab === 'videos' ? '#FFF' : theme.textTertiary}
            />
          </Pressable>
          <Pressable
            style={styles.tabButton}
            onPress={() => handleTabPress('liked')}
          >
            <Ionicons
              name="heart"
              size={20}
              color={activeTab === 'liked' ? '#FFF' : theme.textTertiary}
            />
          </Pressable>
          <Animated.View style={[styles.tabIndicator, { width: screenWidth / 2 }, indicatorStyle]} />
        </View>

        {/* Video Grid */}
        {activeTab === 'videos' ? (
          myVideos.length > 0 ? (
            <VideoGrid videos={myVideos} />
          ) : (
            <View style={styles.emptyTab}>
              <Ionicons name="videocam-outline" size={48} color={theme.textTertiary} />
              <Text style={styles.emptyTabText}>No videos yet</Text>
            </View>
          )
        ) : (
          likedVideos.length > 0 ? (
            <VideoGrid videos={likedVideos} />
          ) : (
            <View style={styles.emptyTab}>
              <Ionicons name="heart-outline" size={48} color={theme.textTertiary} />
              <Text style={styles.emptyTabText}>No liked videos</Text>
            </View>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerUsername: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: theme.border,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: theme.background,
  },
  displayName: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.textPrimary,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: theme.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 20,
    backgroundColor: theme.border,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  editButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: theme.radius.small,
    backgroundColor: theme.surfaceLight,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  shareButton: {
    width: 44,
    height: 40,
    borderRadius: theme.radius.small,
    backgroundColor: theme.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bioText: {
    fontSize: 14,
    fontWeight: '400',
    color: theme.textPrimary,
    textAlign: 'center',
    lineHeight: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.border,
    position: 'relative',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
    backgroundColor: '#FFF',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  gridItem: {
    overflow: 'hidden',
  },
  gridViewsContainer: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  gridViewsText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFF',
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  emptyTab: {
    alignItems: 'center',
    paddingTop: 60,
    gap: 12,
  },
  emptyTabText: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.textTertiary,
  },
});
