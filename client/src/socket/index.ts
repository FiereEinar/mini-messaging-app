import { io } from 'socket.io-client';

export const socket = io('ws://192.168.1.12:3000');
