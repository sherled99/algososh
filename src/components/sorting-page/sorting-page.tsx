import { FC, useState, useEffect} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";

export const SortingPage: FC = () => {
  const [choose, setChoose] = useState<boolean>(true);
  const [bubble, setBubble] = useState<boolean>(false);
  const [mas, setMas] = useState<
    Array<{ number: number; state: ElementStates }>
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    randomArr();
  }, []);

  const onChooseClick = () => {
    setChoose(true);
    setBubble(false);
  };

  const onBubbleClick = () => {
    setChoose(false);
    setBubble(true);
  };

  const randomArr = () => {
    const minLen = 3;
    const maxLen = 17;
    const minNum = 0;
    const maxNum = 100;

    const arrLen = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;

    const result = [];

    for (let i = 0; i < arrLen; i++) {
      const randomNum =
        Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
      result.push({ number: randomNum, state: ElementStates.Default });
    }

    setMas(result);
  };

  const onOneElemeinInArr = () => {
    setMas([{ number: 1, state: ElementStates.Default }]);
  };

  const onClear = () => {
    setMas([]);
  }

  const selectionSort = (ascending: boolean) => {
    setIsLoading(true);
    const sortedArray = [...mas];
    const len = sortedArray.length;

    let i = 0;
    let j = 0;

    const sortingStep = () => {
      if (i >= len - 1) {
        sortedArray[i].state = ElementStates.Modified;
        setIsLoading(false);
        return;
      }

      sortedArray[i].state = ElementStates.Changing;
      sortedArray[j].state = ElementStates.Changing;
      setMas([...sortedArray]);

      const innerLoopStep = () => {
        if (j < len) {
          if (j !== i && j !== i + 1) {
            sortedArray[j - 1].state = ElementStates.Default;
          }
          sortedArray[j].state = ElementStates.Changing;
          sortedArray[i].state = ElementStates.Changing;
          setMas([...sortedArray]);

          const shouldSwap = ascending
            ? sortedArray[j].number < sortedArray[i].number
            : sortedArray[j].number > sortedArray[i].number;
          if (shouldSwap) {
            const temp = sortedArray[i];
            sortedArray[i] = sortedArray[j];
            sortedArray[j] = temp;
          }

          j++;
          setTimeout(innerLoopStep, 1000);
        } else {
          sortedArray[j - 1].state = ElementStates.Default;

          sortedArray[i].state = ElementStates.Modified;
          setMas([...sortedArray]);

          i++;
          j = i + 1;

          setTimeout(sortingStep, 1000);
        }
      };

      innerLoopStep();
    };

    sortingStep();
  };

  const bubbleSort = (ascending: boolean) => {
    setIsLoading(true);
    const sortedArray = [...mas];
    const len = sortedArray.length;
    const sortingStep = (i: number, j: number) => {
      if (i >= len - 1) {
        sortedArray.forEach((element) => {
          element.state = ElementStates.Modified;
        });
        setMas([...sortedArray]);
        setIsLoading(false);
        return;
      }

      if (j >= len - i - 1) {
        sortedArray[j].state = ElementStates.Modified;
        setMas([...sortedArray]);
        i++;
        j = 0;
        setTimeout(() => sortingStep(i, j), 1000);
        return;
      }

      for (let k = 0; k < len; k++) {
        if (
          k !== j &&
          k !== j + 1 &&
          sortedArray[k].state != ElementStates.Modified
        ) {
          sortedArray[k].state = ElementStates.Default;
        }
      }

      sortedArray[j].state = ElementStates.Changing;
      sortedArray[j + 1].state = ElementStates.Changing;
      setMas([...sortedArray]);

      const shouldSwap = ascending
        ? sortedArray[j].number > sortedArray[j + 1].number
        : sortedArray[j].number < sortedArray[j + 1].number;
      if (shouldSwap) {
        const temp = sortedArray[j];
        sortedArray[j] = sortedArray[j + 1];
        sortedArray[j + 1] = temp;
      }

      j++;
      setTimeout(() => sortingStep(i, j), 1000);
    };

    sortingStep(0, 0);
  };

  const onSort = (ascending: boolean) => {
    if (mas && mas.length > 0){
      mas.map((x) => (x.state = ElementStates.Default));
      choose ? selectionSort(ascending) : bubbleSort(ascending);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива" data-testid="algorithm-page">
      <div className={style.main}>
        <RadioInput checked={choose} label="Выбор" onChange={onChooseClick} extraClass={style.btn_radio} disabled={isLoading} />
        <RadioInput checked={bubble} label="Пузырёк" onChange={onBubbleClick} extraClass={style.btn_radio} disabled={isLoading} />
        <Button
          disabled={isLoading}
          type="button"
          text="По возрастанию"
          onClick={() => onSort(true)}
          extraClass={style.btn}
        />
        <Button
          disabled={isLoading}
          type="button"
          text="По убыванию"
          onClick={() => onSort(false)}
          extraClass={style.btn}
        />
        <Button
          disabled={isLoading}
          type="button"
          text="Новый массив"
          onClick={randomArr}
          extraClass={style.btn}
        />
        <Button
          disabled={isLoading}
          type="button"
          text="Массив = 1"
          onClick={onOneElemeinInArr}
          extraClass={style.btn_visivle}
        />
        <Button
          disabled={isLoading}
          type="button"
          text="Пустой"
          onClick={onClear}
          extraClass={style.btn_visivle}
        />
      </div>
      <div className={style.main_columns}>
        <div className={style.columns}>
          {mas.map((number, index) => (
            <div key={index} data-testid={`column-${index}`} className={number.state}>
            <Column
              state={number.state}
              key={index}
              index={number.number}
              extraClass={style.colmun}
              />
              </div>
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
