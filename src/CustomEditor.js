import ClassicEditorBase from "@ckeditor/ckeditor5-build-classic";
import { SourceEditing } from "@ckeditor/ckeditor5-source-editing";
import { MediaEmbed } from "@ckeditor/ckeditor5-media-embed";

export default class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = [
  ...ClassicEditorBase.builtinPlugins,
  SourceEditing,
  MediaEmbed,
];

ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "blockQuote",
      "insertTable",
      "mediaEmbed",
      "|",
      "undo",
      "redo",
      "|",
      "sourceEditing", // ✅ Shows “Source” button
    ],
  },
  mediaEmbed: {
    previewsInData: true,
  },
  language: "en",
};
