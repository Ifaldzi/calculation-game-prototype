import UIComponent from './UIComponent';

export default class Button extends UIComponent<HTMLButtonElement> {
  public constructor(id: string, onclick: () => void) {
    super(id);
    this.element?.addEventListener('click', onclick);
  }

  public set disabled(disabled: boolean) {
    if (this.element) this.element.disabled = disabled;
  }
}
