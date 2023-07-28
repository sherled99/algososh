import { FC, useState, ChangeEvent, Fragment } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "../../classes/linkedList";

export const ListPage: FC = () => {
  const [list, setList] = useState<LinkedList<string>>(new LinkedList<string>());
  const [value, setValue] = useState<string>("");
  const [index, setIndex] = useState<string>("");
  const [isLoading, setIsLoading] = useState<string>("");
  const elements = list.getElements();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setIndex(e.target.value);
  };

  const onAddToHead = () => {
    if (value) {
      setIsLoading("onAddToHead");
      list.prepend(value);
      setTimeout(() => {
        setValue("");
        setIsLoading("");
      }, 1000);
    }
  };

  const onAddToTail = () => {
    if (value) {
      setIsLoading("onAddToTail");
      list.append(value);
      setTimeout(() => {
        setValue("");
        setIsLoading("");
      }, 1000);
    }
  };

  const onRemoveFromHead = () => {
    setIsLoading("onRemoveFromHead");
    list.setColor(0);
    setTimeout(() => {
      list.deleteHead();
      setIsLoading("");
    }, 1000);
  };

  const onRemoveFromTail = () => {
    setIsLoading("onRemoveFromTail");
    list.setColor(list.getSize() - 1);
    setTimeout(() => {
      list.deleteTail();
      setIsLoading("");
    }, 1000);
  };

  const onAddByIndex = () => {
    if (value && index !== "") {
      const ind = Number(index);
      if (Number.isInteger(ind) && ind >= 0 && ind <= list.toArray().length) {
        setIsLoading("onAddByIndex");
        list.addByIndex(ind, value);
        setTimeout(() => {
          setValue("");
          setIndex("");
          setIsLoading("");
        }, 1000);
      }
    }
  };

  const onRemoveByIndex = () => {
    if (index !== "") {
      const ind = Number(index);
      if (Number.isInteger(ind) && ind >= 0 && ind < list.toArray().length) {
        setIsLoading("onRemoveByIndex");
        list.setColor(ind);
        setTimeout(() => {
          list.deleteByIndex(ind);
          setIsLoading("");
        }, 1000);
      }
    }
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={style.main}>
        <Input
          isLimitText
          maxLength={4}
          extraClass={style.input}
          onChange={onChange}
          value={value}
          disabled={isLoading != ""}
          placeholder="Введите значение"
        />
        <Button
          type="button"
          text="Добавить в head"
          onClick={onAddToHead}
          extraClass={`${style.button} ${style.button_small}`}
          disabled={isLoading != ""}
          isLoader={isLoading === "onAddToHead"}
        />
        <Button
          type="button"
          text="Добавить в tail"
          onClick={onAddToTail}
          extraClass={`${style.button} ${style.button_small}`}
          disabled={isLoading != ""}
          isLoader={isLoading === "onAddToTail"}
        />
        <Button
          type="button"
          text="Удалить из head"
          onClick={onRemoveFromHead}
          disabled={list.toArray().length === 0 || isLoading != ""}
          isLoader={isLoading === "onRemoveFromHead"}
          extraClass={`${style.button} ${style.button_small}`}
        />
        <Button
          type="button"
          text="Удалить из tail"
          onClick={onRemoveFromTail}
          disabled={list.toArray().length === 0 || isLoading != ""}
          isLoader={isLoading === "onRemoveFromTail"}
          extraClass={`${style.button} ${style.button_small}`}
        />
      </div>
      <div className={style.main}>
        <Input
          extraClass={style.input}
          onChange={onIndex}
          value={index}
          placeholder="Введите индекс"
          disabled={isLoading != ""}
          type="number"
        />
        <Button
          type="button"
          text="Добавить по индексу"
          onClick={onAddByIndex}
          isLoader={isLoading === "onAddByIndex"}
          disabled={!value || index === "" || list.toArray().length >= 7 || isLoading != "" || elements.length -1 < parseInt(index) || parseInt(index) < 0}
          extraClass={`${style.button} ${style.button_big}`}
        />
        <Button
          type="button"
          text="Удалить по индексу"
          onClick={onRemoveByIndex}
          isLoader={isLoading === "onRemoveByIndex"}
          disabled={index === "" || list.toArray().length === 0 || isLoading != "" || elements.length -1 < parseInt(index) || parseInt(index) < 0}
          extraClass={`${style.button} ${style.button_big}`}
        />
      </div>
      <div className={style.main_circle}>
        {elements.map((char, index) => (
          <Fragment key={index}>
            {index > 0 && (
              <div className={style.arrow}>
                <ArrowIcon />
              </div>
            )}
            <div>
              <div className={style.subtitle}>
                {index === 0 ? <p className={style.label}>head</p> : <p></p>}
              </div>
              <Circle letter={char.letter} state={char.state} key={index} />
              <span className={style.label}>{index}</span>
              <div>
                {index === list.toArray().length - 1 ? (
                  <p className={style.label}>tail</p>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </SolutionLayout>
  );
};
