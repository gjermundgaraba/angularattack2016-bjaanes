import {Component} from '@angular/core';
import {Connection} from "./connection";
import {MqttService} from "../mqtt-service/mqttService";

@Component({
    selector: 'mqtt-source-input',
    template: `
        <div class="section no-pad-bot" id="index-banner">
            <div class="container">
                <div class="row">
                    <form class="col s12">
                        <div class="row">
                            <div class="input-field col s5">
                                <input id="host" type="text" class="validate" [(ngModel)]="connection.host">
                                <label for="host">Host</label>
                            </div>
                            <div class="input-field col s2">
                                <input id="port" type="number" class="validate" [(ngModel)]="connection.port">
                                <label for="port">Port</label>
                            </div>
                            <div class="input-field col s4">
                                <input id="topic" type="text" class="validate" [(ngModel)]="connection.topic">
                                <label for="topic">Topic</label>
                            </div>
                            <div class="input-field col s1">
                                <a class="waves-effect waves-light btn" (click)="connect()">Connect</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `
})
export class MqttSourceComponent {
    connection = new Connection("test.mosquitto.org", 1883, "temp/random");
    
    constructor(private mqttService: MqttService) {}

    connect() {
        this.mqttService.connect(this.connection);
        
        this.connection = new Connection(this.connection.host, this.connection.port, "");
    }
}