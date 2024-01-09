let { PythonShell } = require('python-shell')
const express = require('express');
const app = express()
const port = 80;
const cors = require('cors');
const fs = require("fs");
const tests = require("./tests")
app.use(cors());
app.use(express.json());
let beginning = "import sys\n\n"
app.post("/api", (req, res) => {
    const problem = req.body.problem
    const code = req.body.code;
    fs.writeFileSync("output.py", beginning + code + tests[problem].ending);
    const promises = [];
    let testCaseResults = [];
    const testCases = tests[problem].arguments
    Object.keys(testCases).map((key) => {
        promises.push(
            new Promise((resolve, reject) => {
                let shell = new PythonShell("output.py", {
                    mode: "text",
                    pythonOptions: ["-u"],
                    args: testCases[key],
                })
                let out = []
                shell.on('message', function (message) {
                    out.push(message)
                })
                shell.on('pythonError', function (err) {
                    if (err.stack.includes("SyntaxError")) {
                        testCaseResults.push({ correct: false, result: "\n" + err.stack.split('\r\n').slice(1, 4).join("\n"), answer: testCases[key].at(-1), key: key })
                        return resolve(true)
                    }
                    else {
                        testCaseResults.push({ correct: false, result: err.stack.match(/(?<=Error: ).+/)[0], answer: testCases[key].at(-1), key: key })
                        return resolve(true)
                    }
                })
                shell.on('close', function () {
                    console.log(out)
                    if (out.length !== 0) {
                        testCaseResults.push({ correct: out.at((out.length / 2) - 1), result: out.slice(out.length / 2).join('\n'), answer: testCases[key].at(-1), key: key });
                        return resolve(true)
                    }
                })
                shell.on('error', function (err) {
                    testCaseResults.push({ correct: false, result: "Error: Please Try Again", answer: testCases[key].at(-1), key: key })
                })
                setTimeout(() => {
                    shell.kill()
                    testCaseResults.push({ correct: false, result: "Error: Infinite Loop", answer: testCases[key].at(-1), key: key })
                    return resolve(true)
                }, 5000);
            })
        );
    });
    Promise.all(promises).then(() => {
        testCaseResults = testCaseResults.sort((a, b) => a.key - b.key)
        res.json({ testCaseResults })
    });
})
app.listen(port, () => console.log(`App listening on port ${port}!`))
