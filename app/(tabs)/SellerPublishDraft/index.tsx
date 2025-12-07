import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import SellerPublishDraftDetail from './[id]'; 

export default function SellerPublishDraftWrapper() {
  const { id } = useLocalSearchParams();

  return <SellerPublishDraftDetail id={id ?? 'defaultId'} />;
}
