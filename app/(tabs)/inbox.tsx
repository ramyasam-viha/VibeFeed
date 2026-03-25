import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { theme } from '../../constants/theme';
import { notifications, Notification } from '../../services/mockData';

type FilterType = 'all' | 'likes' | 'comments' | 'follows';

function NotificationIcon({ type }: { type: Notification['type'] }) {
  const config: Record<string, { icon: string; color: string; bg: string }> = {
    like: { icon: 'heart', color: theme.primary, bg: 'rgba(254,44,85,0.12)' },
    comment: { icon: 'chatbubble', color: theme.accent, bg: 'rgba(37,244,238,0.12)' },
    follow: { icon: 'person-add', color: theme.blue, bg: 'rgba(10,132,255,0.12)' },
    mention: { icon: 'at', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
  };
  const c = config[type];
  return (
    <View style={[styles.notifIconContainer, { backgroundColor: c.bg }]}>
      <Ionicons name={c.icon as any} size={18} color={c.color} />
    </View>
  );
}

function NotificationItem({ notification }: { notification: Notification }) {
  return (
    <Pressable
      style={[styles.notifItem, !notification.read && styles.notifItemUnread]}
      onPress={() => Haptics.selectionAsync()}
    >
      <Image
        source={{ uri: notification.user.avatar }}
        style={styles.notifAvatar}
        contentFit="cover"
      />
      <NotificationIcon type={notification.type} />
      <View style={styles.notifContent}>
        <Text style={styles.notifText} numberOfLines={2}>
          <Text style={styles.notifUsername}>{notification.user.displayName}</Text>
          {' '}{notification.content}
        </Text>
        <Text style={styles.notifTime}>{notification.time}</Text>
      </View>
      {notification.thumbnail && (
        <Image
          source={{ uri: notification.thumbnail }}
          style={styles.notifThumbnail}
          contentFit="cover"
        />
      )}
      {notification.type === 'follow' && (
        <Pressable
          style={styles.followButton}
          onPress={() => Haptics.selectionAsync()}
        >
          <Text style={styles.followButtonText}>Follow</Text>
        </Pressable>
      )}
    </Pressable>
  );
}

export default function InboxScreen() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'likes') return n.type === 'like';
    if (activeFilter === 'comments') return n.type === 'comment' || n.type === 'mention';
    if (activeFilter === 'follows') return n.type === 'follow';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const todayNotifs = filteredNotifications.filter(n =>
    n.time.includes('m ago') || n.time.includes('h ago')
  );
  const earlierNotifs = filteredNotifications.filter(n =>
    n.time.includes('d ago')
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inbox</Text>
        {unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
          </View>
        )}
      </View>

      {/* Filter tabs */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
        >
          {([
            { id: 'all', label: 'All', icon: 'layers-outline' },
            { id: 'likes', label: 'Likes', icon: 'heart-outline' },
            { id: 'comments', label: 'Comments', icon: 'chatbubble-outline' },
            { id: 'follows', label: 'Follows', icon: 'person-add-outline' },
          ] as { id: FilterType; label: string; icon: string }[]).map(filter => (
            <Pressable
              key={filter.id}
              onPress={() => { setActiveFilter(filter.id); Haptics.selectionAsync(); }}
              style={[styles.filterChip, activeFilter === filter.id && styles.filterChipActive]}
            >
              <Ionicons
                name={filter.icon as any}
                size={14}
                color={activeFilter === filter.id ? '#FFF' : theme.textSecondary}
              />
              <Text style={[
                styles.filterChipText,
                activeFilter === filter.id && styles.filterChipTextActive,
              ]}>
                {filter.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Notifications List */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        showsVerticalScrollIndicator={false}
      >
        {todayNotifs.length > 0 && (
          <View style={styles.sectionGroup}>
            <Text style={styles.sectionLabel}>Today</Text>
            {todayNotifs.map(notif => (
              <NotificationItem key={notif.id} notification={notif} />
            ))}
          </View>
        )}

        {earlierNotifs.length > 0 && (
          <View style={styles.sectionGroup}>
            <Text style={styles.sectionLabel}>Earlier</Text>
            {earlierNotifs.map(notif => (
              <NotificationItem key={notif.id} notification={notif} />
            ))}
          </View>
        )}

        {filteredNotifications.length === 0 && (
          <View style={styles.emptyState}>
            <Image
              source={require('../../assets/images/empty-inbox.png')}
              style={styles.emptyImage}
              contentFit="contain"
            />
            <Text style={styles.emptyTitle}>No notifications yet</Text>
            <Text style={styles.emptySubtitle}>
              When someone interacts with your content, you'll see it here
            </Text>
          </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8,
    gap: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.textPrimary,
  },
  unreadBadge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFF',
  },
  filterContainer: {
    height: 42,
    marginBottom: 8,
  },
  filterChip: {
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
  filterChipActive: {
    backgroundColor: theme.primary,
    borderColor: theme.primary,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.textSecondary,
  },
  filterChipTextActive: {
    color: '#FFF',
  },
  sectionGroup: {
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.textSecondary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  notifItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  notifItemUnread: {
    backgroundColor: 'rgba(254,44,85,0.04)',
  },
  notifAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  notifIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 44,
    top: 36,
    borderWidth: 2,
    borderColor: theme.background,
    zIndex: 1,
  },
  notifContent: {
    flex: 1,
  },
  notifText: {
    fontSize: 14,
    fontWeight: '400',
    color: theme.textPrimary,
    lineHeight: 20,
  },
  notifUsername: {
    fontWeight: '700',
  },
  notifTime: {
    fontSize: 12,
    fontWeight: '400',
    color: theme.textTertiary,
    marginTop: 2,
  },
  notifThumbnail: {
    width: 44,
    height: 56,
    borderRadius: 4,
  },
  followButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.radius.small,
    backgroundColor: theme.primary,
  },
  followButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFF',
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  emptyImage: {
    width: 180,
    height: 180,
    marginBottom: 24,
    opacity: 0.8,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.textPrimary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 15,
    fontWeight: '400',
    color: theme.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
