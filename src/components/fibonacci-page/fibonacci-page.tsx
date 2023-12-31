import { FC, useState, ChangeEvent, FormEvent} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import style from "./fibonacci-page.module.css";

export const FibonacciPage: FC = () => {
  const [data, setData] = useState<number[]>([]);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const generateFibonacciSequence = (n: number): number[] => {
    const sequence = [1, 1];
    for (let i = 2; i < n; i++) {
      sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
  };

  const click = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const n = parseInt(value, 10);
    if (isNaN(n) || n <= 0 || n > 19) {
      return;
    }

    setIsLoading(true);
    const fibonacciSequence = generateFibonacciSequence(n);
    setData([]);

    let currentIndex = 0;
    const timer = setInterval(() => {
      setData((prevData) => [...prevData, fibonacciSequence[currentIndex]]);
      currentIndex++;

      if (currentIndex === n) {
        clearInterval(timer);
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи" data-testid="algorithm-page">
      <form className={style.main} onSubmit={click}>
          <Input
            type="number"
            isLimitText
            max={19}
            extraClass={style.input}
            onChange={onChange}
            disabled={isLoading}
            data-testid="input"
          />
          <Button type="submit" text="Развернуть" isLoader={isLoading} disabled={!value || parseInt(value)>19} data-testid="fibonacci-button"/>
      </form>
      <div className={style.main_circle}>
        {data.map((num, index) => (
          <div  data-testid={`circle-${index}`}>
            <Circle key={index} letter={num.toString()} />
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};
