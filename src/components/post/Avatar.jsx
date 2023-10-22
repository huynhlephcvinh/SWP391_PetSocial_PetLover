import React, { Component } from "react";
// import Guest from "../profilewall/assets/guest.jpeg"
// import {API_URL} from '../../Constants'
export default class Avatar extends Component {
  handleError = (e) => {
    e.target.src =
      "https://th.bing.com/th/id/OIP.prDHL3OFxEzMRZ28kVxBPgHaHa?pid=ImgDet&rs=1";
  };

  render() {
    return (
      <div className="cmt-avatar">
        <img
          src={"http://localhost:8080" + "/avatar/" + this.props.username}
          onError={this.handleError}
          alt="avatar"
        />
      </div>
    );
  }
}
