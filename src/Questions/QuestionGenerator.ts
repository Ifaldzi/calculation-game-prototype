import { ALL_OPERATOR } from '../constants';
import { Addition } from './AdditionQuestion';
import { Division } from './DivisionQuestion';
import { Multiplication } from './MultiplicationQuestion';
import { Operator } from './Operator.Enum';
import { Question } from './Question';
import { Subtraction } from './SubtractionQuestion';

interface Options {
  availableTypes?: Operator[];
  isNegative?: boolean;
}

export class QuestionGenerator {
  public static generateRandomQuestion(
    type: Operator,
    isNegative: boolean = false,
  ): Question {
    switch (type) {
      case Operator.ADDITION:
        return Addition.generateQuestion();
      case Operator.SUBTRACTION:
        return Subtraction.generateQuestion(isNegative);
      case Operator.MULTIPLICATION:
        return Multiplication.generateQuestion();
      case Operator.DIVISION:
        return Division.generateQuestion();
      default:
        return Addition.generateQuestion();
    }
  }

  public static generateRandomTypeQuestion(
    availableTypes: Operator[] = ALL_OPERATOR,
    isNegative: boolean = false,
  ): Question {
    const randomIndex = Math.floor(Math.random() * availableTypes.length);
    const randomType = availableTypes[randomIndex];

    return this.generateRandomQuestion(randomType, isNegative);
  }

  public static generateRandomQuestions(
    numberOfQuestion: number,
    options: Options = { availableTypes: ALL_OPERATOR, isNegative: false },
  ): Question[] {
    const questions = [];
    while (numberOfQuestion--) {
      const randomQuestion = this.generateRandomTypeQuestion(
        options.availableTypes,
        options.isNegative,
      );
      questions.push(randomQuestion);
    }

    return questions;
  }

  public static generateSegmentedRandomQuestion(
    numberOfQuestion: number,
    numberOfSegment: number,
    options: Options,
  ): Question[] {
    const tempQuestions = [];
    const randomQuestions = this.generateRandomQuestions(
      numberOfQuestion,
      options,
    );
    tempQuestions.push(...randomQuestions);

    while (--numberOfSegment) {
      const additionalQuestions = this.randomQuestionOrder(randomQuestions);
      tempQuestions.push(...additionalQuestions);
    }

    return tempQuestions;
  }

  private static randomQuestionOrder(questions: Question[]): Question[] {
    const clonedQuestions = [...questions];
    const newQuestions = [];
    for (let i = 0; i < questions.length; i++) {
      const randomIndex = Math.floor(Math.random() * clonedQuestions.length);
      const question = clonedQuestions[randomIndex];
      newQuestions.push(question);
      clonedQuestions.splice(randomIndex, 1);
    }

    return newQuestions;
  }
}
