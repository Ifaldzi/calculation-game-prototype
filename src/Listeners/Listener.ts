import EventListener from './EventListener';

class Listener {
  private eventListener: EventListener;
  private input: HTMLInputElement;
  private handleKeyPress: (event: KeyboardEvent) => void;

  constructor(eventListener: EventListener) {
    this.eventListener = eventListener;
    this.input = document.getElementById('answer') as HTMLInputElement;

    this.handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        console.log(this.input.value);
        this.eventListener.onAnswered(parseInt(this.input.value));
        this.input.value = '';
      }
    };
  }

  public addAnswerListener() {
    this.input.addEventListener('keypress', this.handleKeyPress);
  }

  public removeListener() {
    this.input.removeEventListener('keypress', this.handleKeyPress);
  }
}

export default Listener;
