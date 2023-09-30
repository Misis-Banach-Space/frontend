// import { observable, action } from 'mobx';

// class ArrayStore {
//     array1 : { data: number; timestamp: string; url: string}[];
//     array2 : { data: number; timestamp: string; url: string}[];

//     constructor() {
//         this.array1 = observable([]);
//         this.array2 = observable([]);
//         this.updateArrays = action(this.updateArrays.bind(this));
//     }

//     updateArrays(newArray1: { data: number; timestamp: string; url: string}[], newArray2: { data: any; timestamp: string; url: string}[]) {
//         this.array1 = [...newArray1];
//         this.array2 = [...newArray2];
//     }
// }

// export default new ArrayStore();

import { observable, action } from 'mobx';

class ArrayStore {
    array1 : { data: number; timestamp: string; url: string}[];
    array2 : { data: number; timestamp: string; url: string}[];

    constructor() {
        this.array1 = observable([]);
        this.array2 = observable([]);
        this.updateArrays = action(this.updateArrays.bind(this));
    }

    updateArrays(newArray1: { data: number; timestamp: string; url: string}[], newArray2: { data: any; timestamp: string; url: string}[]) {
        this.array1 = [...newArray1];
        this.array2 = [...newArray2];
    }
}

export default new ArrayStore();