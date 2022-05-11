import React, {
  ChangeEvent, useContext, useEffect, useState,
} from 'react';
import { UserEntity } from 'types';
import {
  Alert,
  Button, Navbar, Table,
} from 'react-bootstrap';
import { AuthContext, IAuthContext } from '../../store/authContext';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { useErrorModal } from '../../hooks/useErrorModal';
import { UserItem } from '../../components/UserItem/UserItem';
import { sendRequest } from '../../utils/send-request';

export function AdminaPanel() {
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalElement, openModal, setModalMessage] = useErrorModal();
  const { token } = useContext(AuthContext) as IAuthContext;

  const fetchUsers = async () => {
    setIsLoading(true);
    const res = await sendRequest('http://localhost:3001/user', 'GET', { Authorization: `Bearer ${token}` });
    if (!res.ok) {
      const message = await res.json();
      setModalMessage(message);
      setIsLoading(false);
      openModal();
    } else {
      const fetchedUsers = (await res.json() as { users: UserEntity[] }).users;
      setUsers(fetchedUsers);
      setIsLoading(false);
    }
  };

  const selectUser = (id: string) => {
    setSelectedUsers((prevState) => [...prevState, id]);
  };

  const unselectUser = (id: string) => {
    setSelectedUsers((prevState) => prevState.filter((userId) => userId !== id));
  };

  const checkBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const userId = e.target.value;
    if (selectedUsers.includes(e.target.value)) unselectUser(userId);
    else selectUser(userId);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteSelectedUsers = async () => {
    setIsLoading(true);
    const res = await sendRequest('http://localhost:3001/user', 'DELETE', { Authorization: `Bearer ${token}` }, { ids: selectedUsers });
    if (!res.ok) {
      openModal();
    } else {
      fetchUsers();
      alert('operation completed successfully!');
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      {modalElement}
      <Alert variant="danger">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      </Alert>
      <Navbar variant="dark" bg="dark" sticky="top" className=" p-2 justify-content-center">
        <Button variant="warning" className="mx-2">Block selected users</Button>
        <Button variant="danger" className="mx-2" onClick={deleteSelectedUsers}>Delete selected users</Button>
      </Navbar>
      <Table hover bordered size="sm" responsive>
        <thead className="text-center text-uppercase">
          <tr className="text-nowrap">
            <th>Select</th>
            <th>Id</th>
            <th>E-mail</th>
            <th>Name</th>
            <th>Last login at</th>
            <th>Registered at</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserItem key={user.id} user={user} checkBoxHandler={checkBoxHandler} />
          ))}
        </tbody>
      </Table>
    </>
  );
}
