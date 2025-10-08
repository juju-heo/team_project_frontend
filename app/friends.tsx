import React, { useEffect, useState } from 'react';
import { 
    ScrollView, 
    Text, 
    View, 
    TouchableOpacity, 
    SafeAreaView, 
    TextInput, 
    Modal,
    Alert,
    FlatList 
} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import styles from '../src/style/FriendsListStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 친구 데이터 타입 정의
interface Friend {
    id: number;
    name: string;
    avatarText: string;
    isOnline: boolean;
}

const FriendsListScreen = () => {
    const [friends, setFriends] = useState<Friend[]>([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [showAddFriendModal, setShowAddFriendModal] = useState(false);
    const [newFriendName, setNewFriendName] = useState('');

    // 검색 필터링된 친구 목록
    const filteredFriends = friends.filter(friend =>
        friend.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 친구 추가 함수
    const addFriend = async () => {
        if (newFriendName.trim()) {
            const newFriend: Friend = {
                id: friends.length + 1,
                name: newFriendName.trim(),
                avatarText: newFriendName.trim().substring(0, 2),
                isOnline: Math.random() > 0.5, // 랜덤으로 온라인 상태 설정
            };
            const next = [...friends, newFriend];
            setFriends(next);
            await AsyncStorage.setItem('friends_list', JSON.stringify(next));
            setNewFriendName('');
            setShowAddFriendModal(false);
            Alert.alert('성공', '친구가 추가되었습니다!');
        }
    };

    // 친구 삭제 함수
    const removeFriend = (friendId: number) => {
        Alert.alert(
            '친구 삭제',
            '이 친구를 삭제하시겠습니까?',
            [
                { text: '취소', style: 'cancel' },
                {
                    text: '삭제',
                    style: 'destructive',
                    onPress: async () => {
                        const next = friends.filter(friend => friend.id !== friendId);
                        setFriends(next);
                        await AsyncStorage.setItem('friends_list', JSON.stringify(next));
                    }
                }
            ]
        );
    };

    // 친구와 채팅 시작
    const startChat = (friend: Friend) => {
        router.push(`/chat/${friend.id}?name=${encodeURIComponent(friend.name)}`);
    };

    // 개별 친구 아이템 렌더링
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

    const openFriend = (friend: Friend) => {
        setSelectedFriend(friend);
        setShowProfileModal(true);
    };

    const renderFriendItem = (friend: Friend) => (
        <TouchableOpacity 
            key={friend.id} 
            style={styles.friendItem}
            onLongPress={() => removeFriend(friend.id)}
            onPress={() => openFriend(friend)}
        >
            <View style={styles.friendAvatar}>
                <Text style={styles.friendAvatarText}>{friend.avatarText}</Text>
            </View>
            <View style={styles.friendInfo}>
                <Text style={styles.friendName}>{friend.name}</Text>
                <View style={styles.friendStatus}>
                    <View style={[
                        styles.statusDot,
                        friend.isOnline ? styles.onlineDot : styles.offlineDot
                    ]} />
                    <Text style={styles.statusText}>
                        {friend.isOnline ? '온라인' : '오프라인'}
                    </Text>
                </View>
            </View>
            <TouchableOpacity 
                style={styles.messageButton}
                onPress={() => startChat(friend)}
            >
                <Ionicons name="chatbubble-outline" size={24} color="#4CAF50" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    // 초기 로드 (저장된 친구 목록)
    useEffect(() => {
        (async () => {
            try {
                const stored = await AsyncStorage.getItem('friends_list');
                if (stored) {
                    setFriends(JSON.parse(stored));
                } else {
                    // 기본 샘플 데이터
                    const seed: Friend[] = [
                        { id: 1, name: '김민수', avatarText: '김민', isOnline: true },
                        { id: 2, name: '박지영', avatarText: '박지', isOnline: false },
                        { id: 3, name: '이동현', avatarText: '이동', isOnline: true },
                    ];
                    setFriends(seed);
                    await AsyncStorage.setItem('friends_list', JSON.stringify(seed));
                }
            } catch {}
        })();
    }, []);

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
                <Text style={styles.headerTitle}>친구</Text>
            </View>

            {/* 메인 카드 */}
            <View style={styles.mainCard}>
                {/* 카드 헤더 */}
                <View style={styles.cardHeader}>
                    <View style={styles.friendsInfo}>
                        <Ionicons 
                            name="people-outline" 
                            size={20} 
                            color="#333" 
                            style={styles.friendsIcon}
                        />
                        <Text style={styles.friendsText}>친구</Text>
                        <View style={styles.friendsCount}>
                            <Text style={styles.friendsCountText}>{friends.length}</Text>
                        </View>
                    </View>
                    <TouchableOpacity 
                        style={styles.addFriendButton}
                        onPress={() => setShowAddFriendModal(true)}
                    >
                        <Ionicons name="person-add" size={16} color="#fff" />
                        <Text style={styles.addFriendText}>친구 추가</Text>
                    </TouchableOpacity>
                </View>

                {/* 검색 바 */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchInput}>
                        <Ionicons 
                            name="search" 
                            size={20} 
                            color="#fff" 
                            style={styles.searchIcon}
                        />
                        <TextInput
                            style={styles.searchText}
                            placeholder="친구 검색..."
                            placeholderTextColor="rgba(255, 255, 255, 0.7)"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </View>

                {/* 친구 목록 */}
                {filteredFriends.length > 0 ? (
                    <FlatList
                        data={filteredFriends}
                        keyExtractor={(f) => String(f.id)}
                        renderItem={({ item }) => renderFriendItem(item)}
                        style={styles.friendsList as any}
                    />
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="people-outline" size={48} color="#ccc" />
                        <Text style={styles.emptyStateText}>
                            {searchQuery ? '검색 결과가 없습니다' : '친구가 없습니다'}
                        </Text>
                    </View>
                )}
            </View>

            {/* 친구 프로필 팝업 */}
            {showProfileModal && selectedFriend && (
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
                                <Text style={{ color: '#fff', fontSize: 24, fontWeight: '800' }}>{selectedFriend.avatarText}</Text>
                            </View>
                            <Text style={{ marginTop: 12, fontSize: 18, fontWeight: '700', color: '#333' }}>{selectedFriend.name}</Text>
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
                                <Text style={{ color: '#333' }}>안녕하세요! {selectedFriend.name}입니다 😊 좋은 사람들과 함께 즐거운 시간을 보내고 싶어요. 많이 친해져요!</Text>
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
                            <TouchableOpacity onPress={() => { setShowProfileModal(false); startChat(selectedFriend); }} style={{ borderWidth: 1, borderColor: '#d6d6d6', borderRadius: 12, height: 44, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, justifyContent: 'center', marginBottom: 10 }}>
                                <Ionicons name="chatbubble-ellipses-outline" size={18} color="#333" />
                                <Text style={{ marginLeft: 8, fontSize: 16, color: '#333' }}>채팅하기</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => { setShowProfileModal(false); router.push('/report'); }} style={{ flex: 1, borderWidth: 1, borderColor: '#f1c0c0', borderRadius: 12, height: 42, alignItems: 'center', justifyContent: 'center', marginRight: 6 }}>
                                    <Text style={{ color: '#E53935' }}>신고</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setShowProfileModal(false); router.push('/blocked'); }} style={{ flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 12, height: 42, alignItems: 'center', justifyContent: 'center', marginLeft: 6 }}>
                                    <Text style={{ color: '#333' }}>차단 관리</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            )}

            {/* 친구 추가 모달 */}
            <Modal
                visible={showAddFriendModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowAddFriendModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>친구 추가</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="친구 이름을 입력하세요"
                            value={newFriendName}
                            onChangeText={setNewFriendName}
                            autoFocus={true}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => {
                                    setShowAddFriendModal(false);
                                    setNewFriendName('');
                                }}
                            >
                                <Text style={[styles.modalButtonText, styles.cancelButtonText]}>
                                    취소
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={addFriend}
                            >
                                <Text style={[styles.modalButtonText, styles.confirmButtonText]}>
                                    추가
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default FriendsListScreen;
