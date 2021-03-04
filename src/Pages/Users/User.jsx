import { gql } from 'apollo-boost';
import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-apollo';
import { Link, useParams } from 'react-router-dom';
import Styles from './User.module.css'

let id = 0;


function User() {
  const GET_USER_DETAILS = gql`
    query GetDetails {
      user(userId: ${useParams().id}) {
        id
        username
        posts {
          id
          body
          author { 
            name
          }
        }
    }
  }`;
  const [user, setUser] = useState(null);
  const { loading, error, data } = useQuery(GET_USER_DETAILS);

  useEffect(() => {

    if (data) {
      setUser(data.user);
      console.log(data.user)
    }
  }, [data])

  if (!loading && user) {
    const { posts, username } = user;
    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '3%' }}>
          <p>Username: {username}</p>
          <Link to="/" >
            <button>Home</button>
          </Link>
        </div>
        <p style={{ textAlign: 'center', width: '100%' }}>Posts</p>
        {posts.slice(0, 15).map((post) => {
          const { author: { name }, body } = post;

          return (
            < div className={Styles.postContainer} >
              <p className={Styles.author}>Author: {name}</p>
              <p className={Styles.bodyText}>{body}</p>

            </div>

          )
        })}
      </div >
    )
  }
  return <div></div>
}

export default User;