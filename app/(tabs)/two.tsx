import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
// 스타일 임포트
import styles from '../../src/style/Profile';
// 네비게이션 임포트
import { router } from 'expo-router';

export default function ProfileScreen() {
    // 친구 목록 데이터
    const friendsData = [
        { id: 1, name: '김민수' },
        { id: 2, name: '박소영' },
        { id: 3, name: '이준호' },
        { id: 4, name: '최유진' },
        { id: 5, name: '정다혜' },
        { id: 6, name: '오세준' },
    ];

    return (
        <View style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>프로필</Text>
                <TouchableOpacity>
                    <Ionicons name="ellipsis-vertical" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* 사용자 프로필 카드 */}
                <View style={styles.profileCard}>
                    <View style={styles.profileLeft}>
                        <View style={styles.profileImage}>
                            <Ionicons name="person" size={40} color="white" />
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.userName}>홍길동</Text>
                            <Text style={styles.userLocation}>경기도</Text>
                            <View style={styles.userStats}>
                                <View style={styles.statItem}>
                                    <AntDesign name="heart" size={16} color="#E53935" />
                                    <Text style={styles.statText}>1,250</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Ionicons name="person" size={16} color="#4CAF50" />
                                    <Text style={styles.statText}>42</Text>
                                </View>
                            </View>
                            <View style={styles.tagsContainer}>
                                <View style={styles.tag}>
                                    <Text style={styles.tagText}>열정</Text>
                                </View>
                                <View style={styles.tag}>
                                    <Text style={styles.tagText}>사랑</Text>
                                </View>
                                <View style={styles.tag}>
                                    <Text style={styles.tagText}>기쁨</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.editButton}>
                        <Ionicons name="pencil" size={20} color="#4CAF50" />
                        <Text style={styles.editButtonText}>편집</Text>
                    </TouchableOpacity>
                </View>

                {/* 친구 목록 섹션 */}
                <View style={styles.friendsSection}>
                    <View style={styles.friendsHeader}>
                        <View style={styles.friendsTitleContainer}>
                            <Ionicons name="people" size={20} color="#333" />
                            <Text style={styles.friendsTitle}>친구 목록</Text>
                        </View>
                        <TouchableOpacity onPress={() => router.push('/friends')}>
                            <Text style={styles.viewAllText}>전체보기</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.friendsGrid}>
                        {friendsData.map((friend) => (
                            <View key={friend.id} style={styles.friendItem}>
                                <View style={styles.friendAvatar}>
                                    <Ionicons name="person" size={24} color="white" />
                                </View>
                                <Text style={styles.friendName}>{friend.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* 하단 내비게이션 바 */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navButton}>
                    <Ionicons name="videocam-outline" size={30} color="#999" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.navButton}
                    onPress={() => router.push('/(tabs)')}
                >
                    <Ionicons name="home-outline" size={30} color="#999" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <Ionicons name="person-circle" size={30} color="#4CAF50" />
                </TouchableOpacity>
            </View>
        </View>
    );
}