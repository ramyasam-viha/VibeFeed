export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  likes: number;
  verified: boolean;
}

export interface Video {
  id: string;
  user: User;
  description: string;
  hashtags: string[];
  sound: string;
  soundAuthor: string;
  thumbnail: string;
  likes: number;
  comments: number;
  shares: number;
  bookmarks: number;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  user: User;
  content: string;
  time: string;
  thumbnail?: string;
  read: boolean;
}

export interface TrendingHashtag {
  id: string;
  name: string;
  views: string;
  thumbnail: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

const users: User[] = [
  {
    id: 'u1',
    username: 'alexdancer',
    displayName: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
    bio: '💃 Professional dancer | LA based\n🎥 Dance tutorials & choreography',
    followers: 1240000,
    following: 342,
    likes: 28500000,
    verified: true,
  },
  {
    id: 'u2',
    username: 'foodie.maya',
    displayName: 'Maya Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    bio: '🍜 Home chef & food lover\n📍 NYC | Recipes every day',
    followers: 890000,
    following: 567,
    likes: 15600000,
    verified: true,
  },
  {
    id: 'u3',
    username: 'urban.lens',
    displayName: 'Marcus Thompson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    bio: '📸 Street photographer\n🌆 Capturing city stories',
    followers: 456000,
    following: 231,
    likes: 8900000,
    verified: false,
  },
  {
    id: 'u4',
    username: 'fitnessjess',
    displayName: 'Jessica Park',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    bio: '💪 Certified PT | Fitness motivation\n🏋️ Transform your body',
    followers: 2100000,
    following: 189,
    likes: 42000000,
    verified: true,
  },
  {
    id: 'u5',
    username: 'wanderlust.kai',
    displayName: 'Kai Nakamura',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    bio: '✈️ Travel filmmaker\n🌍 60+ countries explored',
    followers: 3450000,
    following: 412,
    likes: 67000000,
    verified: true,
  },
  {
    id: 'u6',
    username: 'diy.sarah',
    displayName: 'Sarah Mitchell',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    bio: '🎨 DIY & Crafts\n✨ Making magic from nothing',
    followers: 678000,
    following: 345,
    likes: 12300000,
    verified: false,
  },
  {
    id: 'u7',
    username: 'comedyking',
    displayName: 'Jordan Blake',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    bio: '😂 Making you laugh daily\n🎤 Stand-up comedian',
    followers: 5600000,
    following: 156,
    likes: 98000000,
    verified: true,
  },
  {
    id: 'u8',
    username: 'petlife.emma',
    displayName: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop',
    bio: '🐾 Dog mom of 3\n🐶 Daily cuteness overload',
    followers: 1890000,
    following: 278,
    likes: 35000000,
    verified: true,
  },
  {
    id: 'u9',
    username: 'techreview.dev',
    displayName: 'Dev Patel',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
    bio: '📱 Tech reviewer\n💻 Gadget enthusiast',
    followers: 920000,
    following: 198,
    likes: 17800000,
    verified: false,
  },
  {
    id: 'u10',
    username: 'naturegirl.lina',
    displayName: 'Lina Bergström',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    bio: '🌿 Nature enthusiast\n🏔️ Scandinavian adventures',
    followers: 1120000,
    following: 345,
    likes: 22000000,
    verified: true,
  },
  {
    id: 'u11',
    username: 'music.beats',
    displayName: 'Tyler Johnson',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop',
    bio: '🎵 Music producer\n🎧 Beats & remixes',
    followers: 780000,
    following: 423,
    likes: 14500000,
    verified: false,
  },
  {
    id: 'u12',
    username: 'fashionista.zoe',
    displayName: 'Zoe Anderson',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop',
    bio: '👗 Fashion & Style\n💄 Outfit inspiration daily',
    followers: 4200000,
    following: 567,
    likes: 78000000,
    verified: true,
  },
];

const videoThumbnails = [
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1540206395-68808572332f?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=600&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=600&h=1000&fit=crop',
];

const descriptions = [
  'This recipe changed my whole perspective on cooking 🍳',
  'Sunset views hit different when you\'re at the top ⛰️',
  'POV: You finally learned the choreography 💃',
  'My cat has more personality than most people 😺',
  'Spring garden tour! Everything is blooming 🌸',
  'This beat goes hard 🔥 New track dropping soon',
  'Outfit check for date night ✨',
  'The way the colors just exploded 🎨',
  'Morning routine that actually changed my life',
  'Wait for the transformation at the end 😱',
  'Found this hidden gem while hiking 🥾',
  'Beach vibes all day every day 🏖️',
  'Mountain biking is not for the faint hearted 🚵',
  'Trying the viral recipe everyone\'s been talking about',
  'Golden hour photography hits different 📷',
  'Fashion haul! Everything under $50 👗',
  'The view from my hotel room in Bali 🌴',
  'My morning workout routine - no gym needed 💪',
  'Unboxing the latest tech gadget 📱',
  'Party decorations on a budget 🎉',
  'Slow motion is just *chef\'s kiss* 👌',
  'Summit reached after 8 hours of climbing 🏔️',
  'Tropical fruits you NEED to try 🍉',
  'When the light hits just right ✨',
];

const sounds = [
  { name: 'Original Sound', author: '' },
  { name: 'Blinding Lights', author: 'The Weeknd' },
  { name: 'Levitating', author: 'Dua Lipa' },
  { name: 'Aesthetic Beat', author: 'Lofi Producer' },
  { name: 'Chill Vibes Mix', author: 'DJ Relax' },
  { name: 'Epic Cinematic', author: 'Hans Zimmer' },
  { name: 'Uptown Funk', author: 'Bruno Mars' },
  { name: 'Shape of You', author: 'Ed Sheeran' },
  { name: 'Bad Guy', author: 'Billie Eilish' },
  { name: 'Dance Monkey', author: 'Tones And I' },
];

const hashtagOptions = [
  'fyp', 'foryou', 'viral', 'trending', 'dance', 'food', 'travel',
  'fashion', 'fitness', 'funny', 'nature', 'music', 'art', 'diy',
  'photography', 'pets', 'cooking', 'workout', 'beauty', 'tech',
  'adventure', 'sunset', 'morning', 'motivation', 'recipe',
];

function getRandomSubset<T>(arr: T[], min: number, max: number): T[] {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function formatCount(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return n.toString();
}

export const videos: Video[] = Array.from({ length: 24 }, (_, i) => {
  const user = users[i % users.length];
  const sound = sounds[i % sounds.length];
  const hashtags = getRandomSubset(hashtagOptions, 2, 4);
  return {
    id: `v${i + 1}`,
    user,
    description: descriptions[i % descriptions.length],
    hashtags,
    sound: sound.name,
    soundAuthor: sound.author || user.username,
    thumbnail: videoThumbnails[i % videoThumbnails.length],
    likes: Math.floor(Math.random() * 500000) + 1000,
    comments: Math.floor(Math.random() * 20000) + 100,
    shares: Math.floor(Math.random() * 10000) + 50,
    bookmarks: Math.floor(Math.random() * 30000) + 200,
    createdAt: `${Math.floor(Math.random() * 23) + 1}h ago`,
  };
});

export const trendingHashtags: TrendingHashtag[] = [
  { id: 'h1', name: 'SummerVibes', views: '2.4B', thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=300&fit=crop' },
  { id: 'h2', name: 'DanceChallenge', views: '1.8B', thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop' },
  { id: 'h3', name: 'FoodTok', views: '3.1B', thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=300&fit=crop' },
  { id: 'h4', name: 'TravelDiary', views: '1.2B', thumbnail: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=300&h=300&fit=crop' },
  { id: 'h5', name: 'FitnessTips', views: '980M', thumbnail: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=300&h=300&fit=crop' },
  { id: 'h6', name: 'PetLove', views: '2.7B', thumbnail: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=300&h=300&fit=crop' },
  { id: 'h7', name: 'OOTD', views: '1.5B', thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=300&fit=crop' },
  { id: 'h8', name: 'DIYProjects', views: '890M', thumbnail: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&h=300&fit=crop' },
  { id: 'h9', name: 'SunsetMagic', views: '1.1B', thumbnail: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300&h=300&fit=crop' },
  { id: 'h10', name: 'TechReview', views: '670M', thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop' },
];

export const categories: Category[] = [
  { id: 'c1', name: 'For You', icon: 'star' },
  { id: 'c2', name: 'Dance', icon: 'music-note' },
  { id: 'c3', name: 'Comedy', icon: 'emoji-emotions' },
  { id: 'c4', name: 'Food', icon: 'restaurant' },
  { id: 'c5', name: 'Travel', icon: 'flight' },
  { id: 'c6', name: 'Fashion', icon: 'checkroom' },
  { id: 'c7', name: 'Sports', icon: 'sports-basketball' },
  { id: 'c8', name: 'Pets', icon: 'pets' },
  { id: 'c9', name: 'DIY', icon: 'build' },
  { id: 'c10', name: 'Tech', icon: 'devices' },
];

export const notifications: Notification[] = [
  { id: 'n1', type: 'like', user: users[0], content: 'liked your video', time: '2m ago', thumbnail: videoThumbnails[0], read: false },
  { id: 'n2', type: 'follow', user: users[1], content: 'started following you', time: '5m ago', read: false },
  { id: 'n3', type: 'comment', user: users[2], content: 'commented: "This is amazing! 🔥"', time: '12m ago', thumbnail: videoThumbnails[2], read: false },
  { id: 'n4', type: 'like', user: users[3], content: 'liked your video', time: '28m ago', thumbnail: videoThumbnails[3], read: true },
  { id: 'n5', type: 'mention', user: users[4], content: 'mentioned you in a comment', time: '1h ago', thumbnail: videoThumbnails[4], read: true },
  { id: 'n6', type: 'follow', user: users[5], content: 'started following you', time: '2h ago', read: true },
  { id: 'n7', type: 'comment', user: users[6], content: 'commented: "Can\'t stop watching 😂"', time: '3h ago', thumbnail: videoThumbnails[6], read: true },
  { id: 'n8', type: 'like', user: users[7], content: 'and 24 others liked your video', time: '4h ago', thumbnail: videoThumbnails[7], read: true },
  { id: 'n9', type: 'follow', user: users[8], content: 'started following you', time: '6h ago', read: true },
  { id: 'n10', type: 'mention', user: users[9], content: 'mentioned you: "Check out @you"', time: '8h ago', thumbnail: videoThumbnails[9], read: true },
  { id: 'n11', type: 'like', user: users[10], content: 'liked your video', time: '1d ago', thumbnail: videoThumbnails[10], read: true },
  { id: 'n12', type: 'comment', user: users[11], content: 'commented: "Tutorial please! 🙏"', time: '1d ago', thumbnail: videoThumbnails[11], read: true },
  { id: 'n13', type: 'follow', user: users[0], content: 'started following you', time: '2d ago', read: true },
  { id: 'n14', type: 'like', user: users[1], content: 'and 156 others liked your video', time: '3d ago', thumbnail: videoThumbnails[1], read: true },
  { id: 'n15', type: 'comment', user: users[2], content: 'replied to your comment', time: '4d ago', thumbnail: videoThumbnails[5], read: true },
];

export const currentUser: User = {
  id: 'me',
  username: 'vibecreator',
  displayName: 'Your Name',
  avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop',
  bio: '✨ Creating vibes since day one\n🎬 Content creator | Storyteller',
  followers: 12400,
  following: 486,
  likes: 245000,
  verified: false,
};

export const myVideos = videoThumbnails.slice(0, 9).map((thumb, i) => ({
  id: `mv${i + 1}`,
  thumbnail: thumb,
  views: formatCount(Math.floor(Math.random() * 500000) + 5000),
}));

export const likedVideos = videoThumbnails.slice(9, 18).map((thumb, i) => ({
  id: `lv${i + 1}`,
  thumbnail: thumb,
  views: formatCount(Math.floor(Math.random() * 500000) + 5000),
}));

export { formatCount, users };
