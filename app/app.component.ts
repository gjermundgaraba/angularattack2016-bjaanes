import {Component} from '@angular/core';
import {MqttSourceComponent} from "./mqtt-source-input/mqtt-source-input.component";
import {HeaderComponent} from "./header/header.component";
import {MqttDashboardComponent} from "./mqtt-dashboard/mqtt-dashboard.component";
import {MqttService} from "./mqtt-service/mqttService";


@Component({
    selector: 'my-app',
    template: `
        <app-header></app-header>
        <mqtt-source-input></mqtt-source-input>
        <mqtt-dashboard></mqtt-dashboard>
    `,
    providers: [MqttService],
    directives: [MqttSourceComponent, HeaderComponent, MqttDashboardComponent]
})
export class AppComponent {
}