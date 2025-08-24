export interface Document {
  id: string;
  title: string;
  type: string;
  progress: number;
  signatures: Signature[];
  institution: string;
  issuedBy: string;
  network: string;
  ipfsHash: string;
  status: 'pendiente' | 'completado' | 'rechazado';
  createdAt: Date;
  expiresAt?: Date;
}

export interface Signature {
  id: string;
  signerName: string;
  signerRole: string;
  status: 'pendiente' | 'firmado';
  signedAt?: Date;
}

export interface Identification {
  id: string;
  type: string;
  holderName: string;
  institution: string;
  issuedBy: string;
  network: string;
  ipfsHash: string;
  expiresAt: Date;
  isExpired: boolean;
  frontImageUrl: string;
  backImageUrl: string;
}

export interface Institution {
  id: string;
  name: string;
  shortName: string;
  logoUrl?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  documentId?: string;
  type: 'signature' | 'document' | 'general';
  createdAt: Date;
  read: boolean;
}

export interface User {
  id: string;
  name: string;
  walletAddress: string;
  profileImageUrl?: string;
  selectedInstitution?: string;
}

export type RootStackParamList = {
  QRScanner: undefined;
  InstitutionSelector: undefined;
  Home: undefined;
  Notifications: undefined;
  DocumentDetail: { documentId: string };
  IdentificationDetail: { identificationId: string };
};

export type BottomTabParamList = {
  HomeTab: undefined;
  Documents: undefined;
  Identifications: undefined;
  Settings: undefined;
};
