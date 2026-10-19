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

import Root from './navigation/Root';
import { runMigrations } from './database/migrations';
import { DataProvider } from './shared/lib/DataContext';
import { colors } from './shared/constants/colors';

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
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>
            Đang chuẩn bị dữ liệu học tập...
          </Text>
        </View>
      ) : (
        <NavigationContainer>
          <DataProvider>
            <Root />
          </DataProvider>
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
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 14,
    color: colors.muted,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.ink,
    textAlign: 'center',
  },
  errorText: {
    marginTop: 12,
    color: colors.red,
    textAlign: 'center',
  },
});