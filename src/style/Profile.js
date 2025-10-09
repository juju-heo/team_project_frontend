import { StyleSheet, StatusBar, Platform } from 'react-native';

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
        backgroundColor: '#f9f9f9',
        paddingTop: 0, // 상단 패딩 제거
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100, // 하단 내비게이션 바 공간
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
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },

    // 프로필 카드 스타일
    profileCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginTop: 10, // 상단 마진 줄임
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    profileLeft: {
        flexDirection: 'row',
        flex: 1,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    profileInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    userLocation: {
        fontSize: 14,
        color: '#777',
        marginBottom: 10,
    },
    userStats: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    statText: {
        fontSize: 14,
        color: '#333',
        marginLeft: 5,
        fontWeight: '500',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        backgroundColor: '#E8F5E8',
        borderRadius: 15,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
        marginBottom: 5,
    },
    tagText: {
        fontSize: 12,
        color: '#4CAF50',
        fontWeight: '500',
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F8F0',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    editButtonText: {
        fontSize: 14,
        color: '#4CAF50',
        marginLeft: 5,
        fontWeight: '500',
    },

    // 친구 목록 스타일
    friendsSection: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    friendsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    friendsTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    friendsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 8,
    },
    viewAllText: {
        fontSize: 14,
        color: '#4CAF50',
        fontWeight: '500',
    },
    friendsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    friendItem: {
        width: '30%',
        alignItems: 'center',
        marginBottom: 15,
    },
    friendAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E8F5E8',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    friendName: {
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
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
});

export default styles;
