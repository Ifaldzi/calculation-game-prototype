import UIComponent from './UIComponent';

export default class TextField extends UIComponent<HTMLInputElement> {
  public get value(): string {
    return this.element?.value || '';
  }

  public set value(value: string) {
    if (this.element) {
      this.element.value = value;
    }
  }
}
