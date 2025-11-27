import React, { useState, useEffect } from 'react';
import { getUsers } from '../api/usuarioService';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const data = await getUsers();
      setUsers(data);
    }
    loadUsers();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
