import React from "react";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  const skillsDOM = skills.map((skill, index) => (
    <div key={index} className="p-1">
      <i className="fa fa-check"></i>
      {skill}
    </div>
  ));
  return (
    <div class="profile-about bg-light p-2">
      <h2 class="text-primary">{name.trim().split(" ")[0]}'s Bio</h2>
      <p>{bio}</p>
      <div class="line"></div>
      <h2 class="text-primary">Skill Set</h2>
      <div class="skills">{skillsDOM}</div>
    </div>
  );
};
export default ProfileAbout;
