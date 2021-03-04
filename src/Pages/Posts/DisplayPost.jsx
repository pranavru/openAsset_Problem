import React, { useState } from 'react';
import Comment from '../Comments/Comment';
import { Link } from 'react-router-dom';
import Styles from './Post.module.css';

/**
 * The function is a reuable component to display each post
 * @param {object} post 
 * @returns {JSX.Element}
 */
function DisplayPost({ post, commentsDisplay }) {
  const { title, body, author: { name }, comments, id } = post;
  const [viewComment, setViewComment] = useState(false);
  const [firstTwoComments, _] = useState(comments && comments.splice(0, 2));
  return (
    <>
      {/** Post Container */}
      <div className={Styles.postContainer}>
        <p className={Styles.titleText}>{title}</p>
        <Link to={`/user/${id}`}>
          <p className={Styles.author}>Author: {name}</p>
        </Link>
        <p className={Styles.bodyText}>{body}</p>

        {commentsDisplay && <>
          {/** Button to toggle comments  */}
          <button
            type="button"
            onClick={() => setViewComment(viewComment => !viewComment)}
          >
            View Comments
        </button>

          {/** List of Comments per post - Comments Container */}
          {viewComment && <div className={Styles.commentsContainer}>
            <p className={Styles.commentTitleText}>Comments</p>
            {firstTwoComments.map((comment) => <Comment comment={comment} key={comment.id} />)}
          </div>}
        </>}

      </div>
    </>
  )
}

export default DisplayPost;
