import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Replay from '@mui/icons-material/Replay';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import React, { useRef, useState, useEffect, useReducer } from 'react'
import { useSpring, animated, useTransition, } from '@react-spring/web'
import { useMeasure } from "react-use";

function VariableAnimation({ setCompleted }: { setCompleted: () => void }) {
    const [screenRef, { width, height }]: [any, { width: number, height: number }] = useMeasure();
    const [screenWidth, setscreenWidth] = useState(0)
    const [screenHeight, setScreenHeight] = useState(0)
    const [smaller, setsmaller] = useState(0)

    useEffect(() => {
        setScreenHeight(height)
        setscreenWidth(width)
        setsmaller(width > height ? height : width)
    }, [width, height])
    const containerRef = useRef<HTMLDivElement>(null)
    const AnimatedBox = animated(Box)
    const AnimatedTypography = animated(Typography)
    const AnimatedButton = animated(IconButton)
    const numSteps = 2
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
        labelAnimation.start({
            to: { backgroundPosition: "100% 100%" },
        })
        lidAnimation.start({
            to: { rotate: "0deg", },
        })
        twoAnimation.start({
            to: { top: "0%", translateY: "-100%" },
        })
    }
    const [animationState, dispatch] = useReducer(animations, { step: 0, right: true })
    const transition = useTransition(animationState.step, {
        initial: { left: "50%", translate: "-50%" },
        from: { left: animationState.right ? ("0%") : ("100%"), translate: animationState.right ? ("-100%") : ("0%") },
        enter: { left: "50%", translate: "-50%" },
        exitBeforeEnter: true,
        onStart: () => containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
    })
    const [labelStyle, labelAnimation] = useSpring(() => { })
    const [lidStyle, lidAnimation] = useSpring(() => { })
    const [twoStyle, twoAnimation] = useSpring(() => { })
    const resetStyle = useSpring({
        opacity: animationState.step === numSteps ? 1 : 0,
        rotate: animationState.step === numSteps ? "0deg" : "180deg",
        delay: animationState.step === numSteps ? 2000 : 0
    })
    const steps = [
        {
            text: "Think of a variable as a box which stores a value.",
            animation: () => null
        },
        {
            text: "The value on the left side of the equal sign (Highlighted in green) is the label of the box. In this example the label is x.",
            animation: () => {
                labelAnimation.start({
                    from: { backgroundPosition: "100% 100%" },
                    to: { backgroundPosition: "0% 0%" },
                    reverse: !animationState.right,
                })
            }
        },
        {
            text: "The value on the right side of the equal sign (Highlighted in green) is the contents of the box. In this example the value stored in the variable is 2.",
            animation: () => {
                lidAnimation.start({
                    from: { rotate: "0deg", },
                    to: { rotate: "-90deg", },
                    loop: { delay: 1000, rotate: "0deg" }
                })
                twoAnimation.start({
                    from: { top: "0%", translateY: "-100%" },
                    to: { top: "50%", translateY: "-50%" },
                    config: { mass: 1, tension: 280, friction: 120 },
                    delay: 500,
                    reverse: !animationState.right,
                })
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
                <Box sx={{ position: "absolute", backgroundColor: "#A97835", height: (smaller * 0.65), width: (smaller * 0.8), left: "50%", bottom: "50%", translate: "-50% 60%", zIndex: 1 }}>
                    <Box sx={{ position: "absolute", backgroundColor: "#E9D5B2", minHeight: "30%", maxHeight: "30%", width: "100%", left: "50%", bottom: "65%", translate: "-50% 50%", fontSize: (`${(smaller * 0.15)}px`), textAlign: "center", }}>
                        X
                    </Box>
                    <AnimatedBox sx={{ position: "absolute", minHeight: "calc(30% + 4px)", maxHeight: "calc(30% + 4px)", width: "100%", left: "50%", bottom: "65%", translate: "-50% 50%" }} style={{ background: "linear-gradient(to left, #A97835 50%, rgba(0,0,0,0) 50%) 100% 100% / 200% 200%", ...labelStyle }}>
                    </AnimatedBox>
                </Box>
                <AnimatedBox sx={{ position: "absolute", backgroundColor: "#A97835", height: (smaller * 0.1), width: (smaller), left: "50%", top: ((0.5 * screenHeight) - (0.6 * (smaller * 0.65))), translate: "-50% 50%" }} style={{ transformOrigin: '10% 100%', ...lidStyle }}>
                </AnimatedBox>

                <Typography variant="h2" color={"white"} sx={{ position: "absolute", top: "2%", left: "2%" }}> <span style={{ color: (animationState.step === 1 ? "green" : "white") }}>x</span>=<span style={{ color: (animationState.step === 2 ? "green" : "white") }}>2</span></Typography>
                <AnimatedTypography variant="h2" color={"green"} style={{ position: "absolute", left: "50%", translateX: "-50%", top: "0%", translateY: "-100%", zIndex: 0, ...twoStyle }}>2</AnimatedTypography>

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
        </>
    )
}

export default VariableAnimation