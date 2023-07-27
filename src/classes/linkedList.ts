import { ElementStates } from "../types/element-states";

interface CharData<T> {
  letter: T;
  state: ElementStates;
}

interface LinkedListNode<T> {
  value: T;
  state: ElementStates;
  next: LinkedListNode<T> | null;
}

export class LinkedList<T> {
  private head: LinkedListNode<T> | null;
  private tail: LinkedListNode<T> | null;
  private size: number;
  private data: CharData<T>[];

  constructor(maxSize: number = Infinity) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.data = [];
  }

  private updateData() {
    const newData: CharData<T>[] = [];
    let currentNode = this.head;
    while (currentNode) {
      newData.push({ letter: currentNode.value, state: currentNode.state });
      currentNode = currentNode.next;
    }
    this.data = newData;
  }

  prepend(value: T) {
    const newNode: LinkedListNode<T> = { value, state: ElementStates.Default, next: this.head };
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
    this.size++;
    this.updateData();
  }

  append(value: T) {
    const newNode: LinkedListNode<T> = { value, state: ElementStates.Default, next: null };
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.size++;
    this.updateData();
  }

  addByIndex(index: number, value: T) {
    if (index < 0 || index > this.size) return;

    if (index === 0) {
      this.prepend(value);
    } else if (index === this.size) {
      this.append(value);
    } else {
      let currentNode = this.head;
      for (let i = 1; i < index; i++) {
        currentNode = currentNode!.next;
      }

      const newNode: LinkedListNode<T> = { value, state: ElementStates.Default, next: currentNode!.next };
      currentNode!.next = newNode;
      this.size++;
      this.updateData();
    }
  }

  deleteByIndex(index: number) {
    if (index < 0 || index >= this.size) return;

    if (index === 0) {
      this.deleteHead();
    } else if (index === this.size - 1) {
      this.deleteTail();
    } else {
      let currentNode = this.head;
      for (let i = 1; i < index; i++) {
        currentNode = currentNode!.next;
      }

      currentNode!.next = currentNode!.next!.next;
      this.size--;
      this.updateData();
    }
  }

  deleteHead() {
    if (!this.head) return;

    this.head = this.head.next;
    this.size--;
    this.updateData();
  }

  deleteTail() {
    if (!this.tail) return;

    if (!this.head!.next) {
      this.head = null;
      this.tail = null;
    } else {
      let currentNode = this.head;
      while (currentNode!.next!.next) {
        currentNode = currentNode!.next;
      }
      currentNode!.next = null;
      this.tail = currentNode;
    }
    this.size--;
    this.updateData();
  }

  toArray(): T[] {
    const arr: T[] = [];
    let currentNode = this.head;
    while (currentNode) {
      arr.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return arr;
  }

  getElements() {
    return this.data;
  }
}