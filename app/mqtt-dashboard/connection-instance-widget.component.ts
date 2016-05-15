import {Component, Input} from '@angular/core';
import {ConnectionInstance} from "../mqtt-service/connection-instance";
import {MqttHighchartsDirective} from "./mqtt-highcharts.directive";

@Component({
    selector: 'connection-instance-widget',
    template: `
        <div id="container" [mqttHighcharts]="connectionInstance" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
    `,
    directives: [MqttHighchartsDirective]
})
export class ConnectionInstanceWidgetComponent {
    @Input('connection-instance') connectionInstance:ConnectionInstance;
    dataPoints:Array<string> = [];
}