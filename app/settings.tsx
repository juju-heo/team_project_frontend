import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Switch, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    const [matchAlertEnabled, setMatchAlertEnabled] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [profilePublic, setProfilePublic] = useState(true);
    const [locationEnabled, setLocationEnabled] = useState(true);

    // load persisted toggles
    useEffect(() => {
        (async () => {
            try {
                const stored = await AsyncStorage.getItem('app_settings');
                if (stored) {
                    const parsed = JSON.parse(stored);
                    setNotificationsEnabled(parsed.notificationsEnabled ?? true);
                    setDarkModeEnabled(parsed.darkModeEnabled ?? false);
                    setMatchAlertEnabled(parsed.matchAlertEnabled ?? true);
                    setSoundEnabled(parsed.soundEnabled ?? false);
                    setProfilePublic(parsed.profilePublic ?? true);
                    setLocationEnabled(parsed.locationEnabled ?? true);
                }
            } catch {}
        })();
    }, []);

    // persist on change
    useEffect(() => {
        const data = { notificationsEnabled, darkModeEnabled, matchAlertEnabled, soundEnabled, profilePublic, locationEnabled };
        AsyncStorage.setItem('app_settings', JSON.stringify(data)).catch(() => {});
    }, [notificationsEnabled, darkModeEnabled, matchAlertEnabled, soundEnabled, profilePublic, locationEnabled]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                <TouchableOpacity onPress={() => router.back()} style={{ paddingRight: 12, paddingVertical: 4 }}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#333' }}>설정</Text>
            </View>

            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
                {/* 알림 설정 카드 */}
                <View style={{ backgroundColor: '#fff', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#eee', marginBottom: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                        <Ionicons name="notifications-outline" size={20} color="#25a244" />
                        <Text style={{ marginLeft: 8, fontWeight: '700', color: '#333' }}>알림 설정</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#f0f0f0', marginVertical: 8 }} />
                    <RowSwitch icon="notifications-outline" title="푸시 알림" subtitle="새로운 메시지 알림" value={notificationsEnabled} onChange={setNotificationsEnabled} />
                    <Separator />
                    <RowSwitch icon="sparkles-outline" title="매칭 알림" subtitle="새로운 매칭 알림" value={matchAlertEnabled} onChange={setMatchAlertEnabled} />
                    <Separator />
                    <RowSwitch icon="volume-high-outline" title="소리" subtitle="알림음 재생" value={soundEnabled} onChange={setSoundEnabled} />
                </View>

                {/* 개인정보 및 보안 카드 */}
                <View style={{ backgroundColor: '#fff', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#eee', marginBottom: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                        <Ionicons name="shield-checkmark-outline" size={20} color="#25a244" />
                        <Text style={{ marginLeft: 8, fontWeight: '700', color: '#333' }}>개인정보 및 보안</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#f0f0f0', marginVertical: 8 }} />
                    <RowSwitch icon="eye-outline" title="프로필 공개" subtitle="다른 사용자에게 프로필 표시" value={profilePublic} onChange={setProfilePublic} />
                    <Separator />
                    <RowSwitch icon="location-outline" title="위치 정보" subtitle="지역 랭킹 참여" value={locationEnabled} onChange={setLocationEnabled} />
                    <Separator />
                    <RowButton icon="close-circle-outline" title="차단 목록 관리" onPress={() => {}} />
                </View>

                {/* 앱 설정 카드 */}
                <View style={{ backgroundColor: '#fff', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#eee', marginBottom: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                        <Ionicons name="phone-portrait-outline" size={20} color="#25a244" />
                        <Text style={{ marginLeft: 8, fontWeight: '700', color: '#333' }}>앱 설정</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#f0f0f0', marginVertical: 8 }} />
                    <RowSwitch icon="moon-outline" title="다크 모드" subtitle="어두운 테마 사용" value={darkModeEnabled} onChange={(v) => {
                        setDarkModeEnabled(v);
                        // notify theme change immediately
                        const bus = (global as any).__APP_EVENT_BUS__;
                        if (bus && Array.isArray(bus.listeners)) {
                            bus.listeners.forEach((l: any) => l({ type: 'theme_change', payload: v ? 'dark' : 'light' }));
                        }
                    }} />
                    <Separator />
                    <RowButton icon="globe-outline" title="언어 (한국어)" onPress={() => Alert.alert('언어', '현재는 한국어만 지원합니다.')} />
                    <Separator />
                    <RowButton icon="color-palette-outline" title="채팅 배경 (기본)" onPress={() => Alert.alert('채팅 배경', '배경 변경 기능은 추후 제공 예정입니다.')} />
                </View>

                {/* 기타 카드 */}
                <View style={{ backgroundColor: '#fff', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#eee' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                        <Ionicons name="ellipsis-horizontal-circle-outline" size={20} color="#25a244" />
                        <Text style={{ marginLeft: 8, fontWeight: '700', color: '#333' }}>기타</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#f0f0f0', marginVertical: 8 }} />
                    <RowButton icon="trash-outline" title="캐시 데이터 삭제" onPress={async () => { await AsyncStorage.clear(); Alert.alert('완료', '캐시가 삭제되었습니다.'); }} />
                    <Separator />
                    <RowButton icon="information-circle-outline" title="앱 정보" onPress={() => router.push('/about')} />
                    <Separator />
                    <Text style={{ textAlign: 'left', color: '#999', marginTop: 8 }}>버전 1.0.0</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function RowSwitch({ icon, title, subtitle, value, onChange }: { icon: any; title: string; subtitle?: string; value: boolean; onChange: (v: boolean) => void }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name={icon} size={20} color="#333" />
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontSize: 16, color: '#333', fontWeight: '600' }}>{title}</Text>
                    {subtitle ? <Text style={{ marginTop: 2, fontSize: 12, color: '#777' }}>{subtitle}</Text> : null}
                </View>
            </View>
            <Switch value={value} onValueChange={onChange} />
        </View>
    );
}

function RowButton({ icon, title, onPress }: { icon: any; title: string; onPress: () => void }) {
    return (
        <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name={icon} size={20} color="#333" />
                <Text style={{ marginLeft: 10, fontSize: 16, color: '#333' }}>{title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#999" />
        </TouchableOpacity>
    );
}

function Separator() {
    return <View style={{ height: 1, backgroundColor: '#eee' }} />;
}


