import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  likedVideos: Set<string>;
  followedUsers: Set<string>;
  bookmarkedVideos: Set<string>;
  toggleLike: (videoId: string) => void;
  toggleFollow: (userId: string) => void;
  toggleBookmark: (videoId: string) => void;
  isLiked: (videoId: string) => boolean;
  isFollowed: (userId: string) => boolean;
  isBookmarked: (videoId: string) => boolean;
}

const AppContext = createContext<AppState | undefined>(undefined);

const STORAGE_KEYS = {
  LIKED: 'vibefeed_liked',
  FOLLOWED: 'vibefeed_followed',
  BOOKMARKED: 'vibefeed_bookmarked',
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());
  const [bookmarkedVideos, setBookmarkedVideos] = useState<Set<string>>(new Set());

  useEffect(() => {
    const load = async () => {
      try {
        const [liked, followed, bookmarked] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.LIKED),
          AsyncStorage.getItem(STORAGE_KEYS.FOLLOWED),
          AsyncStorage.getItem(STORAGE_KEYS.BOOKMARKED),
        ]);
        if (liked) setLikedVideos(new Set(JSON.parse(liked)));
        if (followed) setFollowedUsers(new Set(JSON.parse(followed)));
        if (bookmarked) setBookmarkedVideos(new Set(JSON.parse(bookmarked)));
      } catch {}
    };
    load();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEYS.LIKED, JSON.stringify([...likedVideos]));
  }, [likedVideos]);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEYS.FOLLOWED, JSON.stringify([...followedUsers]));
  }, [followedUsers]);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEYS.BOOKMARKED, JSON.stringify([...bookmarkedVideos]));
  }, [bookmarkedVideos]);

  const toggleLike = useCallback((videoId: string) => {
    setLikedVideos(prev => {
      const next = new Set(prev);
      if (next.has(videoId)) next.delete(videoId);
      else next.add(videoId);
      return next;
    });
  }, []);

  const toggleFollow = useCallback((userId: string) => {
    setFollowedUsers(prev => {
      const next = new Set(prev);
      if (next.has(userId)) next.delete(userId);
      else next.add(userId);
      return next;
    });
  }, []);

  const toggleBookmark = useCallback((videoId: string) => {
    setBookmarkedVideos(prev => {
      const next = new Set(prev);
      if (next.has(videoId)) next.delete(videoId);
      else next.add(videoId);
      return next;
    });
  }, []);

  const isLiked = useCallback((videoId: string) => likedVideos.has(videoId), [likedVideos]);
  const isFollowed = useCallback((userId: string) => followedUsers.has(userId), [followedUsers]);
  const isBookmarked = useCallback((videoId: string) => bookmarkedVideos.has(videoId), [bookmarkedVideos]);

  return (
    <AppContext.Provider value={{
      likedVideos, followedUsers, bookmarkedVideos,
      toggleLike, toggleFollow, toggleBookmark,
      isLiked, isFollowed, isBookmarked,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
