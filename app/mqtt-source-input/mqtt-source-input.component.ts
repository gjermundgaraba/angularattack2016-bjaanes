import {Component} from '@angular/core';
import {Connection} from "./connection";
import {MqttService} from "../mqtt-service/mqttService";

@Component({
    selector: 'mqtt-source-input',
    template: `
        <div class="section no-pad-bot" id="index-banner">
            <div class="container">
                <div class="row">
                    <form class="col s12" (ngSubmit)="connect()">
                        <div class="row">
                            <div class="input-field col m5 s6">
                                <input id="host" type="text" class="validate" [(ngModel)]="connection.host" required>
                                <label for="host" class="active">Host</label>
                            </div>
                            <div class="input-field col m2 s6">
                                <input id="port" type="number" class="validate" [(ngModel)]="connection.port" required>
                                <label for="port" class="active">Port</label>
                            </div>
                            <div class="input-field col m4 s6">
                                <input id="topic" type="text" class="validate" [(ngModel)]="connection.topic" pattern="[^#]+" required>
                                <label for="topic" class="active">Topic</label>
                            </div>
                            <div class="input-field col m1 s6">
                                <button class="waves-effect waves-light btn" [disabled]="loading">Connect</button>
                            </div>
                        </div>
                        * NOTE: Wildcard topics and topics with anything else than numbers are not supported
                    </form>
                    <div class="progress" *ngIf="loading">
                        <div class="indeterminate"></div>
                    </div>
                </div>
                
            </div>
        </div>
    `
})
export class MqttSourceComponent {
    connection = new Connection("test.mosquitto.org", 1883, "bjaanes/mock/home/temperature");
    public loading: boolean = false;
    
    constructor(private mqttService: MqttService) {}

    connect() {
        this.loading = true;
        this.mqttService.connect(this.connection)
            .then(() => {
                this.loading = false;
            })
            .catch(() => {
                this.loading = false;
            });
        
        this.connection = new Connection(this.connection.host, this.connection.port, "");
    }
}