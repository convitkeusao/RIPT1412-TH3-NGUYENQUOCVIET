import React from 'react';
import {
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CloseIcon from '../../shared/components/icons/x';

type Props = {
    onStart: () => void;
};

export default function WelcomeScreen({ onStart }: Props) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.container}>
                <View style={styles.top}>
                    <View style={styles.sun}>
                        <CloseIcon size={24} color="#936F55" />
                    </View>
                </View>

                <View style={styles.content}>
                    <View style={styles.illustration}>
                        <CloseIcon size={76} color="#64745A" />

                        <View style={styles.decorations}>
                            <CloseIcon size={34} color="#C78D91" />
                            <CloseIcon size={30} color="#936F55" />
                        </View>
                    </View>

                    <Text style={styles.title}>My Journal</Text>

                    <Text style={styles.subtitle}>
                        Một góc nhỏ dành riêng cho bạn
                    </Text>

                    <Text style={styles.description}>
                        Lưu giữ những khoảnh khắc, cảm xúc
                        {'\n'}và câu chuyện của riêng bạn mỗi ngày.
                    </Text>
                </View>

                <View style={styles.bottom}>
                    <Pressable
                        onPress={onStart}
                        style={({ pressed }) => [
                            styles.button,
                            pressed && styles.buttonPressed,
                        ]}
                    >
                        <Text style={styles.buttonText}>
                            Bắt đầu hành trình của bạn
                        </Text>
                    </Pressable>

                    <Text style={styles.footer}>
                        Your story, your little world.
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FBF5EA',
    },
    container: {
        flex: 1,
        paddingHorizontal: 28,
    },
    top: {
        alignItems: 'flex-end',
        paddingTop: 12,
    },
    sun: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F1DCCB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    illustration: {
        width: 190,
        height: 190,
        borderRadius: 36,
        backgroundColor: '#E7E9D7',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
    },
    decorations: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    title: {
        marginTop: 30,
        fontSize: 34,
        fontWeight: '700',
        color: '#51483F',
        letterSpacing: 0.5,
    },
    subtitle: {
        marginTop: 12,
        fontSize: 17,
        fontWeight: '600',
        color: '#756B5F',
        textAlign: 'center',
    },
    description: {
        marginTop: 14,
        fontSize: 14,
        lineHeight: 23,
        color: '#81766B',
        textAlign: 'center',
    },
    bottom: {
        paddingBottom: 18,
        gap: 18,
    },
    button: {
        minHeight: 56,
        borderRadius: 18,
        backgroundColor: '#75856A',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    buttonPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },
    footer: {
        textAlign: 'center',
        color: '#A69A8B',
        fontSize: 12,
    },
});