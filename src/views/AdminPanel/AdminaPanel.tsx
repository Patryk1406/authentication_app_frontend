import React, { useEffect, useState } from 'react';
import { UserItem } from '../../components/UserIte/UserItem';
import { UserEntity } from '../../types/user.entity';

interface Props {
  token: string
  setToken: (newValue: string) => void;
}

export function AdminaPanel({
  setToken, token,
}: Props) {
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [selectedUsersId, setSelectedUsersId] = useState<string[]>([]);

  async function fetchUsers() {
    const res = await fetch('https://itransition-app.herokuapp.com/user', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data.redirect) {
      setToken('');
    } else {
      setUsers(data.users);
    }
  }

  async function blockOrUnblockSelectedUsers(block: boolean) {
    const res = await fetch('https://itransition-app.herokuapp.com/user', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: selectedUsersId, block }),
    });
    const data = await res.json();
    if (data.redirect) {
      setToken('');
    } else {
      await fetchUsers();
    }
  }

  async function deleteSelectedUsers() {
    console.log(JSON.stringify({ ids: selectedUsersId }));
    const res = await fetch('https://itransition-app.herokuapp.com/user', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: selectedUsersId }),
    });
    const data = await res.json();
    if (data.redirect) {
      setToken('');
    } else {
      await fetchUsers();
      setSelectedUsersId([]);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [token]);

  if (!token) {
    return null;
  }

  return (
    <form>
      <ul>
        <button onClick={() => blockOrUnblockSelectedUsers(true)} type="button">Block</button>
        <button onClick={() => blockOrUnblockSelectedUsers(false)} type="button">Unblock</button>
        <button onClick={deleteSelectedUsers} type="button">Delete</button>
      </ul>
      <table>
        <thead>
          <tr>
            <th>Action</th>
            <th>Id</th>
            <th>E-mail</th>
            <th>Name</th>
            <th>Last login time</th>
            <th>Registration time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user) => (
              <UserItem key={user._id} user={user} setAsSelected={setSelectedUsersId} />
            ))
          }
        </tbody>
      </table>
    </form>
  );
}
