export default class UIComponent<T extends HTMLElement> {
  protected element: T | null;

  public get id(): string {
    return this.element?.id || '';
  }

  public constructor(id: string) {
    this.element = document.getElementById(id) as T;
  }
}
