import React, { useContext } from "react";
import { ProfileContext } from "../../StateManagement/ProfileContext";
import Profiles from "../Profiles/Profiles"; // Assuming Profiles component can handle filtering

const LocationPage = () => {
  const { profileData } = useContext(ProfileContext);

  return (
    <section>
      <h1>Users Near You</h1>
      <Profiles filter="location" value={profileData.dist} />
    </section>
  );
};

export default LocationPage;
