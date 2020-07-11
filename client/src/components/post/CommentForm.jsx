import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  return (
    <Fragment>
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something....</h3>
        </div>
        <form
          className="form my-1"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(addComment({ text }, postId));
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
    </Fragment>
  );
};
export default CommentForm;
