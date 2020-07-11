import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/post";
import Spinner from "../layout/Spinner";

const Posts = () => {
  const storePost = useSelector((state) => state.post);
  const { post, loading } = storePost;
  const dispatch = useDispatch();
  useEffect(() => {
    function getData() {
      dispatch(getPosts());
    }
    getData();
  }, [dispatch]);
  return <Fragment></Fragment>;
};
export default Posts;
