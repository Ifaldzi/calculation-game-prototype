import GameConfig from './Configs/GameConfig';
import LevelOption from './Configs/LevelOption';
import Checkbox from './UI/Checkbox';
import Select from './UI/Select';
import TextField from './UI/TextField';

export default class GameManager {
  private static _instance: GameManager;

  public static get instance(): GameManager {
    if (!this._instance) this._instance = new GameManager();

    return this._instance;
  }

  constructor() {
    this.levelSelection.onchange = (value) => {
      const newConfig = GameConfig.getLevel(value);
      this.levelOption = newConfig;
    };
  }

  private _currentLevel: number = 1;

  private speedInput = new TextField('speed');
  private isNegativeCheckbox = new Checkbox('is-negative');
  private totalEnemyInput = new TextField('total');
  private totalWaveInput = new TextField('wave');
  private operatorInputs = Checkbox.groups('operator');
  private levelSelection = new Select<number>('level', []);

  public setLevelSelectOption(
    levelSelectOptions: Array<{ value: number; name: string }>,
  ) {
    this.levelSelection.setOptions(levelSelectOptions);
  }

  public get currentLevel(): number {
    if (this.levelSelection.value)
      return parseInt(this.levelSelection.value?.toString());

    return this._currentLevel;
  }

  public set currentLevel(level: number) {
    this._currentLevel = level;
    this.levelSelection.value = level;
  }

  public get levelOption(): LevelOption {
    return {
      enemy_speed: parseFloat(this.speedInput.value),
      total_enemy: parseInt(this.totalEnemyInput.value),
      total_wave: parseInt(this.totalWaveInput.value),
      is_negative: this.isNegativeCheckbox.checked,
      addition:
        this.operatorInputs.find((i) => i.id === 'addition')?.checked ?? false,
      substraction:
        this.operatorInputs.find((i) => i.id === 'substraction')?.checked ??
        false,
      multiplication:
        this.operatorInputs.find((i) => i.id === 'multiplication')?.checked ??
        false,
      division:
        this.operatorInputs.find((i) => i.id === 'division')?.checked ?? false,
    };
  }

  public set levelOption(option: LevelOption | null) {
    if (option) {
      this.speedInput.value = option.enemy_speed.toString();
      this.isNegativeCheckbox.checked = option.is_negative;
      this.totalEnemyInput.value = option.total_enemy.toString();
      this.totalWaveInput.value = option.total_wave.toString();

      this.operatorInputs.forEach((input) => {
        switch (input.id) {
          case 'addition':
            input.checked = option.addition;
            break;
          case 'substraction':
            input.checked = option.substraction;
            break;
          case 'multiplication':
            input.checked = option.multiplication;
            break;
          case 'division':
            input.checked = option.division;
            break;
          default:
            break;
        }
      });
    }
  }
}
