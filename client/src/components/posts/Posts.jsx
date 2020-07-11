import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";

import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = () => {
  const storePost = useSelector((state) => state.post);
  const { posts, loading } = storePost;
  const dispatch = useDispatch();
  useEffect(() => {
    function getData() {
      dispatch(getPosts());
    }
    getData();
  }, [dispatch]);
  return loading ? (
    <Spinner></Spinner>
  ) : (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i>Welcome to the community
      </p>
      <PostForm></PostForm>
      {posts.map((post) => (
        <PostItem key={post._id} post={post}></PostItem>
      ))}
    </Fragment>
  );
};
export default Posts;
