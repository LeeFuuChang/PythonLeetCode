const code = document.querySelector("#content-content-editor-inner-code");
const codeEditor = document.querySelector("#content-content-editor-inner-code-input");
codeEditor.default = "";
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

codeEditor.StringReplacement = {
    "\n":";1;",
    "+":";2;"
}

codeEditor.removeComment = function(s){
    let last = 0;
    while(true){
        let cur1 = s.indexOf("#");
        let cur2 = s.indexOf(";1;", last);
        if(cur1<0)break;
        s = s.substring(0, cur1) + s.slice(cur2);
        last = cur2;
    }
    return s;
}