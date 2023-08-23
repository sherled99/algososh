import { FC, useState, ChangeEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import style from "./queue-page.module.css";
import { Queue } from "../../classes/queue";


export const QueuePage: FC = () => {
  const [queue, setQueue] = useState<Queue>(new Queue());
  const [value, setValue] = useState<string>("");
  const [isAddDisabled, setIsAddDisabled] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [isRemove, setIsRemove] = useState<boolean>(false);

  const isRemoveDisabled = queue.isRemoveDisabled();
  const data = queue.getQueueData();

  useEffect(() => {
    if (queue.isAddDisabled()) setIsAddDisabled(true);
  }, [queue]);


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onAdd = () => {
    setIsAdd(true);
    queue.enqueue(value);

    setTimeout(() => {
      setQueue(queue);
      setValue("");
      setIsAdd(false);
    }, 1000);
  };

  const onRemove = () => {
    setIsRemove(true);
    queue.dequeue();

    setTimeout(() => {
      setQueue(queue);
      setIsRemove(false);
    }, 1000);
  };

  const onClear = () => {
    queue.clear();
    setIsAddDisabled(true);
    setTimeout(() => {
      setQueue(queue);
      setIsAddDisabled(false);
    }, 1000);
  };

  return (
    <SolutionLayout title="Очередь" data-testid="algorithm-page">
      <div className={style.main}>
        <Input
          isLimitText
          placeholder="Введите значение"
          maxLength={4}
          minLength={1}
          extraClass={style.input}
          onChange={onChange}
          disabled={isRemove || isAdd}
          value={value}
          data-testid="input"
        />
        <Button
          type="button"
          text="Добавить"
          isLoader={isAdd}
          onClick={onAdd}
          disabled={!value || isAddDisabled || isRemove || isAdd}
          extraClass={style.button}
          data-testid="add-button"
        />
        <Button
          type="button"
          text="Удалить"
          onClick={onRemove}
          isLoader={isRemove}
          disabled={isRemoveDisabled || isRemove || isAdd}
          extraClass={style.button}
          data-testid="remove-button"
        />
        <Button
          type="button"
          text="Очистить"
          onClick={onClear}
          disabled={isRemove || isAdd}
          extraClass={style.button}
          data-testid="clear-button"
        />
      </div>
      <div className={style.main}>
        {data.map((char, index) => (
          <div key={index}>
            <div className={style.subtitle}>
              {index === queue.getHead() ? <p className={style.label}>head</p> : <p></p>}
            </div>
            <div  data-testid={`circle-${index}`}>
              <Circle letter={char.letter} state={char.state} extraClass={style.circle} />
            </div>
            <span className={style.label}>{index}</span>
            <div>
              {index === queue.getTail() - 1 ? <p className={style.label}>tail</p> : <p></p>}
            </div>
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};