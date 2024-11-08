"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDisableType = getDisableType;
const vscode_languageserver_types_1 = require("vscode-languageserver-types");
/**
 * If the given position is inside a `stylelint-disable` after the comment'
 * type, returns the disable comment's type. Otherwise, returns `undefined`.
 *
 * @example
 * ```js
 * const document = TextDocument.create(
 *   'file:///path/to/file.css',
 *   'css',
 *   1,
 *   '/* stylelint-disable-line indentation *\/'
 *   //                         ^ Position is here
 * );
 * const position = Position.create(0, 26);
 *
 * getDisableType(document, position);
 * // => 'stylelint-disable-line'
 * ```
 */
function getDisableType(document, position) {
    const lineStartOffset = document.offsetAt(vscode_languageserver_types_1.Position.create(position.line, 0));
    const lineEndOffset = document.offsetAt(vscode_languageserver_types_1.Position.create(position.line + 1, 0));
    const line = document.getText().slice(lineStartOffset, lineEndOffset);
    const before = line.slice(0, position.character);
    const after = line.slice(position.character);
    const disableKind = before
        .match(/\/\*\s*(stylelint-disable(?:(?:-next)?-line)?)\s[a-z\-/\s,]*$/i)?.[1]
        ?.toLowerCase();
    return disableKind && /^[a-z\-/\s,]*\*\//i.test(after) ? disableKind : undefined;
}
//# sourceMappingURL=get-disable-type.js.map