import React from 'react';
import { ProfileType } from '../../types/types';
import MypostsContainer from './Myposts/MypostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type PropsType = {}

let Profile: React.FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo 
      />
      <MypostsContainer /> 
    </div>
  );
}

export default Profile;
