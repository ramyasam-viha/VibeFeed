import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  useWindowDimensions,
  ViewToken,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withDelay,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { theme } from '../../constants/theme';
import { videos, Video, formatCount } from '../../services/mockData';
import { useApp } from '../../contexts/AppContext';

function MusicDisc({ username }: { username: string }) {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 4000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={[styles.musicDisc, animatedStyle]}>
      <View style={styles.musicDiscInner}>
        <Ionicons name="musical-note" size={10} color="#FFF" />
      </View>
    </Animated.View>
  );
}

function SidebarButton({
  icon,
  iconType = 'ionicon',
  count,
  active = false,
  activeColor = theme.primary,
  onPress,
}: {
  icon: string;
  iconType?: 'ionicon' | 'material';
  count: string;
  active?: boolean;
  activeColor?: string;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withTiming(1.3, { duration: 100 }),
      withTiming(1, { duration: 150 })
    );
    onPress();
  };

  return (
    <Pressable onPress={handlePress} style={styles.sidebarBtn}>
      <Animated.View style={[styles.sidebarIconContainer, animatedStyle]}>
        {iconType === 'ionicon' ? (
          <Ionicons name={icon as any} size={30} color={active ? activeColor : '#FFF'} />
        ) : (
          <MaterialIcons name={icon as any} size={30} color={active ? activeColor : '#FFF'} />
        )}
      </Animated.View>
      <Text style={[styles.sidebarCount, theme.shadows.text]}>{count}</Text>
    </Pressable>
  );
}

