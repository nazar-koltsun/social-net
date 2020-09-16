import React from 'react';
import MypostsContainer from './Myposts/MypostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

function Profile(props) {
  return (
    <div>
      <ProfileInfo 
        userInfo={props.userInfo} 
        status={props.status} 
        updateUserStatus={props.updateUserStatus} 
      />
      <MypostsContainer />
    </div>
  );
}

export default Profile;
