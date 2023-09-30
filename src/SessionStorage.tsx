// sessionStorage.js
// Define your session storage keys
const ARRAY1_KEY = 'array1';
const ARRAY2_KEY = 'array2';

// Get data from session storage
const getItem = (key:string) => {
  const item = sessionStorage.getItem(key);
  return item ? JSON.parse(item) : [];
};

// Set data in session storage
const setItem = (key:string, value:any) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const sessionArray1 = {
    get: (): { data: number; timestamp: string; url: string }[] => getItem(ARRAY1_KEY),
    set: (value: { data: number; timestamp: string; url: string }[]) => setItem(ARRAY1_KEY, value),
  };
  
  export const sessionArray2 = {
    get: (): { data: number; timestamp: string; url: string }[] => getItem(ARRAY2_KEY),
    set: (value: { data: number; timestamp: string; url: string }[]) => setItem(ARRAY2_KEY, value),
  };