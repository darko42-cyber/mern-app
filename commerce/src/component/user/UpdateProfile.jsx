import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import MailOutlined from "@material-ui/icons/MailOutlined";

import FaceIcon from "@material-ui/icons/Face";

import { useSelector, useDispatch } from "react-redux";
import {
 
  clearErrors,
  loadUser,
  updateProfile,
} from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../layout/loader/Loader";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";
import MetaData from "../layout/MetaData";

const UpdateProfile = ({ history }) => {
  const { user } = useSelector((state) => state.user);
  const { isUpdated, error, loading } = useSelector((state) => state.profile);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const dispatch = useDispatch();
  const alert = useAlert();
  const updateSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      console.log(reader);
      reader.onload = () => {
        if (reader.readyState === 2) setAvatarPreview(reader.result);
        setAvatar(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      alert.error(error);

      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());
      history.push("/account");
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, alert, error,isUpdated, history, user]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>
              <form className="updateProfileForm" onSubmit={updateSubmit}>
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <MailOutlined />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                  />
                </div>
                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="AvatarPreview" />
                  <input
                    type="file"
                    accept="image/*"
                    name="avatar"
                    onChange={updateDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                  disabled={loading ? true : false}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
