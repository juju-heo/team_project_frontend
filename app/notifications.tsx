import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import styles from '../src/style/NotificationStyles';

// 알림 데이터 타입 정의
interface NotificationItem {
    id: number;
    type: 'friend_request' | 'heart' | 'message' | 'system';
    username: string;
    avatarText: string;
    message: string;
    time: string;
    isRead: boolean;
    isOnline?: boolean;
}

interface NotificationSection {
    title: string;
    notifications: NotificationItem[];
    badgeCount?: number;
}

const NotificationScreen = () => {
    const [notifications, setNotifications] = useState<NotificationSection[]>([
        {
            title: '친구 요청',
            badgeCount: 2,
            notifications: [
                {
                    id: 1,
                    type: 'friend_request',
                    username: '햇살왕자',
                    avatarText: '햇살',
                    message: '친구 요청을 보냈습니다',
                    time: '5분 전',
                    isRead: false,
                    isOnline: true,
                },
                {
                    id: 2,
                    type: 'friend_request',
                    username: '별빛나래',
                    avatarText: '별빛',
                    message: '친구 요청을 보냈습니다',
                    time: '1시간 전',
                    isRead: false,
                    isOnline: true,
                },
            ],
        },
        {
            title: '오늘',
            notifications: [
                {
                    id: 3,
                    type: 'heart',
                    username: '달빛소녀',
                    avatarText: '달빛',
                    message: '당신에게 하트를 눌렀습니다',
                    time: '2분 전',
                    isRead: false,
                    isOnline: true,
                },
                {
                    id: 4,
                    type: 'message',
                    username: '바람처럼',
                    avatarText: '바람',
                    message: '새로운 메시지를 보냈습니다',
                    time: '10분 전',
                    isRead: false,
                    isOnline: true,
                },
            ],
        },
        {
            title: '어제',
            notifications: [
                {
                    id: 5,
                    type: 'heart',
                    username: '구름속에',
                    avatarText: '구름',
                    message: '당신에게 하트를 눌렀습니다',
                    time: '오후 11:30',
                    isRead: true,
                },
                {
                    id: 6,
                    type: 'message',
                    username: '파도소리',
                    avatarText: '파도',
                    message: '안녕하세요! 반가워요',
                    time: '오전 9:15',
                    isRead: true,
                },
            ],
        },
        {
            title: '최근 30일',
            notifications: [
                {
                    id: 7,
                    type: 'heart',
                    username: '꽃피는봄',
                    avatarText: '꽃피',
                    message: '당신에게 하트를 눌렀습니다',
                    time: '10월 25일',
                    isRead: true,
                },
                {
                    id: 8,
                    type: 'system',
                    username: 'fate:try',
                    avatarText: '',
                    message: '매주 월요일 이벤트가 시작되었습니다!',
                    time: '10월 23일',
                    isRead: true,
                },
            ],
        },
    ]);

    // 친구 요청 수락/거절 함수
    const handleFriendRequest = (notificationId: number, action: 'accept' | 'decline') => {
        setNotifications(prev => 
            prev.map(section => ({
                ...section,
                notifications: section.notifications.filter(notif => notif.id !== notificationId)
            }))
        );
    };

    // 모든 알림 읽음 처리
    const markAllAsRead = () => {
        setNotifications(prev => 
            prev.map(section => ({
                ...section,
                notifications: section.notifications.map(notif => ({ ...notif, isRead: true })),
                badgeCount: 0,
            }))
        );
    };

    // 알림 아이콘 렌더링
    const renderNotificationIcon = (type: string) => {
        switch (type) {
            case 'friend_request':
                return <Ionicons name="person-add-outline" size={16} color="#4CAF50" />;
            case 'heart':
                return <AntDesign name="hearto" size={16} color="#E53935" />;
            case 'message':
                return <Ionicons name="chatbubble-outline" size={16} color="#2196F3" />;
            case 'system':
                return <Ionicons name="notifications-outline" size={16} color="#2196F3" />;
            default:
                return <Ionicons name="notifications-outline" size={16} color="#999" />;
        }
    };

    // 개별 알림 카드 렌더링
    const renderNotificationCard = (notification: NotificationItem) => {
        if (notification.type === 'system') {
            return (
                <View key={notification.id} style={styles.systemNotification}>
                    <View style={styles.systemNotificationContent}>
                        <View style={styles.systemIcon}>
                            <Ionicons name="notifications" size={24} color="#fff" />
                        </View>
                        <View style={styles.systemInfo}>
                            <Text style={styles.systemTitle}>{notification.username}</Text>
                            <Text style={styles.systemMessage}>{notification.message}</Text>
                            <Text style={styles.systemTime}>{notification.time}</Text>
                        </View>
                    </View>
                </View>
            );
        }

        return (
            <View key={notification.id} style={styles.notificationCard}>
                <View style={styles.notificationContent}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{notification.avatarText}</Text>
                    </View>
                    <View style={styles.notificationInfo}>
                        <View style={styles.notificationHeader}>
                            <View style={styles.notificationIcon}>
                                {renderNotificationIcon(notification.type)}
                            </View>
                            <Text style={styles.username}>{notification.username}</Text>
                            {notification.isOnline && <View style={styles.onlineDot} />}
                        </View>
                        <Text style={styles.notificationMessage}>{notification.message}</Text>
                        <Text style={styles.notificationTime}>{notification.time}</Text>
                    </View>
                    {notification.type === 'friend_request' && (
                        <View style={styles.actionButtons}>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.acceptButton]}
                                onPress={() => handleFriendRequest(notification.id, 'accept')}
                            >
                                <AntDesign name="check" size={16} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionButton, styles.declineButton]}
                                onPress={() => handleFriendRequest(notification.id, 'decline')}
                            >
                                <AntDesign name="close" size={16} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>알림</Text>
                <TouchableOpacity 
                    style={styles.markAllReadButton}
                    onPress={markAllAsRead}
                >
                    <Text style={styles.markAllReadText}>모두 읽음</Text>
                </TouchableOpacity>
            </View>

            {/* 알림 목록 */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {notifications.map((section, sectionIndex) => (
                    <View key={sectionIndex} style={styles.notificationSection}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name="notifications-outline" size={20} color="#333" />
                            <Text style={styles.sectionTitle}>{section.title}</Text>
                            {section.badgeCount && section.badgeCount > 0 && (
                                <View style={styles.notificationBadge}>
                                    <Text style={styles.badgeText}>{section.badgeCount}</Text>
                                </View>
                            )}
                        </View>
                        {section.notifications.map(renderNotificationCard)}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default NotificationScreen;
