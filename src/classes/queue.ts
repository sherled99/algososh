import { ElementStates } from "../types/element-states";

interface CharData {
  letter: string | undefined;
  state: ElementStates;
}

interface QueueInterface {
  enqueue(value: string): void;
  dequeue(): void;
  clear(): void;
  getQueueData(): CharData[];
  isAddDisabled(): boolean;
  isRemoveDisabled(): boolean;
  getHead(): number;
  getTail(): number;
}


export class Queue implements QueueInterface {
  private static readonly DEFAULT_QUEUE_SIZE = 7;
  private data: CharData[];
  private head: number;
  private tail: number;

  constructor(size: number = Queue.DEFAULT_QUEUE_SIZE) {
    this.data = Array.from({ length: size }, () => ({
      letter: undefined,
      state: ElementStates.Default,
    }));
    this.head = 0;
    this.tail = 0;
  }

  private setModifiedState(index: number) {
    setTimeout(() => {
      if (this.data[index].state === ElementStates.Changing) {
        this.data[index].state = ElementStates.Default;
      }
    }, 1000);
  }

  enqueue(value: string) {
    if (value && this.tail < this.data.length) {
      this.data[this.tail].letter = value;
      this.data[this.tail].state = ElementStates.Changing;
      this.setModifiedState(this.tail);
      this.tail += 1;
    }
  }

  dequeue() {
    if (this.head === this.tail) return;

    this.data[this.head].state = ElementStates.Changing;
    this.data[this.head].letter = undefined;
    this.setModifiedState(this.head);
    this.head += 1;
  }

  clear() {
    this.data = Array.from({ length: this.data.length }, () => ({
      letter: undefined,
      state: ElementStates.Default,
    }));
    this.head = 0;
    this.tail = 0;
  }

  getQueueData() {
    return this.data;
  }

  isAddDisabled() {
    return this.tail === this.data.length;
  }

  isRemoveDisabled() {
    return this.head === this.tail;
  }

  getHead(){
    return this.head
  }

  getTail(){
    return this.tail
  }
}
