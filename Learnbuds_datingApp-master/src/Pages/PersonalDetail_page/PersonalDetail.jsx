import React from "react";
import PersonalStyles from "./PersonalDetails.module.css"
import LandingPage from "../LandingPage/LandingPage";

const PersonalDetail=()=>{
    

    return <>
    <LandingPage />
        <div className={PersonalStyles.modalOverlay} >
      <div className={PersonalStyles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={PersonalStyles.personalDetailsForm}>
          <h2>Personal Details</h2>
          <input type="text" placeholder="Age" />
          <input type="text" placeholder="DOB" />
          <input type="text" placeholder="Hobbies" />
          <input type="text" placeholder="Interests" />
          <input type="text" placeholder="Smoking Habits" />
          <input type="text" placeholder="Drinking Habits" />
          <input type="text" placeholder="Qualifications" />
          
          <div className={PersonalStyles.profilePicContainer}>
            <label htmlFor="profile-pic" className={PersonalStyles.circle}>
              <input type="file" id="profile-pic" accept="image/*" />
              <span className={PersonalStyles.icon}>🖼️</span>
            </label>
          </div>
          
          <div className={PersonalStyles.additionalImagesContainer}>
            <label htmlFor="image1" className={PersonalStyles.circle}>
              <input type="file" id="image1" accept="image/*" />
              <span className={PersonalStyles.icon}>🖼️</span>
            </label>
            <label htmlFor="image2" className={PersonalStyles.circle}>
              <input type="file" id="image2" accept="image/*" />
              <span className={PersonalStyles.icon}>🖼️</span>
            </label>
            <label htmlFor="image3" className={PersonalStyles.circle}>
              <input type="file" id="image3" accept="image/*" />
              <span className={PersonalStyles.icon}>🖼️</span>
            </label>
          </div>
          
          <div className={PersonalStyles.shortReelContainer}>
            <label htmlFor="short-reel" className={PersonalStyles.square}>
              <input type="file" id="short-reel" accept="video/*" />
              <span className={PersonalStyles.icon}>🎥</span>
            </label>
          </div>
          
          <button type="button">Next</button>
        </div>
      </div>
    </div>
      
    
    </>
}
export default PersonalDetail;