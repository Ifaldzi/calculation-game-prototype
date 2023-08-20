export default class Player {
  public life: number;
  private onHit: () => void;
  private lifeText = document.getElementById('life');

  public constructor(life: number) {
    this.life = life;
    this.onHit = () => {
      if (this.life >= 0) this.decreaseLife();
    };
    document.addEventListener('hit', this.onHit);
    this.renderLifeText();
  }

  public decreaseLife(): void {
    this.life -= 1;
    this.renderLifeText();
  }

  private renderLifeText(): void {
    if (this.lifeText && this.life >= 0) {
      this.lifeText.textContent = Array(this.life).fill('❤️').join('');
    }
  }
}
