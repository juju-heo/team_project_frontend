import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, Image, Modal, Alert } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import styles from '../src/style/ChatRoomStyles';
import ImageModal from '../components/ImageModal';

// 채팅 메시지 인터페이스
interface Message {
    id: number;
    text: string;
    time: string;
    isMine: boolean;
    image?: string; // 이미지 URI (선택적)
}

export default function ChatRoomScreen() {
    // URL 파라미터에서 사용자 정보 가져오기
    const params = useLocalSearchParams();
    const chatId = params.chatId ? Number(params.chatId) : null;
    const userName = params.name as string || '사용자';
    const userAvatar = params.avatar as string || '사용자';
    const isRandom = params.isRandom === 'true'; // 랜덤 채팅인지 확인
    
    // 사주 궁합도 점수 (랜덤 생성)
    const [compatibilityScore] = useState(Math.floor(Math.random() * 21) + 80); // 80~100점
    
    // 채팅방에 들어왔을 때 읽음 처리
    useEffect(() => {
        if (chatId !== null && typeof window !== 'undefined') {
            // localStorage에서 기존 읽은 채팅방 목록 가져오기
            const stored = localStorage.getItem('readChats');
            const readChats: number[] = stored ? JSON.parse(stored) : [];
            
            // 현재 채팅방이 목록에 없으면 추가
            if (!readChats.includes(chatId)) {
                readChats.push(chatId);
                localStorage.setItem('readChats', JSON.stringify(readChats));
            }
        }
    }, [chatId]);
    
    // 메시지 입력 상태
    const [messageText, setMessageText] = useState('');
    
    // 사진 선택 모달 상태
    const [showImageModal, setShowImageModal] = useState(false);
    
    // 프로필 모달 상태
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [isHeartLiked, setIsHeartLiked] = useState(false);
    const [isFriendAdded, setIsFriendAdded] = useState(true); // 채팅방에서는 이미 친구이므로 true
    const [showImageExpandModal, setShowImageExpandModal] = useState(false);
    
    // 대화주제 추천 모달 상태
    const [showTopicModal, setShowTopicModal] = useState(false);
    
    // 나가기 확인 모달 상태
    const [showExitConfirmModal, setShowExitConfirmModal] = useState(false);
    
    // 대화주제 데이터
    const conversationTopics = [
        "오늘 날씨가 정말 좋네요! 어떤 계획이 있으신가요?",
        "요즘 즐겨보는 드라마나 영화가 있나요?",
        "좋아하는 음식이나 맛집이 있다면 추천해주세요!",
        "주말에는 보통 어떻게 보내시나요?",
        "여행 가고 싶은 곳이 있다면 어디인가요?",
        "취미나 관심사가 있으시다면 무엇인가요?",
        "좋아하는 음악 장르나 아티스트가 있나요?",
        "운동이나 스포츠를 즐기시나요?",
        "책을 읽는 것을 좋아하시나요?",
        "요리나 베이킹에 관심이 있으신가요?"
    ];
    
    // 대화주제 선택 함수
    const selectTopic = (topic: string) => {
        const newMessage: Message = {
            id: messages.length + 1,
            text: topic,
            time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
            isMine: true
        };
        
        setMessages([...messages, newMessage]);
        setShowTopicModal(false);
    };

    // 나가기 확인 모달 핸들러들
    const handleExitChat = () => {
        if (isRandom) {
            setShowExitConfirmModal(true);
        } else {
            router.back();
        }
    };

    const confirmExit = () => {
        setShowExitConfirmModal(false);
        router.push('/(tabs)');
    };

    const cancelExit = () => {
        setShowExitConfirmModal(false);
    };
    
    // 채팅 메시지 목록 - 랜덤 채팅이면 빈 배열, 아니면 더미 데이터
    const [messages, setMessages] = useState<Message[]>(
        isRandom ? [] : [
            {
                id: 1,
                text: '안녕하세요~ 반가워요!',
                time: '오후 2:30',
                isMine: false
            },
            {
                id: 2,
                text: '안녕하세요! 저도 반가워요 😊',
                time: '오후 2:31',
                isMine: true
            },
            {
                id: 3,
                text: '오늘 날씨가 참 좋네요',
                time: '오후 2:32',
                isMine: false
            },
            {
                id: 4,
                text: '네 정말 그러네요!',
                time: '오후 2:33',
                isMine: true
            },
            {
                id: 5,
                text: '혹시 운동 좋아하세요?',
                time: '오후 3:12',
                isMine: false
            },
            {
                id: 6,
                text: '저도 운동 좋아해요! 같이 할래요?',
                time: '오후 3:15',
                isMine: false
            }
        ]
    );

    // 메시지 전송 핸들러
    const handleSendMessage = () => {
        if (messageText.trim() === '') return;
        
        const newMessage: Message = {
            id: messages.length + 1,
            text: messageText,
            time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
            isMine: true
        };
        
        setMessages([...messages, newMessage]);
        setMessageText('');
    };
    
    // 궁합도 등급 계산
    const getCompatibilityRating = (score: number) => {
        if (score >= 95) return '최고의 인연';
        if (score >= 90) return '매우 좋음';
        if (score >= 85) return '좋음';
        return '괜찮음';
    };
    
    // 궁합도 설명 생성
    const getCompatibilityDescription = (score: number) => {
        if (score >= 95) return '운명적인 만남입니다! 서로에게 큰 행운을 가져다줄 최고의 궁합이에요. ✨';
        if (score >= 90) return '매우 좋은 궁합이에요! 서로를 잘 이해하고 좋은 관계를 만들어갈 수 있어요. 💫';
        if (score >= 85) return '좋은 인연이에요! 노력한다면 좋은 관계를 만들어갈 수 있어요. 🌟';
        return '나쁘지 않은 궁합이에요. 서로 배려하고 이해한다면 좋은 관계가 될 거예요. ⭐';
    };
    
    // 갤러리에서 사진 선택
    const pickImageFromGallery = async () => {
        try {
            // 권한 요청
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            
            if (permissionResult.granted === false) {
                Alert.alert('권한 필요', '갤러리 접근 권한이 필요합니다.');
                return;
            }
            
            // 이미지 선택
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });
            
            if (!result.canceled && result.assets[0]) {
                // 선택된 이미지를 메시지로 전송
                const newMessage: Message = {
                    id: messages.length + 1,
                    text: '',
                    time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
                    isMine: true,
                    image: result.assets[0].uri
                };
                
                setMessages([...messages, newMessage]);
                setShowImageModal(false);
            }
        } catch (error) {
            console.error('이미지 선택 오류:', error);
            Alert.alert('오류', '이미지를 선택하는 중 오류가 발생했습니다.');
        }
    };
    
    // 카메라로 사진 촬영
    const takePhotoWithCamera = async () => {
        try {
            // 권한 요청
            const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
            
            if (permissionResult.granted === false) {
                Alert.alert('권한 필요', '카메라 접근 권한이 필요합니다.');
                return;
            }
            
            // 카메라 실행
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });
            
            if (!result.canceled && result.assets[0]) {
                // 촬영한 이미지를 메시지로 전송
                const newMessage: Message = {
                    id: messages.length + 1,
                    text: '',
                    time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
                    isMine: true,
                    image: result.assets[0].uri
                };
                
                setMessages([...messages, newMessage]);
                setShowImageModal(false);
            }
        } catch (error) {
            console.error('카메라 촬영 오류:', error);
            Alert.alert('오류', '사진을 촬영하는 중 오류가 발생했습니다.');
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={0}
        >
            {/* 상단 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={handleExitChat}
                    style={styles.backButton}
                >
                    {isRandom ? (
                        <Ionicons name="close" size={24} color="#E53935" />
                    ) : (
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    )}
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.headerCenter}
                    onPress={() => {
                        setIsHeartLiked(false);
                        setIsFriendAdded(true);
                        setShowProfileModal(true);
                    }}
                >
                    <View style={styles.headerAvatar}>
                        <Text style={styles.headerAvatarText}>{userAvatar}</Text>
                    </View>
                    <Text style={styles.headerTitle}>{userName}</Text>
                </TouchableOpacity>
                
                <View style={styles.headerRight}>
                    {isRandom && (
                        <TouchableOpacity 
                            style={styles.reportButton}
                            onPress={() => router.push('/report')}
                        >
                            <Ionicons name="flag" size={24} color="#FF9800" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* 채팅 메시지 영역 */}
            <ScrollView 
                style={styles.messagesContainer}
                contentContainerStyle={styles.messagesContent}
            >
                {/* 랜덤 채팅일 때만 사주 궁합도 카드 표시 */}
                {isRandom && (
                    <View style={styles.compatibilityCard}>
                        <View style={styles.compatibilityHeader}>
                            <Ionicons name="sparkles" size={20} color="#FFD700" style={styles.compatibilityIcon} />
                            <Text style={styles.compatibilityTitle}>사주 궁합도</Text>
                        </View>
                        
                        <View style={styles.compatibilityScoreContainer}>
                            <Text style={styles.compatibilityScore}>{compatibilityScore}점</Text>
                            <Text style={styles.compatibilityScoreLabel}>100점 만점</Text>
                        </View>
                        
                        <View style={styles.compatibilityRating}>
                            <Text style={styles.compatibilityRatingText}>{getCompatibilityRating(compatibilityScore)}</Text>
                            <Ionicons name="star" size={16} color="#4CAF50" />
                        </View>
                        
                        <View style={styles.compatibilityDescription}>
                            <Text style={styles.compatibilityDescriptionText}>
                                {getCompatibilityDescription(compatibilityScore)}
                            </Text>
                        </View>
                    </View>
                )}
                
                {messages.map((message) => (
                    <View 
                        key={message.id} 
                        style={[
                            styles.messageWrapper,
                            message.isMine ? styles.myMessageWrapper : styles.otherMessageWrapper
                        ]}
                    >
                        {!message.isMine && (
                            <TouchableOpacity 
                                style={styles.messageAvatar}
                                onPress={() => {
                                    setIsHeartLiked(false);
                                    setIsFriendAdded(true);
                                    setShowProfileModal(true);
                                }}
                            >
                                <Text style={styles.messageAvatarText}>{userAvatar}</Text>
                            </TouchableOpacity>
                        )}
                        
                        <View style={styles.messageContent}>
                            {/* 이미지가 있는 경우 */}
                            {message.image ? (
                                <View>
                                    <Image 
                                        source={{ uri: message.image }}
                                        style={styles.messageImage}
                                        resizeMode="cover"
                                    />
                                    {message.text && (
                                        <View 
                                            style={[
                                                styles.messageBubble,
                                                message.isMine ? styles.myMessageBubble : styles.otherMessageBubble,
                                                styles.messageBubbleWithImage
                                            ]}
                                        >
                                            <Text 
                                                style={[
                                                    styles.messageText,
                                                    message.isMine ? styles.myMessageText : styles.otherMessageText
                                                ]}
                                            >
                                                {message.text}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            ) : (
                                <View 
                                    style={[
                                        styles.messageBubble,
                                        message.isMine ? styles.myMessageBubble : styles.otherMessageBubble
                                    ]}
                                >
                                    <Text 
                                        style={[
                                            styles.messageText,
                                            message.isMine ? styles.myMessageText : styles.otherMessageText
                                        ]}
                                    >
                                        {message.text}
                                    </Text>
                                </View>
                            )}
                            <Text 
                                style={[
                                    styles.messageTime,
                                    message.isMine ? styles.myMessageTime : styles.otherMessageTime
                                ]}
                            >
                                {message.time}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* 하단 입력 영역 */}
            <View style={styles.inputContainer}>
                <TouchableOpacity 
                    style={styles.topicButton}
                    onPress={() => setShowTopicModal(true)}
                >
                    <Text style={{ fontSize: 20 }}>💡</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => setShowImageModal(true)}
                >
                    <Ionicons name="add-circle-outline" size={28} color="#4CAF50" />
                </TouchableOpacity>
                
                <View style={styles.textInputWrapper}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="메시지를 입력하세요..."
                        placeholderTextColor="#999"
                        value={messageText}
                        onChangeText={setMessageText}
                        multiline
                    />
                </View>
                
                <TouchableOpacity 
                    style={styles.sendButton}
                    onPress={handleSendMessage}
                >
                    <Ionicons name="send" size={24} color="#4CAF50" />
                </TouchableOpacity>
            </View>
            
            {/* 사진 선택 모달 */}
            <Modal
                visible={showImageModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowImageModal(false)}
            >
                <TouchableOpacity 
                    style={styles.imageModalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowImageModal(false)}
                >
                    <View style={styles.imageOptionsContainer}>
                        <Text style={styles.imageOptionsTitle}>사진 선택</Text>
                        
                        <TouchableOpacity 
                            style={styles.imageOption}
                            onPress={pickImageFromGallery}
                        >
                            <Ionicons name="images-outline" size={24} color="#4CAF50" />
                            <Text style={styles.imageOptionText}>갤러리에서 선택</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.imageOption}
                            onPress={takePhotoWithCamera}
                        >
                            <Ionicons name="camera-outline" size={24} color="#4CAF50" />
                            <Text style={styles.imageOptionText}>카메라로 촬영</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={[styles.imageOption, styles.cancelOption]}
                            onPress={() => setShowImageModal(false)}
                        >
                            <Ionicons name="close-circle-outline" size={24} color="#E53935" />
                            <Text style={[styles.imageOptionText, styles.cancelOptionText]}>취소</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* 친구 프로필 모달 */}
            {showProfileModal && (
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
                                onPress={() => setShowImageExpandModal(true)}
                            >
                                <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>
                                    {userAvatar}
                                </Text>
                            </TouchableOpacity>
                            
                            {/* 사용자 정보 */}
                            <Text style={{
                                fontSize: 24,
                                fontWeight: 'bold',
                                color: '#333',
                                marginBottom: 5,
                            }}>
                                {userName}
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
                                    안녕하세요! {userName}입니다 ✨ 좋은 사람들과 함께 즐거운 대화 나누고 싶습니다. 많이 친해져요!
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
                                        onPress={() => setShowProfileModal(false)}
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
                                                `${userName}님을 친구 목록에서 삭제하시겠습니까?`,
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
                visible={showImageExpandModal}
                onClose={() => setShowImageExpandModal(false)}
                imageUri={null}
                userName={userName}
            />

            {/* 대화주제 추천 말풍선 */}
            {showTopicModal && (
                <TouchableOpacity 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'transparent',
                        zIndex: 999,
                    }}
                    activeOpacity={1}
                    onPress={() => setShowTopicModal(false)}
                >
                    <View style={{
                        position: 'absolute',
                        bottom: 80, // 입력 영역 위에 위치
                        left: 20,
                        backgroundColor: '#fff',
                        borderRadius: 12,
                        padding: 12,
                        maxWidth: 280,
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                        zIndex: 1000,
                    }}>
                        {/* 말풍선 꼬리 */}
                        <View style={{
                            position: 'absolute',
                            bottom: -8,
                            left: 20,
                            width: 0,
                            height: 0,
                            borderLeftWidth: 8,
                            borderRightWidth: 8,
                            borderTopWidth: 8,
                            borderLeftColor: 'transparent',
                            borderRightColor: 'transparent',
                            borderTopColor: '#fff',
                        }} />
                        
                        <ScrollView style={{ maxHeight: 200 }}>
                            {conversationTopics.map((topic, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={{
                                        paddingVertical: 8,
                                        paddingHorizontal: 4,
                                        borderBottomWidth: index < conversationTopics.length - 1 ? 1 : 0,
                                        borderBottomColor: '#f0f0f0',
                                    }}
                                    onPress={() => selectTopic(topic)}
                                >
                                    <Text style={{
                                        fontSize: 13,
                                        color: '#333',
                                        lineHeight: 18
                                    }}>
                                        {topic}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            )}

            {/* 나가기 확인 모달 */}
            {showExitConfirmModal && (
                <Modal
                    visible={showExitConfirmModal}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={cancelExit}
                >
                    <View style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 20
                    }}>
                        <View style={{
                            backgroundColor: '#fff',
                            borderRadius: 16,
                            padding: 20,
                            width: '100%',
                            maxWidth: 300
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: '#333',
                                textAlign: 'center',
                                marginBottom: 20
                            }}>
                                채팅방 나가기
                            </Text>
                            
                            <Text style={{
                                fontSize: 14,
                                color: '#666',
                                textAlign: 'center',
                                marginBottom: 20,
                                lineHeight: 20
                            }}>
                                정말로 채팅방을 나가시겠습니까?
                            </Text>
                            
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                gap: 10
                            }}>
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        backgroundColor: '#f5f5f5',
                                        paddingVertical: 12,
                                        borderRadius: 8,
                                        alignItems: 'center'
                                    }}
                                    onPress={cancelExit}
                                >
                                    <Text style={{
                                        color: '#666',
                                        fontWeight: '600'
                                    }}>
                                        아니오
                                    </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        backgroundColor: '#E53935',
                                        paddingVertical: 12,
                                        borderRadius: 8,
                                        alignItems: 'center'
                                    }}
                                    onPress={confirmExit}
                                >
                                    <Text style={{
                                        color: '#fff',
                                        fontWeight: '600'
                                    }}>
                                        예
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </KeyboardAvoidingView>
    );
}

