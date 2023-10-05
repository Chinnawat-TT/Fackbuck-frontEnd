import { useParams } from "react-router-dom";
import ProfileCover from "../features/profile/ProfileCover";
import ProfileInfo from "../features/profile/ProfileInfo";
import { useEffect, useState } from "react";
import axios from "../config/axios";
import { useAuth } from "../hooks/use-Auth";

export default function ProfilePage() {
  const [profileUser, setProfileUser] = useState({});
  const [statusWithAuthUser,setStatusWithAuthUser] = useState('')
  const [profileFriend,setProfileFriend] = useState([])
  const { profileId } = useParams();

  const { authUser} = useAuth()
  const isAuthUser = authUser.id === +profileId

  useEffect(() => {
  
    axios
      .get(`/user/${profileId}`)
      .then((res) => {
        setProfileUser(res.data.user);
        setStatusWithAuthUser(res.data.status)
        setProfileFriend(res.data.friends)
      })
      .catch((err) => {
        console.log(err);
      });
    
  }, [profileId]);

  return (
    <div className=" bg-gradient-to-b from-gray-400 shadow pb-4">
      {profileUser ? (
        <>
          
          <ProfileCover coverImage={isAuthUser ? authUser.coverImage : profileUser?.coverImage} />
          <ProfileInfo profileUser={isAuthUser ? authUser : profileUser} statusWithAuthUser={statusWithAuthUser} setStatusWithAuthUser={setStatusWithAuthUser} profileFriend={profileFriend}/>
        </>
      ) : (
        <h1> 404 !!! user not found</h1>
      )}
    </div>
  );
}
