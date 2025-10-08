import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function AboutScreen() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                <TouchableOpacity onPress={() => router.back()} style={{ paddingRight: 12, paddingVertical: 4 }}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#333' }}>앱 정보</Text>
            </View>

            <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#333' }}>Fatetry</Text>
                <Text style={{ color: '#777', marginTop: 6 }}>버전 1.0.0</Text>
                <Text style={{ color: '#777', marginTop: 12 }}>
                    이 앱은 랜덤 채팅/영상 기능을 제공하는 데모입니다. 피드백은 support@fatetry.com 으로 보내주세요.
                </Text>
            </View>
        </SafeAreaView>
    );
}


