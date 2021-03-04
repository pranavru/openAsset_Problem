import React from 'react'
import Styles from './Comment.module.css';

/**
 * 
 * @typedef {object} comment
 * @property {string} id
 * @property {string} body
 */
/**
 * The function is a reusable component to display each comment
 * @param {comment} comment 
 * @returns {JSX.Element}
 */
const Comment = ({ comment }) => {
  const { body } = comment
  return (
    <div className={Styles.commentContainer}>
      <p className={Styles.commentText}>&#9658; {body}</p>
    </div>
  )
}

export default Comment;
