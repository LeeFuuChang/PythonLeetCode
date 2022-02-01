const code = document.querySelector("#content-content-editor-inner-code");
const codeEditor = document.querySelector("#content-content-editor-inner-code-input");
codeEditor.default = "class Solution(): #don't change class name\n    def main(self, a, b): #don't change function name";
codeEditor.renderedEditor = undefined;
codeEditor.render = function(_font, _theme, _bind, _text){
    code.querySelectorAll(".CodeMirror").forEach(cm => {
        code.removeChild(cm);
    })
    codeEditor.renderedEditor = CodeMirror.fromTextArea(codeEditor, {
        mode: "python",
        theme: _theme,
        keyMap: _bind,
        lineNumbers: true,
        smartIndent: true,
        indentUnit: 4,
        lineWrapping: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
        foldGutter: true,
        autofocus: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        styleActiveLine: true,
    })
    codeEditor.renderedEditor.setOption("value", _text);
    document.querySelectorAll(".CodeMirror").forEach(ele => {
        ele.style.fontSize = _font + "px";
    })
}
codeEditor.render(14, "eclipse", "sublime", codeEditor.default);