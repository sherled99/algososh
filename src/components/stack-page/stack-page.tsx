import { FC, useState, ChangeEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./stack-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Stack } from "../../classes/stack";

export const StackPage: FC = () => {
  const [stack, setStack] = useState<Stack<string>>(new Stack<string>());
  const [value, setValue] = useState<string>("");
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [isRemove, setIsRemove] = useState<boolean>(false);

  const elements = stack.getElements();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };


  const onAdd = () => {
    setIsAdd(true);
    stack.push(value);
    setTimeout(() => {
      setValue("");
      setStack(stack);
      setIsAdd(false);
    }, 1000);
  };
  
  const onRemove = () => {
    setIsRemove(true);
    stack.pop();
    setTimeout(() => {
      setStack(stack);
      setIsRemove(false);
    }, 1000);
  };

  const onClear = () => {
    stack.clear();
    setStack(new Stack<string>(stack.getMaxSize()));
  };

  return (
    <SolutionLayout title="Стек" data-testid="algorithm-page">
      <div className={style.main}>
        <Input
          isLimitText
          maxLength={4}
          minLength={1}
          extraClass={style.input}
          onChange={onChange}
          value={value}
          disabled={isAdd || isRemove}
          data-testid="input"
        />
        <Button
          type="button"
          text="Добавить"
          isLoader={isAdd}
          onClick={onAdd}
          extraClass={style.button}
          disabled={!value || isAdd || isRemove || stack.getSize() >= stack.getMaxSize()}
          data-testid="add-button"
        />
        <Button
          type="button"
          text="Удалить"
          isLoader={isRemove}
          onClick={onRemove}
          extraClass={style.button}
          disabled={stack.getSize() === 0 || isAdd || isRemove}
          data-testid="remove-button"
        />
        <Button
          type="button"
          text="Очистить"
          onClick={onClear}
          extraClass={style.button}
          disabled={stack.getSize() === 0 || isAdd || isRemove}
          data-testid="clear-button"
        />
      </div>
      <div className={style.main}>
        {elements.map((letter, index) => (
          <div key={index}>
            <div className={style.subtitle}>
              {index === stack.getSize() - 1 ? (
                <p className={style.label}>head</p>
              ) : (
                <p></p>
              )}
            </div>
            <div  data-testid={`circle-${index}`}>
              <Circle letter={letter.letter} state={letter.state} extraClass={style.circle} />
            </div>
            <span className={style.label}>{index}</span>
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};