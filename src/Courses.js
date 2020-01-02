import React, { useState, useEffect } from "react";

const Courses = props => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/courses", {
      headers: { Authorization: `Bearer ${props.auth.getAccessToken()}` }
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Response Status: " + response.status);
      })
      .then(response => setCourses(response.courses))
      .catch(_ => setError("Response was not OK"));
  }, [props.auth]);

  return (
    <>
      {error ? <h1>Error: {error}</h1> : null}
      <ul>
        {courses.map(course => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>
    </>
  );
};

export default Courses;
