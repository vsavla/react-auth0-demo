import React, { useState, useEffect } from "react";

const Public = props => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/public")
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Response Status: " + response.status);
      })
      .then(response => setMessage(response.message))
      .catch(error => setMessage(error));
  }, []);

  return (
    <div>
      <h1>Public</h1>
      <p>{message}</p>
    </div>
  );
};

export default Public;
