// ArrayStore.ts

import { sessionArray1, sessionArray2 } from './SessionStorage';

class ArrayStore {
  array1: { data: number; timestamp: string; url: string }[];
  array2: { data: number; timestamp: string; url: string }[];

  constructor() {
    this.array1 = sessionArray1.get();
    this.array2 = sessionArray2.get();
  }

  updateArrays(newArray1: { data: number; timestamp: string; url: string }[], newArray2: { data: number; timestamp: string; url: string }[]) {
    this.array1 = [...newArray1];
    this.array2 = [...newArray2];
    sessionArray1.set(this.array1);
    sessionArray2.set(this.array2);
  }
  updateArraysLater(newArray1: { data: number; timestamp: string; url: string }[], newArray2: { data: number; timestamp: string; url: string }[]) {
    this.updateArrays(newArray1, newArray2);
  }
}

export default new ArrayStore();