function VideoCard({
  video,
  isActive,
  videoHeight,
}: {
  video: Video;
  isActive: boolean;
  videoHeight: number;
}) {
  const { toggleLike, toggleBookmark, isLiked, isBookmarked } = useApp();
  const liked = isLiked(video.id);
  const bookmarked = isBookmarked(video.id);

  const heartScale = useSharedValue(0);
  const heartOpacity = useSharedValue(0);
  const lastTap = useRef(0);

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
    opacity: heartOpacity.value,
  }));

  const onDoubleTap = useCallback(() => {
    heartScale.value = 0;
    heartOpacity.value = 1;
    heartScale.value = withSequence(
      withTiming(1.4, { duration: 200, easing: Easing.out(Easing.back(2)) }),
      withTiming(1, { duration: 150 }),
      withDelay(400, withTiming(0, { duration: 200 }))
    );
    heartOpacity.value = withDelay(600, withTiming(0, { duration: 200 }));
    if (!liked) {
      toggleLike(video.id);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.selectionAsync();
    }
  }, [liked, video.id]);

  const handleTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      onDoubleTap();
    }
    lastTap.current = now;
  }, [onDoubleTap]);

  const handleLike = useCallback(() => {
    toggleLike(video.id);
    Haptics.selectionAsync();
  }, [video.id]);

  const handleBookmark = useCallback(() => {
    toggleBookmark(video.id);
    Haptics.selectionAsync();
  }, [video.id]);

  const likeCount = liked
    ? formatCount(video.likes + 1)
    : formatCount(video.likes);

  const bookmarkCount = bookmarked
    ? formatCount(video.bookmarks + 1)
    : formatCount(video.bookmarks);

  return (
    <Pressable onPress={handleTap} style={[styles.videoCard, { height: videoHeight }]}>
      <Image
        source={{ uri: video.thumbnail }}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        transition={200}
      />

      {/* Gradient overlays */}
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'transparent']}
        style={styles.topGradient}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.85)']}
        style={styles.bottomGradient}
        locations={[0, 0.5, 1]}
      />

      {/* Double-tap heart */}
      <Animated.View style={[styles.doubleTapHeart, heartAnimatedStyle]} pointerEvents="none">
        <Ionicons name="heart" size={100} color={theme.primary} />
      </Animated.View>

      {/* Right sidebar */}
      <View style={styles.sidebar}>
        <Pressable style={styles.sidebarAvatar}>
          <Image
            source={{ uri: video.user.avatar }}
            style={styles.avatarImage}
            contentFit="cover"
          />
          <View style={styles.followBadge}>
            <Ionicons name="add" size={12} color="#FFF" />
          </View>
        </Pressable>

        <SidebarButton
          icon={liked ? 'heart' : 'heart-outline'}
          count={likeCount}
          active={liked}
          activeColor={theme.primary}
          onPress={handleLike}
        />
        <SidebarButton
          icon="chatbubble-ellipses-outline"
          count={formatCount(video.comments)}
          onPress={() => Haptics.selectionAsync()}
        />
        <SidebarButton
          icon={bookmarked ? 'bookmark' : 'bookmark-outline'}
          count={bookmarkCount}
          active={bookmarked}
          activeColor="#F59E0B"
          onPress={handleBookmark}
        />
        <SidebarButton
          icon="arrow-redo-outline"
          count={formatCount(video.shares)}
          onPress={() => Haptics.selectionAsync()}
        />

        <MusicDisc username={video.user.username} />
      </View>

      {/* Bottom info */}
      <View style={styles.bottomInfo}>
        <View style={styles.usernameRow}>
          <Text style={[styles.username, theme.shadows.text]}>@{video.user.username}</Text>
          {video.user.verified && (
            <MaterialIcons name="verified" size={14} color="#25F4EE" style={{ marginLeft: 4 }} />
          )}
        </View>
        <Text style={[styles.description, theme.shadows.text]} numberOfLines={2}>
          {video.description}
        </Text>
        <Text style={[styles.hashtags, theme.shadows.text]} numberOfLines={1}>
          {video.hashtags.map(h => `#${h}`).join(' ')}
        </Text>
        <View style={styles.soundRow}>
          <Ionicons name="musical-note" size={12} color="#FFF" />
          <Text style={[styles.soundText, theme.shadows.text]} numberOfLines={1}>
            {video.sound} — {video.soundAuthor}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default function HomeScreen() {
  const { height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = useState(0);
  const [feedTab, setFeedTab] = useState<'following' | 'foryou'>('foryou');
  const videoHeight = windowHeight;

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setActiveIndex(viewableItems[0].index);
    }
  }, []);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderVideo = useCallback(({ item, index }: { item: Video; index: number }) => (
    <VideoCard
      video={item}
      isActive={index === activeIndex}
      videoHeight={videoHeight}
    />
  ), [activeIndex, videoHeight]);

  const getItemLayout = useCallback((_: any, index: number) => ({
    length: videoHeight,
    offset: videoHeight * index,
    index,
  }), [videoHeight]);

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        renderItem={renderVideo}
        keyExtractor={item => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        getItemLayout={getItemLayout}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        removeClippedSubviews
        maxToRenderPerBatch={3}
        windowSize={3}
      />

      {/* Floating header */}
      <View style={[styles.header, { top: insets.top + 8 }]}>
        <Pressable onPress={() => setFeedTab('following')}>
          <Text style={[
            styles.headerTab,
            theme.shadows.text,
            feedTab === 'following' && styles.headerTabActive,
          ]}>
            Following
          </Text>
          {feedTab === 'following' && <View style={styles.headerTabIndicator} />}
        </Pressable>
        <View style={styles.headerDivider} />
        <Pressable onPress={() => setFeedTab('foryou')}>
          <Text style={[
            styles.headerTab,
            theme.shadows.text,
            feedTab === 'foryou' && styles.headerTabActive,
          ]}>
            For You
          </Text>
          {feedTab === 'foryou' && <View style={styles.headerTabIndicator} />}
        </Pressable>
      </View>

      {/* Search icon */}
      <Pressable style={[styles.searchIcon, { top: insets.top + 10 }]}>
        <Ionicons name="search" size={22} color="#FFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoCard: {
    width: '100%',
    position: 'relative',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    zIndex: 1,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 320,
    zIndex: 1,
  },
  doubleTapHeart: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -50,
    marginLeft: -50,
    zIndex: 10,
  },
  sidebar: {
    position: 'absolute',
    right: 12,
    bottom: 130,
    alignItems: 'center',
    zIndex: 5,
    gap: 16,
  },
  sidebarAvatar: {
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  followBadge: {
    position: 'absolute',
    bottom: -6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sidebarBtn: {
    alignItems: 'center',
    gap: 2,
  },
  sidebarIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sidebarCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFF',
  },
  musicDisc: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 6,
    borderColor: '#555',
    marginTop: 4,
  },
  musicDiscInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomInfo: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 80,
    zIndex: 5,
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  username: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFF',
    lineHeight: 20,
    marginBottom: 4,
  },
  hashtags: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 8,
  },
  soundRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  soundText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#FFF',
    flex: 1,
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    gap: 20,
  },
  headerTab: {
    fontSize: 17,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
  headerTabActive: {
    color: '#FFF',
    fontWeight: '700',
  },
  headerTabIndicator: {
    width: 32,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#FFF',
    alignSelf: 'center',
    marginTop: 4,
  },
  headerDivider: {
    width: 1,
    height: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  searchIcon: {
    position: 'absolute',
    right: 16,
    zIndex: 10,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
