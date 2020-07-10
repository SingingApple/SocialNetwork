import React, { useEffect, Fragment } from "react";
import { withRouter, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExp from "./ProfileExp";
import ProfileEdu from "./ProfileEdu";

const Profile = ({ match, history }) => {
  const profile = useSelector((state) => state.profile);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getProfilebyId() {
      dispatch(getProfileById(match.params.id, history));
    }
    getProfilebyId();
  }, [dispatch, match.params.id, history]);
  return (
    <Fragment>
      {profile.profile === null || profile.loading ? (
        <Spinner></Spinner>
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            profile.profile.user._id === auth.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile.profile}></ProfileTop>
            <ProfileAbout profile={profile.profile}></ProfileAbout>
            <div className="profile-exp bg-white-p-2">
              <div className="text-primary">Experience</div>
              {profile.profile.experience.length > 0 ? (
                <Fragment>
                  {profile.profile.experience.map((exp) => (
                    <ProfileExp key={exp._id} experience={exp}></ProfileExp>
                  ))}
                </Fragment>
              ) : (
                <h4>No Experience</h4>
              )}
            </div>
            <div className="profile-edu bg-white-p-4">
              <div className="text-primary">Education</div>
              {profile.profile.education.length > 0 ? (
                <Fragment>
                  {profile.profile.education.map((edu) => (
                    <ProfileEdu key={edu._id} education={edu}></ProfileEdu>
                  ))}
                </Fragment>
              ) : (
                <h4>No Experience</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default withRouter(Profile);
