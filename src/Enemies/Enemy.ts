import DrawingContext from '../DrawingContext';
import EventListener from '../Listeners/EventListener';
import Listener from '../Listeners/Listener';
// import listener from '../Listeners/Listener';
import { Question } from '../Questions/Question';

interface Point {
  x: number;
  y: number;
}

export class Enemy implements EventListener {
  public question: Question;
  public position: Point;
  public speed: number;
  public active: boolean = true;
  private sprite: string;

  private context: DrawingContext;
  private listener: Listener;

  constructor(
    question: Question,
    sprite: string,
    position: Point,
    speed: number = 0.1,
  ) {
    this.question = question;
    this.position = position;
    this.speed = speed;
    this.sprite = sprite;
    this.context = DrawingContext.getInstance();

    this.listener = new Listener(this);
    this.listener.addAnswerListener();
  }

  public moveDown(): void {
    if (this.position.y > 520) {
      this.hitPlayer();
      this.destroy();
    }
    if (this.active) this.position.y += this.speed;
  }

  public onAnswered(answer: number): void {
    console.log(answer);
    console.log(this.question);
    if (this.question.checkAnswer(answer)) {
      this.destroy();
    } else {
      this.hitPlayer();
    }
  }

  public setActive(active: boolean) {
    this.active = active;
  }

  public destroy(): void {
    this.active = false;
    this.listener.removeListener();
  }

  private hitPlayer(): void {
    const wrongAnswerEvent = new Event('hit');
    document.dispatchEvent(wrongAnswerEvent);
  }

  public draw() {
    if (this.active) {
      const image = document.getElementById(this.sprite) as HTMLImageElement;

      this.context.ctx.drawImage(
        image,
        this.position.x,
        this.position.y,
        image.width,
        image.height,
      );

      this.context.ctx.font = '18px serif';
      // this.context.ctx.textAlign = 'center';
      const questionText = this.context.ctx.measureText(
        this.question.printQuestion(),
      );
      this.context.ctx.fillText(
        this.question.printQuestion(),
        this.position.x + (image.width - questionText.width) / 2.0,
        this.position.y - 10,
        image.width,
      );
    }
  }
}
