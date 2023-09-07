import * as ini from 'ini';
import LevelOption from './LevelOption';

export default class GameConfig {
  private static configFile = 'Configs/config.cfg';

  private static config: { [section: string]: { [key: string]: string } } = {};

  public static async loadConfig() {
    const response = await fetch(this.configFile);
    const configData = await response.text();
    this.config = ini.parse(configData);
  }

  public static get<T>(section: string, key: string): T | null {
    return (this.config[section]?.[key] as T) || null;
  }

  public static getSection<T>(section: string): T | null {
    return (this.config[section] as T) || null;
  }

  public static getLevel(level: number): LevelOption | null {
    const levelConfig = this.getSection<LevelOption>(`Level${level}`);

    return levelConfig
      ? {
          ...levelConfig,
          enemy_speed: parseFloat(levelConfig.enemy_speed.toString()),
          total_enemy: parseInt(levelConfig.total_enemy.toString()),
          total_wave: parseInt(levelConfig.total_wave.toString()),
        }
      : null;
  }

  public static get totalLevel(): number {
    console.log(this.config)
    return Object.entries(this.config).filter(([key]) => key.includes('Level'))
      .length;
  }
}
