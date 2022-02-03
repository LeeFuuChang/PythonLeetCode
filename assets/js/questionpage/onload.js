const pageTitle = document.querySelector("head").querySelector("title");
var QUESTION = undefined;
fetch(
    `${pageTitle.innerText}/get`, {method:"GET"}
).then(res => {
    return res.json();
}).then(res => {
    QUESTION = res;
    Load_Question_Description(QUESTION);
    codeEditor.default = `class Solution(): #don't change class name\n    def main(self, ${QUESTION.var.join(", ")}): #don't change function name`;
    codeEditor.render(
        CurrentsEditorOptions.font,
        CurrentsEditorOptions.theme.toLowerCase(), 
        CurrentsEditorOptions.bind.toLowerCase(),
        codeEditor.default
    );
})
QUESTION = {
    "id":"4",
    "name":"Excel Sheet Column Number",
    "difficulty":"Easy",
    "likes":2309,
    "dislikes":230,
    "description":[
        "Given a string that represents the column title as appear in an Excel sheet, return its corresponding column number.",
        "For example:",
        "A -> 1<br>B -> 2<br>C -> 3<br>...<br>Z -> 26<br>AA -> 27<br>AB -> 28<br>..."
    ],
    "var":[
        "columnTitle"
    ],
    "example":{
        "ex1":{
            "input":"columnTitle = 'A'",
            "output":"1",
            "explain":null
        },
        "ex2":{
            "input":"columnTitle = 'AB'",
            "output":"28",
            "explain":null
        },
        "ex3":{
            "input":"columnTitle = 'ZY'",
            "output":"701",
            "explain":null
        }
    },
    "constraints":[
        "1 <= columnTitle.length <= 7",
        "columnTitle consists only of uppercase English letters.",
        "columnTitle is in the range ['A', 'FXSHRXW']."
    ]
}
Load_Question_Description(QUESTION);
codeEditor.default = `class Solution(): #don't change class name\n    def main(self, ${QUESTION.var.join(", ")}): #don't change function name`;
codeEditor.render(
    CurrentsEditorOptions.font,
    CurrentsEditorOptions.theme.toLowerCase(), 
    CurrentsEditorOptions.bind.toLowerCase(),
    codeEditor.default
);