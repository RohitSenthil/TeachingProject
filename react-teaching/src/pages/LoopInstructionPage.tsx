import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import React, { useEffect, useRef, useState } from 'react'
import MultipleChoice from '../components/MultipleChoice'
import DisplayCode from '../components/DisplayCode'
import LoopAnimation from '../components/LoopAnimation'
import BottomBar from '../components/BottomBar'
import { useGlobalData } from '../components/GlobalStateProvider'

function LoopInstructionPage() {
    const [completed, setCompleted] = useState(0)
    const [data, setData] = useGlobalData()
    useEffect(() => {
        if (completed === 5) {
            setData("loop", "finished")
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
                        Loops
                    </Typography>
                    <Typography variant='h5' color={'black'} >
                        Loops run a set of code repeatedly. Instead of writing out the same code multiple times, you can use a loop to shorten the code. Loops are a great way to perform operations on iterable values in Python. Iterables are types of variables that hold multiple values, where each value can be accessed one by one in a loop. Using loops, you can get each value in a list and perform logic based on the value of the list.
                    </Typography>
                    <Typography variant="h3" color="black" marginTop={'0.25em'} marginBottom={'0.25em'}>
                        While loop
                    </Typography>
                    <Typography variant="h5" color="black">
                        The while loop is the most basic Python loop. The while loop takes the form:
                    </Typography>
                    <Container sx={{ width: "50%" }}>
                        <DisplayCode value={"while condition:\n\t#code"} />
                    </Container>
                    <Typography variant="h5" color="black">
                        The first thing a while loop does is evaluate the condition. If the condition evaluates to False, just like an if statement, the block of code inside of the while loop will not be run. If the condition is True, the code inside will be run. However, unlike an if statement, after the inside code is run, the program will jump back to the top of the while loop and check the condition again. If the condition evaluates to True the code is run again and the loop will continue running until the condition evaluates to False. Be very careful using while loops, if the condition never evaluates to False, the loop will run endlessly, crashing the program and potentially even your computer.
                    </Typography>
                    <MultipleChoice question={"What will be the value of x after the code is run?"} answers={[
                        "2",
                        "3",
                        "9999999",
                        "Infinite Loop"
                    ]} correct={"1"} hint={"Check the condition"} editor={"x=2\nwhile x>2:\n\tx=x+1\nprint(x)"} setCompleted={() => setCompleted(prev => prev + 1)} />
                    <Typography variant="h3" color="black" marginTop={'0.25em'} marginBottom={'0.25em'}>
                        For loop
                    </Typography>
                    <Typography variant="h5" color="black">
                        The for loop is the most common Python loop. The for loop takes the form:
                    </Typography>
                    <Container sx={{ width: "50%" }}>
                        <DisplayCode value={"for varName in iterable:\n\t#code"} />
                    </Container>
                    <Typography variant="h5" color="black">
                        The for loop is different from the while loop in that no conditions are evaluated, with the number of iterations in the loop depending on how many elements are in the iterable. The varName can be any name, and it represents the current value of the iterable that the loop is on. One of the main iterables used in a for loop is the range function. The range function takes the form: range(start, stop, increment), where start, stop, and increment are all numbers. The range function will then return a sequence of numbers starting from the start value, then adding the increment value until the number reaches the stop value. Note that the stop value isn't included in the range function. The start and increment values aren't needed, and the start value will default to 0 if not specified and the increment value will default to 1 if not specified. Passing a single argument will pass the stop parameter, 2 arguments will pass the start and stop parameters, and 3 arguments will pass the start, stop, and increment parameters.
                    </Typography>
                    <LoopAnimation setCompleted={() => setCompleted(prev => prev + 1)} />
                    <MultipleChoice question={"What will be the values in the list?"} answers={[
                        "[]",
                        "[1,2,3,4]",
                        "[0,1,2,3]",
                        "[1,2,3]"
                    ]} correct={"3"} hint={"What values will the range function return"} editor={"list=[]\nfor x in range(1,4):\n\tlist.append(x)\nprint(list)"} setCompleted={() => setCompleted(prev => prev + 1)} />
                    <Typography variant="h5" color="black">
                        The for loop is also used to iterate through a list. Instead of using the range function as the iterable, using a list as the iterable will allow you to access each value of the list and perform some logic on them. The varName will be the name of the current value of the list the loop is on, and you can perform operations on it as if it were a regular variable.
                    </Typography>
                    <MultipleChoice question={"What will be the values in the newList?"} answers={[
                        "[]",
                        "[1,2,3,4,5]",
                        "[2,4]",
                        "[4,8]"
                    ]} correct={"4"} hint={"What does the modulus operator do?"} editor={"list=[1,2,3,4,5]\nnewList=[]\nfor number in list:\n\tif number%2==0:\n\t\tnewList.append(number*2)\nprint(newList)"} setCompleted={() => setCompleted(prev => prev + 1)} />
                    <Typography variant="h3" color="black" marginTop={'0.25em'} marginBottom={'0.25em'}>
                        Loop Control Statements
                    </Typography>
                    <Typography variant="h5" color="black">
                        There are two loop control statements: break and continue. Using the break statement in a loop will "break" the loop, stopping the loop prematurely and causing the program to jump to the lines after the loop. Using the continue statement in a loop will stop the current iteration of the loop, but the program will jump back to the start of the loop as if the current iteration ended normally.
                    </Typography>
                    <MultipleChoice question={"What will be the the value of x after the code has run"} answers={[
                        "1",
                        "2",
                        "3",
                        "4"
                    ]} correct={"2"} hint={"Remember what the not operator does"} editor={"x=1\nwhile x<4:\n\tif not x<2:\n\t\tbreak\n\tx=x+1\nprint(x)"} setCompleted={() => setCompleted(prev => prev + 1)} />
                </Container>
            </Container>
            <Container sx={{ width: "100vw", position: "fixed", bottom: 0, zIndex: 8000 }} disableGutters={true} maxWidth={false}>
                <BottomBar position={8} show={data["loop"] || bottom} />
            </Container>
        </>)
}

export default LoopInstructionPage