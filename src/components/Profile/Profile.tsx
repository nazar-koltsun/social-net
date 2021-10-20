import React from 'react';
import { ProfileType } from '../../types/types';
import MypostsContainer from './Myposts/MypostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type PropsType = {
  profile: ProfileType | null
  isOwner: boolean
  status: string
  updateUserStatus: (status: string) => void
  saveProfile: (profile: ProfileType) => Promise<void>
  savePhoto: (file: File) => void
}

let Profile: React.FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo 
        profile={props.profile} 
        isOwner={props.isOwner}
        status={props.status} 
        updateUserStatus={props.updateUserStatus} 
        saveProfile={props.saveProfile}
        savePhoto={props.savePhoto}
      />
      <MypostsContainer /> 
    </div>
  );
}

export default Profile;
