import { Operator } from './Operator.Enum';
import { Question } from './Question';

export class Division extends Question {
  public constructor(a: number, b: number) {
    super(a, b, Operator.DIVISION);
  }

  public static generateQuestion(): Division {
    const b = Math.floor(Math.random() * 10) + 1;
    const a = b * (Math.floor(Math.random() * 10) + 1);
    return new Division(a, b);
  }

  public checkAnswer(answer: number): boolean {
    return this.firstNumber / this.secondNumber === answer;
  }

  public printQuestion(): string {
    return `${this.firstNumber} / ${this.secondNumber}`;
  }
}
