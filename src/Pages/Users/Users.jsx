import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

const GET_USERS = gql`
    query GetUsers {
      users {
        data{
          id
          username
        }
      }
    }
`;

function Users() {
  const { loading, error, data } = useQuery(GET_USERS);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (data) {
      setUsers(data.users.data)
    }
  }, [data])
  return (
    <div>
      <ol>
        {users.map(user => {
          const { id, username } = user;
          return (
            <li key={id}>
              <Link to={`/user/${id}`}>
                <button>{username}</button>
              </Link>
            </li>)
        })}
      </ol>
    </div >
  )
}

export default Users;

