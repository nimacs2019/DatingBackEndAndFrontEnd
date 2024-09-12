import React, { createContext, useState } from "react";

export const UsersProfileContext = createContext();

export const UsersProfileProvider = ({ children }) => {
    const [profiles, setProfiles] = useState([]);
    const [hiddenProfiles, setHiddenProfiles] = useState([]);

    const hideProfile = (profileId) => {
        setHiddenProfiles((prevHidden) => [...prevHidden, profileId]);
        setProfiles((prevProfiles) => prevProfiles.filter((profile) => profile._id !== profileId));
    };

    return (
        <UsersProfileContext.Provider value={{ profiles, setProfiles, hiddenProfiles, hideProfile }}>
            {children}
        </UsersProfileContext.Provider>
    );
};
