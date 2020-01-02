import React, { useState, useEffect } from "react";

const Private = props => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/private", {
      headers: { Authorization: `Bearer ${props.auth.getAccessToken()}` }
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Response Status: " + response.status);
      })
      .then(response => setMessage(response.message))
      .catch(_ => setMessage("Response was not OK"));
  }, [props.auth]);

  return <p>{message}</p>;
};

export default Private;
