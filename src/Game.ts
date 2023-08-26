import GameConfig from './Configs/GameConfig';
import DrawingContext from './DrawingContext';
import { Enemy } from './Enemies/Enemy';
import { EnemySpawner } from './Enemies/EnemySpawner';
import Player from './Players/Player';
import { Operator } from './Questions/Operator.Enum';
import { Question } from './Questions/Question';
import { QuestionGenerator } from './Questions/QuestionGenerator';
import { ALL_OPERATOR } from './constants';

interface GameOptions {
  operator: Operator[];
  isNegative: boolean;
  enemySpeed: number;
  totalEnemy: number;
  totalWave: number;
  gameOverCallback?: () => void;
}

const defaultOptions: GameOptions = {
  operator: ALL_OPERATOR,
  isNegative: false,
  enemySpeed: 0.1,
  totalEnemy: 5,
  totalWave: 1,
};

export default class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private static instance: Game;

  private enemy: Enemy | undefined | null;
  private enemiesList: Enemy[] = [];
  private questionsBank: Question[] = [];

  private options: GameOptions = defaultOptions;

  private player?: Player;

  public constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
  }

  public static getInstance(canvasId: string, onLoaded?: () => void) {
    if (!this.instance) {
      this.instance = new Game(canvasId);
      GameConfig.loadConfig().then(onLoaded);
    }

    return this.instance;
  }

  public setOptions(options: GameOptions) {
    this.options = options;
  }

  private resetGame(): void {
    this.questionsBank = [];
    if (this.enemy) {
      this.enemy.destroy();
      delete this.enemy;
    }
  }

  public start(): void {
    this.resetGame();
    this.player = new Player(3);
    DrawingContext.createInstance(this.canvas);

    this.questionsBank = QuestionGenerator.generateSegmentedRandomQuestion(
      this.options.totalEnemy,
      this.options.totalWave,
      {
        availableTypes: this.options.operator,
        isNegative: this.options.isNegative,
      },
    );

    this.questionsBank.forEach((q) => {
      console.log(q.printQuestion());
    });

    this.enemy = EnemySpawner.spawnEnemy(
      this.questionsBank.shift(),
      this.options.enemySpeed,
    );
    this.enemy?.setActive(true);
    window.requestAnimationFrame(() => this.loop());
  }

  public loop(): void {
    // do something

    if (this.questionsBank.length <= 0 && !this.enemy?.active) {
      return this.gameOver(true);
    }

    if (this.enemy) {
      this.enemy.moveDown();
      if (!this.enemy.active) {
        delete this.enemy;
        this.enemy = EnemySpawner.spawnEnemy(
          this.questionsBank.shift(),
          this.options.enemySpeed,
        );
        this.enemy?.setActive(true);
      }
    }

    if (this.player && this.player?.life <= 0) {
      this.enemy?.destroy();
      return this.gameOver(false);
    }

    this.draw();
    window.requestAnimationFrame(() => this.loop());
  }

  private gameOver(win: boolean): void {
    console.log('GAME OVER: ', win ? 'WIN' : 'LOSE');

    if (this.options.gameOverCallback) {
      this.options.gameOverCallback();
    }
  }

  public draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.stroke();
    this.enemy?.draw();
  }
}
