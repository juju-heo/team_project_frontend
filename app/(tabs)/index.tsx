import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Modal } from 'react-native';
// 아이콘 사용을 위한 임포트 (expo-vector-icons)
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
// 스타일 임포트
import styles from './HomeStyles';
// 네비게이션 임포트
import { router } from 'expo-router';

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

    // 개별 랭킹 카드를 렌더링하는 컴포넌트 함수
    const renderRankingCard = (item: RankingItem, index: number) => (
        <TouchableOpacity 
            key={item.id} 
            style={styles.rankingCard}
            onPress={() => {
                setSelectedProfile(item);
                setShowProfileModal(true);
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
                        onPress={() => router.push('/notifications')}
                    >
                        <Ionicons name="notifications-outline" size={24} color="#333" />
                        <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
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
                        {rankingData.map((item, index) => renderRankingCard(item, index))}
                    </ScrollView>
                </View>

                {/* 3. 이달의 랭킹 섹션 */}
                <View style={styles.rankingSection}>
                    <View style={styles.rankingHeader}>
                        <Feather name="calendar" size={20} color="#333" />
                        <Text style={styles.rankingHeaderText}>이달의 랭킹</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.rankingScroll}>
                        {monthlyRankingData.map((item, index) => renderRankingCard(item, index))}
                    </ScrollView>
                </View>

                {/* 4. 우리 지역 랭킹 섹션 */}
                <View style={[styles.rankingSection, { marginBottom: 30 }]}> 
                    <View style={styles.rankingHeader}>
                        <Ionicons name="location-outline" size={20} color="#333" />
                        <Text style={styles.rankingHeaderText}>우리 지역 랭킹</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.rankingScroll}>
                        {localRankingData.map((item, index) => renderRankingCard(item, index))}
                    </ScrollView>
                </View>
                
            </ScrollView>

            {/* 하단 내비게이션 바 */}
            <View style={styles.bottomNav}>
                <TouchableOpacity 
                    style={styles.navButton}
                    onPress={() => setShowProfileModal(true)}
                >
                    <View style={styles.videoChatIcon}>
                        <Ionicons name="videocam" size={24} color="#4CAF50" />
                        <Ionicons name="chatbubble" size={16} color="#4CAF50" style={styles.chatOverlay} />
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

            {/* 프로필 모달 */}
            <Modal
                visible={showProfileModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowProfileModal(false)}
            >
                <View style={styles.modalOverlay}>
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
                            <View style={styles.profileAvatar}>
                                <Ionicons name="person" size={60} color="#fff" />
                            </View>
                            
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
                            
                            {/* 친구 추가 버튼 */}
                            <TouchableOpacity style={styles.addFriendButton}>
                                <Ionicons name="person-add" size={20} color="#4CAF50" />
                                <Text style={styles.addFriendText}>친구 추가</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default HomeScreen;