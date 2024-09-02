import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import { ProfileContext } from "../../StateManagement/ProfileContext";
import Profiles from "../Profiles/Profiles"; // Assuming Profiles component can handle filtering

const JobPage = () => {
  const { profileData } = useContext(ProfileContext);

  return (
    <section>
      <h1>Users with Your Job</h1>
      <Profiles filter="job" value={profileData.job} />
    </section>
  );
};

export default JobPage;
