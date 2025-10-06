import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import styles from '../src/style/RandomVideoRoomStyles';

// 프로필 데이터 타입 정의
interface ProfileData {
    id: number;
    title: string;
    score: number;
    icon: string;
}

const RandomVideoRoomScreen = () => {
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [isHeartLiked, setIsHeartLiked] = useState(false);
    const [isFriendAdded, setIsFriendAdded] = useState(false);

    // 상대방 프로필 데이터
    const partnerProfile: ProfileData = {
        id: 1,
        title: '상대방',
        score: Math.floor(Math.random() * 10000) + 1000,
        icon: 'person'
    };

    const handleEndCall = () => {
        router.push('/random-video-end');
    };

    const toggleCamera = () => {
        setIsCameraOn(prev => !prev);
    };

    const toggleMicrophone = () => {
        setIsMicrophoneOn(prev => !prev);
    };

    const handleProfileClick = () => {
        setShowProfileModal(true);
        setIsHeartLiked(false);
        setIsFriendAdded(false);
    };

    const handleReport = () => {
        // 신고 기능 구현
        console.log('신고하기');
    };

    return (
        <View style={styles.container}>
            {/* 상대방 비디오 영역 */}
            <View style={styles.mainVideoContainer}>
                <View style={styles.partnerVideo}>
                    <View style={styles.partnerAvatar}>
                        <Ionicons name="person" size={80} color="#fff" />
                    </View>
                    <Text style={styles.partnerName}>상대방</Text>
                </View>

                {/* 상대방 프로필 사진 (좌측 상단) */}
                <TouchableOpacity 
                    style={styles.partnerProfileButton}
                    onPress={handleProfileClick}
                >
                    <View style={styles.partnerProfileAvatar}>
                        <Ionicons name="person" size={20} color="#fff" />
                    </View>
                </TouchableOpacity>

                {/* 사주 궁합도 점수 (우측 상단) */}
                <View style={styles.compatibilityCard}>
                    <View style={styles.compatibilityHeader}>
                        <Ionicons name="refresh" size={16} color="#FFD700" />
                        <Text style={styles.compatibilityTitle}>사주 궁합도</Text>
                    </View>
                    <Text style={styles.compatibilityScore}>92점</Text>
                    <View style={styles.compatibilityFooter}>
                        <Text style={styles.compatibilityRating}>매우 좋음</Text>
                        <Ionicons name="star" size={12} color="#FFD700" />
                    </View>
                </View>

                {/* 내 비디오 (우측 하단) */}
                <View style={styles.myVideoContainer}>
                    <View style={styles.myVideo}>
                        <View style={styles.myAvatar}>
                            <Ionicons name="person" size={30} color="#fff" />
                        </View>
                    </View>
                </View>

            </View>

            {/* 프로필 모달 */}
            {showProfileModal && (
                <View style={styles.profileModalOverlay}>
                    <View style={styles.profileModal}>
                        <View style={styles.profileModalHeader}>
                            <Text style={styles.profileModalTitle}>프로필</Text>
                            <TouchableOpacity 
                                onPress={() => setShowProfileModal(false)}
                                style={styles.closeButton}
                            >
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.profileModalContent}>
                            {/* 프로필 아바타 */}
                            <TouchableOpacity 
                                style={styles.profileAvatar}
                                onPress={() => setShowImageModal(true)}
                            >
                                <Ionicons name="person" size={60} color="#fff" />
                            </TouchableOpacity>
                            
                            {/* 사용자 정보 */}
                            <Text style={styles.profileName}>
                                {partnerProfile.title}
                            </Text>
                            <Text style={styles.profileLocation}>서울시 · 24세</Text>
                            
                            {/* 하트 수 */}
                            <View style={styles.profileStats}>
                                <View style={styles.statItem}>
                                    <Ionicons name="heart" size={16} color="#E53935" />
                                    <Text style={styles.statText}>{partnerProfile.score.toLocaleString()}</Text>
                                </View>
                                <View style={styles.statItem}>
                                    <Ionicons name="person" size={16} color="#4CAF50" />
                                    <Text style={styles.statText}>89</Text>
                                </View>
                            </View>
                            
                            {/* 자기소개 */}
                            <View style={styles.aboutSection}>
                                <Text style={styles.sectionTitle}>자기소개</Text>
                                <Text style={styles.aboutText}>
                                    안녕하세요! {partnerProfile.title} 입니다 ✨ 랜덤 영상으로 만나서 정말 기뻐요! 즐거운 대화 나누고 싶습니다.
                                </Text>
                            </View>
                            
                            {/* 사주 키워드 */}
                            <View style={styles.keywordsSection}>
                                <Text style={styles.sectionTitle}>사주 키워드</Text>
                                <View style={styles.keywordsContainer}>
                                    <View style={styles.keywordTag}>
                                        <Text style={styles.keywordText}>사랑</Text>
                                    </View>
                                    <View style={styles.keywordTag}>
                                        <Text style={styles.keywordText}>열정</Text>
                                    </View>
                                    <View style={styles.keywordTag}>
                                        <Text style={styles.keywordText}>기쁨</Text>
                                    </View>
                                </View>
                            </View>
                            
                            {/* 좋아요 및 친구 관련 버튼 */}
                            <View style={styles.actionButtonsContainer}>
                                <TouchableOpacity 
                                    style={styles.heartButton}
                                    onPress={() => setIsHeartLiked(!isHeartLiked)}
                                >
                                    <Ionicons 
                                        name={isHeartLiked ? "heart" : "heart-outline"} 
                                        size={20} 
                                        color={isHeartLiked ? "#E53935" : "#4CAF50"} 
                                    />
                                </TouchableOpacity>
                                
                                {!isFriendAdded ? (
                                    // 친구 추가 버튼
                                    <TouchableOpacity 
                                        style={styles.addFriendButton}
                                        onPress={() => setIsFriendAdded(true)}
                                    >
                                        <Ionicons name="person-add" size={20} color="#4CAF50" />
                                        <Text style={styles.addFriendText}>친구 추가</Text>
                                    </TouchableOpacity>
                                ) : (
                                    // 친구 추가된 상태 - 채팅과 친구 삭제 버튼
                                    <>
                                        <TouchableOpacity style={styles.chatButton}>
                                            <Ionicons name="chatbubble-outline" size={20} color="#4CAF50" />
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            style={styles.removeFriendButton}
                                            onPress={() => setIsFriendAdded(false)}
                                        >
                                            <Ionicons name="person-remove" size={20} color="#E53935" />
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                        </View>
                    </View>
                </View>
            )}

            {/* 하단 컨트롤 바 */}
            <View style={styles.controlsBar}>
                {/* 마이크 버튼 */}
                <TouchableOpacity 
                    style={[styles.controlButton, !isMicrophoneOn && styles.controlButtonOff]}
                    onPress={toggleMicrophone}
                >
                    <Ionicons 
                        name={isMicrophoneOn ? "mic" : "mic-off"} 
                        size={24} 
                        color={isMicrophoneOn ? "#4CAF50" : "#999"} 
                    />
                </TouchableOpacity>

                {/* 카메라 버튼 */}
                <TouchableOpacity 
                    style={[styles.controlButton, !isCameraOn && styles.controlButtonOff]}
                    onPress={toggleCamera}
                >
                    <Ionicons 
                        name={isCameraOn ? "videocam" : "videocam-off"} 
                        size={24} 
                        color={isCameraOn ? "#4CAF50" : "#999"} 
                    />
                </TouchableOpacity>

                {/* 나가기 버튼 */}
                <TouchableOpacity 
                    style={styles.endCallButton}
                    onPress={handleEndCall}
                >
                    <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>

                {/* 신고 버튼 */}
                <TouchableOpacity 
                    style={styles.reportButton}
                    onPress={handleReport}
                >
                    <Ionicons name="flag" size={24} color="#FF9800" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RandomVideoRoomScreen;
