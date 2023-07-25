import { FC, useState, ChangeEvent, Fragment } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { ArrowIcon } from "../ui/icons/arrow-icon";

interface CharData {
  letter: string;
  state: ElementStates;
}

export const ListPage: FC = () => {
  const [data, setData] = useState<CharData[]>([]);
  const [value, setValue] = useState<string>("");
  const [index, setIndex] = useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setIndex(e.target.value);
  };

  const onAddToHead = () => {
    if (value) {
      setData([{ letter: value, state: ElementStates.Default }, ...data]);
      setValue("");
    }
  };

  const onAddToTail = () => {
    if (value) {
      setData([...data, { letter: value, state: ElementStates.Default }]);
      setValue("");
    }
  };

  const onRemoveFromHead = () => {
    if (data.length === 0) return;

    const newData = [...data];
    newData[0].state = ElementStates.Changing;

    setTimeout(() => {
      newData.shift();
      setData(newData);
    }, 500);
  };

  const onRemoveFromTail = () => {
    if (data.length === 0) return;

    const newData = [...data];
    const lastIndex = newData.length - 1;
    newData[lastIndex].state = ElementStates.Changing;

    setTimeout(() => {
      newData.pop();
      setData(newData);
    }, 500);
  };

  const onAddByIndex = () => {
    if (value && index !== "") {
      const ind = Number(index);
      if (Number.isInteger(ind) && ind >= 0 && ind <= data.length) {
        const newData = [...data];
        newData.splice(ind, 0, { letter: value, state: ElementStates.Default });
        setData(newData);
        setValue("");
        setIndex("");
      }
    }
  };

  const onRemoveByIndex = () => {
    if (index !== "") {
      const ind = Number(index);
      if (Number.isInteger(ind) && ind >= 0 && ind < data.length) {
        const newData = [...data];
        newData[ind].state = ElementStates.Changing;

        setTimeout(() => {
          newData.splice(ind, 1);
          setData(newData);
        }, 500);
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
          placeholder="Введите значение"
        />
        <Button
          type="button"
          text="Добавить в head"
          onClick={onAddToHead}
          extraClass={`${style.button} ${style.button_small}`}
        />
        <Button
          type="button"
          text="Добавить в tail"
          onClick={onAddToTail}
          extraClass={`${style.button} ${style.button_small}`}
        />
        <Button
          type="button"
          text="Удалить из head"
          onClick={onRemoveFromHead}
          disabled={data.length === 0}
          extraClass={`${style.button} ${style.button_small}`}
        />
        <Button
          type="button"
          text="Удалить из tail"
          onClick={onRemoveFromTail}
          disabled={data.length === 0}
          extraClass={`${style.button} ${style.button_small}`}
        />
      </div>
      <div className={style.main}>
        <Input
          extraClass={style.input}
          onChange={onIndex}
          value={index}
          placeholder="Введите индекс"
        />
        <Button
          type="button"
          text="Добавить по индексу"
          onClick={onAddByIndex}
          disabled={!value || index === "" || data.length >= 7}
          extraClass={`${style.button} ${style.button_big}`}
        />
        <Button
          type="button"
          text="Удалить по индексу"
          onClick={onRemoveByIndex}
          disabled={index === "" || data.length === 0}
          extraClass={`${style.button} ${style.button_big}`}
        />
      </div>
      <div className={style.main_circle}>
        {data.map((char, index) => (
          <Fragment key={index}>
            {index > 0 && (
              <div className={style.arrow}>
                <ArrowIcon />
              </div>
            )}{" "}
            {/* Display ArrowIcon between Circle components */}
            <div>
              <div className={style.subtitle}>
              {index === 0 ? <p className={style.label}>head</p> : <p></p>}
              </div>
              <Circle letter={char.letter} state={char.state} key={index}/>
              <span className={style.label}>{index}</span>
              <div>
                {index === data.length - 1 ? 
                  <p className={style.label}>tail</p> : <p></p>}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </SolutionLayout>
  );
};
