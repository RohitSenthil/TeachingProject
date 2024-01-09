import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { EditorView } from '@codemirror/view';
import { eclipse } from '@uiw/codemirror-theme-eclipse';
import useMeasure from 'react-use/lib/useMeasure';
const Editor = ({ code, onChange }: { code: string, onChange: (value: string) => void }) => {
  const [containerRef, { height }]: [any, { height: number }] = useMeasure();
  return (
    <div className='container' ref={containerRef}>
      <CodeMirror
        value={code}
        placeholder={'Type your code here'}
        extensions={[python(), EditorView.lineWrapping, EditorView.theme({
          "&": { height: `${height}px` },
          ".cm-scroller": { overflow: "auto" },
        })]}
        theme={eclipse}
        onChange={onChange}
        minHeight={"100%"}
        maxHeight={"100%"}
        width={"100%"}
        minWidth={"100%"}
        maxWidth={"100%"}
      />
    </div>
  )
}

export default Editor