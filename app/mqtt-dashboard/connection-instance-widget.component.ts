import {Component, Input, AfterViewInit} from '@angular/core';
import {ConnectionInstance} from "../mqtt-service/connection-instance";

@Component({
    selector: 'connection-instance-widget',
    template: `
        <h4>{{connectionInstance.connection.topic}}</h4>
        <span *ngFor="let point of dataPoints">
            {{point}}
        </span>
    `
})
export class ConnectionInstanceWidgetComponent implements AfterViewInit {
    @Input('connection-instance') connectionInstance:ConnectionInstance;
    dataPoints:Array<string> = [];

    ngAfterViewInit() {
        console.log(this.connectionInstance);

        this.connectionInstance.socket.onmessage = (event) => {
            this.dataPoints.push(event.data);
        };
    }
}