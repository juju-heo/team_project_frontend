import React, { useState } from 'react';
import { 
    ScrollView, 
    Text, 
    View, 
    TouchableOpacity, 
    SafeAreaView, 
    TextInput, 
    Modal,
    Alert 
} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import styles from '../src/style/FriendsListStyles';

// 친구 데이터 타입 정의
interface Friend {
    id: number;
    name: string;
    avatarText: string;
    isOnline: boolean;
}

const FriendsListScreen = () => {
    const [friends, setFriends] = useState<Friend[]>([
        { id: 1, name: '김민수', avatarText: '김민', isOnline: true },
        { id: 2, name: '박지영', avatarText: '박지', isOnline: false },
        { id: 3, name: '이동현', avatarText: '이동', isOnline: true },
        { id: 4, name: '최수현', avatarText: '최수', isOnline: true },
        { id: 5, name: '정다혜', avatarText: '정다', isOnline: false },
        { id: 6, name: '오세준', avatarText: '오세', isOnline: true },
        { id: 7, name: '한소영', avatarText: '한소', isOnline: false },
        { id: 8, name: '윤태호', avatarText: '윤태', isOnline: true },
        { id: 9, name: '강미래', avatarText: '강미', isOnline: false },
        { id: 10, name: '송준호', avatarText: '송준', isOnline: true },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [showAddFriendModal, setShowAddFriendModal] = useState(false);
    const [newFriendName, setNewFriendName] = useState('');

    // 검색 필터링된 친구 목록
    const filteredFriends = friends.filter(friend =>
        friend.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 친구 추가 함수
    const addFriend = () => {
        if (newFriendName.trim()) {
            const newFriend: Friend = {
                id: friends.length + 1,
                name: newFriendName.trim(),
                avatarText: newFriendName.trim().substring(0, 2),
                isOnline: Math.random() > 0.5, // 랜덤으로 온라인 상태 설정
            };
            setFriends([...friends, newFriend]);
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
                    onPress: () => {
                        setFriends(friends.filter(friend => friend.id !== friendId));
                    }
                }
            ]
        );
    };

    // 친구와 채팅 시작
    const startChat = (friend: Friend) => {
        Alert.alert('채팅 시작', `${friend.name}님과 채팅을 시작합니다.`);
        // 실제로는 채팅 화면으로 이동
        // router.push(`/chat/${friend.id}`);
    };

    // 개별 친구 아이템 렌더링
    const renderFriendItem = (friend: Friend) => (
        <TouchableOpacity 
            key={friend.id} 
            style={styles.friendItem}
            onLongPress={() => removeFriend(friend.id)}
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
                <ScrollView style={styles.friendsList} showsVerticalScrollIndicator={true}>
                    {filteredFriends.length > 0 ? (
                        filteredFriends.map(renderFriendItem)
                    ) : (
                        <View style={styles.emptyState}>
                            <Ionicons name="people-outline" size={48} color="#ccc" />
                            <Text style={styles.emptyStateText}>
                                {searchQuery ? '검색 결과가 없습니다' : '친구가 없습니다'}
                            </Text>
                        </View>
                    )}
                </ScrollView>
            </View>

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
