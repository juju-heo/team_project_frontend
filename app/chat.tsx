import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import styles from '../src/style/ChatStyles';

export default function ChatScreen() {
    // 읽은 채팅방 ID 목록 상태
    const [readChats, setReadChats] = useState<number[]>([]);
    
    // 컴포넌트가 마운트될 때 읽은 채팅방 목록 불러오기
    useEffect(() => {
        // localStorage에서 읽은 채팅방 목록 불러오기
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('readChats');
            if (stored) {
                setReadChats(JSON.parse(stored));
            }
        }
    }, []);
    
    // 화면이 포커스될 때마다 읽은 채팅방 목록 업데이트
    useFocusEffect(
        React.useCallback(() => {
            // localStorage에서 읽은 채팅방 목록 불러오기
            if (typeof window !== 'undefined') {
                const stored = localStorage.getItem('readChats');
                if (stored) {
                    setReadChats(JSON.parse(stored));
                }
            }
        }, [])
    );
    
    // 채팅 목록 데이터
    const chatData = [
        {
            id: 1,
            name: '스타✨',
            lastMessage: '저도 운동 좋아해요! 같이 할래요?',  // 상대방이 새로운 메시지를 보냄
            time: '오후 3:15',
            unreadCount: 2,  // 상대방이 새로 보낸 메시지 2개
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
            unreadCount: 1,  // 상대방이 마지막 메시지를 보냄 (아직 답장 안함)
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
            unreadCount: 3,  // 상대방이 메시지를 3개 보냄 (아직 읽지 않음)
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
                {chatData.map((chat) => {
                    // 읽은 채팅방인지 확인하여 unreadCount 조정
                    const actualUnreadCount = readChats.includes(chat.id) ? 0 : chat.unreadCount;
                    
                    return (
                        <TouchableOpacity 
                            key={chat.id} 
                            style={styles.chatItem}
                            onPress={() => {
                                // 채팅방으로 이동 (사용자 정보와 채팅방 ID를 파라미터로 전달)
                                router.push({
                                    pathname: '/chat-room',
                                    params: {
                                        chatId: chat.id,
                                        name: chat.name,
                                        avatar: chat.avatar
                                    }
                                });
                            }}
                        >
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
                                {actualUnreadCount > 0 && (
                                    <View style={styles.unreadBadge}>
                                        <Text style={styles.unreadText}>{actualUnreadCount}</Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}
