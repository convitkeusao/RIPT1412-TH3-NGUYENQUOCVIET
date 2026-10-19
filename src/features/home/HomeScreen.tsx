import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>My Journal 🌿</Text>
                <Text style={styles.subtitle}>
                    Chào mừng bạn trở lại!
                </Text>
                <Text style={styles.description}>
                    Nơi những câu chuyện của bạn bắt đầu.
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBF5EA',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        color: '#51483F',
    },
    subtitle: {
        marginTop: 16,
        fontSize: 18,
        color: '#75856A',
    },
    description: {
        marginTop: 8,
        color: '#81766B',
    },
});