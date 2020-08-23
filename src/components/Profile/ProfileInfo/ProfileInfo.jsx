import React from "react";
import Loader from "../../common/Loader/Loader";
import s from "./ProfileInfo.module.css";

function ProfileInfo(props) {
    if (!props.userInfo) {
        return <Loader />;
    }
    return (
        <div>
            <img src="https://sites.google.com/site/prirodanasevseegooglgfgf/_/rsrc/1463456237313/home/priroda_gory_nebo_ozero_oblaka_81150_1920x1080.jpg" />
            <div className={s.descriptionBlock}>
                <img src={props.userInfo.photos.large} alt="Avatar" />
                <strong style={{ display: "block" }}>
                    Name: {props.userInfo.fullName}
                </strong>
                <p>About me: {props.userInfo.aboutMe}</p>
                <p>
                  <span>
                    Робота(статус):  
                  </span>
                  <span>
                    {props.userInfo.lookingForAJob ? 'Шукаю' : 'Ні, яка робота? Йдем на пиво))'}
                  </span>
                </p>
            </div>
        </div>
    );
}

export default ProfileInfo;
