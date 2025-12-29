import ClassicEditorBase from "@ckeditor/ckeditor5-build-classic";
import { Plugin } from "@ckeditor/ckeditor5-core";

class SourceEditingPlugin extends Plugin {
  init() {
    const editor = this.editor;

    editor.ui.componentFactory.add("source", (locale) => {
      const view = new editor.ui.button.ButtonView(locale);

      view.set({
        label: "HTML Source",
        withText: true,
        tooltip: true,
      });

      view.on("execute", () => {
        const textareaId = "ckeditor-source-view";
        let textarea = document.getElementById(textareaId);

        if (!textarea) {
          textarea = document.createElement("textarea");
          textarea.id = textareaId;
          textarea.style.width = "100%";
          textarea.style.height = "300px";
          textarea.value = editor.getData();
          editor.ui.view.editable.element.parentNode.appendChild(textarea);

          textarea.addEventListener("input", () => {
            editor.setData(textarea.value);
          });
        } else {
          textarea.remove();
        }
      });

      return view;
    });
  }
}

export default class CustomEditor extends ClassicEditorBase {}

CustomEditor.builtinPlugins = [
  ...ClassicEditorBase.builtinPlugins,
  SourceEditingPlugin, // ✅ custom source view
];

CustomEditor.defaultConfig = {
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "|",
      "blockQuote",
      "insertTable",
      "undo",
      "redo",
      "|",
      "source", // ✅ our HTML button
    ],
  },
  language: "en",
};
