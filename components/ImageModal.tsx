import React from 'react';
import { Modal, View, TouchableOpacity, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ImageModalProps {
    visible: boolean;
    onClose: () => void;
    imageUri?: string | null;
    userName?: string;
    showDefaultIcon?: boolean;
}

export default function ImageModal({ 
    visible, 
    onClose, 
    imageUri, 
    userName = '사용자',
    showDefaultIcon = true 
}: ImageModalProps) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <TouchableOpacity 
                    style={{
                        position: 'absolute',
                        top: 50,
                        right: 20,
                        zIndex: 1
                    }}
                    onPress={onClose}
                >
                    <Ionicons name="close" size={30} color="#fff" />
                </TouchableOpacity>
                
                <View style={{
                    width: 300,
                    height: 300,
                    borderRadius: 150,
                    backgroundColor: imageUri ? 'transparent' : '#4CAF50',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    borderWidth: 4,
                    borderColor: 'rgba(255, 255, 255, 0.3)'
                }}>
                    {imageUri ? (
                        <Image 
                            source={{ uri: imageUri }} 
                            style={{ 
                                width: 300, 
                                height: 300,
                                borderRadius: 150
                            }}
                            resizeMode="cover"
                        />
                    ) : showDefaultIcon ? (
                        <Ionicons name="person" size={120} color="#fff" />
                    ) : null}
                </View>
                
                <Text style={{
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: '600',
                    marginTop: 20,
                    textAlign: 'center'
                }}>
                    {userName}
                </Text>
            </View>
        </Modal>
    );
}
