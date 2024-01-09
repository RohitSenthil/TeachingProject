import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Replay from '@mui/icons-material/Replay';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import { animated, useTransition, useSpring } from '@react-spring/web';
import React, { useEffect, useReducer, useRef, useState } from 'react'
import { useMeasure } from 'react-use';
import useFitText from "use-fit-text";

function FlowControlAnimation({ setCompleted }: { setCompleted: () => void }) {
    const [screenRef, { width, height }]: [any, { width: number, height: number }] = useMeasure();
    const [screenWidth, setscreenWidth] = useState(0)
    const [screenHeight, setScreenHeight] = useState(0)
    const [smaller, setsmaller] = useState(0)

    useEffect(() => {
        setScreenHeight(height)
        setscreenWidth(width)
        setsmaller(width > height ? height : width)
    }, [width, height])
    const { fontSize: codeFontSize, ref: textRef } = useFitText({ minFontSize: 1, maxFontSize: 500 });
    const containerRef = useRef<HTMLDivElement>(null)
    const AnimatedBox = animated(Box)
    const AnimatedTypography = animated(Typography)
    const AnimatedButton = animated(IconButton)
    const numSteps = 6
    const animations = (state: { step: number, right: boolean }, action: string) => {
        switch (action) {
            case 'increment':
                return (state.step === numSteps ? state : { step: state.step + 1, right: true })
            case 'decrement':
                return (state.step === 0 ? state : { step: state.step - 1, right: false })
            case 'reset':
                return ({ step: 0, right: false })
            default:
                return state
        }
    }
    const resetAnimations = () => {
    }
    const [animationState, dispatch] = useReducer(animations, { step: 0, right: true })
    const transition = useTransition(animationState.step, {
        initial: { left: "50%", translate: "-50%" },
        from: { left: animationState.right ? ("0%") : ("100%"), translate: animationState.right ? ("-100%") : ("0%") },
        enter: { left: "50%", translate: "-50%" },
        exitBeforeEnter: true,
        onStart: () => containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
    })
    const resetStyle = useSpring({
        opacity: animationState.step === numSteps ? 1 : 0,
        rotate: animationState.step === numSteps ? "0deg" : "180deg",
        delay: animationState.step === numSteps ? 2000 : 0
    })
    const ifTrueStyle = useSpring({
        opacity: animationState.step == 2 ? 1 : 0,
        display: animationState.step == 2 ? "inline" : "none"
    })
    const ifFalseStyle = useSpring({
        opacity: animationState.step >= 3 ? 1 : 0,
        display: animationState.step >= 3 ? "inline" : "none"

    })
    const elifTrueStyle = useSpring({
        opacity: animationState.step == 4 ? 1 : 0,
        display: animationState.step == 4 ? "inline" : "none"
    })
    const elifFalseStyle = useSpring({
        opacity: animationState.step >= 5 ? 1 : 0,
        display: animationState.step >= 5 ? "inline" : "none"

    })
    const steps = [
        {
            text: "How to evaluate an if else tree",
            animation: () => null
        },
        {
            text: "First, determine whether the condition in the first if will run",
            animation: () => {
                null
            }
        },
        {
            text: "If the condition is true, the code inside the if block will be run, and the program will skip over the rest of the statements",
            animation: () => {
                null
            }
        },
        {
            text: "If the condition is false, the code inside the if block will be skipped, and the program will check the condition of the next statement it sees",
            animation: () => {
                null
            }
        },
        {
            text: "Just like the if statement, the program will check the condition inside the elif statement, and if it evaluates to true, the code inside the elif block will be run and the program will skip over the rest of the statements",
            animation: () => {
                null
            }
        },
        {
            text: "If the condition is false, the code inside the block will be skipped, and the program will check the condition of the next stamement",
            animation: () => {
                null
            }
        },
        {
            text: "There's no condition to evaluate in the else statement, as it will only run if all the other conditions above it evaluate to false. This means that if all of the other conditions evaluate to false, the code in the else statement will be run.",
            animation: () => {
                null
            }
        }
    ]

    useEffect(() => {
        resetAnimations()
    }, [])
    const [finished, setFinished] = useState(false);
    useEffect(() => {
        const step = (animationState.right ? animationState.step : animationState.step + 1)
        steps[step].animation()
        if (animationState.step === numSteps && !finished) {
            setCompleted()
            setFinished(true)
        }
    }, [animationState])
    return (
        <>
            <Container ref={screenRef} sx={{ width: "80%", backgroundColor: "black", height: "30vh", position: "relative", overflow: "hidden", marginTop: "2em" }}>
                <Container sx={{ position: "absolute", width: "fit-content", textAlign: "center", left: 0, right: 0, margin: "auto" }}>
                    <Typography component="div" align="left" color="white" sx={{ position: "absolute", opacity: 0, height: height * 0.15, fontSize: codeFontSize, width: width * 0.8 }} ref={textRef}>
                        {"\t#run some code"}
                    </Typography>
                    <AnimatedTypography align="left" color={animationState.step == 1 ? "green" : "white"} sx={{ position: "relative", fontSize: codeFontSize }}>
                        if condition1:<animated.span style={{ color: "green", ...ifTrueStyle }}>True</animated.span> <animated.span style={{ color: "red", ...ifFalseStyle }}>False</animated.span>
                    </AnimatedTypography>
                    <AnimatedTypography align="left" color={animationState.step == 2 ? "green" : "white"} sx={{ position: "relative", whiteSpace: "pre", fontSize: codeFontSize }}>
                        {"\t#run some code"}
                    </AnimatedTypography>
                    <AnimatedTypography align="left" color={animationState.step == 3 ? "green" : "white"} sx={{ position: "relative", fontSize: codeFontSize }}>
                        elif condition2:<animated.span style={{ color: "green", ...elifTrueStyle }}>True</animated.span> <animated.span style={{ color: "red", ...elifFalseStyle }}>False</animated.span>
                    </AnimatedTypography>
                    <AnimatedTypography align="left" color={animationState.step == 4 ? "green" : "white"} sx={{ position: "relative", whiteSpace: "pre", fontSize: codeFontSize }}>
                        {"\t#run some code"}
                    </AnimatedTypography>
                    <AnimatedTypography align="left" color={animationState.step == 5 ? "green" : "white"} sx={{ position: "relative", fontSize: codeFontSize }}>
                        else:
                    </AnimatedTypography>
                    <AnimatedTypography align="left" color={animationState.step == 6 ? "green" : "white"} sx={{ position: "relative", whiteSpace: "pre", fontSize: codeFontSize }}>
                        {"\t#run some code"}
                    </AnimatedTypography>
                </Container>


                <IconButton color="primary" sx={{ position: "absolute", bottom: "2%", left: "2%" }} onClick={() => dispatch('decrement')} disabled={animationState.step === 0}>
                    <ArrowBack sx={{ width: (screenHeight === smaller ? screenWidth * 0.05 : screenHeight * 0.05), height: (screenHeight === smaller ? screenWidth * 0.05 : screenHeight * 0.05) }} />
                </IconButton>
                <IconButton color="primary" sx={{ position: "absolute", bottom: "2%", right: "2%" }} onClick={() => dispatch('increment')} disabled={animationState.step === numSteps}>
                    <ArrowForward sx={{ width: (screenHeight === smaller ? screenWidth * 0.05 : screenHeight * 0.05), height: (screenHeight === smaller ? screenWidth * 0.05 : screenHeight * 0.05) }} />
                </IconButton>
                <AnimatedButton color="primary" sx={{ position: "absolute", top: "2%", right: "2%" }} disabled={animationState.step !== numSteps} onClick={() => { resetAnimations(); dispatch('reset') }} style={resetStyle}>
                    <Replay sx={{ width: (screenHeight === smaller ? screenWidth * 0.05 : screenHeight * 0.05), height: (screenHeight === smaller ? screenWidth * 0.05 : screenHeight * 0.05) }} />
                </AnimatedButton>
            </Container>

            <Container sx={{ width: "80%", backgroundColor: "gray", overflow: "hidden" }}>
                {transition((style, step) => {
                    return <AnimatedTypography variant="h5" color={"white"} sx={{ position: "relative" }} style={{ position: "relative", ...style }}>{steps[step].text}</AnimatedTypography>
                })}
            </Container>
            <div className='empty'>
                <div style={{ position: "absolute", height: "3em" }} ref={containerRef}>
                </div>
            </div>
        </>)
}

export default FlowControlAnimation