import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput, Alert, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function AccountScreen() {
    const [nickname, setNickname] = useState('나만의별명');
    const [bio, setBio] = useState('안녕하세요! 반가워요 😊');
    const [age, setAge] = useState('25');
    const [location, setLocation] = useState('서울시 강남구');

    const saveProfile = () => {
        Alert.alert('저장됨', '프로필 정보가 저장되었습니다.');
    };

    const changePassword = () => {
        Alert.alert('안내', '비밀번호 변경 플로우를 연결해주세요.');
    };

    const logout = () => {
        router.push('/logout');
    };

    const suspend = () => {
        Alert.alert('계정 일시 정지', '잠시 후 재로그인 시 해제됩니다.');
    };

    const deleteAccount = () => {
        Alert.alert('경고', '계정을 영구 삭제하시겠습니까?', [
            { text: '취소', style: 'cancel' },
            { text: '삭제', style: 'destructive', onPress: () => Alert.alert('삭제됨', '계정이 삭제되었습니다.') },
        ]);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                <TouchableOpacity onPress={() => router.back()} style={{ paddingRight: 12, paddingVertical: 4 }}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#333' }}>계정관리</Text>
            </View>

            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
                {/* 프로필 정보 */}
                <Card title="프로필 정보" icon="person-outline">
                    {/* 아바타 */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                        <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name="person" size={40} color="#fff" />
                        </View>
                        <View style={{ marginLeft: 12 }}>
                            <RowGhost title="사진 변경" />
                            <RowGhost title="사진 삭제" destructive />
                        </View>
                    </View>

                    {/* 입력들 */}
                    <LabeledInput label="닉네임" value={nickname} onChangeText={setNickname} />
                    <LabeledInput label="소개" value={bio} onChangeText={setBio} />
                    <LabeledInput label="나이" value={age} onChangeText={setAge} keyboardType="number-pad" />
                    <LabeledInput label="지역" value={location} onChangeText={setLocation} />

                    <TouchableOpacity onPress={saveProfile} style={{ backgroundColor: '#4CAF50', padding: 12, borderRadius: 12, alignItems: 'center', marginTop: 8 }}>
                        <Text style={{ color: '#fff', fontWeight: '700' }}>프로필 저장</Text>
                    </TouchableOpacity>
                </Card>

                {/* 계정 정보 */}
                <Card title="계정 정보" icon="shield-checkmark-outline">
                    <RowKeyValue icon="mail-outline" label="이메일" value="user@example.com" badge="인증됨" />
                    <Separator />
                    <RowKeyValue icon="call-outline" label="전화번호" value="010-****-1234" badge="인증됨" />
                    <Separator />
                    <RowKeyValue icon="calendar-outline" label="가입일" value="2024년 1월 1일" />
                    <TouchableOpacity onPress={changePassword} style={{ marginTop: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 12, paddingVertical: 12, alignItems: 'center' }}>
                        <Text style={{ color: '#333' }}>비밀번호 변경</Text>
                    </TouchableOpacity>
                </Card>

                {/* 활동 통계 */}
                <Card title="활동 통계" icon="card-outline">
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                        <StatBox title="하트" value="1,250" color="#E53935" />
                        <StatBox title="친구 수" value="42" color="#25a244" />
                        <StatBox title="채팅 횟수" value="156" color="#25a244" />
                        <StatBox title="영상 통화" value="28" color="#25a244" />
                    </View>
                </Card>

                {/* 위험 영역 */}
                <Card title="위험 영역" icon="trash-outline" titleColor="#E53935">
                    <RowGhost title="로그아웃" onPress={logout} destructive />
                    <Separator />
                    <RowGhost title="계정 일시 정지" onPress={suspend} destructive />
                    <Separator />
                    <RowGhost title="계정 영구 삭제" onPress={deleteAccount} destructive strong />
                    <Text style={{ color: '#999', fontSize: 12, marginTop: 8 }}>⚠️ 계정 삭제 시 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.</Text>
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
}

function Card({ title, icon, children, titleColor = '#333' }: { title: string; icon: any; children: React.ReactNode; titleColor?: string }) {
    return (
        <View style={{ backgroundColor: '#fff', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#eee', marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Ionicons name={icon} size={20} color={titleColor === '#333' ? '#25a244' : titleColor} />
                <Text style={{ marginLeft: 8, fontWeight: '700', color: titleColor }}>{title}</Text>
            </View>
            {children}
        </View>
    );
}

function LabeledInput({ label, value, onChangeText, keyboardType }: { label: string; value: string; onChangeText: (t: string) => void; keyboardType?: any }) {
    return (
        <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 12, color: '#666', marginBottom: 6 }}>{label}</Text>
            <TextInput value={value} onChangeText={onChangeText} keyboardType={keyboardType} style={{ borderWidth: 1, borderColor: '#eee', borderRadius: 10, padding: 12 }} />
        </View>
    );
}

function RowKeyValue({ icon, label, value, badge }: { icon: any; label: string; value: string; badge?: string }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name={icon} size={18} color="#777" />
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ color: '#333', fontWeight: '600' }}>{label}</Text>
                    <Text style={{ color: '#777', fontSize: 12 }}>{value}</Text>
                </View>
            </View>
            {badge ? <View style={{ backgroundColor: '#25a244', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 }}><Text style={{ color: '#fff', fontSize: 10, fontWeight: '700' }}>{badge}</Text></View> : null}
        </View>
    );
}

function RowGhost({ title, onPress, destructive, strong }: { title: string; onPress?: () => void; destructive?: boolean; strong?: boolean }) {
    return (
        <TouchableOpacity onPress={onPress} style={{ paddingVertical: 10 }}>
            <Text style={{ color: destructive ? '#E53935' : '#333', fontWeight: strong ? '700' as any : '500' as any }}>{title}</Text>
        </TouchableOpacity>
    );
}

function StatBox({ title, value, color }: { title: string; value: string; color: string }) {
    return (
        <View style={{ width: '48%', backgroundColor: '#f6f8f6', borderRadius: 12, paddingVertical: 12, alignItems: 'center' }}>
            <Text style={{ color, fontSize: 22, fontWeight: '800' }}>{value}</Text>
            <Text style={{ color: '#777', fontSize: 12, marginTop: 4 }}>{title}</Text>
        </View>
    );
}

function Separator() {
    return <View style={{ height: 1, backgroundColor: '#eee' }} />;
}


