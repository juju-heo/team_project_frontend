import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../src/style/ChatStyles';
import ImageModal from '../components/ImageModal';

export default function ChatScreen() {
    // 읽은 채팅방 ID 목록 상태
    const [readChats, setReadChats] = useState<number[]>([]);
    
    // 프로필 모달 상태
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [selectedChat, setSelectedChat] = useState<any>(null);
    const [isHeartLiked, setIsHeartLiked] = useState(false);
    const [isFriendAdded, setIsFriendAdded] = useState(true); // 채팅 목록에서는 이미 친구이므로 true
    const [showImageModal, setShowImageModal] = useState(false);
    
    // 컴포넌트가 마운트될 때 읽은 채팅방 목록 불러오기
    useEffect(() => {
        loadReadChats();
    }, []);
    
    // 화면이 포커스될 때마다 읽은 채팅방 목록 업데이트
    useFocusEffect(
        React.useCallback(() => {
            loadReadChats();
        }, [])
    );
    
    // 읽은 채팅방 목록 불러오기 함수
    const loadReadChats = async () => {
        try {
            const stored = await AsyncStorage.getItem('readChats');
            if (stored) {
                setReadChats(JSON.parse(stored));
            }
        } catch (error) {
            console.error('채팅 목록 로드 실패:', error);
        }
    };
    
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
                                <TouchableOpacity 
                                    style={styles.avatarContainer}
                                    onPress={() => {
                                        setSelectedChat(chat);
                                        setIsHeartLiked(false);
                                        setIsFriendAdded(true);
                                        setShowProfileModal(true);
                                    }}
                                >
                                    <Text style={styles.avatarText}>{chat.avatar}</Text>
                                    <View style={styles.onlineIndicator} />
                                </TouchableOpacity>
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

            {/* 친구 프로필 모달 */}
            {showProfileModal && selectedChat && (
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                }}>
                    <View style={{
                        backgroundColor: '#fff',
                        borderRadius: 20,
                        maxHeight: '80%',
                        width: '90%',
                        maxWidth: 400,
                        paddingTop: 20,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: 20,
                            paddingBottom: 20,
                            borderBottomWidth: 1,
                            borderBottomColor: '#eee',
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: '#333',
                            }}>프로필</Text>
                            <TouchableOpacity 
                                onPress={() => setShowProfileModal(false)}
                                style={{ padding: 5 }}
                            >
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{ padding: 20, alignItems: 'center' }}>
                            {/* 프로필 아바타 */}
                            <TouchableOpacity 
                                style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 50,
                                    backgroundColor: '#4CAF50',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: 15,
                                }}
                                onPress={() => setShowImageModal(true)}
                            >
                                <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>
                                    {selectedChat.avatar}
                                </Text>
                            </TouchableOpacity>
                            
                            {/* 사용자 정보 */}
                            <Text style={{
                                fontSize: 24,
                                fontWeight: 'bold',
                                color: '#333',
                                marginBottom: 5,
                            }}>
                                {selectedChat.name}
                            </Text>
                            <Text style={{
                                fontSize: 16,
                                color: '#666',
                                marginBottom: 15,
                            }}>서울시 · 24세</Text>
                            
                            {/* 하트 수 */}
                            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15 }}>
                                    <AntDesign name="heart" size={16} color="#E53935" />
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        color: '#333',
                                        marginLeft: 5,
                                    }}>1,245</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15 }}>
                                    <Ionicons name="person" size={16} color="#4CAF50" />
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        color: '#333',
                                        marginLeft: 5,
                                    }}>89</Text>
                                </View>
                            </View>
                            
                            {/* 자기소개 */}
                            <View style={{ width: '100%', marginBottom: 20 }}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: '#333',
                                    marginBottom: 10,
                                }}>자기소개</Text>
                                <Text style={{
                                    fontSize: 14,
                                    color: '#666',
                                    lineHeight: 20,
                                }}>
                                    안녕하세요! {selectedChat.name}입니다 ✨ 좋은 사람들과 함께 즐거운 대화 나누고 싶습니다. 많이 친해져요!
                                </Text>
                            </View>
                            
                            {/* 사주 키워드 */}
                            <View style={{ width: '100%', marginBottom: 20 }}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: '#333',
                                    marginBottom: 10,
                                }}>사주 키워드</Text>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    <View style={{
                                        backgroundColor: '#fff',
                                        borderWidth: 1,
                                        borderColor: '#4CAF50',
                                        borderRadius: 15,
                                        paddingHorizontal: 12,
                                        paddingVertical: 6,
                                        marginRight: 8,
                                        marginBottom: 8,
                                    }}>
                                        <Text style={{
                                            fontSize: 14,
                                            color: '#4CAF50',
                                            fontWeight: '500',
                                        }}>친근함</Text>
                                    </View>
                                    <View style={{
                                        backgroundColor: '#fff',
                                        borderWidth: 1,
                                        borderColor: '#4CAF50',
                                        borderRadius: 15,
                                        paddingHorizontal: 12,
                                        paddingVertical: 6,
                                        marginRight: 8,
                                        marginBottom: 8,
                                    }}>
                                        <Text style={{
                                            fontSize: 14,
                                            color: '#4CAF50',
                                            fontWeight: '500',
                                        }}>신뢰</Text>
                                    </View>
                                    <View style={{
                                        backgroundColor: '#fff',
                                        borderWidth: 1,
                                        borderColor: '#4CAF50',
                                        borderRadius: 15,
                                        paddingHorizontal: 12,
                                        paddingVertical: 6,
                                        marginRight: 8,
                                        marginBottom: 8,
                                    }}>
                                        <Text style={{
                                            fontSize: 14,
                                            color: '#4CAF50',
                                            fontWeight: '500',
                                        }}>유머</Text>
                                    </View>
                                </View>
                            </View>
                            
                            {/* 좋아요 및 친구 관련 버튼 */}
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '100%',
                                justifyContent: 'space-between',
                            }}>
                                <TouchableOpacity 
                                    style={{
                                        backgroundColor: '#f8f9fa',
                                        borderRadius: 25,
                                        paddingHorizontal: 20,
                                        paddingVertical: 12,
                                        flex: 1,
                                        marginRight: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    onPress={() => setIsHeartLiked(!isHeartLiked)}
                                >
                                    <Ionicons 
                                        name={isHeartLiked ? "heart" : "heart-outline"} 
                                        size={20} 
                                        color={isHeartLiked ? "#E53935" : "#4CAF50"} 
                                    />
                                </TouchableOpacity>
                                
                                {/* 친구 추가된 상태 - 채팅과 친구 삭제 버튼 */}
                                <>
                                    <TouchableOpacity 
                                        style={{
                                            backgroundColor: '#f8f9fa',
                                            borderRadius: 25,
                                            paddingHorizontal: 20,
                                            paddingVertical: 12,
                                            flex: 1,
                                            marginRight: 10,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        onPress={() => {
                                            setShowProfileModal(false);
                                            router.push({
                                                pathname: '/chat-room',
                                                params: {
                                                    chatId: selectedChat.id,
                                                    name: selectedChat.name,
                                                    avatar: selectedChat.avatar
                                                }
                                            });
                                        }}
                                    >
                                        <Ionicons name="chatbubble-outline" size={20} color="#4CAF50" />
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={{
                                            backgroundColor: '#f8f9fa',
                                            borderRadius: 25,
                                            paddingHorizontal: 20,
                                            paddingVertical: 12,
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        onPress={() => {
                                            setShowProfileModal(false);
                                            // 친구 삭제 기능 (실제 구현 시 AsyncStorage에서 제거)
                                            Alert.alert(
                                                '친구 삭제',
                                                `${selectedChat.name}님을 친구 목록에서 삭제하시겠습니까?`,
                                                [
                                                    { text: '취소', style: 'cancel' },
                                                    { 
                                                        text: '삭제', 
                                                        style: 'destructive',
                                                        onPress: () => {
                                                            // 실제 친구 삭제 로직 구현 필요
                                                            Alert.alert('삭제됨', '친구가 삭제되었습니다.');
                                                        }
                                                    }
                                                ]
                                            );
                                        }}
                                    >
                                        <Ionicons name="person-remove" size={20} color="#E53935" />
                                    </TouchableOpacity>
                                </>
                            </View>
                        </View>
                    </View>
                </View>
            )}

            {/* 이미지 확대 모달 */}
            <ImageModal
                visible={showImageModal}
                onClose={() => setShowImageModal(false)}
                imageUri={null}
                userName={selectedChat?.name || '친구'}
            />
        </View>
    );
}
