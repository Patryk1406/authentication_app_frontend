import React, { ChangeEvent } from 'react';
import { UserEntity } from 'types';
import { Form } from 'react-bootstrap';

interface Props {
  user: UserEntity;
  checkBoxHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function UserItem({ user, checkBoxHandler }: Props) {
  return (
    <tr className="text-nowrap">
      <td className="text-center"><Form.Check value={user.id} onChange={checkBoxHandler} /></td>
      <td>{user.id}</td>
      <td>{user.email}</td>
      <td>{user.name}</td>
      <td>{new Date(user.lastLoginAt as string).toLocaleString()}</td>
      <td>{new Date(user.registrationAt as string).toLocaleString()}</td>
      <td>{user.isBlocked ? 'blocked' : 'unblocked'}</td>
    </tr>
  );
}
