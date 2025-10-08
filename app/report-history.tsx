import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function ReportHistoryScreen() {
    const items = [
        { id: '1', title: '욕설/비방 신고', date: '2024-12-01', status: '처리완료' },
        { id: '2', title: '스팸 신고', date: '2024-11-22', status: '접수' },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                <TouchableOpacity onPress={() => router.back()} style={{ paddingRight: 12, paddingVertical: 4 }}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#333' }}>신고 내역</Text>
            </View>

            <FlatList
                data={items}
                keyExtractor={(i) => i.id}
                contentContainerStyle={{ padding: 16 }}
                renderItem={({ item }) => (
                    <View style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#eee', borderRadius: 12, padding: 12, marginBottom: 10 }}>
                        <Text style={{ color: '#333', fontWeight: '600' }}>{item.title}</Text>
                        <Text style={{ color: '#999', marginTop: 4, fontSize: 12 }}>{item.date} · {item.status}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}


