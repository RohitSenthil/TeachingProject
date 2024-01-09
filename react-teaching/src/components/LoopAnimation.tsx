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

function LoopAnimation({ setCompleted }: { setCompleted: () => void }) {
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
    const numSteps = 8
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
    const steps = [
        {
            text: "Lets go through a for loop using range",
            animation: () => null
        },
        {
            text: "The highlighted values on the right are the values y will go through on each iteration of the loop. Remember that the range function includes the start variable, but stops before reaching the stop variable",
            animation: () => {
                null
            }
        },
        {
            text: "On the first iteration of the loop, y is equal to 1",
            animation: () => {
                null
            }
        },
        {
            text: "y is then added to x, so after the first iteration of the loop, x is equal to 1",
            animation: () => {
                null
            }
        },
        {
            text: "After the first iteration, the program jumps back to the start of the loop, and y is now equal to 2",
            animation: () => {
                null
            }
        },
        {
            text: "y is then added to x, so after the second iteration of the loop, x is equal to 3 (1+2)",
            animation: () => {
                null
            }
        },
        {
            text: "The loop jumps back to the beginning with y equal to 3, after this iteration x equals 6 (1+2+3)",
            animation: () => {
                null
            }
        },
        {
            text: "For the final iteration of the loop y equals 4, and after this last iteration x equals 10 (1+2+3+4)",
            animation: () => {
                null
            }
        },
        {
            text: "After the final iteration, the program moves on from the loop and the final value of x is 10",
            animation: () => {
                null
            }
        },

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
                    <Typography component="div" align="left" color="white" sx={{ position: "absolute", opacity: 0, height: height * 0.3, fontSize: codeFontSize, width: width * 0.7 }} ref={textRef}>
                        for y in range(1,5)
                    </Typography>
                    <AnimatedTypography align="left" color="white" sx={{ position: "relative", fontSize: codeFontSize }}>
                        x=0
                    </AnimatedTypography>
                    <AnimatedTypography align="left" color={[2, 4, 6, 7].includes(animationState.step) ? "green" : "white"} sx={{ position: "relative", fontSize: codeFontSize }}>
                        for y in range(1,5)
                    </AnimatedTypography>
                    <AnimatedTypography align="left" color={[3, 5, 6, 7].includes(animationState.step) ? "green" : "white"} sx={{ position: "relative", whiteSpace: "pre", fontSize: codeFontSize }}>
                        {"\tx=x+y"}
                    </AnimatedTypography>
                </Container>
                <Typography color="white" sx={{ position: "absolute", fontSize: codeFontSize, top: "50%", left: "5%", translate: "0 -50%" }}>
                    x=<span style={{ color: animationState.step === 8 ? "green" : "white" }}>{[0, 0, 0, 1, 1, 3, 6, 10, 10][animationState.step]}</span>
                </Typography>
                <AnimatedTypography color="white" sx={{ position: "absolute", right: "1.5em", fontSize: height * 0.15, width: "1em" }}>
                    <span style={{ color: ([1, 2].includes(animationState.step) ? "green" : "white") }}>1 </span>
                    <span style={{ color: ([1, 4].includes(animationState.step) ? "green" : "white") }}>2 </span>
                    <span style={{ color: ([1, 6].includes(animationState.step) ? "green" : "white") }}>3 </span>
                    <span style={{ color: ([1, 7].includes(animationState.step) ? "green" : "white") }}>4</span>
                </AnimatedTypography>

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

export default LoopAnimation