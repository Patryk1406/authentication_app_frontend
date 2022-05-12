import React, {
  ChangeEvent, useContext, useEffect, useState,
} from 'react';
import { UserEntity } from 'types';
import {
  Button, Navbar, Table,
} from 'react-bootstrap';
import { AuthContext, IAuthContext } from '../../store/authContext';
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner';
import { useErrorModal } from '../../hooks/useErrorModal';
import { UserItem } from '../../components/UserItem/UserItem';
import { sendRequest } from '../../utils/send-request';
import { CustomAlert } from '../../components/Alerts/CustomAlert';

export function AdminaPanel() {
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
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

  const finishAction = () => {
    fetchUsers();
    setSelectedUsers([]);
    setShowAlert(true);
    window.setTimeout(() => setShowAlert(false), 1000);
  };

  const unblockSelectedUsers = async () => {
    setIsLoading(true);
    const res = await sendRequest('http://localhost:3001/user', 'PATCH', { Authorization: `Bearer ${token}` }, { ids: selectedUsers, block: false });
    if (!res.ok) {
      openModal();
    } else {
      finishAction();
    }
  };

  const blockSelectedUsers = async () => {
    setIsLoading(true);
    const res = await sendRequest('http://localhost:3001/user', 'PATCH', { Authorization: `Bearer ${token}` }, { ids: selectedUsers, block: true });
    if (!res.ok) {
      openModal();
    } else {
      finishAction();
    }
  };

  const deleteSelectedUsers = async () => {
    setIsLoading(true);
    const res = await sendRequest('http://localhost:3001/user', 'DELETE', { Authorization: `Bearer ${token}` }, { ids: selectedUsers });
    if (!res.ok) {
      openModal();
    } else {
      finishAction();
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      {modalElement}
      <CustomAlert show={showAlert} content="Operation completed successfully!" className="position-fixed start-50 top-0 translate-middle-x mt-2" dismissible={false} />
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
      <Navbar variant="dark" bg="dark" fixed="bottom" className="p-2 justify-content-center">
        <Button variant="primary" className="mx-2" onClick={unblockSelectedUsers}>Unblock selected users</Button>
        <Button variant="warning" className="mx-2" onClick={blockSelectedUsers}>Block selected users</Button>
        <Button variant="danger" className="mx-2" onClick={deleteSelectedUsers}>Delete selected users</Button>
      </Navbar>
    </>
  );
}
