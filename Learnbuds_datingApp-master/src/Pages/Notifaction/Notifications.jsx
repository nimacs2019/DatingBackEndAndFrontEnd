import React from "react";
import { HiOutlineBell } from "react-icons/hi";
import style from "./Notifications.module.css";
import NotificationNews from "../../Components/Notifications/NotificationMessage";
import { useNavigate } from "react-router-dom";

const Notifications = ({ setNotificationView }) => {
    const navigate = useNavigate();

    const handleRequestClick = () => {
        console.log("Request message clicked");
        navigate("/received");
        setNotificationView(false);
    };
    return (
        <section className={style.container}>
            <div className={style["bell-btn-ctn"]}>
                <button className={style["bell-btn"]} onClick={() => setNotificationView(false)}>
                    <HiOutlineBell className={style["bell-btn-sym"]} />
                </button>
            </div>
            <div className={style["message-container"]}>
                <NotificationNews type={{ Name: "Request", Title: "Request Message" }} onClick={handleRequestClick} />
                <NotificationNews type={{ Name: "Alert", Title: "Alert Message" }} />
                <NotificationNews type={{ Name: "Error", Title: "Error Message" }} />
                <NotificationNews type={{ Name: "News", Title: "News", Description: "lorem3 c n njbx" }} />
                <NotificationNews type={{ Name: "Success", Title: "Successs message" }} />
            </div>
        </section>
    );
};

export default Notifications;
