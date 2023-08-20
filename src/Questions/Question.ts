import { Operator } from './Operator.Enum';

export abstract class Question {
  protected firstNumber: number;
  protected secondNumber: number;
  protected operator: Operator;

  public constructor(a: number, b: number, operator: Operator) {
    this.firstNumber = a;
    this.secondNumber = b;
    this.operator = operator;
  }

  public abstract checkAnswer(answer: number): boolean;

  public abstract printQuestion(): string;
}
