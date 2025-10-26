import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import ImageModal from '../components/ImageModal';

export default function ProfileEditScreen() {
    const [name, setName] = useState('홍길동');
    const [age, setAge] = useState('28');
    const [birthDate, setBirthDate] = useState('1995-03-15');
    const [location, setLocation] = useState('경기도');
    const [bio, setBio] = useState('안녕하세요! 만나서 반가워요 😊');
    const keywords = ['친근함', '신뢰', '유머', '열정', '성실함', '긍정', '창의성', '도전'];
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [showImageModal, setShowImageModal] = useState(false);

    const requestMediaPermission = useCallback(async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            return false;
        }
        return true;
    }, []);

    const pickImage = useCallback(async () => {
        const granted = await requestMediaPermission();
        if (!granted) return;
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.9,
        });
        if (!result.canceled) {
            setImageUri(result.assets[0]?.uri ?? null);
        }
    }, [requestMediaPermission]);

    const save = () => {
        router.back();
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                <TouchableOpacity onPress={() => router.back()} style={{ paddingRight: 12, paddingVertical: 4 }}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#333' }}>프로필 편집</Text>
            </View>

            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
                {/* 프로필 사진 */}
                <View style={{ backgroundColor: '#fff', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#eee', marginBottom: 16 }}>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity 
                            onPress={() => setShowImageModal(true)}
                            style={{ width: 96, height: 96, borderRadius: 48, backgroundColor: imageUri ? 'transparent' : '#4CAF50', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', borderWidth: 4, borderColor: 'rgba(76,175,80,0.2)' }}
                        >
                            {imageUri ? (
                                <Image source={{ uri: imageUri }} style={{ width: 96, height: 96 }} />
                            ) : (
                                <Ionicons name="person" size={44} color="#fff" />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={pickImage} style={{ marginTop: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8 }}>
                            <Text style={{ color: '#333' }}>사진 변경</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* 기본 정보 */}
                <View style={{ backgroundColor: '#fff', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#eee', marginBottom: 16 }}>
                    <Text style={{ fontWeight: '700', color: '#333', marginBottom: 10 }}>기본 정보</Text>
                    <LabeledInput label="닉네임" value={name} onChangeText={setName} placeholder="닉네임을 입력하세요" />
                    <LabeledInput label="생년월일" value={birthDate} onChangeText={setBirthDate} placeholder="YYYY-MM-DD" />
                    <View style={{ flexDirection: 'row', gap: 12 }}>
                        <View style={{ flex: 1 }}>
                            <LabeledInput label="나이" value={age} onChangeText={setAge} placeholder="나이" keyboardType="number-pad" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <LabeledInput label="지역" value={location} onChangeText={setLocation} placeholder="지역" />
                        </View>
                    </View>
                    <LabeledInput label="자기소개" value={bio} onChangeText={setBio} placeholder="자신을 소개해주세요" multiline />
                </View>

                {/* 키워드 */}
                <View style={{ backgroundColor: '#fff', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#eee', marginBottom: 16 }}>
                    <Text style={{ fontWeight: '700', color: '#333', marginBottom: 6 }}>나의 사주 키워드</Text>
                    <Text style={{ color: '#777', fontSize: 12, marginBottom: 10 }}>사주를 기반으로 자동으로 설정된 키워드입니다</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {keywords.map((k) => (
                            <View key={k} style={{ backgroundColor: 'rgba(37,162,68,0.1)', borderRadius: 14, paddingHorizontal: 10, paddingVertical: 6, marginRight: 8, marginBottom: 8 }}>
                                <Text style={{ color: '#25a244', fontWeight: '600' }}>{k}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* 저장 */}
                <TouchableOpacity onPress={save} style={{ backgroundColor: '#4CAF50', padding: 14, borderRadius: 12, alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontWeight: '700' }}>프로필 저장</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* 이미지 확대 모달 */}
            <ImageModal
                visible={showImageModal}
                onClose={() => setShowImageModal(false)}
                imageUri={imageUri}
                userName={name}
            />
        </SafeAreaView>
    );
}

function LabeledInput({ label, value, onChangeText, placeholder, keyboardType, multiline }: { label: string; value: string; onChangeText: (t: string) => void; placeholder?: string; keyboardType?: any; multiline?: boolean }) {
    return (
        <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 12, color: '#666', marginBottom: 6 }}>{label}</Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
                multiline={multiline}
                style={{ borderWidth: 1, borderColor: '#eee', borderRadius: 10, padding: 12, minHeight: multiline ? 90 : undefined }}
            />
        </View>
    );
}


