import UIComponent from './UIComponent';

export default class Checkbox extends UIComponent<HTMLInputElement> {
  public get checked(): boolean {
    return this.element?.checked ?? false;
  }

  public set checked(checked: boolean) {
    if (this.element) this.element.checked = checked;
  }

  public static groups(name: string): Array<Checkbox> {
    const items = document.getElementsByName(name);
    const checkboxes = new Array<Checkbox>();

    items.forEach((item) => {
      checkboxes.push(new Checkbox(item.id));
    });

    return checkboxes;
  }
}
