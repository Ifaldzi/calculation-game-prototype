import UIComponent from './UIComponent';

export default class Select<T> extends UIComponent<HTMLSelectElement> {
  private _onchange?: () => void;
  public options: Array<{ value: T; name: string }>;

  public constructor(id: string, options: Array<{ value: T; name: string }>) {
    super(id);
    this.options = options;
    options.forEach((opt) => {
      const optionElement = document.createElement('option');
      optionElement.text = opt.name;
      optionElement.value = opt.value as string;
      this.element?.options.add(optionElement);
    });
  }

  public get value(): T | null {
    return this.element?.value as T;
  }

  public set onchange(onchange: (value: T) => void) {
    if (this.element) {
      if (this._onchange)
        this.element.removeEventListener('change', this._onchange);
      this._onchange = () => onchange(this.value!);
      this.element.addEventListener('change', this._onchange);
    }
  }
}
