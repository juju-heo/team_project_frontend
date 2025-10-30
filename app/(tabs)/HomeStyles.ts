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
        paddingTop: 0, // 상단 패딩 제거
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
        paddingTop: getStatusBarHeight() + 5, // 상태 표시줄 바로 아래
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
        marginTop: 10, // 상단 마진 줄임
        marginBottom: 15,
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

    // 사주 정보 펼침 내용 스타일
    sajuExpandedContent: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    sajuSection: {
        marginBottom: 20,
    },
    sajuSectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    sajuPillars: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pillarItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
        marginHorizontal: 2,
    },
    pillarLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    pillarValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        textAlign: 'center',
    },
    fortuneItems: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    fortuneItem: {
        width: '48%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
        marginBottom: 8,
    },
    fortuneLabel: {
        fontSize: 14,
        color: '#333',
    },
    fortuneStars: {
        fontSize: 16,
        color: '#FFD700',
    },
    todayMessage: {
        backgroundColor: '#E8F5E8',
        borderRadius: 8,
        padding: 15,
        marginTop: 10,
    },
    todayMessageText: {
        fontSize: 14,
        color: '#4CAF50',
        lineHeight: 20,
        textAlign: 'center',
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
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#4CAF50',
    },
    rankingNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 5,
    },
    rankingAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        overflow: 'hidden', // 이미지가 원형 밖으로 나가지 않도록
    },
    rankingAvatarImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    rankingAvatarText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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
    navButton: {
        padding: 10,
        borderRadius: 25,
    },
    videoChatIcon: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chatOverlay: {
        position: 'absolute',
        bottom: -2,
        right: -2,
    },

    // 드롭다운 메뉴 스타일
    dropdownOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'transparent',
        zIndex: 1000,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingBottom: 70, // 하단 네비게이션 바로 위
        paddingLeft: 20, // 좌측 하단 아이콘 위치에 맞춤
    },
    dropdownMenu: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        minWidth: 160,
    },
    dropdownOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#f8f9fa',
        marginVertical: 2,
    },
    dropdownOptionText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
        marginLeft: 12,
    },

    // 프로필 모달 스타일
    profileModalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    profileModal: {
        backgroundColor: '#fff',
        borderRadius: 20,
        maxHeight: '80%',
        width: '90%',
        maxWidth: 400,
        paddingTop: 20,
    },
    profileModalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    profileModalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        padding: 5,
    },
    profileModalContent: {
        padding: 20,
        alignItems: 'center',
    },
    profileAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        overflow: 'hidden', // 이미지가 원형 밖으로 나가지 않도록
    },
    profileAvatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    profileLocation: {
        fontSize: 16,
        color: '#666',
        marginBottom: 15,
    },
    profileStats: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
    },
    statText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 5,
    },
    aboutSection: {
        width: '100%',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    aboutText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    keywordsSection: {
        width: '100%',
        marginBottom: 20,
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
    
    // 액션 버튼 컨테이너
    actionButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
    },
    heartButton: {
        backgroundColor: '#f8f9fa',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 12,
        flex: 1,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addFriendButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 12,
        flex: 2,
        justifyContent: 'center',
    },
    addFriendText: {
        fontSize: 16,
        color: '#4CAF50',
        fontWeight: '500',
        marginLeft: 8,
    },
    chatButton: {
        backgroundColor: '#f8f9fa',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 12,
        flex: 1,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    removeFriendButton: {
        backgroundColor: '#f8f9fa',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 12,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // 이미지 확대 모달 스타일
    imageModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageModalCloseArea: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageModalContent: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    imageModalCloseButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 20,
        padding: 10,
    },
    expandedAvatar: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    expandedAvatarText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
});

export default styles;
