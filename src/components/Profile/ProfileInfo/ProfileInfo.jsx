import React from "react";
import Loader from "../../common/Loader/Loader";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from '../../../assets/img/user-default.png';

function ProfileInfo({profile, status, updateUserStatus, isOwner, savePhoto}) {
    if (!profile) {
        return <Loader />;
    }

    const mainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    return (
        <div>
            <img src="https://sites.google.com/site/prirodanasevseegooglgfgf/_/rsrc/1463456237313/home/priroda_gory_nebo_ozero_oblaka_81150_1920x1080.jpg" />
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={s.mainPhoto} alt="Avatar" />
                {isOwner && <input type="file" onChange={mainPhotoSelected}/>}
                <ProfileStatusWithHooks 
                    status={status} 
                    updateUserStatus={updateUserStatus}
                />
            </div>
        </div>
    );
}

export default ProfileInfo;