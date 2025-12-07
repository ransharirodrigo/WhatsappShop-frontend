import { FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { useAppMode } from '@/contexts/app-mode-context';

export default function TabLayout() {
  const { mode, toggleMode } = useAppMode();

  if (mode === 'buyer') {
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#34C488',
          tabBarInactiveTintColor: '#7A9B94',
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarStyle: {
            backgroundColor: '#1C6055',
            borderTopWidth: 0,
            height: 80,
            paddingBottom: 10,
            paddingTop: 10,
            borderRadius: 30,
            marginHorizontal: 10,
            marginBottom: 10,
            position: 'absolute',
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="my-orders"
          options={{
            title: 'My Orders',
            tabBarIcon: ({ color }) => <FontAwesome5 name="box" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="seller-switch"
          options={{
            title: 'Seller',
            tabBarIcon: ({ color }) => <FontAwesome5 name="retweet" size={24} color={color} />,
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              toggleMode();
            },
          }}
        />

        {/* HIDDEN SCREENS OF BUYER */}
        <Tabs.Screen name="explore" options={{ href: null }} />
        <Tabs.Screen name="add-products" options={{ href: null }} />
        <Tabs.Screen name="business-suit" options={{ href: null }} />
        <Tabs.Screen name="buyer-switch" options={{ href: null }} />
        <Tabs.Screen name="HelpDesk" options={{ href: null }} />
        <Tabs.Screen name="fav-items" options={{ href: null }} />

        {/* HIDDEN SCREENS OF SELLER */}
        <Tabs.Screen name="SellerAdvertisementPublish" options={{ href: null }} />
        <Tabs.Screen name="SellerDrafts" options={{ href: null }} />
        <Tabs.Screen name="SellerHelpDesk" options={{ href: null }} />
        <Tabs.Screen name="SellerStoreUpdate" options={{ href: null }} />
        <Tabs.Screen name="manage-chats" options={{ href: null }} />
        <Tabs.Screen name="SellerPublishDraft/index" options={{ href: null }} />
        <Tabs.Screen name="SellerPublishDraft/[id]" options={{ href: null }} />

      </Tabs>
    );
  }

  // Seller mode
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#34C488',
        tabBarInactiveTintColor: '#7A9B94',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#1C6055',
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
          borderRadius: 30,
          marginHorizontal: 10,
          marginBottom: 10,
          position: 'absolute',
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="SellerAdvertisementPublish"
        options={{
          title: 'Add Products',
          tabBarIcon: ({ color }) => <FontAwesome5 name="plus-square" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="business-suit"
        options={{
          title: 'Business Suit',
          tabBarIcon: ({ color }) => <FontAwesome5 name="chart-line" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="manage-chats"
        options={{
          title: 'Manage Chats',
          tabBarIcon: ({ color }) => <FontAwesome5 name="comments" size={24} color={color} />,
        }}
      />

      {/* HIDDEN SCREENS OF SELLER */}
      <Tabs.Screen name="buyer-switch" options={{ href: null }} />
      <Tabs.Screen name="explore" options={{ href: null }} />
      <Tabs.Screen name="fav-items" options={{ href: null }} />
      <Tabs.Screen name="add" options={{ href: null }} />
      <Tabs.Screen name="my-orders" options={{ href: null }} />
      <Tabs.Screen name="SellerDrafts" options={{ href: null }} />
      <Tabs.Screen name="SellerStoreUpdate" options={{ href: null }} />
      <Tabs.Screen name="SellerHelpDesk" options={{ href: null }} />
      <Tabs.Screen name="SellerPublishDraft/index" options={{ href: null }} />
      <Tabs.Screen name="SellerPublishDraft/[id]" options={{ href: null }} />

      {/* HIDDEN SCREENS OF BUYER */}
      <Tabs.Screen name="HelpDesk" options={{ href: null }} />
      <Tabs.Screen name="seller-switch" options={{ href: null }} />

    </Tabs>
  );
}
