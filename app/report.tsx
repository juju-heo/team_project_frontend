import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function ReportScreen() {
    const [reason, setReason] = useState('');

    const submit = () => {
        if (!reason.trim()) {
            Alert.alert('알림', '신고 사유를 입력해주세요.');
            return;
        }
        Alert.alert('접수 완료', '신고가 접수되었습니다.');
        router.back();
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                <TouchableOpacity onPress={() => router.back()} style={{ paddingRight: 12, paddingVertical: 4 }}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#333' }}>사용자 신고</Text>
            </View>

            <View style={{ padding: 16 }}>
                <Text style={{ color: '#333', marginBottom: 8 }}>신고 사유</Text>
                <TextInput
                    value={reason}
                    onChangeText={setReason}
                    multiline
                    placeholder="신고 내용을 입력하세요"
                    style={{ borderWidth: 1, borderColor: '#eee', borderRadius: 10, minHeight: 120, padding: 12 }}
                />
                <TouchableOpacity onPress={submit} style={{ marginTop: 12, backgroundColor: '#E53935', padding: 12, borderRadius: 12, alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontWeight: '700' }}>신고 제출</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}


