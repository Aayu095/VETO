import { Redirect } from 'expo-router';

export default function ScanTabRedirect() {
    // Redirect to the QR scanner with camera
    return <Redirect href="/send/qr-scanner" />;
}
