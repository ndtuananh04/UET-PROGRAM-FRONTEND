import React from 'react';
import { useNavigation } from './useNavigation'; // Import your custom hook
import AppContent from './AppContent';

export default function AppContentWrapper() {
  const navigate = useNavigation();

  return <AppContent navigate={navigate} />;
};

