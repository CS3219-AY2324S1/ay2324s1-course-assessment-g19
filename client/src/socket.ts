import { io } from 'socket.io-client';

export const socket = io({ path: '/collaboration-api/' });
