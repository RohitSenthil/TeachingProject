import React from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { eclipse } from '@uiw/codemirror-theme-eclipse';
import { EditorView } from '@codemirror/view';
import { python } from '@codemirror/lang-python';
function DisplayCode({ value }: { value: string }) {
  return (
    <CodeMirror readOnly={true} theme={eclipse} value={value} extensions={[python(), EditorView.lineWrapping]} style={{ textAlign: "left" }} />)
}

export default DisplayCode