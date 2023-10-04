import { useParams } from "react-router-dom";
import ProfileCover from "../features/profile/ProfileCover";
import ProfileInfo from "../features/profile/ProfileInfo";
import { useEffect, useState } from "react";
import axios from "../config/axios";
import { useAuth } from "../hooks/use-Auth";

export default function ProfilePage() {
  const [profileUser, setProfileUser] = useState({});
  const { profileId } = useParams();

  const { authUser} = useAuth()

  useEffect(() => {
    if(authUser.id === +profileId){
      setProfileUser(authUser)
    } else {
    axios
      .get(`/user/${profileId}`)
      .then((res) => {
        setProfileUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [profileId, authUser]);

  return (
    <div className=" bg-gradient-to-b from-gray-400 shadow pb-4">
      {profileUser ? (
        <>
          
          <ProfileCover coverImage={profileUser?.coverImage} />
          <ProfileInfo profileUser={profileUser} />
        </>
      ) : (
        <h1> 404 !!! user not found</h1>
      )}
    </div>
  );
}
