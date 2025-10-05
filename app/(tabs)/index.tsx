import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
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
        <View key={item.id} style={styles.rankingCard}>
            <Text style={styles.rankingNumber}>{index + 1}</Text>
            {/* 현재는 사용자 아이콘으로 통일했습니다. */}
            <Ionicons name={item.icon as any} size={36} color="#4CAF50" /> 
            <Text style={styles.rankingTitle} numberOfLines={1}>{item.title}</Text>
            <View style={styles.heartScore}>
                <AntDesign name="heart" size={12} color="#E53935" />
                <Text style={styles.scoreText}>{item.score.toLocaleString()}</Text>
            </View>
        </View>
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
                <TouchableOpacity style={styles.navButton}>
                    <Ionicons name="videocam-outline" size={30} color="#999" />
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
        </View>
    );
};

export default HomeScreen;