import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGithubRepos } from "../../actions/profile";
import Spinner from "../layout/Spinner";

const ProfileGithub = ({ username }) => {
  const dispatch = useDispatch();
  const repos = useSelector((state) => state.profile.repos);
  useEffect(() => {
    function getGithub() {
      dispatch(getGithubRepos(username));
    }
    getGithub();
  }, [dispatch]);
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos === null ? (
        <Spinner></Spinner>
      ) : (
        repos.map((repo) => (
          <div key={repo._id} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </h4>
              <p className="repo description">{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">
                  Stars: {repo.stargazers_count}
                </li>

                <li className="badge badge-dark">
                  Watcher: {repo.watchers_count}
                </li>

                <li className="badge badge-primary">
                  Forks: {repo.forks_count}
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
export default ProfileGithub;
