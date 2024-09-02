import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import { ProfileContext } from "../../StateManagement/ProfileContext";
import Profiles from "../Profiles/Profiles"; // Assuming Profiles component can handle filtering

const QualificationPage = () => {
    const { profileData } = useContext(ProfileContext);

    
    return (
        <section>
            <h1>Users with Your Qualification</h1>
            <Profiles filter="qualification" value={profileData.qualification} />
        </section>
    );
};

export default QualificationPage;
