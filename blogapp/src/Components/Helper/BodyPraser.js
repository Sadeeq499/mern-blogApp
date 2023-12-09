import { generateHTML } from "@tiptap/html";
import parse from "html-react-parser";
import { extensions } from "../../Editor/Constants/TipTapExtension";


export const parseJsonToHtml = (data) => {
  return parse(
    generateHTML(data, extensions)
  );

};