export abstract class TemplateBase {

    public readonly appContainer: HTMLElement;

    public readonly elementId: string;

    private readonly appContainerId = "app";

    constructor(id: string) {
        this.elementId = id;

        const appContainer = document.getElementById(this.appContainerId);

        if (appContainer == null) {
            throw new Error();
        }

        this.appContainer = appContainer;
    }

    public abstract add(): void;

    public remove() {
        const element = document.querySelector(`#${this.elementId}`);

        if (element == null) {
            throw new Error("Element can't be found and therefore can't be removed");
        }

        this.appContainer?.removeChild(element);
    }

}