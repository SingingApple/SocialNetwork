import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import { getPost } from "../../actions/post";
import PostItem from "../posts/PostItem";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
const Post = ({ match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    function getData() {
      dispatch(getPost(match.params.id));
    }
    getData();
  }, [dispatch]);
  const { loading } = useSelector((state) => state.post);
  const post = useSelector((state) => state.post.post);
  return loading || post === null ? (
    <Spinner></Spinner>
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back
      </Link>
      <PostItem post={post} showActions={false}></PostItem>
      <CommentForm postId={post._id}></CommentForm>
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
            postId={post._id}
          ></CommentItem>
        ))}
      </div>
    </Fragment>
  );
};
export default Post;
