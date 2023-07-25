import { FC, useState, ChangeEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";
import style from "./queue-page.module.css";

interface CharData {
  letter: string | undefined;
  state: ElementStates;
}

export const QueuePage: FC = () => {
  const [data, setData] = useState<CharData[]>(
    Array.from({ length: 7 }, () => ({
      letter: undefined,
      state: ElementStates.Default,
    }))
  );
  const [value, setValue] = useState<string>("");
  const [head, setHead] = useState<number>(0);
  const [tail, setTail] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (tail !== data.length) setIsAddDisabled(false);
  }, [tail, data]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onAdd = () => {
    setIsLoading(true);
    if (value && tail < data.length) {
      const newData = [...data];
      newData[tail].letter = value;
      newData[tail].state = ElementStates.Changing;
      setData(newData);

      setTimeout(() => {
        setTail((prevTail) => prevTail + 1);
        if (tail + 1 === data.length) setIsAddDisabled(true);
        newData[tail].state = ElementStates.Default;
        setData(newData);
        setValue("");
        setIsLoading(false);
      }, 1000);
    }
  };

  const onRemove = () => {
    setIsLoading(true);
    if (head === tail) return;

    const newData = [...data];
    newData[head].state = ElementStates.Changing;
    setData(newData);

    setTimeout(() => {
      newData[head].state = ElementStates.Default;
      newData[head].letter = undefined;
      setData(newData);
      setHead((prevHead) => prevHead + 1);
      setIsLoading(false);
    }, 1000);
  };

  const onClear = () => {
    setData(
      Array.from({ length: 7 }, () => ({
        letter: undefined,
        state: ElementStates.Default,
      }))
    );
    setHead(0);
    setTail(0);
    setIsAddDisabled(false);
  };

  const [isAddDisabled, setIsAddDisabled] = useState<boolean>(false);

  return (
    <SolutionLayout title="Очередь">
      <div className={style.main}>
        <Input
          isLimitText
          placeholder="Введите значение"
          maxLength={4}
          minLength={1}
          extraClass={style.input}
          onChange={onChange}
          disabled={isLoading}
          value={value}
        />
        <Button
          type="button"
          text="Добавить"
          onClick={onAdd}
          disabled={!value || isAddDisabled || isLoading}
          extraClass={style.button}
        />
        <Button
          type="button"
          text="Удалить"
          onClick={onRemove}
          disabled={head === tail || isLoading}
          extraClass={style.button}
        />
        <Button
          type="button"
          text="Очистить"
          onClick={onClear}
          disabled={head === tail || isLoading}
          extraClass={style.button}
        />
      </div>
      <div className={style.main}>
        {data.map((char, index) => (
          <div key={index}>
            <div className={style.subtitle}>
              {index === head ? <p className={style.label}>head</p> : <p></p>}
            </div>
            <Circle letter={char.letter} state={char.state} extraClass={style.circle} />
            <span className={style.label}>{index}</span>
            <div>
              {index === tail - 1 ? <p className={style.label}>tail</p> : <p></p>}
            </div>
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};
