import GameConfig from '../Configs/GameConfig';
import DrawingContext from '../DrawingContext';
import EventListener from '../Listeners/EventListener';
import Listener from '../Listeners/Listener';
import { Question } from '../Questions/Question';
import {
  DEFAULT_CANVAS_HEIGHT,
  DEFAULT_CANVAS_WIDTH,
  ZERO_POINT,
} from '../constants';

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
  private spriteImage?: HTMLImageElement;

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
    this.spriteImage = document.getElementById(this.sprite) as HTMLImageElement;
    this.context = DrawingContext.getInstance();

    this.listener = new Listener(this);
    this.listener.addAnswerListener();
  }

  public static createEnemy(question: Question, sprite: string, speed: number) {
    const enemy = new Enemy(question, sprite, ZERO_POINT, speed);

    const canvasWidth =
      GameConfig.get<number>('General', 'width') || DEFAULT_CANVAS_WIDTH;
    const randomXPos = Math.floor(
      Math.random() * (canvasWidth - (enemy.spriteImage?.width || 0)),
    );

    enemy.position = { x: randomXPos, y: 0 };

    return enemy;
  }

  public moveDown(): void {
    const canvasHeight =
      GameConfig.get<number>('General', 'height') || DEFAULT_CANVAS_HEIGHT;
    if (this.position.y > +canvasHeight + 20) {
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
    if (this.active && this.spriteImage) {
      this.context.ctx.drawImage(
        this.spriteImage,
        this.position.x,
        this.position.y,
        this.spriteImage.width,
        this.spriteImage.height,
      );

      this.context.ctx.font = '18px serif';
      const questionText = this.context.ctx.measureText(
        this.question.printQuestion(),
      );
      this.context.ctx.fillText(
        this.question.printQuestion(),
        this.position.x + (this.spriteImage.width - questionText.width) / 2.0,
        this.position.y - 10,
        this.spriteImage.width,
      );
    }
  }
}
