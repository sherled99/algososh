import { FC, useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import style from "./string.module.css";

interface CharData {
  letter: string;
  state: ElementStates;
}

export const StringComponent: FC = () => {
  const [data, setData] = useState<CharData[]>([]);
  const [value, setValue] = useState("");
  const [isReversing, setIsReversing] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const reverseArray = (arr: CharData[], start: number, end: number) => {
    if (start >= end) {
      setTimeout(() => {
        setData((prevData) =>
          prevData.map((charData) => ({
            ...charData,
            state: ElementStates.Modified,
          }))
        );

        setIsReversing(false);
      }, 1000);
      return;
    }

    setTimeout(() => {
      const temp = arr[start].letter;
      arr[start].letter = arr[end].letter;
      arr[start].state = ElementStates.Modified;
      arr[end].letter = temp;
      arr[end].state = ElementStates.Modified;

      setData([...arr]);

      setData((prevData) => {
        const newData = [...prevData];
        newData[start] = {
          ...newData[start],
          state: ElementStates.Changing,
        };
        newData[end] = {
          ...newData[end],
          state: ElementStates.Changing,
        };
        return newData;
      });

      reverseArray(arr, start + 1, end - 1);
    }, 1000);
  };

  const click = () => {
    setIsReversing(true);
    const charData = value.split("").map((char) => ({
      letter: char,
      state: ElementStates.Default,
    }));
    setData(charData);
    
  };

  useEffect(() => {
    if (isReversing) {
      const newData = [...data];
      const start = 0;
      const end = newData.length - 1;

      reverseArray(newData, start, end);
    }
  }, [isReversing]);

  return (
    <SolutionLayout title="Строка">
      <div className={style.main}>
        <Input
          isLimitText
          maxLength={11}
          extraClass={style.input}
          onChange={onChange}
          disabled={isReversing}
        />
        <Button type="submit" text="Развернуть" onClick={click} disabled={!value} isLoader={isReversing}/>
      </div>
      <div className={style.main_circle}>
        {data.map((char, index) => (
          <Circle key={index} letter={char.letter} state={data[index]?.state} />
        ))}
      </div>
    </SolutionLayout>
  );
};
