import React, { Component } from "react";

class Courses extends Component {
  state = {
    courses: [],
    error: ""
  };

  componentDidMount() {
    fetch("/courses", {
      headers: { Authorization: `Bearer ${this.props.auth.getAccessToken()}` }
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Response Status: " + response.status);
      })
      .then(response => this.setState({ courses: response.courses }))
      .catch(error => this.setState({ error: "Response was not OK" }));
  }

  render() {
    console.log(this.state.courses);
    return (
      <ul>
        {this.state.courses.map(course => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>
    );
  }
}

export default Courses;
