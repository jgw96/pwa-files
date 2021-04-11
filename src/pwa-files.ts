import {
  directoryOpen,
  fileOpen,
  fileSave,
  FileWithHandle,
} from "browser-fs-access";
import {
  LitElement,
  html,
  customElement,
  css,
  property,
  internalProperty,
} from "lit-element";

@customElement("pwa-files")
export class pwafiles extends LitElement implements PWAFilesComponent {
  @property({ type: String }) buttonString: string = "Choose A File";
  @property({ type: String }) mode: "files" | "directories" = "files";
  @property({ type: Array }) mimeTypes: Array<string> = ['image/*'];
  @property({ type: Array }) extensions: Array<string> = [".png", ".jpg", ".webp"];
  @property({ type: String }) description: string = "";
  @property({ type: Boolean }) recursive: boolean = true;

  @internalProperty() currentFile:
    | FileWithHandle
    | FileWithHandle[]
    | undefined;

  static get styles() {
    return css``;
  }

  constructor() {
    super();
  }

  async openFileOrDir() {
    switch (this.mode) {
      case "files": {
        const options = {
          mimeTypes: this.mimeTypes,
          extensions: this.extensions,
          multiple: false,
          description: this.description,
        };

        try {
          const blobData = await fileOpen(options);

          if (blobData) {
            this.currentFile = blobData;
          }

          let event = new CustomEvent("file-opened", {
            detail: {
              blobData,
            },
          });
          this.dispatchEvent(event);
        } catch (err) {
          console.error(err);

          let event = new CustomEvent("error", {
            detail: {
              error: err,
            },
          });
          this.dispatchEvent(event);
        }

        break;
      }

      case "directories": {
        const options = {
          recursive: this.recursive,
        };

        try {
          const blobData = await directoryOpen(options);

          let event = new CustomEvent("dir-opened", {
            detail: {
              blobData,
            },
          });
          this.dispatchEvent(event);
        } catch (err) {
          console.error(err);

          let event = new CustomEvent("error", {
            detail: {
              error: err,
            },
          });
          this.dispatchEvent(event);
        }

        break;
      }
    }
  }

  public async saveFile(blob?: FileWithHandle, options?: any) {
    try {
      await fileSave(
        blob ? blob : this.currentFile as FileWithHandle,
        options ? options : undefined,
        this.currentFile
          ? (this.currentFile as FileWithHandle).handle
          : undefined,
        true
      );
    } catch (err) {
      console.error(err);

      let event = new CustomEvent("error", {
        detail: {
          error: err,
        },
      });
      this.dispatchEvent(event);
    }
  }

  render() {
    return html`
      <button part="innerbutton" @click="${() => this.openFileOrDir()}">
        ${this.buttonString}
      </button>
    `;
  }
}
