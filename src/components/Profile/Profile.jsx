import React from 'react';
import MypostsContainer from './Myposts/MypostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

function Profile(props) {
  return (
    <div>
      <ProfileInfo 
        profile={props.profile} 
        isOwner={props.isOwner}
        status={props.status} 
        updateUserStatus={props.updateUserStatus} 
        savePhoto={props.savePhoto}
      />
      <MypostsContainer />
    </div>
  );
}

export default Profile;
