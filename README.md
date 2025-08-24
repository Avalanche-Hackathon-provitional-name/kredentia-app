# KredentiaApp - Sistema de Credenciales Digitales

## Descripción
KredentiaApp es una aplicación móvil desarrollada en React Native para gestionar credenciales y documentos digitales utilizando tecnología blockchain (Avalanche) e IPFS.

## Funcionalidades Implementadas

### 🔍 Vista QR Scanner (QRScannerScreen.tsx)
- Escáner de códigos QR para unirse a organizaciones
- Simulación de detección de QR
- Opción para seleccionar QR desde galería
- Navegación a la vista de selección de instituciones

### 🏛️ Vista Selección de Instituciones (InstitutionSelectorScreen.tsx)
- Selección entre diferentes instituciones (UMSA, CNS, SSU)
- Botón de inicio (home)
- Botón "+" para abrir el escáner QR
- Navegación al dashboard principal

### 🏠 Vista Home Principal (HomeScreen.tsx)
- Saludo personalizado al usuario
- Panel de resumen con estadísticas de documentos
- Lista de documentos recientes
- Botón de notificaciones con contador
- Navegación a detalles de documentos

### 🔔 Vista Notificaciones (NotificationsScreen.tsx)
- Lista de notificaciones de firmas de documentos
- Contador de notificaciones no leídas
- Navegación a documentos relacionados
- Timestamps de notificaciones

### 📄 Vista Detalle de Documento (DocumentDetailScreen.tsx)
- Información completa del documento
- Barra de progreso de firmas
- Lista de firmantes con estados
- Botón para abrir certificado IPFS
- Información técnica con botones de copiar al portapapeles

### 📄 Vista Lista de Documentos (DocumentsListScreen.tsx)
- Lista completa de documentos del usuario
- Estados: Completado, Pendiente, Rechazado
- Barras de progreso
- Navegación a detalles de documento

### 🆔 Vista Detalle de Identificación (IdentificationDetailScreen.tsx)
- Tarjeta de identificación interactiva (frente/dorso)
- Información del portador
- Datos técnicos (IPFS, blockchain)
- Interfaz táctil para voltear la tarjeta

### 🆔 Vista Lista de Identificaciones (IdentificationsListScreen.tsx)
- Lista de identificaciones/credenciales
- Estados: Activo, Expirado
- Preview de las tarjetas
- Navegación a detalle de identificación

### ⚙️ Vista Configuraciones (SettingsScreen.tsx)
- Perfil del usuario con imagen
- Dirección de wallet con botón copiar
- Configuraciones de seguridad
- Opción para cambiar institución
- Información de la aplicación

## Estructura de Archivos

```
src/
├── components/          # Componentes reutilizables
├── navigation/          # Configuración de navegación
│   └── AppNavigator.tsx
├── screens/            # Pantallas de la aplicación
│   ├── QRScannerScreen.tsx
│   ├── InstitutionSelectorScreen.tsx
│   ├── HomeScreen.tsx
│   ├── NotificationsScreen.tsx
│   ├── DocumentDetailScreen.tsx
│   ├── DocumentsListScreen.tsx
│   ├── IdentificationDetailScreen.tsx
│   ├── IdentificationsListScreen.tsx
│   └── SettingsScreen.tsx
├── types/              # Definiciones de tipos TypeScript
│   └── index.ts
└── utils/              # Utilidades y datos mock
    └── mockData.ts
```

## Instalación y Ejecución

```bash
# Instalar dependencias
npm install

# Para Android
npm run android

# Para iOS
npm run ios

# Iniciar el servidor de desarrollo
npm start
```

## Próximos Pasos

1. **Resolver errores de TypeScript**: Configurar correctamente JSX y tipos
2. **Implementar navegación real**: React Navigation completa
3. **Integración blockchain**: Conectar con Avalanche testnet
4. **Escáner QR real**: Implementar react-native-camera
5. **Autenticación**: Sistema de login/registro
6. **Notificaciones push**: Implementar notificaciones reales
7. **Tests**: Añadir tests unitarios y de integración

## Tecnologías Utilizadas

- React Native 0.81.0
- TypeScript
- React Navigation (preparado)
- IPFS (mockup)
- Avalanche/Blockchain (mockup)

## Notas de Desarrollo

La aplicación está estructurada siguiendo las mejores prácticas de React Native con TypeScript. Todas las vistas están diseñadas según los mockups proporcionados y están listas para integración con servicios reales de blockchain e IPFS.
