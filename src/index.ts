import Game from './Game';
import { Operator } from './Questions/Operator.Enum';
import { ALL_OPERATOR } from './constants';

const game: Game = Game.getInstance('canvas');

const startButton = document.getElementById('start-btn') as HTMLButtonElement;
const speedInput = document.getElementById('speed') as HTMLInputElement;
const isNegativeCheckbox = document.getElementById(
  'is-negative',
) as HTMLInputElement;
const totalEnemyInput = document.getElementById('total') as HTMLInputElement;
const totalWaveInput = document.getElementById('wave') as HTMLInputElement;
const operatorInputs = document.getElementsByName('operator');

startButton?.addEventListener('click', () => {
  const operators: Operator[] = [];
  operatorInputs.forEach((input) => {
    if ((input as HTMLInputElement).checked) {
      switch ((input as HTMLInputElement).id) {
        case 'addition':
          operators.push(Operator.ADDITION);
          break;
        case 'substraction':
          operators.push(Operator.SUBTRACTION);
          break;
        case 'multiplication':
          operators.push(Operator.MULTIPLICATION);
          break;
        case 'division':
          operators.push(Operator.DIVISION);
          break;
        default:
          break;
      }
    }
  });

  console.log(isNegativeCheckbox.checked);

  game.setOptions({
    enemySpeed: parseFloat(speedInput.value),
    isNegative: isNegativeCheckbox.checked,
    totalEnemy: parseInt(totalEnemyInput.value),
    totalWave: parseInt(totalWaveInput.value),
    operator: operators.length > 0 ? operators : ALL_OPERATOR,
    gameOverCallback: () => {
      startButton.disabled = false;
    },
  });

  game.start();

  startButton.disabled = true;
});

const lifeText = document.getElementById('life');
console.log(lifeText?.textContent);
