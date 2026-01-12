import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, Camera } from 'expo-camera';
import { useRouter } from 'expo-router';
import { X, Zap, ZapOff } from 'lucide-react-native';
import { useTheme } from '../../contexts/ThemeContext';

const { width } = Dimensions.get('window');
const SCAN_AREA_SIZE = width * 0.7;

export default function QRScannerScreen() {
    const router = useRouter();
    const { theme, themeMode } = useTheme();
    const isDark = themeMode === 'dark';
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);
    const [flashOn, setFlashOn] = useState(false);

    useEffect(() => {
        requestCameraPermission();
    }, []);

    const requestCameraPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
        if (scanned) return;

        setScanned(true);
        console.log(`QR Code scanned: ${data}`);

        // Navigate to AI scanning/verification screen
        router.push({
            pathname: '/send/scanning',
            params: {
                scannedData: data,
                address: extractAddress(data),
                amount: extractAmount(data)
            }
        });
    };

    const extractAddress = (data: string): string => {
        // Try to extract Ethereum address from QR data
        // Format could be: ethereum:0x... or just 0x...
        const match = data.match(/0x[a-fA-F0-9]{40}/);
        return match ? match[0] : data;
    };

    const extractAmount = (data: string): string => {
        // Try to extract amount if present in QR
        const match = data.match(/amount=([0-9.]+)/);
        return match ? match[1] : '';
    };

    if (hasPermission === null) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: theme.textPrimary, fontSize: 16 }}>Requesting camera permission...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (hasPermission === false) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 }}>
                    <Text style={{ color: theme.textPrimary, fontSize: 20, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>
                        Camera Permission Required
                    </Text>
                    <Text style={{ color: theme.textSecondary, fontSize: 16, textAlign: 'center', marginBottom: 24 }}>
                        Please enable camera access in your device settings to scan QR codes.
                    </Text>
                    <TouchableOpacity
                        style={{ backgroundColor: theme.primary, paddingVertical: 14, paddingHorizontal: 32, borderRadius: 12 }}
                        onPress={requestCameraPermission}
                    >
                        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>Grant Permission</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#000000' }}>
            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ['qr'],
                }}
            >
                {/* Header */}
                <SafeAreaView edges={['top']} style={{ zIndex: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16 }}>
                        <TouchableOpacity
                            onPress={() => router.back()}
                            style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <X size={24} color="#FFFFFF" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setFlashOn(!flashOn)}
                            style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center' }}
                        >
                            {flashOn ? <Zap size={24} color="#FFD700" /> : <ZapOff size={24} color="#FFFFFF" />}
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>

                {/* Scanning Overlay */}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {/* Dark overlay */}
                    <View style={StyleSheet.absoluteFillObject}>
                        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} />
                    </View>

                    {/* Scanning frame */}
                    <View style={{ width: SCAN_AREA_SIZE, height: SCAN_AREA_SIZE, position: 'relative' }}>
                        {/* Transparent center */}
                        <View style={{
                            width: SCAN_AREA_SIZE,
                            height: SCAN_AREA_SIZE,
                            borderWidth: 2,
                            borderColor: '#FFFFFF',
                            borderRadius: 24,
                            backgroundColor: 'transparent'
                        }}>
                            {/* Corner indicators */}
                            {/* Top Left */}
                            <View style={{ position: 'absolute', top: -2, left: -2, width: 40, height: 40, borderTopWidth: 4, borderLeftWidth: 4, borderColor: theme.vetoGreen, borderTopLeftRadius: 24 }} />
                            {/* Top Right */}
                            <View style={{ position: 'absolute', top: -2, right: -2, width: 40, height: 40, borderTopWidth: 4, borderRightWidth: 4, borderColor: theme.vetoGreen, borderTopRightRadius: 24 }} />
                            {/* Bottom Left */}
                            <View style={{ position: 'absolute', bottom: -2, left: -2, width: 40, height: 40, borderBottomWidth: 4, borderLeftWidth: 4, borderColor: theme.vetoGreen, borderBottomLeftRadius: 24 }} />
                            {/* Bottom Right */}
                            <View style={{ position: 'absolute', bottom: -2, right: -2, width: 40, height: 40, borderBottomWidth: 4, borderRightWidth: 4, borderColor: theme.vetoGreen, borderBottomRightRadius: 24 }} />

                            {/* Scanning line animation */}
                            {!scanned && (
                                <View style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: 0,
                                    right: 0,
                                    height: 2,
                                    backgroundColor: theme.vetoGreen,
                                    shadowColor: theme.vetoGreen,
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 10,
                                    elevation: 5
                                }} />
                            )}
                        </View>
                    </View>

                    {/* Instructions */}
                    <View style={{ position: 'absolute', bottom: 100, left: 0, right: 0, alignItems: 'center' }}>
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.7)', paddingHorizontal: 24, paddingVertical: 16, borderRadius: 16, marginHorizontal: 32 }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600', textAlign: 'center' }}>
                                {scanned ? 'QR Code Detected!' : 'Position QR code within the frame'}
                            </Text>
                            <Text style={{ color: '#CCCCCC', fontSize: 14, textAlign: 'center', marginTop: 4 }}>
                                {scanned ? 'Verifying with AI...' : 'The camera will scan automatically'}
                            </Text>
                        </View>
                    </View>
                </View>
            </CameraView>
        </View>
    );
}
