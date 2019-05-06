import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client, Server } from 'socket.io';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()

    handleConnection(client) {
        console.log(client.id + ' conectado...');
        client.emit('connection', 'Successfully connected to server');
        client.broadcast.emit('users', {
            user: client.id,
            action: 'connected'
        });
    }

    handleDisconnect(client) {
        console.log(client.id + ' desconectado...');
        client.broadcast.emit('users', {
            user: client.id,
            action: 'disconnected'
        });
    }

    @SubscribeMessage('chat')
    chat(client: any, data: any) {
        console.log(data);
        client.broadcast.emit('chat', data);
        return data;
    }

    @SubscribeMessage('users')
    users(client: any, data: any) {
        // client.broadcast.emit('users', data);
        return data;
    }
}