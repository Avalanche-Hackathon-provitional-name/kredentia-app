/**
 * KredentiaApp - Sistema de credenciales digitales
 * 
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Dimensions,
  Modal,
  Platform,
} from 'react-native';
import {launchImageLibrary, launchCamera, MediaType} from 'react-native-image-picker';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

// Componentes personalizados
import {
  DocumentCard,
  ProgressBar,
  StatusBadge,
  BottomTabBar,
  CustomAlert
} from './src/components';

// Tipos TypeScript
interface Document {
  id: string;
  title: string;
  institution: string;
  progress: number;
  status: 'pendiente' | 'completado' | 'rechazado';
}

interface AlertConfig {
  title: string;
  message: string;
  onConfirm: (() => void) | null;
}

type ViewType = 'qr-scanner' | 'institution-selector' | 'home' | 'notifications' | 
                'document-detail' | 'documents' | 'identifications' | 'settings';

// Datos mock simples
const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Certificado Médico',
    institution: 'CNS',
    progress: 0.6,
    status: 'pendiente'
  },
  {
    id: '2',
    title: 'Diploma Universitario',
    institution: 'Criptocoders',
    progress: 1.0,
    status: 'completado'
  }
];

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentView, setCurrentView] = React.useState<ViewType>('qr-scanner');
  const [showAlert, setShowAlert] = React.useState<boolean>(false);
  const [alertConfig, setAlertConfig] = React.useState<AlertConfig>({ 
    title: '', 
    message: '', 
    onConfirm: null 
  });
  const [scannedImage, setScannedImage] = React.useState<any>(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
  };

  // Función personalizada para mostrar alertas
  const showCustomAlert = (title: string, message: string, onConfirm: (() => void) | null = null): void => {
    setAlertConfig({ title, message, onConfirm });
    setShowAlert(true);
  };

  // Función para solicitar permisos de cámara
  const requestCameraPermission = async (): Promise<boolean> => {
    try {
      const permission = Platform.OS === 'android' 
        ? PERMISSIONS.ANDROID.CAMERA 
        : PERMISSIONS.IOS.CAMERA;
      
      const result = await request(permission);
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.log('Error requesting camera permission:', error);
      return false;
    }
  };

  // Función para abrir la cámara
  const openCamera = async (): Promise<void> => {
    const hasPermission = await requestCameraPermission();
    
    if (!hasPermission) {
      showCustomAlert('Permiso Requerido', 'Necesitamos acceso a la cámara para escanear códigos QR');
      return;
    }

    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorMessage) {
        console.log('Camera Error: ', response.errorMessage);
        showCustomAlert('Error', 'No se pudo acceder a la cámara');
      } else if (response.assets && response.assets[0]) {
        setScannedImage(response.assets[0]);
        // Simular detección de QR después de 2 segundos
        setTimeout(() => {
          showCustomAlert(
            'QR Detectado', 
            'Se detectó un código QR válido. ¿Deseas continuar?',
            () => setCurrentView('institution-selector')
          );
        }, 2000);
      }
    });
  };

  // Función para abrir galería
  const openGallery = (): void => {
    const options = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled gallery');
      } else if (response.errorMessage) {
        console.log('Gallery Error: ', response.errorMessage);
      } else if (response.assets && response.assets[0]) {
        setScannedImage(response.assets[0]);
        // Simular análisis de QR
        setTimeout(() => {
          showCustomAlert(
            'QR Detectado', 
            'Se detectó un código QR en la imagen. ¿Deseas continuar?',
            () => setCurrentView('institution-selector')
          );
        }, 1500);
      }
    });
  };

  // Componente de Alert personalizado
  const AlertComponent = (): React.JSX.Element => (
    <CustomAlert
      visible={showAlert}
      title={alertConfig.title}
      message={alertConfig.message}
      onCancel={() => setShowAlert(false)}
      onConfirm={() => {
        setShowAlert(false);
        if (alertConfig.onConfirm) {
          alertConfig.onConfirm();
        }
      }}
    />
  );

  const renderQRScanner = (): React.JSX.Element => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Escanear QR</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Escanea el código QR para unirte a una organización
        </Text>
        
        <View style={styles.scannerPlaceholder}>
          {scannedImage ? (
            <View style={styles.imagePreview}>
              <Text style={styles.imagePreviewText}>✅ Imagen capturada</Text>
              <Text style={styles.imagePreviewSubtext}>Analizando QR...</Text>
            </View>
          ) : (
            <>
              <Text style={styles.scannerIcon}>📷</Text>
              <Text style={styles.scannerText}>
                Usa la cámara o selecciona una imagen
              </Text>
            </>
          )}
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={openCamera}
          >
            <Text style={styles.buttonText}>📷 Abrir Cámara</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={openGallery}
          >
            <Text style={styles.secondaryButtonText}>🖼️ Seleccionar de Galería</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.demoButton}
            onPress={() => {
              showCustomAlert(
                'Demo QR', 
                'Simulando detección de código QR para demostración',
                () => setCurrentView('institution-selector')
              );
            }}
          >
            <Text style={styles.demoButtonText}>🎭 Modo Demo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderInstitutionSelector = (): React.JSX.Element => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Donde deseas entrar</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setScannedImage(null);
            setCurrentView('qr-scanner');
          }}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.institutionsContainer}>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => setCurrentView('home')}
          >
            <Text style={styles.homeIcon}>🏠</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.institutionButton}
            onPress={() => setCurrentView('home')}
          >
            <Text style={styles.institutionText}>CNS</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.institutionButton}
            onPress={() => setCurrentView('home')}
          >
            <Text style={styles.institutionText}>UMSA</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.institutionButton}
            onPress={() => setCurrentView('home')}
          >
            <Text style={styles.institutionText}>SSU</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderHome = (): React.JSX.Element => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hola John</Text>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => setCurrentView('notifications')}
        >
          <Text style={styles.notificationIcon}>🔔</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.contentWithTab}>
        <ScrollView style={styles.scrollContent}>
          <View style={styles.summaryCard}>
            <Text style={styles.cardTitle}>Resumen</Text>
            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryNumber}>15</Text>
                <Text style={styles.summaryLabel}>Activos</Text>
              </View>
              <View style={styles.summaryDetails}>
                <Text style={styles.detailText}>3 Pendientes</Text>
                <Text style={styles.detailText}>2 Completados</Text>
                <Text style={styles.detailText}>1 Rechazado</Text>
              </View>
            </View>
          </View>

          <View style={styles.documentsSection}>
            <Text style={styles.sectionTitle}>Documentos Recientes</Text>
            {mockDocuments.map((doc: Document) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onPress={() => setCurrentView('document-detail')}
                variant="default"
                showStatus={true}
              />
            ))}
          </View>
        </ScrollView>
        <BottomTabBar 
          currentView={currentView}
          onTabPress={setCurrentView}
        />
      </View>
    </View>
  );

  const renderNotifications = (): React.JSX.Element => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentView('home')}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificaciones</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>2</Text>
        </View>
      </View>
      
      <ScrollView style={styles.content}>
        <TouchableOpacity
          style={styles.notificationCard}
          onPress={() => setCurrentView('document-detail')}
        >
          <Text style={styles.notificationTitle}>2da firma obtenida</Text>
          <Text style={styles.notificationMessage}>Certificado médico - CNS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.notificationCard}
          onPress={() => setCurrentView('document-detail')}
        >
          <Text style={styles.notificationTitle}>2da firma obtenida</Text>
          <Text style={styles.notificationMessage}>Diploma - criptocoders</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  const renderDocumentDetail = (): React.JSX.Element => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentView('home')}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Certificado Médico</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.documentDetailCard}>
          <Text style={styles.documentTitle}>Certificado Médico</Text>
          <Text style={styles.documentSubtitle}>CNS - Caja Nacional de Salud</Text>
          
          <View style={styles.progressSection}>
            <Text style={styles.progressTitle}>Progreso de firmas: 2/3</Text>
            <ProgressBar 
              progress={0.66}
              showPercentage={true}
            />
            <Text style={styles.progressText}>66% completado</Text>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Información IPFS</Text>
            <Text style={styles.infoText}>Hash: QmX7Y8Z9...</Text>
            <TouchableOpacity 
              style={styles.copyButton}
              onPress={() => showCustomAlert('Copiado', 'Hash IPFS copiado al portapapeles')}
            >
              <Text style={styles.copyButtonText}>Copiar Hash</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signaturesSection}>
            <Text style={styles.signaturesTitle}>Firmas:</Text>
            <Text style={styles.signatureText}>✓ Dr. María González</Text>
            <Text style={styles.signatureText}>✓ Dr. Carlos Pérez</Text>
            <Text style={styles.signaturePending}>⏳ Pendiente: Director Médico</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );

  const renderDocumentsList = (): React.JSX.Element => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentView('home')}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis Documentos</Text>
      </View>
      
      <View style={styles.contentWithTab}>
        <ScrollView style={styles.scrollContent}>
          <View style={styles.filterSection}>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterButtonText}>Todos (6)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButtonInactive}>
              <Text style={styles.filterButtonTextInactive}>Pendientes (3)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButtonInactive}>
              <Text style={styles.filterButtonTextInactive}>Completados (2)</Text>
            </TouchableOpacity>
          </View>

          {mockDocuments.map((doc: Document) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onPress={() => setCurrentView('document-detail')}
              variant="list"
              showStatus={true}
            />
          ))}
        </ScrollView>
        <BottomTabBar 
          currentView={currentView}
          onTabPress={setCurrentView}
        />
      </View>
    </View>
  );

  const renderIdentificationsList = (): React.JSX.Element => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentView('home')}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis Identificaciones</Text>
      </View>
      
      <View style={styles.contentWithTab}>
        <ScrollView style={styles.scrollContent}>
          <TouchableOpacity 
            style={styles.identificationCard}
            onPress={() => setCurrentView('settings')}
          >
            <View style={styles.idCardPreview}>
              <Text style={styles.idCardIcon}>🆔</Text>
              <Text style={styles.idCardTitle}>Cédula de Identidad</Text>
              <Text style={styles.idCardNumber}>CI: 12345678 LP</Text>
            </View>
            <View style={styles.idCardStatus}>
              <StatusBadge 
                status="verificado" 
                text="Verificado"
                customColor="#2ECC71"
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.identificationCard}
            onPress={() => setCurrentView('settings')}
          >
            <View style={styles.idCardPreview}>
              <Text style={styles.idCardIcon}>🎓</Text>
              <Text style={styles.idCardTitle}>Carnet Universitario</Text>
              <Text style={styles.idCardNumber}>UMSA: 2023010123</Text>
            </View>
            <View style={styles.idCardStatus}>
              <StatusBadge 
                status="pendiente" 
                text="Pendiente"
                customColor="#F39C12"
              />
            </View>
          </TouchableOpacity>
        </ScrollView>
        <BottomTabBar 
          currentView={currentView}
          onTabPress={setCurrentView}
        />
      </View>
    </View>
  );

  const renderSettings = (): React.JSX.Element => (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentView('home')}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configuración</Text>
      </View>
      
      <View style={styles.contentWithTab}>
        <ScrollView style={styles.scrollContent}>
          <View style={styles.settingsSection}>
            <View style={styles.profileSection}>
              <View style={styles.profileIcon}>
                <Text style={styles.profileIconText}>👤</Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>John Doe</Text>
                <Text style={styles.profileEmail}>john.doe@email.com</Text>
              </View>
            </View>

            <View style={styles.walletSection}>
              <Text style={styles.sectionTitle}>Información de Wallet</Text>
              <View style={styles.walletInfo}>
                <Text style={styles.walletLabel}>Dirección:</Text>
                <Text style={styles.walletAddress}>0x742d35cc6bc...</Text>
                <TouchableOpacity 
                  style={styles.copyButton}
                  onPress={() => showCustomAlert('Copiado', 'Dirección de wallet copiada al portapapeles')}
                >
                  <Text style={styles.copyButtonText}>Copiar</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.settingsOptions}>
              <TouchableOpacity style={styles.settingItem}>
                <Text style={styles.settingIcon}>🔔</Text>
                <Text style={styles.settingText}>Notificaciones</Text>
                <Text style={styles.settingArrow}>→</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <Text style={styles.settingIcon}>🔒</Text>
                <Text style={styles.settingText}>Seguridad</Text>
                <Text style={styles.settingArrow}>→</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <Text style={styles.settingIcon}>📱</Text>
                <Text style={styles.settingText}>Dispositivos conectados</Text>
                <Text style={styles.settingArrow}>→</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.settingItem}>
                <Text style={styles.settingIcon}>❓</Text>
                <Text style={styles.settingText}>Ayuda y soporte</Text>
                <Text style={styles.settingArrow}>→</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <BottomTabBar 
          currentView={currentView}
          onTabPress={setCurrentView}
        />
      </View>
    </View>
  );

  const renderCurrentView = (): React.JSX.Element => {
    switch (currentView) {
      case 'qr-scanner':
        return renderQRScanner();
      case 'institution-selector':
        return renderInstitutionSelector();
      case 'home':
        return renderHome();
      case 'notifications':
        return renderNotifications();
      case 'document-detail':
        return renderDocumentDetail();
      case 'documents':
        return renderDocumentsList();
      case 'identifications':
        return renderIdentificationsList();
      case 'settings':
        return renderSettings();
      default:
        return renderHome();
    }
  };

  return (
    <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#4ECDC4"
      />
      {renderCurrentView()}
      <AlertComponent />
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#4ECDC4',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  backButton: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4ECDC4',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationIcon: {
    fontSize: 24,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF3030',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  scannerPlaceholder: {
    width: width - 80,
    height: width - 80,
    backgroundColor: '#333',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    alignSelf: 'center',
  },
  scannerIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  scannerText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  imagePreview: {
    alignItems: 'center',
  },
  imagePreviewText: {
    color: '#4ECDC4',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  imagePreviewSubtext: {
    color: '#fff',
    fontSize: 14,
  },
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#4ECDC4',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4ECDC4',
  },
  secondaryButtonText: {
    color: '#4ECDC4',
    fontSize: 16,
    fontWeight: 'bold',
  },
  demoButton: {
    backgroundColor: '#f39c12',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  demoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  institutionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  homeButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  homeIcon: {
    fontSize: 48,
  },
  institutionButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#333',
  },
  institutionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  summaryGrid: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    alignItems: 'center',
    marginRight: 30,
  },
  summaryNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4ECDC4',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryDetails: {
    flex: 1,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  documentsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  documentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#4ECDC4',
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  documentSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#4ECDC4',
    paddingVertical: 10,
  },
  contentWithTab: {
    flex: 1,
    paddingBottom: 70, // Espacio para el tab bar
  },
  scrollContent: {
    flex: 1,
    padding: 20,
  },
  // Estilos para Documents List
  documentListCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#4ECDC4',
  },
  documentListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  filterSection: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 8,
  },
  filterButton: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  filterButtonInactive: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterButtonTextInactive: {
    color: '#666',
    fontSize: 14,
  },
  // Estilos para Identifications
  identificationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#4ECDC4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  idCardPreview: {
    flex: 1,
  },
  idCardIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  idCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  idCardNumber: {
    fontSize: 14,
    color: '#666',
  },
  idCardStatus: {
    alignItems: 'flex-end',
  },
  // Estilos para Settings
  settingsSection: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileIconText: {
    fontSize: 24,
    color: '#fff',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  walletSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  walletInfo: {
    marginTop: 12,
  },
  walletLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  walletAddress: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'monospace',
    marginBottom: 12,
  },
  settingsOptions: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  settingIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  settingArrow: {
    fontSize: 16,
    color: '#666',
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#4ECDC4',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
  },
  documentDetailCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  progressSection: {
    marginVertical: 20,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  infoSection: {
    marginVertical: 20,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  copyButton: {
    backgroundColor: '#4ECDC4',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  signaturesSection: {
    marginVertical: 20,
  },
  signaturesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  signatureText: {
    fontSize: 14,
    color: '#2ECC71',
    marginBottom: 8,
  },
  signaturePending: {
    fontSize: 14,
    color: '#F39C12',
    marginBottom: 8,
  },
});

export default App;