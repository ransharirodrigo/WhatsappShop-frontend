import BuyerHomeScreen from '@/buyer/home';
import { useAppMode } from '@/contexts/app-mode-context';
import SellerHomeScreen from '@/seller/home';
import React from 'react';

export default function HomeScreen() {
  const { mode } = useAppMode();

  return mode === 'buyer' ? <BuyerHomeScreen /> : <SellerHomeScreen />;
}
