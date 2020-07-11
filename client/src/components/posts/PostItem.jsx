import React, { Fragment } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addLike, removeLike } from "../../actions/post";
const PostItem = ({
  post: { _id, text, name, avatar, user, likes, comments, date },
}) => {
  const dispatch = useDispatch();
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <a href="profile.html">
          <img className="round-img" src={avatar} />
          <h4>{name}</h4>
        </a>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        <button
          type="button"
          onClick={() => dispatch(addLike(_id))}
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-up"></i>
          <span>{likes.length > 0 && likes.length}</span>
        </button>
        <button
          type="button"
          onClick={() => dispatch(removeLike(_id))}
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion{" "}
          <span className="comment-count">
            {comments.length > 0 && comments.length}
          </span>
        </Link>
        <button type="button" className="btn btn-danger">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};
export default PostItem;
