import { ID, Email } from '../utils/types';

export type User = {
  id: ID,
  email: Email,
  password: string
};

export type NewUser = Omit<User, 'id'>;


const ID_COUNTER_STORAGE_NAME = 'employee_id';

export const getUserIdCount = () => (localStorage.getItem(ID_COUNTER_STORAGE_NAME) || '1') as ID;
const setUserIdCount = (id: ID) => localStorage.setItem(ID_COUNTER_STORAGE_NAME, id);



const USERS_STORAGE_NAME = 'employees';

export const getUsers = (): User[] => JSON.parse(localStorage.getItem(USERS_STORAGE_NAME) || '[]');
const setUsers = (users: User[]) => localStorage.setItem(USERS_STORAGE_NAME, JSON.stringify(users));

export const addUser = (user: NewUser) => {
  const users = getUsers();
  const id = getUserIdCount();
  users.push({ ...user, id });
  setUsers(users);
  setUserIdCount(`${+id + 1}`);
  return user;
};

export const getUserById = (id: ID) => getUsers().find((u) => u.id === id);
export const getUserByEmail = (email: Email) => getUsers().find((u) => u.email === email);

export const checkUser = (u1: User) => getUsers().find((u2) => (u1.email === u2.email && u1.password === u2.password));



const CURRENT_USER_STORAGE_NAME = 'current-user';

export const setCurrentUser = (user: User) => localStorage.setItem(CURRENT_USER_STORAGE_NAME, JSON.stringify(user));
export const getCurrentUser = () => JSON.parse(localStorage.getItem(CURRENT_USER_STORAGE_NAME) || 'null');


export const clearUsers = () => {
  localStorage.removeItem(CURRENT_USER_STORAGE_NAME);
  setUsers([]);
  setUserIdCount('1');
};