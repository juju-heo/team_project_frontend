import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, Image, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import styles from '../src/style/ChatRoomStyles';

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
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                
                <View style={styles.headerCenter}>
                    <View style={styles.headerAvatar}>
                        <Text style={styles.headerAvatarText}>{userAvatar}</Text>
                    </View>
                    <Text style={styles.headerTitle}>{userName}</Text>
                </View>
                
                <TouchableOpacity style={styles.moreButton}>
                    <Ionicons name="ellipsis-vertical" size={24} color="#333" />
                </TouchableOpacity>
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
                            <View style={styles.messageAvatar}>
                                <Text style={styles.messageAvatarText}>{userAvatar}</Text>
                            </View>
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
        </KeyboardAvoidingView>
    );
}

