import GameConfig from './Configs/GameConfig';
import LevelOption from './Configs/LevelOption';
import DrawingContext from './DrawingContext';
import { Enemy } from './Enemies/Enemy';
import { EnemySpawner } from './Enemies/EnemySpawner';
import GameManager from './GameManager';
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
  private manager: GameManager;

  public constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.manager = GameManager.instance;
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

  public setOptionsFormLevelOption(option: LevelOption) {
    const operators: Operator[] = [];

    if (option.addition) operators.push(Operator.ADDITION);
    if (option.substraction) operators.push(Operator.SUBTRACTION);
    if (option.multiplication) operators.push(Operator.MULTIPLICATION);
    if (option.division) operators.push(Operator.DIVISION);

    this.options = {
      ...this.options,
      enemySpeed: option.enemy_speed,
      isNegative: option.is_negative,
      totalEnemy: option.total_enemy,
      totalWave: option.total_wave,
      operator: operators.length > 0 ? operators : ALL_OPERATOR,
    };
  }

  private resetGame(): void {
    this.questionsBank = [];
    if (this.enemy) {
      this.enemy.destroy();
      delete this.enemy;
    }
  }

  private loadLevel(): void {
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
  }

  public start(): void {
    this.resetGame();
    this.player = new Player(3);
    DrawingContext.createInstance(this.canvas);
    this.loadLevel();
    window.requestAnimationFrame(() => this.loop());
  }

  public loop(): void {
    if (this.questionsBank.length <= 0 && !this.enemy?.active) {
      // check if next level available
      const nextLevel = this.manager.currentLevel + 1;
      const nextLevelConfig = GameConfig.getLevel(nextLevel);
      console.log(nextLevel, nextLevelConfig);
      if (!nextLevelConfig) return this.gameOver(true);

      // Load new level
      this.manager.levelOption = nextLevelConfig;
      this.manager.currentLevel = nextLevel;
      this.setOptionsFormLevelOption(nextLevelConfig);
      this.loadLevel();
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
