import { Operator } from './Operator.Enum';
import { Question } from './Question';

export class Subtraction extends Question {
  public constructor(a: number, b: number) {
    super(a, b, Operator.SUBTRACTION);
  }

  public static generateQuestion(isNegative: boolean = false): Subtraction {
    const a = Math.floor(Math.random() * 20) + 1;
    console.log(isNegative);
    const b = Math.floor(Math.random() * (isNegative ? 20 : a)) + 1;
    console.log(b);
    return new Subtraction(a, b);
  }

  public checkAnswer(answer: number): boolean {
    console.log(answer);
    return this.firstNumber - this.secondNumber === answer;
  }

  public printQuestion(): string {
    return `${this.firstNumber} - ${this.secondNumber}`;
  }
}
