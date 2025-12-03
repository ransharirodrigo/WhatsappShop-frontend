import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface Chat {
  id: string;
  name: string;
  message: string;
  unreadCount: number;
  avatarColor: string;
}

export default function ManageChatsScreen() {
  const [activeTab, setActiveTab] = useState<'new' | 'unread'>('new');

  const chats: Chat[] = [
    {
      id: '1',
      name: 'John Smith',
      message: 'Hey Buddy',
      unreadCount: 2,
      avatarColor: '#5B5FFF',
    },
    {
      id: '2',
      name: 'Tharushi',
      message: 'Gedara enne nadda miniyo',
      unreadCount: 10,
      avatarColor: '#1E40AF',
    },
    {
      id: '3',
      name: 'Batman',
      message: 'I am on my duty',
      unreadCount: 1,
      avatarColor: '#0EA5E9',
    },
    {
      id: '4',
      name: 'Cat woman',
      message: 'mage kama tika genawada',
      unreadCount: 32,
      avatarColor: '#8B5CF6',
    },
    {
      id: '5',
      name: 'Samantha',
      message: 'the bonawada',
      unreadCount: 1,
      avatarColor: '#A855F7',
    },
    {
      id: '6',
      name: 'Polleha gedara sunil',
      message: 'Machan enne nadd dnma',
      unreadCount: 3,
      avatarColor: '#EAB308',
    },
    {
      id: '7',
      name: 'Tharushi ge kolla',
      message: 'Bosa',
      unreadCount: 42,
      avatarColor: '#7C3AED',
    },
    {
      id: '8',
      name: 'Katta Kapila',
      message: 'Hey',
      unreadCount: 9,
      avatarColor: '#0891B2',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.userName}>Randika Perera</Text>
            <Text style={styles.greeting}>Good Morning!</Text>
          </View>
          <View style={styles.avatar}>
            <Image
              source={require('@/assets/images/dp.jpg')}
              style={styles.avatarImage}
            />
            <View style={styles.onlineIndicator} />
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'new' && styles.tabActive]}
            onPress={() => setActiveTab('new')}
          >
            <Text style={[styles.tabText, activeTab === 'new' && styles.tabTextActive]}>
              New
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'unread' && styles.tabActive]}
            onPress={() => setActiveTab('unread')}
          >
            <Text style={[styles.tabText, activeTab === 'unread' && styles.tabTextActive]}>
              Unread
            </Text>
          </TouchableOpacity>
        </View>

        {/* Chat List */}
        <View style={styles.chatList}>
          {chats.map((chat) => (
            <TouchableOpacity key={chat.id} style={styles.chatItem}>
              <View style={[styles.chatAvatar, { backgroundColor: chat.avatarColor }]}>
                <View style={styles.avatarIcon} />
              </View>
              <View style={styles.chatContent}>
                <Text style={styles.chatName}>{chat.name}</Text>
                <Text style={styles.chatMessage}>{chat.message}</Text>
              </View>
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>{chat.unreadCount.toString().padStart(2, '0')}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  greeting: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#1C6055',
    position: 'relative',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  tabActive: {
    backgroundColor: '#0F766E',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  tabTextActive: {
    color: '#FFF',
  },
  chatList: {
    paddingHorizontal: 20,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  chatAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  chatContent: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  chatMessage: {
    fontSize: 14,
    color: '#8E8E93',
  },
  unreadBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 36,
    alignItems: 'center',
  },
  unreadCount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFF',
  },
  bottomSpacing: {
    height: 40,
  },
});
