import React, { useState, useEffect } from "react";

const Profile = props => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    props.auth.getProfile((error, profile) => {
      setProfile(profile);
      setError(error);
    });
  }, [props.auth]);

  if (!profile) return null;

  return (
    <>
      {error ? <h1>Error: {error}</h1> : null}
      <h1>Profile</h1>
      <p>{profile.nickname}</p>
      <img
        style={{ maxWidth: 50, maxHeight: 50 }}
        src={profile.picture}
        alt="Profile Pic"
      />
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </>
  );
};

export default Profile;
