import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Modal, Alert } from 'react-native';
// 아이콘 사용을 위한 임포트 (expo-vector-icons)
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
// 스타일 임포트
import styles from './HomeStyles';
// 네비게이션 임포트
import { router, useFocusEffect } from 'expo-router';
// AsyncStorage 임포트
import AsyncStorage from '@react-native-async-storage/async-storage';
// 이미지 모달 컴포넌트
import ImageModal from '../../components/ImageModal';

// 랭킹 데이터 타입 정의
interface RankingItem {
    id: number;
    title: string;
    score: number;
    icon: string;
}

const HomeScreen = () => {
    // 사주 정보 펼침 상태
    const [isSajuExpanded, setIsSajuExpanded] = useState(false);
    // 프로필 모달 상태
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState<RankingItem | null>(null);
    const [isHeartLiked, setIsHeartLiked] = useState(false);
    const [isFriendAdded, setIsFriendAdded] = useState(false);
    const [isFriendRequestSent, setIsFriendRequestSent] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    // 사주 키워드 펼침 상태
    const [keywordsExpanded, setKeywordsExpanded] = useState(false);
    // 랜덤 채팅/영상 선택 모달 상태
    const [showRandomModal, setShowRandomModal] = useState(false);
    // 알림 갯수 상태
    const [notificationCount, setNotificationCount] = useState(4); // 안읽은 알림 개수
    
    // 안읽은 알림 개수 계산 함수
    const getUnreadNotificationCount = () => {
        // 실제로는 서버에서 받아와야 하지만, 여기서는 더미 데이터로 계산
        const friendRequests = 2; // 안읽은 친구 요청 (햇살왕자, 별빛나래)
        const otherNotifications = 2; // 안읽은 기타 알림 (달빛소녀, 바람처럼)
        return friendRequests + otherNotifications;
    };

    // 컴포넌트 마운트 시 알림 개수 로드
    useEffect(() => {
        loadNotificationCount();
    }, []);

    // 화면 포커스 시 알림 개수 다시 로드
    useFocusEffect(
        React.useCallback(() => {
            loadNotificationCount();
        }, [])
    );

    // AsyncStorage에서 알림 개수 로드
    const loadNotificationCount = async () => {
        try {
            const count = await AsyncStorage.getItem('notificationCount');
            if (count !== null) {
                setNotificationCount(parseInt(count));
            } else {
                // 처음 실행 시 기본값 설정
                setNotificationCount(4);
                await AsyncStorage.setItem('notificationCount', '4');
            }
        } catch (error) {
            console.error('알림 개수 로드 실패:', error);
            setNotificationCount(4);
        }
    };

    // 알림 개수를 0으로 리셋하는 함수
    const resetNotificationCount = async () => {
        setNotificationCount(0);
        try {
            await AsyncStorage.setItem('notificationCount', '0');
        } catch (error) {
            console.error('알림 개수 저장 실패:', error);
        }
    };

    // 알림 화면으로 이동하는 함수
    const goToNotifications = () => {
        router.push('/notifications');
    };
    
    // 랭킹 데이터를 위한 더미 배열 (실제 데이터는 서버에서 받아와야 합니다)
    const rankingData = [
        { id: 1, title: '스타✨', score: 15420, icon: 'person' },
        { id: 2, title: '달빛소녀', score: 12890, icon: 'person' },
        { id: 3, title: '햇살왕자', score: 11250, icon: 'person' },
        { id: 4, title: '바람처럼', score: 9870, icon: 'person' },
        // 데이터가 더 많다면 이 배열에 계속 추가됩니다.
    ];

    const monthlyRankingData = [
        { id: 1, title: '12월의 별', score: 8650, icon: 'person' },
        { id: 2, title: '크리스마스', score: 7980, icon: 'person' },
        { id: 3, title: '연말대박', score: 7320, icon: 'person' },
        { id: 4, title: '겨울왕자', score: 6850, icon: 'person' },
    ];
    
    const localRankingData = [
        { id: 1, title: '서울킹👑', score: 3420, icon: 'person' },
        { id: 2, title: '한강뷰', score: 2890, icon: 'person' },
        { id: 3, title: '홍대오빠', score: 2650, icon: 'person' },
        { id: 4, title: '이태원girl', score: 2420, icon: 'person' },
    ];

    // 사주 키워드 데이터 (프로필별로 고정)
    const getProfileKeywords = (profileTitle: string) => {
        // 이달의 랭킹에 있는 사람들은 12-16개의 키워드
        const isMonthlyRanking = monthlyRankingData.some(person => person.title === profileTitle);
        
        const allKeywords = [
            '사랑', '열정', '기쁨', '행복', '희망', '꿈', '자유', '평화',
            '건강', '부귀', '명예', '성공', '운세', '복', '영광', '축복'
        ];
        
        // 프로필 이름을 해시해서 고정된 키워드 가져오기
        let hash = 0;
        for (let i = 0; i < profileTitle.length; i++) {
            hash = ((hash << 5) - hash) + profileTitle.charCodeAt(i);
            hash = hash & hash;
        }
        
        if (isMonthlyRanking) {
            // 이달의 랭킹: 16개 키워드
            const count = 16;
            const startIdx = Math.abs(hash) % (allKeywords.length - count + 1);
            return allKeywords.slice(startIdx, startIdx + count);
        } else {
            // 일반 사용자: 8개 키워드
            const count = 8;
            const startIdx = Math.abs(hash) % (allKeywords.length - count + 1);
            return allKeywords.slice(startIdx, startIdx + count);
        }
    };

    // 개별 랭킹 카드를 렌더링하는 컴포넌트 함수
    const renderRankingCard = (item: RankingItem, index: number) => (
        <TouchableOpacity 
            style={styles.rankingCard}
            onPress={async () => {
                console.log('랭킹 카드 클릭:', item.title);
                setSelectedProfile(item);
                setIsHeartLiked(false); // 하트 상태 초기화
                setIsFriendAdded(false); // 친구 상태 초기화
                setKeywordsExpanded(false); // 키워드 펼침 상태 초기화
                
                // 친구 요청 상태 확인
                const pendingRequests = await AsyncStorage.getItem('friend_requests');
                const requests = pendingRequests ? JSON.parse(pendingRequests) : [];
                const hasRequestSent = requests.some((req: any) => req.userName === item.title);
                setIsFriendRequestSent(hasRequestSent);
                
                setShowProfileModal(true);
                console.log('프로필 모달 상태:', showProfileModal);
            }}
        >
            <Text style={styles.rankingNumber}>{index + 1}</Text>
            <View style={styles.rankingAvatar}>
                <Text style={styles.rankingAvatarText}>{item.title.substring(0, 2)}</Text>
            </View>
            <Text style={styles.rankingTitle} numberOfLines={1}>{item.title}</Text>
            <View style={styles.heartScore}>
                <AntDesign name="heart" size={12} color="#E53935" />
                <Text style={styles.scoreText}>{item.score.toLocaleString()}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* 상단 헤더 영역 */}
            <View style={styles.header}>
                <Text style={styles.logoText}>fate:try</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity 
                        onPress={goToNotifications}
                    >
                        <Ionicons name="notifications-outline" size={24} color="#333" />
                        {notificationCount > 0 && (
                            <View style={styles.badge}><Text style={styles.badgeText}>{notificationCount}</Text></View>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => router.push('/chat')}
                        style={{ marginLeft: 15 }}
                    >
                        <Ionicons name="chatbubble-ellipses-outline" size={24} color="#333" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* 메인 스크롤 콘텐츠 영역 */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                {/* 1. 내 사주 정보 섹션 */}
                <TouchableOpacity 
                    style={styles.sajuInfoCard}
                    onPress={() => setIsSajuExpanded(!isSajuExpanded)}
                >
                    <View style={styles.sajuInfoTop}>
                        <AntDesign name="star" size={24} color="#4CAF50" />
                        <View style={styles.sajuTextContainer}>
                            <Text style={styles.sajuInfoTitle}>내 사주 정보</Text>
                            <Text style={styles.sajuInfoDetail}>1995년 3월 15일 • 목요일</Text>
                        </View>
                    </View>
                    <AntDesign 
                        name={isSajuExpanded ? "up" : "down"} 
                        size={20} 
                        color="#999" 
                    />
                </TouchableOpacity>

                {/* 사주 정보 펼침 내용 */}
                {isSajuExpanded && (
                    <View style={styles.sajuExpandedContent}>
                        {/* 사주 팔자 */}
                        <View style={styles.sajuSection}>
                            <Text style={styles.sajuSectionTitle}>사주 팔자</Text>
                            <View style={styles.sajuPillars}>
                                <View style={styles.pillarItem}>
                                    <Text style={styles.pillarLabel}>연주</Text>
                                    <Text style={styles.pillarValue}>올해 (을목 해수)</Text>
                                </View>
                                <View style={styles.pillarItem}>
                                    <Text style={styles.pillarLabel}>월주</Text>
                                    <Text style={styles.pillarValue}>기묘 (기토 묘목)</Text>
                                </View>
                                <View style={styles.pillarItem}>
                                    <Text style={styles.pillarLabel}>일주</Text>
                                    <Text style={styles.pillarValue}>정사 (정화 사화)</Text>
                                </View>
                            </View>
                        </View>

                        {/* 운세 */}
                        <View style={styles.sajuSection}>
                            <Text style={styles.sajuSectionTitle}>운세</Text>
                            <View style={styles.fortuneItems}>
                                <View style={styles.fortuneItem}>
                                    <Text style={styles.fortuneLabel}>연애운</Text>
                                    <Text style={styles.fortuneStars}>★★★★☆</Text>
                                </View>
                                <View style={styles.fortuneItem}>
                                    <Text style={styles.fortuneLabel}>금전운</Text>
                                    <Text style={styles.fortuneStars}>★★★☆☆</Text>
                                </View>
                                <View style={styles.fortuneItem}>
                                    <Text style={styles.fortuneLabel}>건강운</Text>
                                    <Text style={styles.fortuneStars}>★★★★★</Text>
                                </View>
                                <View style={styles.fortuneItem}>
                                    <Text style={styles.fortuneLabel}>직업운</Text>
                                    <Text style={styles.fortuneStars}>★★★☆☆</Text>
                                </View>
                            </View>
                        </View>

                        {/* 오늘의 한마디 */}
                        <View style={styles.todayMessage}>
                            <Text style={styles.todayMessageText}>
                                새로운 인연이 찾아올 수 있는 좋은 날입니다. 적극적인 자세로 사람들과 소통해보세요! ✨
                            </Text>
                        </View>
                    </View>
                )}
                
                {/* 2. 전체 하트 랭킹 섹션 */}
                <View style={styles.rankingSection}>
                    <View style={styles.rankingHeader}>
                        <Ionicons name="trophy-outline" size={20} color="#333" />
                        <Text style={styles.rankingHeaderText}>전체 하트 랭킹</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.rankingScroll}>
                        {rankingData.map((item, index) => (
                            <View key={`ranking-${item.id}`}>
                                {renderRankingCard(item, index)}
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* 3. 이달의 랭킹 섹션 */}
                <View style={styles.rankingSection}>
                    <View style={styles.rankingHeader}>
                        <Feather name="calendar" size={20} color="#333" />
                        <Text style={styles.rankingHeaderText}>이달의 랭킹</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.rankingScroll}>
                        {monthlyRankingData.map((item, index) => (
                            <View key={`monthly-${item.id}`}>
                                {renderRankingCard(item, index)}
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* 4. 우리 지역 랭킹 섹션 */}
                <View style={[styles.rankingSection, { marginBottom: 30 }]}> 
                    <View style={styles.rankingHeader}>
                        <Ionicons name="location-outline" size={20} color="#333" />
                        <Text style={styles.rankingHeaderText}>우리 지역 랭킹</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.rankingScroll}>
                        {localRankingData.map((item, index) => (
                            <View key={`local-${item.id}`}>
                                {renderRankingCard(item, index)}
                            </View>
                        ))}
                    </ScrollView>
                </View>
                
            </ScrollView>

            {/* 하단 내비게이션 바 */}
            <View style={styles.bottomNav}>
                <TouchableOpacity 
                    style={styles.navButton}
                    onPress={() => setShowRandomModal(true)}
                >
                    <View style={styles.videoChatIcon}>
                        <Ionicons name="videocam-outline" size={24} color="#4CAF50" />
                        <Ionicons name="chatbubble-outline" size={16} color="#4CAF50" style={styles.chatOverlay} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.navButton}
                    onPress={() => router.push('/(tabs)')}
                >
                    <Ionicons name="home" size={30} color="#4CAF50" /> 
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.navButton}
                    onPress={() => router.push('/(tabs)/two')}
                >
                    <Ionicons name="person-circle-outline" size={30} color="#999" />
                </TouchableOpacity>
            </View>

            {/* 랜덤 채팅/영상 선택 드롭다운 */}
            {showRandomModal && (
                <TouchableOpacity 
                    style={styles.dropdownOverlay}
                    activeOpacity={1}
                    onPress={() => setShowRandomModal(false)}
                >
                    <TouchableOpacity 
                        style={styles.dropdownMenu}
                        activeOpacity={1}
                        onPress={(e) => e.stopPropagation()}
                    >
                        <TouchableOpacity 
                            style={styles.dropdownOption}
                            onPress={() => {
                                setShowRandomModal(false);
                                // 랜덤 채팅 대기 화면으로 이동
                                router.push('/random-chat-waiting');
                            }}
                        >
                            <Ionicons name="chatbubble-outline" size={20} color="#333" />
                            <Text style={styles.dropdownOptionText}>랜덤 채팅</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.dropdownOption}
                            onPress={() => {
                                setShowRandomModal(false);
                                router.push('/random-video-waiting');
                            }}
                        >
                            <Ionicons name="videocam-outline" size={20} color="#333" />
                            <Text style={styles.dropdownOptionText}>랜덤 영상</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </TouchableOpacity>
            )}

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
                                {selectedProfile?.title || '사용자'}
                            </Text>
                            <Text style={styles.profileLocation}>서울시 · 24세</Text>
                            
                            {/* 하트 수 */}
                            <View style={styles.profileStats}>
                                <View style={styles.statItem}>
                                    <AntDesign name="heart" size={16} color="#E53935" />
                                    <Text style={styles.statText}>{selectedProfile?.score.toLocaleString() || '0'}</Text>
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
                                    안녕하세요! {selectedProfile?.title || '사용자'} 입니다 ✨ 랭킹에 올라서 정말 기뻐요! 여러분과 즐거운 대화 나누고 싶습니다. 많이 친해져요!
                                </Text>
                            </View>
                            
                            {/* 사주 키워드 */}
                            <View style={styles.keywordsSection}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                    <Text style={styles.sectionTitle}>사주 키워드</Text>
                                    {(() => {
                                        const keywords = selectedProfile ? getProfileKeywords(selectedProfile.title) : [];
                                        return keywords.length > 4 ? (
                                            <TouchableOpacity 
                                                onPress={() => setKeywordsExpanded(!keywordsExpanded)}
                                            >
                                                <Ionicons 
                                                    name={keywordsExpanded ? "chevron-up" : "chevron-down"} 
                                                    size={20} 
                                                    color="#4CAF50" 
                                                />
                                            </TouchableOpacity>
                                        ) : null;
                                    })()}
                                </View>
                                <View style={styles.keywordsContainer}>
                                    {(() => {
                                        const keywords = selectedProfile ? getProfileKeywords(selectedProfile.title) : [];
                                        const displayCount = keywordsExpanded ? keywords.length : 4;
                                        const keywordsToShow = keywords.slice(0, displayCount);
                                        
                                        return keywordsToShow.map((keyword, index) => (
                                            <View key={index} style={styles.keywordTag}>
                                                <Text style={styles.keywordText}>{keyword}</Text>
                                            </View>
                                        ));
                                    })()}
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
                                
                                {!isFriendAdded && !isFriendRequestSent ? (
                                    // 친구 추가 버튼
                                    <TouchableOpacity 
                                        style={styles.addFriendButton}
                                        onPress={async () => {
                                            // 친구 요청 저장
                                            const pendingRequests = await AsyncStorage.getItem('friend_requests');
                                            const requests = pendingRequests ? JSON.parse(pendingRequests) : [];
                                            const newRequest = {
                                                userName: selectedProfile?.title,
                                                avatarText: selectedProfile?.title.substring(0, 2) || '',
                                                id: Date.now(),
                                                status: 'pending'
                                            };
                                            requests.push(newRequest);
                                            await AsyncStorage.setItem('friend_requests', JSON.stringify(requests));
                                            setIsFriendRequestSent(true);
                                            Alert.alert('요청 전송', '친구 요청이 전송되었습니다.');
                                        }}
                                    >
                                        <Ionicons name="person-add" size={20} color="#4CAF50" />
                                        <Text style={styles.addFriendText}>친구 추가</Text>
                                    </TouchableOpacity>
                                ) : !isFriendAdded && isFriendRequestSent ? (
                                    // 친구 요청 전송됨 상태
                                    <TouchableOpacity 
                                        style={[styles.addFriendButton, { opacity: 0.6 }]}
                                        disabled={true}
                                    >
                                        <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                                        <Text style={styles.addFriendText}>친구 요청 전송됨</Text>
                                    </TouchableOpacity>
                                ) : (
                                    // 친구 추가된 상태 - 채팅과 친구 삭제 버튼
                                    <>
                                        <TouchableOpacity 
                                            style={styles.chatButton}
                                            onPress={() => {
                                                // 채팅방으로 이동
                                                setShowProfileModal(false);
                                                router.push({
                                                    pathname: '/chat-room',
                                                    params: {
                                                        name: selectedProfile?.title || '사용자',
                                                        avatar: selectedProfile?.title.substring(0, 2) || '사용자'
                                                    }
                                                });
                                            }}
                                        >
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

            {/* 이미지 확대 모달 */}
            <ImageModal
                visible={showImageModal}
                onClose={() => setShowImageModal(false)}
                imageUri={null}
                userName={selectedProfile?.title || '사용자'}
            />

        </View>
    );
};

export default HomeScreen;