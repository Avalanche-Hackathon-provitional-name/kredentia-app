import { Document, Identification, Institution, Notification, User } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'John Hopediah',
  walletAddress: '0x123456789abcdef',
  profileImageUrl: undefined,
  selectedInstitution: 'cns'
};

export const mockInstitutions: Institution[] = [
  { id: 'home', name: 'Inicio', shortName: '🏠' },
  { id: 'umsa', name: 'Universidad Mayor de San Andrés', shortName: 'UMSA' },
  { id: 'cns', name: 'Caja Nacional de Salud', shortName: 'CNS' },
  { id: 'ssu', name: 'Servicio de Salud Universal', shortName: 'SSU' }
];

export const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Certificado Médico',
    type: 'Certificado Médico',
    progress: 0.6,
    signatures: [
      { id: '1', signerName: 'Dr. Pedro', signerRole: 'Médico Tratante', status: 'firmado', signedAt: new Date() },
      { id: '2', signerName: 'Dra. García', signerRole: 'Especialista', status: 'firmado', signedAt: new Date() },
      { id: '3', signerName: 'Enfermera López', signerRole: 'Enfermera', status: 'firmado', signedAt: new Date() },
      { id: '4', signerName: 'Dr. Martínez', signerRole: 'Director', status: 'pendiente' },
      { id: '5', signerName: 'Administración', signerRole: 'Administración', status: 'pendiente' }
    ],
    institution: 'CNS',
    issuedBy: '0x1246',
    network: 'C-Chain',
    ipfsHash: 'QmXyZ123456789abcdef',
    status: 'pendiente',
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  },
  {
    id: '2',
    title: 'Diploma Universitario',
    type: 'Diploma',
    progress: 1.0,
    signatures: [
      { id: '6', signerName: 'Director', signerRole: 'Director', status: 'firmado', signedAt: new Date() },
      { id: '7', signerName: 'Secretario', signerRole: 'Secretario', status: 'firmado', signedAt: new Date() }
    ],
    institution: 'Criptocoders',
    issuedBy: 'Universidad',
    network: 'Avalanche',
    ipfsHash: 'QmAbc987654321fedcba',
    status: 'completado',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: '3',
    title: 'Matrícula 2025',
    type: 'Matrícula',
    progress: 1.0,
    signatures: [
      { id: '8', signerName: 'Registro', signerRole: 'Oficina de Registro', status: 'firmado', signedAt: new Date() },
      { id: '9', signerName: 'Finanzas', signerRole: 'Departamento Financiero', status: 'firmado', signedAt: new Date() }
    ],
    institution: 'UMSA',
    issuedBy: 'Universidad',
    network: 'Avalanche',
    ipfsHash: 'QmDef456789012345678',
    status: 'completado',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
  },
  {
    id: '4',
    title: 'Record Académico',
    type: 'Record',
    progress: 0.5,
    signatures: [
      { id: '10', signerName: 'Coordinador', signerRole: 'Coordinador Académico', status: 'firmado', signedAt: new Date() },
      { id: '11', signerName: 'Decano', signerRole: 'Decano', status: 'pendiente' }
    ],
    institution: 'UMSA',
    issuedBy: 'Universidad',
    network: 'Avalanche',
    ipfsHash: 'QmGhi789012345678901',
    status: 'rechazado',
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000)
  }
];

export const mockIdentifications: Identification[] = [
  {
    id: '1',
    type: 'CNS',
    holderName: 'John Hopediah',
    institution: 'CNS',
    issuedBy: 'Caja Nacional de Salud',
    network: 'C-Chain',
    ipfsHash: 'QmId123456789abcdef',
    expiresAt: new Date(2025, 0, 25),
    isExpired: false,
    frontImageUrl: 'https://example.com/id-front.jpg',
    backImageUrl: 'https://example.com/id-back.jpg'
  },
  {
    id: '2',
    type: 'UMSA',
    holderName: 'John Hopediah',
    institution: 'UMSA',
    issuedBy: 'Universidad Mayor de San Andrés',
    network: 'C-Chain',
    ipfsHash: 'QmId987654321fedcba',
    expiresAt: new Date(2025, 0, 25),
    isExpired: false,
    frontImageUrl: 'https://example.com/umsa-id-front.jpg',
    backImageUrl: 'https://example.com/umsa-id-back.jpg'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: '2da firma obtenida',
    message: 'Certificado médico - CNS',
    documentId: '1',
    type: 'signature',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false
  },
  {
    id: '2',
    title: '2da firma obtenida',
    message: 'Diploma - criptocoders',
    documentId: '2',
    type: 'signature',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    read: false
  }
];
