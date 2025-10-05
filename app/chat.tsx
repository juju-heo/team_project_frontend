import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import styles from '../src/style/ChatStyles';

export default function ChatScreen() {
    // 채팅 목록 데이터
    const chatData = [
        {
            id: 1,
            name: '스타✨',
            lastMessage: '안녕하세요~ 반가워요!',
            time: '오후 2:30',
            unreadCount: 2,
            avatar: '스타'
        },
        {
            id: 2,
            name: '달빛소녀',
            lastMessage: '오늘 날씨 정말 좋네요 ㅎㅎ',
            time: '오후 1:15',
            unreadCount: 0,
            avatar: '달빛'
        },
        {
            id: 3,
            name: '햇살왕자',
            lastMessage: '내일 시간 괜찮으세요?',
            time: '오전 11:45',
            unreadCount: 1,
            avatar: '햇살'
        },
        {
            id: 4,
            name: '바람처럼',
            lastMessage: '사진 정말 예쁘게 나왔네요!',
            time: '어제',
            unreadCount: 0,
            avatar: '바람'
        },
        {
            id: 5,
            name: '구름속에',
            lastMessage: '감사합니다😊',
            time: '어제',
            unreadCount: 3,
            avatar: '구름'
        }
    ];

    return (
        <View style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>채팅</Text>
                <View style={styles.headerRight} />
            </View>

            {/* 검색 바 */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#999" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="채팅방 검색"
                    placeholderTextColor="#999"
                />
            </View>

            {/* 채팅 목록 */}
            <ScrollView style={styles.chatList}>
                {chatData.map((chat) => (
                    <TouchableOpacity key={chat.id} style={styles.chatItem}>
                        <View style={styles.chatLeft}>
                            <View style={styles.avatarContainer}>
                                <Text style={styles.avatarText}>{chat.avatar}</Text>
                                <View style={styles.onlineIndicator} />
                            </View>
                        </View>
                        
                        <View style={styles.chatCenter}>
                            <Text style={styles.chatName}>{chat.name}</Text>
                            <Text style={styles.lastMessage}>{chat.lastMessage}</Text>
                        </View>
                        
                        <View style={styles.chatRight}>
                            <Text style={styles.messageTime}>{chat.time}</Text>
                            {chat.unreadCount > 0 && (
                                <View style={styles.unreadBadge}>
                                    <Text style={styles.unreadText}>{chat.unreadCount}</Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
