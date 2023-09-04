import { generateHTML } from "@tiptap/html";
import Bold from "@tiptap/extension-bold";
import italic from "@tiptap/extension-italic";
import Text from "@tiptap/extension-text";
import paragraph from "@tiptap/extension-paragraph";
import Document from "@tiptap/extension-document";
import parse from "html-react-parser";


export const parseJsonToHtml = (data) => {
    return parse(
        generateHTML(data, [Bold, italic, Text, paragraph, Document])
      );

    };