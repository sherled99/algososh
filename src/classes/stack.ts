import { ElementStates } from "../types/element-states";

interface CharData<T> {
  letter: T;
  state: ElementStates;
}

export class Stack<T> {
  private data: CharData<T>[];
  private readonly maxSize: number;

  constructor(maxSize: number = Infinity) {
    this.data = [];
    this.maxSize = maxSize;
  }

  private setModifiedState(index: number) {
    setTimeout(() => {
      if (this.data[index - 1]?.state === ElementStates.Changing) {
        this.data[index - 1].state = ElementStates.Default;
      }
    }, 1000);
  }
  
  push(value: T) {
    if (this.data.length < this.maxSize) {
      const newData: CharData<T> = {
        letter: value,
        state: ElementStates.Changing,
      };
      this.data.push(newData);
      this.setModifiedState(this.data.length);
    }
  }

  pop() {
    if (this.data.length === 0) return;

    const lastIndex = this.data.length - 1;
    this.data[lastIndex].state = ElementStates.Changing;
    setTimeout(() => {
      this.data.pop();
      this.data.forEach((char) => {
        char.state = ElementStates.Default;
      });
    }, 1000);
  }

  clear() {
    this.data = [];
  }

  getElements(){
    return this.data;
  }

  getSize(): number {
    return this.data.length;
  }

  getMaxSize(): number {
    return this.maxSize;
  }
}