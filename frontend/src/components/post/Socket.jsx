import React, { Component } from "react";

export default class StartSocket extends Component {
  static connect = () => {
    const Stomp = require("stompjs");
    let SockJS = require("sockjs-client");
    SockJS = new SockJS("http://103.253.147.216:8080/ws");
    return Stomp.over(SockJS);
  };
}
