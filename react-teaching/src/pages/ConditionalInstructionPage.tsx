import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import React, { useEffect, useState, useRef } from 'react'
import BottomBar from '../components/BottomBar'
import ConditionalAnimation from '../components/ConditionalAnimation'
import CustomTable from '../components/CustomTable'
import DisplayCode from '../components/DisplayCode'
import FlowControlAnimation from '../components/FlowControlAnimation'
import { useGlobalData } from '../components/GlobalStateProvider'
import MultipleChoice from '../components/MultipleChoice'

function ConditionalInstructionPage() {
    const [completed, setCompleted] = useState(0)
    const [data, setData] = useGlobalData()
    useEffect(() => {
        if (completed === 5) {
            setData("conditional", "finished")
        }
    }, [completed])
    const [bottom, setBottom] = useState(false)
    const containerRef = useRef<any>(null)
    const checkBottom = () => {
        if (containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            const atBottom = Math.abs((scrollHeight - scrollTop) - clientHeight) < 1
            if (atBottom) {
                setBottom(true)
            }
            else if (bottom == false) {
                return
            }
            else {
                setBottom(false)
            }
        }
    };
    return (
        <>
            <Container
                sx={{ backgroundColor: "#D5D7DB", overflow: "auto", minWidth: "100%", display: "flex", flexDirection: "column", justifyItems: "center", alignItems: "center" }} ref={containerRef} onScroll={checkBottom}>
                <Container sx={{ backgroundColor: "white", maxWidth: "75%", paddingBottom: "3em", boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} maxWidth={false}>
                    <Typography variant='h2' color={'black'} marginTop={'0.25em'} marginBottom={'0.25em'}>
                        Conditionals
                    </Typography>
                    <Typography variant='h5' color={'black'} >
                        Conditionals are the like the traffic lights of a program. They control your program's actions by controlling which lines of code your program will run. Conditionals are built on booleans, which, if you remember from the variable instruction page, take the value of True and False. Conditionals are used to run sections of code based on whether a boolean value or an expression returns True or False.
                    </Typography>
                    <Typography variant="h3" color="black" marginTop={'0.25em'} marginBottom={'0.25em'}>
                        Comparisons
                    </Typography>
                    <Typography variant="h5" color="black">
                        Comparisons are the foundation of conditionals. Each comparison operator returns a boolean True if the expression is correct and a boolean False if the expression is incorrect. Conditionals use the outcome of a comparison operator to determine which lines of code to run. The operators are listed in the table below.
                    </Typography>
                    <CustomTable title="Comparison" headings={["Symbol", "Example"]} rows={[["Check if two values are equal", "==", <DisplayCode value={"x=2\ny=2\nz=(x==y)\nprint(z) #-> True"} />], ["Check if two values are not equal", "!=", <DisplayCode value={"x=3\ny=4\nz=(x!=y)\nprint(z) #-> True"} />], ["Check if a value is less than another value", "<", <DisplayCode value={"x=5\ny=4\nz=(x<y)\nprint(z) #-> False"} />], ["Check if a value is less than or equal to another value", "<=", <DisplayCode value={"x=1\ny=4\nz=(x<=y)\nprint(z) #-> True"} />], ["Check if a value is greater than another value", ">", <DisplayCode value={"x=2\ny=6\nz=(x>y)\nprint(z) #-> False"} />], ["Check if a value is greater than or equal to another value", ">=", <DisplayCode value={"x=4\ny=4\nz=(x>=y)\nprint(z) #-> True"} />]]} />
                    <Typography variant="h5" color="black">
                        Be careful about the difference between a single equals sign and a double equals sign. = indicates you are assigning a value to a variable, while == indicates you are checking to see if two values are equal.
                    </Typography>
                    <MultipleChoice question="What is the value of z?" editor={"x=27\ny=19\ny+=8\nz=y<x"} answers={["True", "False", "27", "8"]} correct="2" hint='What are the values of x and y?' setCompleted={() => setCompleted(prev => prev + 1)} />
                    <Typography variant="h3" color="black" marginTop={'0.25em'} marginBottom={'0.25em'}>
                        Operators
                    </Typography>
                    <Typography variant="h5" color="black">
                        There are three boolean operators: and, or, not. You can think of them as the operators for boolean math, just as plus and minus are operations for regular math.
                    </Typography>
                    <CustomTable title="Operator" headings={["What they Do", "Examples"]} rows={[["and", "Evalutates to True if both values are True, evaluates to False if either value is False", <DisplayCode value={"x=True\ny=False\nprint(x and y) # -> False"} />], ["or", "Evaluates to True if either value is True, evaluates to False if both values are False", <DisplayCode value={"x=True\ny=False\nprint(x and y) # -> True"} />], ["not", "Flips a value: evaluates to True if the value is False and evaluates to False if the value is True", <DisplayCode value={"x=True\ny=False\nprint(not(x and y)) # -> True: x and y evaluates to False, but the not operator flips it to True"} />]]} />
                    <Typography variant="h5" color="black">
                        Note that boolean operators use short-circut evaluation. For an and operator, if the first value is False, the operator must evaluate to False so the second value will not be read, and conversely for an or operator if the first value is True, the operator must evaluate to True so the second value will not be read.
                    </Typography>
                    <ConditionalAnimation setCompleted={() => setCompleted(prev => prev + 1)} />
                    <MultipleChoice question="What is the value of z" editor={"x=48<30\ny=40>=14\nz= not x or y"} answers={["False", "True", "yes", "false"]} correct="1" hint="Look at the table" setCompleted={() => setCompleted(prev => prev + 1)} />
                    <Typography variant="h3" color="black" marginTop={'0.25em'} marginBottom={'0.25em'}>
                        Conditional Statements
                    </Typography>
                    <Typography variant="h5" color="black">
                        Conditionals are used to run sections of code only if certain conditions are met. The if, elif, and else statements selectively run blocks of code based on a boolean expression. Be careful, the blocks of code must be indented after the colon to indicate what lines of code should be run in the conditions. Improperly indenting your code can cause errors in your program and run lines of code that you don't want.
                    </Typography>
                    <DisplayCode value={"if condition:\n\t#Run some code\nelif condition:\n\t#Run some other Code\nelif condition:\n\t#Run some other Code\nelse:\n\t#Run this code"} />
                    <Typography variant="h5" color="black">
                        First, the if statement will check to see if its condition evaluates to True. If the condition is True, the if block will be run, and no other blocks of code will be run. If the condition evaluates to False, the next elif condition will be checked and if it evalutates to true, the elif block will be run and no other blocks of code will be run. If that condition is false, the next elif condition will be checked, etc. If none of the elif blocks are run, the else block will run if every other condition evaluates to False. An if statement doesn't need an else statement, but you cannot run an else or an elif statement without an if statement.                     </Typography>
                    <DisplayCode value={"if condition:\n\t#Run some code\nif condition:\n\t#Run some code\nif condition:\n\t#Run some code\nelif condition:\n\t#Run some other Code\nelse:\n\t#Run this code"} />
                    <Typography variant="h5" color="black">
                        You can have multiple if statements in a row that are unconnected, where each condition will be checked and all of the code blocks can be run. In the example above, each of the three if statements would be evaluated and could run. However, the elif and else statements will be connected to the closest if statement and only one block in the if,elif,else conditional will be run.
                    </Typography>
                    <FlowControlAnimation setCompleted={() => setCompleted(prev => prev + 1)} />
                    <MultipleChoice question="Whats is the value of x at the end of the code?" editor={"x=0\nif (not not 25>45):\n\tx=x+1\nif (58>=58) or (73<99):\n\tx=x+2\nif (x!=2):\n\tx=x-1\nelif (not True) or (False):\n\tx-=1\nelse:\n\tx+=1"} answers={["1", "2", "3", "0"]} correct="3" hint="Look at which blocks are run" setCompleted={() => setCompleted(prev => prev + 1)} />
                </Container>
            </Container>
            <Container sx={{ width: "100vw", position: "fixed", bottom: 0, zIndex: 8000 }} disableGutters={true} maxWidth={false}>
                <BottomBar position={4} show={data["conditional"] || bottom} />
            </Container>
        </>)
}

export default ConditionalInstructionPage