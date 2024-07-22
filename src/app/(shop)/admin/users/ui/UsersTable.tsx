'use client';

import { changeUserRole } from '@/actions';
import type { User } from '@/interfaces';

interface Props {
  users: User[];
  session: any
}

export const UsersTable = ({ users, session }: Props) => {

  return (
    <table className="min-w-full">
      <thead className="bg-gray-200 border-b">
        <tr>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Email
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Nombre completo
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            Role
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
            key={user.id}
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {user.email}
            </td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {user.name}
            </td>
            <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              { user.id !== session?.user.id ?
              <select
                className="text-sm text-gray-900 w-full p-2"
                value={user.role}
                onChange={(e) => changeUserRole(user.id,e.target.value)}
              >
                <option value="admin" className="p-2">
                  Admin
                </option>
                <option value="user" className="p-2">
                  User
                </option>
              </select>
              :
              <span className="text-sm text-gray-400 w-full p-2 pl-3">
                Admin
              </span>
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
