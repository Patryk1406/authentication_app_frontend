// import React, { useState } from 'react';
// import { UserEntity } from '../../types/user.entity';
//
// interface Props {
//   user: UserEntity;
//   setAsSelected: (callBack: (previousState: string[]) => string[]) => void;
// }
//
// export function UserItem({ user, setAsSelected }: Props) {
//   const [ifSelected, setIfSelected] = useState<boolean>(true);
//
//   function changeSelection() {
//     setIfSelected((prev: boolean) => !prev);
//     if (ifSelected) {
//       setAsSelected((prev: string[]) => [...prev, user._id]);
//     } else setAsSelected((prev: string[]) => prev.filter((userId) => userId !== user._id));
//   }
//   return (
//     <tr>
//       <td className="text-center"><input type="checkbox" onChange={changeSelection} /></td>
//       <td>{user._id}</td>
//       <td>{user._email}</td>
//       <td>{user._name}</td>
//       <td>{user._lastLoginAt}</td>
//       <td>{user._registrationAt}</td>
//       <td>{user._isBlocked ? 'blocked' : 'unblocked'}</td>
//     </tr>
//   );
// }

export function f() {}
