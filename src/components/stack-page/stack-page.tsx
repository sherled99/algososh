import { FC, useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./stack-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";

interface CharData {
  letter: string;
  state: ElementStates;
}

export const StackPage: FC = () => {
  const [data, setData] = useState<CharData[]>([]);
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onAdd = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newData: CharData = {
        letter: value,
        state: ElementStates.Default,
      };
      setValue("");
      setData([newData, ...data]);
      setIsLoading(false);
    }, 1000);
    
  };

  const onRemove = () => {
    setIsLoading(true);
    if (data.length === 0) return;

    const newData = [...data];
    const lastIndex = newData.length - 1;
    newData[lastIndex].state = ElementStates.Changing;
    setData(newData);

    setTimeout(() => {
      const updatedData = newData.slice(0, lastIndex);
      updatedData.forEach((char, index) => {
        char.state = ElementStates.Default;
      });

      setData(updatedData);
    }, 1000);

    setTimeout(() => {
      newData.pop();
      setData(newData);
      setIsLoading(false);
    }, 1000);
  };

  const onClear = () => {
    setData([]);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={style.main}>
        <Input
          isLimitText
          maxLength={4}
          minLength={1}
          extraClass={style.input}
          onChange={onChange}
          value={value}
          disabled={isLoading}
        />
        <Button
          type="button"
          text="Добавить"
          onClick={onAdd}
          extraClass={style.button}
          disabled={!value || isLoading}
        />
        <Button
          type="button"
          text="Удалить"
          onClick={onRemove}
          extraClass={style.button}
          disabled={data.length === 0 || isLoading}
        />
        <Button
          type="button"
          text="Очистить"
          onClick={onClear}
          extraClass={style.button}
          disabled={data.length === 0 || isLoading}
        />
      </div>
      <div className={style.main}>
        {data.map((char, index) => (
          <div key={index}>
            <div className={style.subtitle}>
              {index === data.length - 1 ? (
                <p className={style.label}>head</p>
              ) : (
                <p></p>
              )}
            </div>
            <Circle letter={char.letter} state={char.state} extraClass={style.circle} />
            <span className={style.label}>{index}</span>
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};
