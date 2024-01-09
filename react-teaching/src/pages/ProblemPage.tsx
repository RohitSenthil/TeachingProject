import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Editor from '../components/Editor';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { BottomResizable, Fill, Fixed, LeftResizable } from 'react-spaces';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import LoadingButton from '@mui/lab/LoadingButton';
import TestCase from '../components/TestCase';
import Box from '@mui/material/Box';
import questionData from '../data/ProblemData';
import BottomBar from '../components/BottomBar';
import { useGlobalData } from '../components/GlobalStateProvider';
import DisplayCode from '../components/DisplayCode';
function ProblemPage({ problem }: { problem: keyof typeof questionData }) {
  const [data, setData] = useGlobalData()
  const [code, setCode] = useState(data[problem] ? data[problem] : questionData[problem].initialCode);
  const [output, setOutput] = useState('Output:');
  const [loading, setLoading] = useState(false);
  const [correct, setCorrect] = useState(data[problem] ? [true, true, true] : [false, false, false]);
  const runCode = (code: string) => {
    setLoading(true)
    axios.post(import.meta.env.VITE_PYTHON_API_URL, { code, problem }).then(
      ({ data }) => {
        let out = "Output:\n"
        let cor: boolean[] = []
        for (const result of data.testCaseResults) {
          out += `Test case ${result.key}: ${result.correct == "True" ? "Passed ✅" : "Failed ❌"} | Output: ${result.result} | Correct Answer: ${result.answer}\n`
          cor.push((/True/).test(result.correct))
        }
        setOutput(out)
        setCorrect(cor)
        setLoading(false)
      }
    )
  }
  useEffect(() => {
    if (correct.every(test => test === true)) {
      localStorage.setItem(problem, code)
      setData(problem, code)
    }
  }, [correct])
  useEffect(() => {
    setCode(data[problem] ? data[problem] : questionData[problem].initialCode)
    setOutput('Output:')
    setLoading(false)
    setCorrect(data[problem] ? [true, true, true] : [false, false, false])
  }, [problem])
  const testCaseRef = useRef<HTMLDivElement>(null)
  return (
    <>
      <Box sx={{ position: 'relative', flexGrow: 1 }}>
        <Fixed height='100%' width='100%'>
          <LeftResizable size='50%' style={{ borderRight: "solid 2.5px #4ebaaa" }}>
            <Container sx={{ minWidth: '100%', minHeight: '100%', maxHeight: '100%', overflow: 'auto', bgcolor: '#e0e0e0' }} ref={testCaseRef}>
              <Typography variant='h2' color={'black'} marginTop={'0.25em'} marginBottom={'0.25em'}>
                {`${problem.at(0)?.toUpperCase()}${problem.slice(1, -1)} Problem ${problem.at(-1)}`}
              </Typography>
              <Typography variant='h5' color={'black'} whiteSpace={"pre-wrap"}>
                {questionData[problem].text}
              </Typography>
              {problem === "variable1" ? <DisplayCode value={"#Example: Given two parameters, x and y, return the multiplication of both numbers\ndef multiply(x,y)#->Name of function is multiply, parameters are x and y\n  return x*y#->Function is returning the result of x*y, which were the parameters passed\n#A function is called by the name, and then the parameters\nmultiply(2,3)#->6\n#In this call, x is 2 and y is 3"} /> : null}
              <TestCase number={1} correct={correct[0]}></TestCase>
              <TestCase number={2} correct={correct[1]}></TestCase>
              <TestCase number={3} correct={correct[2]}></TestCase>
            </Container>
          </LeftResizable>
          <Fill>
            <Fill>
              <Editor
                code={code}
                onChange={(value: string) => {
                  setCode(value);
                }}
              />
              <LoadingButton loading={loading} loadingPosition="end" onClick={() => {
                runCode(code);
                setTimeout(() => testCaseRef.current?.scrollTo({ top: testCaseRef.current?.scrollHeight, behavior: "smooth" }), 600)
              }
              }
                variant='contained' size="large" endIcon={<PlayCircleIcon />} sx={{ position: 'absolute', zIndex: '1000', bottom: 0, right: 0 }}>Run</LoadingButton> :
            </Fill>
            <BottomResizable size='25%' style={{ borderTop: "solid 2.5px #4ebaaa" }}>
              <Container sx={{ minWidth: '100%', minHeight: '100%', maxHeight: '100%', overflow: 'auto', bgcolor: 'black' }}>
                <Typography variant='subtitle1' sx={{ whiteSpace: "pre", color: "white", fontWeight: 'light' }}>{output}</Typography>
              </Container>
            </BottomResizable>
          </Fill>
        </Fixed>
      </Box>
      <BottomBar position={Object.keys(data).indexOf(problem)} show={correct.every(test => test === true)} problem={true} />
    </>
  );
}
export default ProblemPage;