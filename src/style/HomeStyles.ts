import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native';

// 화면 폭을 기준으로 랭킹 카드 너비를 설정하기 위해 사용합니다.
const { width } = Dimensions.get('window');

// 상태 표시줄 높이를 안전하게 가져오는 함수
const getStatusBarHeight = () => {
    if (Platform.OS === 'android') {
        return StatusBar.currentHeight || 0;
    }
    return 0;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9', // 전체 배경색
        paddingTop: getStatusBarHeight(), // 상태 표시줄 높이만큼 패딩
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100, // 하단 내비게이션 바를 가리지 않도록 공간 확보
    },
    
    // 헤더 스타일
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    headerIcons: {
        flexDirection: 'row',
    },
    badge: {
        position: 'absolute',
        right: -5,
        top: -5,
        backgroundColor: '#E53935',
        borderRadius: 10,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },

    // 사주 정보 카드 스타일
    sajuInfoCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 15,
        marginVertical: 15,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    sajuInfoTop: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sajuTextContainer: {
        marginLeft: 10,
    },
    sajuInfoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    sajuInfoDetail: {
        fontSize: 14,
        color: '#777',
    },

    // 랭킹 섹션 스타일
    rankingSection: {
        marginVertical: 10, 
        backgroundColor: 'white',
        borderRadius: 12,
        paddingVertical: 15,
        paddingLeft: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    rankingHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 5,
    },
    rankingHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
        color: '#333',
    },
    rankingScroll: {
        // 가로 스크롤 영역
    },
    rankingCard: {
        alignItems: 'center',
        width: width * 0.25, // 약 4개가 한 화면에 보이도록 너비 설정
        marginRight: 15,
        paddingVertical: 5,
    },
    rankingNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 5,
    },
    rankingTitle: {
        fontSize: 13,
        textAlign: 'center',
        marginTop: 5,
        color: '#333',
    },
    heartScore: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 3,
    },
    scoreText: {
        fontSize: 12,
        color: '#E53935',
        marginLeft: 4,
        fontWeight: '500',
    },
    
    // 하단 내비게이션 바 스타일
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    
    // 프로필 모달 스타일
    keywordsSection: {
        width: '100%',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    keywordsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    keywordTag: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#4CAF50',
        borderRadius: 15,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
        marginBottom: 8,
    },
    keywordText: {
        fontSize: 14,
        color: '#4CAF50',
        fontWeight: '500',
    },
});

export default styles;
