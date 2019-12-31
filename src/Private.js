import React, { Component } from "react";

class Private extends Component {
  state = {
    message: ""
  };

  componentDidMount() {
    fetch("/private", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Response Status: " + response.status);
      })
      .then(response => this.setState({ message: response.message }))
      .catch(error => this.setState({ message: "Response was not OK" }));
  }

  render() {
    return <p>{this.state.message}</p>;
  }
}

export default Private;
