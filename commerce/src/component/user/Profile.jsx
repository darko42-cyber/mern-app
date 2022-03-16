import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import Loader from "../layout/loader/Loader";
import "./Profile.css"
const Profile = ({history}) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(()=>{
      if(isAuthenticated === false){
          history.push("/login")
      }
  }, [history, isAuthenticated])
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name}'s Profile `} />
          <div className="profileContainer">
            <div>
              <h1>User Profile</h1>
              <img src={user.avatar.url} alt="" />
              <Link to="/me/update">Update Profile</Link>
            </div>
            <div>
              <div>
                <h4> User Name </h4>
                <p> {user.name} </p>
              </div>
              <div>
                <h4> Email </h4>
                <p> {user.email} </p>
              </div>
              <div>
                <h4> Joined On </h4>
                <p> {String(user.createdAt).substr(0, 10)} </p>
              </div>
              <div>
                <Link to="/others"> My Oders </Link>
                <Link to="/password/update"> Change Password </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
