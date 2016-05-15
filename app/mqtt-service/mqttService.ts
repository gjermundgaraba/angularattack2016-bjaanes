import {Injectable} from '@angular/core';
import {Connection} from "../mqtt-source-input/connection";
import {ConnectionInstance} from "./connection-instance";

@Injectable()
export class MqttService {
    private connectionInstances: Array<ConnectionInstance> = [];
    
    connect(connection: Connection) {

        return new Promise((resolve, reject) => {
            var socket = new WebSocket("ws://mqtt-ws-bridge.herokuapp.com/" + connection.topic + "?host=" + connection.host + "&port=" + connection.port);

            var num;

            socket.onerror = function (e) {
                var message = 'Socket failed for ' + connection.topic;
                Materialize.toast(message, 4000);

                if (typeof num !== 'undefined') {
                    this.connectionInstances.splice((num-1), 1);
                    num = undefined;
                }
                reject();
            };

            socket.onopen = () => {
                num = this.connectionInstances.push(new ConnectionInstance(connection, socket));
                resolve();
            };

            socket.onclose = () => {
                var message = 'Socket closed for ' + connection.topic;
                Materialize.toast(message, 4000);

                if (typeof num !== 'undefined') {
                    this.connectionInstances.splice((num-1), 1);
                    num = undefined;
                }
                resolve();
            };
        });

    }

    getConnectionInstance() {
        return this.connectionInstances;
    }
    
}