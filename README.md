# MQTT Dashboard

An MQTT Dashboard developed during Angular Attack 2016.

It allows you to monitor any MQTT topics in real time from anywhere (as long as they are available online)

![Screenshot](https://raw.githubusercontent.com/rumblex/angularattack2016-bjaanes/master/readme-images/Screenshot.png?token=ABSCaRbvAhFT-EnEtGnQu3_xmU7bVfUcks5XQfICwA%3D%3D "Screenshot")

## Demo

To demo this app, take a look at the site where this app was deployed during the hackathon:
http://bjaanes.2016.angularattack.io/

There are a few topics which can be connected to that will demonstrate how the app works:
Host: test.mosquitto.org
Port: 1883

Topic: bjaanes/mock/home/temperature
Random numbers meant to demonstrate temperature readings from a sensor

Topic: bjaanes/mock/street/car-speed
Random numbers mean to demonstrate a sensor showing speed of passing cars in your street

Topic: bjaanes/mock/random10k
Random numbers between 0 and 10000


You can also use any MQTT broker and topics you wish to use, but these should be populated every second or so with data.
You could for instance download MQTTfx, which is an MQTT client that allows you to connect to brokers and send data.
http://www.jensd.de/apps/mqttfx/

You can use any online available brokers to test this, for instance:
* test.mosquitto.org
* iot.eclipse.org

## Introduction to the project

### What is it?

The MQTT Dashboard allows the user to connect to any number of MQTT sources and topics and view the data the publish in real time.

The app is written mainly with Angular 2 and TypeScript.


#### What is MQTT?

MQTT is publish-subscribe light weight messaging protocol often used in IoT scenarios.

The protocol is based on one or more devices subscribing to “topics” and one or more devices publishing on “topics”. 
The subscribing devices get all messages for a specific topic that someone publishes on.

You also need a message broker to control the flow of all these messages.

In this case, the MQTT Dashboard can subscribe to many different brokers and topics at will.

A typical diagram of the MQTT architecture will look something like this:
![MQTT Architecture](https://raw.githubusercontent.com/rumblex/angularattack2016-bjaanes/master/readme-images/mqttdiagram.png?token=ABSCaR9n9dMfCKrFe0aRuBVWpx3JfhMyks5XQfImwA%3D%3D "MQTT Architecture")

For a little more information about MQTT and how I used it, take a look at a previous blog post I did about the subject:
http://gjermundbjaanes.com/smart-home-series-part-1-learning-mqtt-and-buying-stuff/

### How does it work?

The biggest technical challenge related to this app is the fact that most MQTT brokers do no support Websockets (some do, but that is not the most common today) and browsers do not support MQTT.

To solve this problem the app uses an MQTT Websocket bridge as it's backend. That means that the MQTT Dashboard connects to the backend with websockets, which deals with all the MQTT business that the browser cannot.

Such a bridge already exists, but did not work exactly like needed for the app, so another version with a few modifications has been created here:
https://github.com/bjaanes/mqtt-ws

The architecture for the app then looks something like this:

![MQTT Dashboard Architecture](https://raw.githubusercontent.com/rumblex/angularattack2016-bjaanes/master/readme-images/general-architecture.png?token=ABSCabtpsv6h-7TOZPzU5DW_ceyUQ53Eks5XQfJWwA%3D%3D "MQTT Dashboard Architecture")


### What makes it special?

Two things in particular:

1. Allowing to connect to MQTT sources that doesn't support Websockets natively.
2. Allowing to connect to any number of sources and topics and viewing them real time with graphs

This makes this app an easy solution to monitor your MQTT topics in real time in a convenient manner.


### Limitations

There are a few limitations that should be noted:

* Only topics which output numbers will work (otherwise nothing of value will be shown)
* Wildcard topics are not supported


### Possible future improvements

The following improvements were considered but did not make it into the app during the hackathon:

* Saving sources in local storage to persist between app instances
* Support wildcard topics
* Support different types of output from topics (text for instance)
* Different types of graphs for each MQTT topic
* Send MQTT messages to different topics and brokers in the app
* Add more information to a source connection (like units for data)
* More in-app help

## Development

### Setup

You need node.js and npm to install and run this app in development.

You also need an mqtt websocket bridge server, that can be found here:
https://github.com/bjaanes/mqtt-ws

To install, run:
```bash
npm install
```

To run the app:
```bash
npm start
```

To deploy the app with surge to bjaanes.2016.angularattack.io:
```bash
npm run deploy
```

To make a static built version in a temporary public folder:
```bash
node build.js
```



