import {Connection} from "../mqtt-source-input/connection";

export class ConnectionInstance {
    constructor(public connection: Connection, public socket) {}
}