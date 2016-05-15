import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';
import {ConnectionInstance} from "../mqtt-service/connection-instance";
@Directive({
    selector: '[mqttHighcharts]'
})
export class MqttHighchartsDirective implements AfterViewInit {

    @Input('mqttHighcharts') connectionInstance: ConnectionInstance;

    constructor(private element: ElementRef) {
    }

    ngAfterViewInit() {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        var ctrl = this;


        $(this.element.nativeElement).highcharts({
            chart: {
                type: 'spline',
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        ctrl.connectionInstance.socket.onmessage = (event) => {
                            var x = (new Date()).getTime(), // current time
                                y = parseInt(event.data),
                                shouldShift = series.data.length > 20;
                            series.addPoint([x, y], true, shouldShift);
                        };
                    }
                }
            },
            title: {
                text: ctrl.connectionInstance.connection.topic
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: ctrl.connectionInstance.connection.topic,
                data: []
            }]
        });
    }
}