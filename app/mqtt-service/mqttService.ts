import {Injectable} from '@angular/core';
import {Connection} from "../mqtt-source-input/connection";
import {ConnectionInstance} from "./connection-instance";

@Injectable()
export class MqttService {
    private connectionInstances: Array<ConnectionInstance> = [];
    
    connect(connection: Connection) {
        var socket = new WebSocket("ws://mqtt-ws-bridge.herokuapp.com/" + connection.topic + "?host=" + connection.host + "&port=" + connection.port);
        this.connectionInstances.push(new ConnectionInstance(connection, socket));
    }

    getConnectionInstance() {
        return this.connectionInstances;
    }
    
}