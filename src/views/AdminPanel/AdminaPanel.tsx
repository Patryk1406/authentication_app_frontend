// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ListGroup, Table } from 'react-bootstrap';
// import { UserItem } from '../../components/UserItem/UserItem';
// import { UserEntity } from '../../types/user.entity';
//
// interface Props {
//   token: string
//   setToken: (newValue: string) => void;
// }
//
// export function AdminaPanel({
//   setToken, token,
// }: Props) {
//   const [users, setUsers] = useState<UserEntity[]>([]);
//   const [selectedUsersId, setSelectedUsersId] = useState<string[]>([]);
//   const navigate = useNavigate();
//
//   async function fetchUsers() {
//     const res = await fetch('https://itransition-app.herokuapp.com/user', {
//       method: 'GET',
//       cache: 'no-cache',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const data = await res.json();
//     if (data.redirect) {
//       localStorage.removeItem('token');
//       setToken('');
//       navigate('/');
//     } else {
//       setUsers(data.users);
//     }
//   }
//
//   async function blockOrUnblockSelectedUsers(block: boolean) {
//     const res = await fetch('https://itransition-app.herokuapp.com/user', {
//       method: 'PATCH',
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ ids: selectedUsersId, block }),
//     });
//     const data = await res.json();
//     if (data.redirect) {
//       localStorage.removeItem('token');
//       setToken('');
//       navigate('/');
//     } else {
//       await fetchUsers();
//     }
//   }
//
//   const deleteSelectedUsers = async () => {
//     const res = await fetch('https://itransition-app.herokuapp.com/user', {
//       method: 'DELETE',
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ ids: selectedUsersId }),
//     });
//     const data = await res.json();
//     if (data.redirect) {
//       localStorage.removeItem('token');
//       setToken('');
//       navigate('/');
//     } else {
//       await fetchUsers();
//       setSelectedUsersId([]);
//     }
//   };
//
//   useEffect(() => {
//     setToken(localStorage.getItem('token') || '');
//     if (token) {
//       fetchUsers();
//     }
//   }, [token]);
//
//   if (!token) {
//     return null;
//   }
//
//   return (
//     <>
//       <ListGroup horizontal className="text-center">
//         <ListGroup.Item action as="button" onClick={() => blockOrUnblockSelectedUsers(true)}>Block selected users</ListGroup.Item>
//         <ListGroup.Item action as="button" onClick={() => blockOrUnblockSelectedUsers(false)}>Unblock selected users</ListGroup.Item>
//         <ListGroup.Item action onClick={deleteSelectedUsers}>Delete selected users</ListGroup.Item>
//       </ListGroup>
//       <Table bordered responsive striped>
//         <thead>
//           <tr className="text-center">
//             <th>Action</th>
//             <th className="text-uppercase">Id</th>
//             <th>E-mail</th>
//             <th>Name</th>
//             <th>Last login time</th>
//             <th>Registration time</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {
//             users.map((user) => (
//               <UserItem key={user._id} user={user} setAsSelected={setSelectedUsersId} />
//             ))
//           }
//         </tbody>
//       </Table>
//     </>
//   );
// }

export function fu() {}
