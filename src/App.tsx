import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootNavigator from './navigation/RootNavigator';
import { runMigrations } from './database/migrations';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function initializeApp() {
      try {
        await runMigrations();

        if (active) {
          setIsReady(true);
        }
      } catch (e) {
        if (active) {
          setError(
            e instanceof Error
              ? e.message
              : 'Không thể khởi tạo database.',
          );
        }
      }
    }

    initializeApp();

    return () => {
      active = false;
    };
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />

      {error ? (
        <View style={styles.center}>
          <Text style={styles.errorTitle}>
            Không thể khởi động ứng dụng
          </Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : !isReady ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#75856A" />
          <Text style={styles.loadingText}>
            Đang chuẩn bị không gian của bạn...
          </Text>
        </View>
      ) : (
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FBF5EA',
  },
  loadingText: {
    marginTop: 14,
    color: '#81766B',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#51483F',
    textAlign: 'center',
  },
  errorText: {
    marginTop: 12,
    color: '#B42318',
    textAlign: 'center',
  },
});