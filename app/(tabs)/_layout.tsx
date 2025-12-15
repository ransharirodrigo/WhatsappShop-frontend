import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { useAppMode } from '@/contexts/app-mode-context';

// Import SVG icons - Buyer
import BecomeSellerIconSvg from '@/assets/images/nav_icons_buyer/BecomeSeller.svg';
import CartIconSvg from '@/assets/images/nav_icons_buyer/Cart.svg';
import CategoryIconSvg from '@/assets/images/nav_icons_buyer/Category.svg';
import HomeIconSvg from '@/assets/images/nav_icons_buyer/Home.svg';
import OrdersIconSvg from '@/assets/images/nav_icons_buyer/Orders.svg';

// Import SVG icons - Seller
import SellerAddIconSvg from '@/assets/images/nav_icons_seller/Add.svg';
import SellerChatsIconSvg from '@/assets/images/nav_icons_seller/Chats.svg';
import SellerHomeIconSvg from '@/assets/images/nav_icons_seller/Home.svg';
import SellerOrdersIconSvg from '@/assets/images/nav_icons_seller/Orders.svg';
import SellerStoreIconSvg from '@/assets/images/nav_icons_seller/Store.svg';

// Shared Tab Bar Styling
const sharedTabBarStyle = {
  backgroundColor: '#1C6055',
  borderTopWidth: 0,
  height: 80,
  paddingBottom: 10,
  paddingTop: 10,
  borderTopLeftRadius: 100,
  borderTopRightRadius: 100,
  borderBottomLeftRadius: 100,
  borderBottomRightRadius: 100,
  marginHorizontal: 10,
  marginBottom: 10,
  position: 'absolute' as 'absolute',
};

// Buyer Icon wrapper components
const HomeIcon = ({ color }: { color: string }) => (
  <HomeIconSvg width={24} height={24} fill={color} />
);

const CategoryIcon = ({ color }: { color: string }) => (
  <CategoryIconSvg width={24} height={24} fill={color} />
);

const CartIcon = ({ color }: { color: string }) => (
  <CartIconSvg width={24} height={24} fill={color} />
);

const OrdersIcon = ({ color }: { color: string }) => (
  <OrdersIconSvg width={24} height={24} fill={color} />
);

const BecomeSellerIcon = ({ color }: { color: string }) => (
  <BecomeSellerIconSvg width={24} height={24} fill={color} />
);

// Seller Icon wrapper components
const SellerHomeIcon = ({ color }: { color: string }) => (
  <SellerHomeIconSvg width={24} height={24} fill={color} />
);

const SellerOrdersIcon = ({ color }: { color: string }) => (
  <SellerOrdersIconSvg width={24} height={24} fill={color} />
);

const SellerAddIcon = ({ color }: { color: string }) => (
  <SellerAddIconSvg width={24} height={24} fill={color} />
);

const SellerStoreIcon = ({ color }: { color: string }) => (
  <SellerStoreIconSvg width={24} height={24} fill={color} />
);

const SellerChatsIcon = ({ color }: { color: string }) => (
  <SellerChatsIconSvg width={24} height={24} fill={color} />
);

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
          tabBarStyle: sharedTabBarStyle,
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
            tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="Category"
          options={{
            title: 'Category',
            tabBarIcon: ({ color }) => <CategoryIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="Cart"
          options={{
            title: 'Cart',
            tabBarIcon: ({ color }) => <CartIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="my-orders"
          options={{
            title: 'Orders',
            tabBarIcon: ({ color }) => <OrdersIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="seller-switch"
          options={{
            title: 'Became a Seller',
            tabBarIcon: ({ color }) => <BecomeSellerIcon color={color} />,
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              toggleMode();
            },
          }}
        />

        {/* HIDDEN SCREENS OF BUYER */}
        {/* <Tabs.Screen name="add-products" options={{ href: null }} /> */}
        <Tabs.Screen name="business-suit" options={{ href: null }} />
        <Tabs.Screen name="buyer-switch" options={{ href: null }} />
        <Tabs.Screen name="HelpDesk" options={{ href: null }} />
        <Tabs.Screen name="view-all-products" options={{ href: null }} />
        <Tabs.Screen name="explore" options={{ href: null }} />
        <Tabs.Screen name="fav-items" options={{ href: null }} />

        {/* HIDDEN SCREENS OF SELLER */}
        <Tabs.Screen name="SellerAdvertisementPublish" options={{ href: null }} />
        <Tabs.Screen name="SellerDrafts" options={{ href: null }} />
        <Tabs.Screen name="SellerHelpDesk" options={{ href: null }} />
        <Tabs.Screen name="SellerStoreUpdate" options={{ href: null }} />
        <Tabs.Screen name="manage-chats" options={{ href: null }} />
        <Tabs.Screen name="SellerPublishDraft/index" options={{ href: null }} />
        <Tabs.Screen name="SellerPublishDraft/[id]" options={{ href: null }} />
        <Tabs.Screen name="BuyAdvertisementPlan" options={{ href: null }} />

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
        tabBarStyle: sharedTabBarStyle,
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
          tabBarIcon: ({ color }) => <SellerHomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => <SellerOrdersIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="SellerAdvertisementPublish"
        options={{
          title: 'Add',
          tabBarIcon: ({ color }) => <SellerAddIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="business-suit"
        options={{
          title: 'Store',
          tabBarIcon: ({ color }) => <SellerStoreIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="manage-chats"
        options={{
          title: 'Chats',
          tabBarIcon: ({ color }) => <SellerChatsIcon color={color} />,
        }}
      />

      {/* HIDDEN SCREENS OF SELLER */}
      <Tabs.Screen name="buyer-switch" options={{ href: null }} />
      <Tabs.Screen name="explore" options={{ href: null }} />
      <Tabs.Screen name="fav-items" options={{ href: null }} />
      <Tabs.Screen name="add" options={{ href: null }} />
      <Tabs.Screen name="SellerDrafts" options={{ href: null }} />
      <Tabs.Screen name="SellerStoreUpdate" options={{ href: null }} />
      <Tabs.Screen name="SellerHelpDesk" options={{ href: null }} />
      <Tabs.Screen name="SellerPublishDraft/index" options={{ href: null }} />
      <Tabs.Screen name="SellerPublishDraft/[id]" options={{ href: null }} />
      <Tabs.Screen name="BuyAdvertisementPlan" options={{ href: null }} />
      <Tabs.Screen name="view-all-products" options={{ href: null }} />

      {/* HIDDEN SCREENS OF BUYER */}
      <Tabs.Screen name="HelpDesk" options={{ href: null }} />
      <Tabs.Screen name="seller-switch" options={{ href: null }} />
      <Tabs.Screen name="Category" options={{ href: null }} />
      <Tabs.Screen name="Cart" options={{ href: null }} />

    </Tabs>
  );
}
