import React from "react";
import Loader from "../../common/Loader/Loader";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userDefaultPhoto from '../../../assets/img/user-default.png';

function ProfileInfo(props) {
    if (!props.userInfo) {
        return <Loader />;
    }
    return (
        <div>
            <img src="https://sites.google.com/site/prirodanasevseegooglgfgf/_/rsrc/1463456237313/home/priroda_gory_nebo_ozero_oblaka_81150_1920x1080.jpg" />
            <div className={s.descriptionBlock}>
                <img src={props.userInfo.photos.large || userDefaultPhoto} width='225' height='225' alt="Avatar" />
                <ProfileStatusWithHooks 
                    status={props.status} 
                    updateUserStatus={props.updateUserStatus}
                />
            </div>
        </div>
    );
}

export default ProfileInfo;
