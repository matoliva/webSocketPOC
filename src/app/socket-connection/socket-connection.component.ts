import { Component, OnInit } from '@angular/core';
import { webSocket } from "rxjs/webSocket";

@Component({
  selector: 'app-connection-socket',
  templateUrl: './socket-connection.component.html',
  styleUrls: ['./socket-connection.component.css']
})
export class SocketConnectionComponent implements OnInit {

  server = 'wss://echo.websocket.org';
  message = '';
  messageReceived : string[] = [];
  messageSent : string[] = [];

  subject = webSocket(this.server);

  constructor() { }

  ngOnInit() {

    this.subject.subscribe(
      (msg: any) => {this.messageReceived.push(msg); console.log(this.messageReceived);}, // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }

  sendMessage() {
    this.messageSent.push(this.message);
    this.subject.next(this.message);
    this.message = '';
  }

}
