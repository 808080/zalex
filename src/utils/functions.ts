import { ColType, SortDir } from '../components/DataTable';
import { getUserByEmail } from '../mockDB/users';


export const isAvailableEmail = (email: string) => new Promise<boolean>((resolve) => {
  const user = getUserByEmail(email);
  return resolve(!user);
});

export const debounce = (func: Function, timeout = 300) => {
  let timer: number;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), timeout);
  };
};

export const sortFuncs: { [col in ColType]?: <T>(data: T[], dir: SortDir, col: keyof T) => T[] } = {
  date: <T extends Record<keyof T, any>>(data: T[], dir: SortDir, col: keyof T) => {
    data.sort((a, b) => {
      const timePrev = new Date(a[col]).getTime();
      const timeNext = new Date(b[col]).getTime();
      return dir === 'asc' ? timePrev - timeNext : timeNext - timePrev;
    });

    return data;
  },
  select: <T extends Record<keyof T, any>>(data: T[], dir: SortDir, col: keyof T) => {
    data.sort((a, b) => {
      return dir === 'asc' ? a[col].localeCompare(b[col]) : b[col].localeCompare(a[col]);
    });

    return data;
  }
};

export const filterFuncs: { [col in ColType]?: <T>(data: T[], val: string, col: keyof T) => T[] } = {
  numeric: <T extends Record<keyof T, any>>(data: T[], val: string, col: keyof T) => {
    const num = +val;
    return data.filter(r => r[col] === num);
  },
  text: <T extends Record<keyof T, any>>(data: T[], val: string, col: keyof T) => {
    return data.filter(r => r[col].toLowerCase().includes(val.toLowerCase()));
  },
  select: <T extends Record<keyof T, any>>(data: T[], val: string, col: keyof T) => {
    return data.filter(r => r[col].toLowerCase() === val.toLowerCase());
  },
};