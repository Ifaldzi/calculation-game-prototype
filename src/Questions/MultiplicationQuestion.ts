import { Operator } from './Operator.Enum';
import { Question } from './Question';

export class Multiplication extends Question {
  public constructor(a: number, b: number) {
    super(a, b, Operator.MULTIPLICATION);
  }

  public static generateQuestion(): Multiplication {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    return new Multiplication(a, b);
  }

  public checkAnswer(answer: number): boolean {
    return this.firstNumber * this.secondNumber === answer;
  }
  public printQuestion(): string {
    return `${this.firstNumber} x ${this.secondNumber}`;
  }
}
