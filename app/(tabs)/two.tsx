import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
// 스타일 임포트
import styles from '../../src/style/Profile';
// 네비게이션 임포트
import { router, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
    // 친구 목록 데이터 (저장된 값 기반)
    const [friendsData, setFriendsData] = React.useState<{ id: number; name: string }[]>([]);

    useFocusEffect(
        React.useCallback(() => {
            (async () => {
                try {
                    const stored = await AsyncStorage.getItem('friends_list');
                    if (stored) {
                        const list = JSON.parse(stored) as Array<{ id: number; name: string }>;
                        setFriendsData(list.slice(0, 6));
                    }
                } catch {}
            })();
        }, [])
    );

    const [showProfileModal, setShowProfileModal] = React.useState(false);
    const [selectedFriend, setSelectedFriend] = React.useState<{ id: number; name: string } | null>(null);

    const openFriend = (friend: { id: number; name: string }) => {
        setSelectedFriend(friend);
        setShowProfileModal(true);
    };

    const startChatWithSelected = () => {
        if (!selectedFriend) return;
        setShowProfileModal(false);
        router.push(`/chat/${selectedFriend.id}?name=${encodeURIComponent(selectedFriend.name)}`);
    };

    return (
        <View style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>프로필</Text>
                <TouchableOpacity onPress={() => router.push('/profile-menu')}>
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
                    <TouchableOpacity style={styles.editButton} onPress={() => router.push('/profile-edit')}>
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
                            <TouchableOpacity key={friend.id} style={styles.friendItem} onPress={() => openFriend(friend)}>
                                <View style={styles.friendAvatar}>
                                    <Ionicons name="person" size={24} color="white" />
                                </View>
                                <Text style={styles.friendName}>{friend.name}</Text>
                            </TouchableOpacity>
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

            {/* 친구 프로필 팝업 */}
            {showProfileModal && (
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                    <View style={{ width: '100%', maxWidth: 520, backgroundColor: '#fff', borderRadius: 16, padding: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: '700', color: '#333' }}>프로필</Text>
                            <TouchableOpacity onPress={() => setShowProfileModal(false)}>
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        <View style={{ alignItems: 'center', marginTop: 16 }}>
                            <View style={{ width: 120, height: 120, borderRadius: 60, backgroundColor: '#34C759', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#1e9f45' }}>
                                <Text style={{ color: '#fff', fontSize: 24, fontWeight: '800' }}>{selectedFriend?.name.substring(0,2) || ''}</Text>
                            </View>
                            <Text style={{ marginTop: 12, fontSize: 18, fontWeight: '700', color: '#333' }}>{selectedFriend?.name}</Text>
                            <Text style={{ marginTop: 4, fontSize: 14, color: '#777' }}>서울시 · 24세</Text>

                            <View style={{ flexDirection: 'row', marginTop: 16 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 28 }}>
                                    <AntDesign name="heart" size={18} color="#E53935" />
                                    <Text style={{ marginLeft: 6, color: '#E53935', fontWeight: '700' }}>1,245</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons name="person" size={18} color="#25a244" />
                                    <Text style={{ marginLeft: 6, color: '#25a244', fontWeight: '700' }}>89</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 18 }}>
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 8 }}>자기소개</Text>
                            <View style={{ backgroundColor: '#EAF7EC', borderRadius: 12, padding: 12 }}>
                                <Text style={{ color: '#333' }}>안녕하세요! {selectedFriend?.name}입니다 😊 좋은 사람들과 함께 즐거운 시간을 보내고 싶어요. 많이 친해져요!</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 18 }}>
                            <Text style={{ fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 8 }}>사주 키워드</Text>
                            <View style={{ flexDirection: 'row' }}>
                                {['친근함','신뢰','유머'].map((k) => (
                                    <View key={k} style={{ backgroundColor: '#E8F5E8', borderRadius: 16, paddingHorizontal: 10, paddingVertical: 6, marginRight: 8 }}>
                                        <Text style={{ color: '#25a244', fontWeight: '600' }}>{k}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        <View style={{ marginTop: 18 }}>
                            <TouchableOpacity onPress={startChatWithSelected} style={{ borderWidth: 1, borderColor: '#d6d6d6', borderRadius: 12, height: 44, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, justifyContent: 'center' }}>
                                <Ionicons name="chatbubble-ellipses-outline" size={18} color="#333" />
                                <Text style={{ marginLeft: 8, fontSize: 16, color: '#333' }}>채팅하기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
}