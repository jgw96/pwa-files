/// <reference lib="dom"/>

declare global {
  interface HTMLElementTagNameMap {
    "pwa-files": PWAFilesComponent;
  }

  interface PWAFilesComponent extends HTMLElement {
    /*openmodal?: boolean;
    usecustom?: boolean;
    manifestpath?: string;
    explainer?: string;
    featuresheader?: string;
    descriptionheader?: string;
    installbuttontext?: string;
    cancelbuttontext?: string;
    iosinstallinfotext?: string;

    openPrompt(): void;
    closePrompt(): void;
    getInstalledStatus(): boolean;*/
  }
}

export {};
