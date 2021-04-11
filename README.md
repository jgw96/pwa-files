# pwa-files

`pwa-files` is a [web component](https://meowni.ca/posts/web-components-with-otters/) from the [PWABuilder](https://pwabuilder.com) team that brings an awesome "install" experience to your Progressive Web App!

_Built with [lit-element](https://lit-element.polymer-project.org/)_

## Supported Browsers

- Edge
- Chrome
- Firefox
- Safari

## Using this component

## Install

There are two ways to use this component. For simple projects or just to get started fast, we recommend using the component by script tag. If your project is using [npm](https://www.npmjs.com/) then we recommend using the npm package.

### Script tag

- Put this script tag in the head of your index.html:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@lilpwa/pwa-files"></script>
```

### NPM

- Run `npm install @lilpwa/pwa-files`
- import with `import '@lilpwa/pwa-files'`

Then you can use the element `<pwa-files></pwa-files>` anywhere in your template, JSX, html etc.

## API

### Properties

| Property       | Attribute      | Description                                                                   | Type            | Default                     |
| -------------- | -------------- | ----------------------------------------------------------------------------- | --------------- | --------------------------- |
| `buttonString` | `buttonString` | Controls the text inside the open files button                                | `string`        | `Choose A File`             |
| `mode`         | `mode`         | Should the button open files or directories?                                  | `string`        | `files`                     |
| `mimeTypes`    | `mimeTypes`    | The mime type of the file you would like a user to choose                     | `Array<string>` | `['image/*']`               |
| `extensions`   | `extensions`   | The extensions of the file you would like a user to choose                    | `Array<string>` | `[".png", ".jpg", ".webp"]` |
| `description`  | `description`  | A description that will appear in the OS system file picker                   | `string`        | `""`                        |
| `recursive`    | `recursive`    | If a directory is chosen should directories inside that be recursively opened | `boolean`       | `true`                      |

### Methods

| name         | Description                       |
| ------------ | --------------------------------- |
| `saveFile()` | `Saves the currently opened file` |

Interactions with the methods requires a reference to the element itself, if using webcomponents or a library like Lit-Element or Fast-Element, this can be done easily within the if using the component from the browser.

### Events
| name         | Description                       |
| ------------ | --------------------------------- |
| `file-opened` | `ev.blobData contains a blob of the user chosen file` |
| `dir-opened` | `ev.blobData contains a blob of the user chosen directory` |
| `error` | `When an error is caught this event will contain the error message` |


## Styling

### Shadow Parts

The contents of this component is just a normal HTML button element, and it can be targeted and styled normally using Shadow Parts. You can target this button element using `pwa-files::part(innerbutton)`. For example, to make the background of the button grey, I would need this CSS:

```css
pwa-files::part(innerbutton) {
  background: grey;
}
```

## Usage Example

```html
<pwa-files id="file" buttonString="Pick A File"></pwa-files>

<pwa-files
  id="dir"
  buttonString="Open A Directory"
  mode="directories"
></pwa-files>

<button onclick="saveFile()">Save Current Opened File</button>

<script>
  function saveFile() {
    document.querySelector("#file").saveFile();
  }
</script>

<script type="module">
  import "../build/pwa-files.js";

  document.querySelector("#file").addEventListener("file-opened", (ev) => {
    console.log(ev);
  });

  document.querySelector("#dir").addEventListener("dir-opened", (ev) => {
    console.log(ev);
  });
</script>
```
