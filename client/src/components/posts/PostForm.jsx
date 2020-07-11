import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../actions/post";
import { set } from "mongoose";

const PostForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something....</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addPost({ text }));
          setText("");
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          value={text}
          placeholder="Create a Post"
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input type="submit" value="Submit" className="btn btn-dark my-1" />
      </form>
    </div>
  );
};
export default PostForm;
