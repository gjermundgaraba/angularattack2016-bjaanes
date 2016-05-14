import {Component} from '@angular/core';
import {MqttService} from "../mqtt-service/mqttService";
import {ConnectionInstanceWidgetComponent} from "./connection-instance-widget.component";

@Component({
    selector: 'mqtt-dashboard',
    template: `
        <div class="container">
            <div *ngFor="let connection of connectionInstances()" class="section">
                <connection-instance-widget [connection-instance]="connection"></connection-instance-widget>
            </div>
        </div>
    `,
    directives: [ConnectionInstanceWidgetComponent]
})
export class MqttDashboardComponent {
    constructor(private mqttService: MqttService) {}
    
    connectionInstances() {
        return this.mqttService.getConnectionInstance();
    }
}