import { Operator } from './Operator.Enum';
import { Question } from './Question';

export class Addition extends Question {
  public constructor(a: number, b: number) {
    super(a, b, Operator.ADDITION);
  }

  public static generateQuestion(): Addition {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1
    return new Addition(a, b);
  }

  public checkAnswer(answer: number): boolean {
    return this.firstNumber + this.secondNumber === answer;
  }

  public printQuestion(): string {
    return `${this.firstNumber} + ${this.secondNumber}`;
  }
}
