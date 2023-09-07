import GameConfig from './Configs/GameConfig';
import Game from './Game';
import GameManager from './GameManager';
import { Operator } from './Questions/Operator.Enum';
import Button from './UI/Button';
import { ALL_OPERATOR } from './constants';

const game: Game = Game.getInstance('canvas', () => {
  const startButton = new Button('start-btn', () => {
    const levelOption = manager.levelOption;
    console.log(levelOption);
    const operators: Operator[] = [];

    if (levelOption.addition) operators.push(Operator.ADDITION);
    if (levelOption.substraction) operators.push(Operator.SUBTRACTION);
    if (levelOption.multiplication) operators.push(Operator.MULTIPLICATION);
    if (levelOption.division) operators.push(Operator.DIVISION);

    game.setOptions({
      enemySpeed: levelOption.enemy_speed,
      isNegative: levelOption.is_negative,
      totalEnemy: levelOption.total_enemy,
      totalWave: levelOption.total_wave,
      operator: operators.length > 0 ? operators : ALL_OPERATOR,
      gameOverCallback: () => {
        startButton.disabled = false;
      },
    });

    game.start();

    startButton.disabled = true;
  });

  const levelSelectOptions = Array(GameConfig.totalLevel)
    .fill(0)
    .map((_, index) => {
      return {
        value: index + 1,
        name: `Level ${index + 1}`,
      };
    });

  console.log(GameConfig.totalLevel);
  const manager = GameManager.instance;
  manager.setLevelSelectOption(levelSelectOptions);
  const res = GameConfig.getLevel(manager.currentLevel);

  manager.levelOption = res;
});
