import {Component} from '@angular/core';
import {Connection} from "./connection";
import {MqttService} from "../mqtt-service/mqttService";

@Component({
    selector: 'mqtt-source-input',
    template: `
        <div class="section no-pad-bot" id="index-banner">
            <div class="container">
                <div class="progress" *ngIf="loading">
                        <div class="indeterminate"></div>
                </div>
                <div class="row">
                    
                    <form class="col s12" (ngSubmit)="connect()">
                        <div class="row">
                            <div class="input-field col l5 s6">
                                <input id="host" type="text" class="validate" [(ngModel)]="connection.host" [disabled]="loading" required>
                                <label for="host" class="active">Host</label>
                            </div>
                            <div class="input-field col l2 s6">
                                <input id="port" type="number" class="validate" [(ngModel)]="connection.port" [disabled]="loading" required>
                                <label for="port" class="active">Port</label>
                            </div>
                            <div class="input-field col l4 s6">
                                <input id="topic" type="text" class="validate" [(ngModel)]="connection.topic" pattern="[^#]+" [disabled]="loading" required>
                                <label for="topic" class="active">Topic</label>
                            </div>
                            <div class="input-field col l1 s6">
                                <button class="waves-effect waves-light btn connect-button" [disabled]="loading">Connect</button>
                            </div>
                        </div>
                        <button type="button" class="waves-effect waves-light btn connect-button indigo lighten-5 black-text" (click)="showDemoHelp()">Show Demo Help</button>
                        <div [hidden]="!shouldShowDemoHelp">
                            <br>
                            NOTE: Wildcard topics and topics with anything else than number output are not supported
                            <br>
                            <br>
                            Click on topic suggestions to fill them in the form: 
                            <br>
                            <a class="link-hover" (click)="fillInExample1()">bjaanes/mock/home/temperature</a> 
                            <br>
                            <a class="link-hover" (click)="fillInExample2()">bjaanes/mock/street/car-speed</a> 
                            <br>
                            <a class="link-hover" (click)="fillInExample3()">bjaanes/mock/random10k</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    styles: [`
        a {
           cursor: hand;
        }
        
        button:disabled {
            background-color: grey;
        }
    `]
})
export class MqttSourceComponent {
    private static suggestedTestServer = "test.mosquitto.org";
    private static suggestedTestPort = 1883;
    private static suggestedTestTopic1 = "bjaanes/mock/home/temperature";
    private static suggestedTestTopic2 = "bjaanes/mock/street/car-speed";
    private static suggestedTestTopic3 = "bjaanes/mock/random10k";

    connection: Connection;
    public loading: boolean = false;
    public shouldShowDemoHelp: boolean = false;
    
    constructor(private mqttService: MqttService) {
        this.connection = new Connection(MqttSourceComponent.suggestedTestServer, MqttSourceComponent.suggestedTestPort, MqttSourceComponent.suggestedTestTopic1);
    }

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

    showDemoHelp() {
        this.shouldShowDemoHelp = !this.shouldShowDemoHelp;
    }

    fillInExample1() {
        this.connection = new Connection(MqttSourceComponent.suggestedTestServer, MqttSourceComponent.suggestedTestPort, MqttSourceComponent.suggestedTestTopic1);
    }
    fillInExample2() {
        this.connection = new Connection(MqttSourceComponent.suggestedTestServer, MqttSourceComponent.suggestedTestPort, MqttSourceComponent.suggestedTestTopic2);
    }
    fillInExample3() {
        this.connection = new Connection(MqttSourceComponent.suggestedTestServer, MqttSourceComponent.suggestedTestPort, MqttSourceComponent.suggestedTestTopic3);
    }
}