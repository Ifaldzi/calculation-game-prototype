import { Operator } from '../Questions/Operator.Enum';
import { Question } from '../Questions/Question';
import { QuestionGenerator } from '../Questions/QuestionGenerator';
import { ALL_OPERATOR } from '../constants';
import { Enemy } from './Enemy';

export class EnemySpawner {
  public static spawnEnemy(
    question?: Question,
    speed: number = 0.1,
  ): Enemy | null {
    if (question) {
      const randomXPos = Math.floor(Math.random() * 250);
      return new Enemy(question, 'sprite-1', { x: randomXPos, y: 0 }, speed);
    }
    return null;
  }

  public static spawnRandomEnemy(type: Operator): Enemy {
    const question = QuestionGenerator.generateRandomQuestion(type);

    return new Enemy(question, 'sprite-1', { x: 15, y: 0 });
  }

  public static spawnRandomEnemies(
    totalEnemy: number,
    availableType: Operator[] = ALL_OPERATOR,
  ): Enemy[] {
    const enemies = [];
    while (totalEnemy--) {
      const question =
        QuestionGenerator.generateRandomTypeQuestion(availableType);
      const randomXPos = Math.floor(Math.random() * 250);
      const enemy = new Enemy(question, 'sprite-1', { x: randomXPos, y: 0 });
      enemy.setActive(false);

      enemies.push(enemy);
    }

    return enemies;
  }
}
