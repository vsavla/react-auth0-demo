import React, { Component } from "react";

class Public extends Component {
  state = {
    message: ""
  };

  componentDidMount() {
    fetch("/public")
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Response Status: " + response.status);
      })
      .then(response => this.setState({ message: response.message }))
      .catch(error => this.setState({ message: error }));
  }

  render() {
    return (
      <div>
        <h1>Public</h1>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default Public;
