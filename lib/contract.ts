import { Hex } from 'ox';

export const APP_NAME = 'BaseFlow';
export const APP_DESCRIPTION =
  'Track task states and concise notes onchain with low-fee Base interactions and quick contract reads.';
export const APP_URL = 'https://baseflow-miniapp-app003.vercel.app';
export const OG_IMAGE_URL = `${APP_URL}/og-image.png`;
export const APP_ID = '69c358615262875b1be38c69';
export const TALENT_VERIFICATION =
  '0c0de1a3180d820f3b76e0353d21433b7ddfaea97ae79ed0bf1a630baec2a876c36b79c6d2093095e79470ebc4dc079be14a36176811a1a9462303f26d0c5313';
export const APP_TRACKING_ID = 'app-003';

export const CHAIN_ID = 8453;
export const CONTRACT_ADDRESS = '0x8f29714483F96B3877882FAD6D0A9b4af673F399' as const;
export const BASE_BUILDER_CODE = '';
export const BASE_BUILDER_CODE_HEX = BASE_BUILDER_CODE
  ? Hex.fromString(BASE_BUILDER_CODE)
  : '0x';

export const STATUS_LABELS = ['Todo', 'Doing', 'Done'] as const;

export const CONTRACT_ABI = [
  {
    inputs: [],
    name: 'taskCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32', name: '_content', type: 'bytes32' }],
    name: 'createTask',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes32[]', name: '_contents', type: 'bytes32[]' }],
    name: 'batchCreate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_id', type: 'uint256' },
      { internalType: 'uint8', name: '_status', type: 'uint8' },
    ],
    name: 'updateStatus',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_id', type: 'uint256' }],
    name: 'getTask',
    outputs: [
      { internalType: 'bytes32', name: '', type: 'bytes32' },
      { internalType: 'uint8', name: '', type: 'uint8' },
      { internalType: 'address', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_user', type: 'address' }],
    name: 'getUserTasks',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'id', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
      { indexed: false, internalType: 'bytes32', name: 'content', type: 'bytes32' },
    ],
    name: 'TaskCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'id', type: 'uint256' },
      { indexed: false, internalType: 'uint8', name: 'status', type: 'uint8' },
    ],
    name: 'TaskStatusUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'count', type: 'uint256' },
    ],
    name: 'TaskBatchCreated',
    type: 'event',
  },
] as const;
