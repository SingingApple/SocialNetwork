import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../layout/Spinner";
import { getAllProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";

const Profiles = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.profile.loading);
  const profiles = useSelector((state) => state.profile.profiles);
  useEffect(() => {
    function getData() {
      dispatch(getAllProfiles());
    }
    getData();
  }, [dispatch]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Profiles;
