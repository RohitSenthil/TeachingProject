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

function ConditionalAnimation({ setCompleted }: { setCompleted: () => void }) {
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
    const numSteps = 9
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
        andAnimation.start({
            to: { top: "40%", translateY: "0%", left: "20%" }
        })
        orAnimation.start({
            to: { top: "40%", translateY: "0%", left: "50%", }
        })
        notAnimation.start({
            to: { top: "40%", translateY: "0%", left: "80%" }
        })
        trueLeftAnimation.start({
            to: { top: "0%", translateY: "-100%" }
        })
        trueRightAnimation.start({
            to: { top: "0%", translateY: "-100%" }
        })
        falseLeftAnimation.start({
            to: { top: "0%", translateY: "-100%" }
        })
        falseRightAnimation.start({
            to: { top: "0%", translateY: "-100%" }
        })
        answerTrueAnimation.start({
            to: { scale: 0, opacity: 0 }
        })
        answerFalseAnimation.start({
            to: { scale: 0, opacity: 0 }
        })
        notTrueAnimation.start({
            to: { scale: 0, opacity: 0 }
        })
        notFalseAnimation.start({
            to: { scale: 0, opacity: 0 }
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
    const [andStyle, andAnimation] = useSpring(() => { })
    const [orStyle, orAnimation] = useSpring(() => { })
    const [notStyle, notAnimation] = useSpring(() => { })
    const [trueRightStyle, trueRightAnimation] = useSpring(() => { })
    const [trueLeftStyle, trueLeftAnimation] = useSpring(() => { })
    const [falseRightStyle, falseRightAnimation] = useSpring(() => { })
    const [falseLeftStyle, falseLeftAnimation] = useSpring(() => { })
    const [answerTrueStyle, answerTrueAnimation] = useSpring(() => { })
    const [answerFalseStyle, answerFalseAnimation] = useSpring(() => { })
    const [notTrueStyle, notTrueAnimation] = useSpring(() => { })
    const [notFalseStyle, notFalseAnimation] = useSpring(() => { })

    const resetStyle = useSpring({
        opacity: animationState.step === numSteps ? 1 : 0,
        rotate: animationState.step === numSteps ? "0deg" : "180deg",
        delay: animationState.step === numSteps ? 2000 : 0
    })
    const bottomToTop = {
        from: { top: "40%", translateY: "0%" },
        to: { top: "0%", translateY: "-100%" },
        reverse: !animationState.right,
    }
    const topToBottom = {
        from: { top: "0%", translateY: "-100%" },
        to: { top: "40%", translateY: "0%" },
        reverse: !animationState.right,
    }
    const enter = {
        from: { scale: 0, opacity: 0 },
        to: { scale: 1, opacity: 1 },
        reverse: !animationState.right,
    }
    const exit = {
        from: { scale: 1, opacity: 1 },
        to: { scale: 0, opacity: 0 },
        reverse: !animationState.right,
    }
    const steps = [
        {
            text: "These are the three main boolean expressions: and, or, and not",
            animation: () => null
        },
        {
            text: "The and operator checks if the first value AND the second value are both true",
            animation: () => {
                orAnimation.start(bottomToTop)
                notAnimation.start(bottomToTop)
                andAnimation.start({
                    from: { left: "20%", },
                    to: { left: "50%", },
                    reverse: !animationState.right,
                })

            }
        },
        {
            text: "It will return true only if both of the values are true",
            animation: () => {
                trueRightAnimation.start(topToBottom)
                trueLeftAnimation.start(topToBottom)
                answerTrueAnimation.start(Object.assign({ delay: 500 }, enter))
            }
        },
        {
            text: "If ANY of the values are false it will return false",
            animation: () => {
                answerTrueAnimation.start(exit)
                trueRightAnimation.start(bottomToTop)
                falseRightAnimation.start(topToBottom)
                answerFalseAnimation.start(Object.assign({ delay: animationState.right ? 500 : 0 }, enter))
                trueLeftAnimation.start(Object.assign({ delay: animationState.right ? 1000 : 0 }, bottomToTop))
                falseLeftAnimation.start(Object.assign({ delay: animationState.right ? 1000 : 0 }, topToBottom))
            }
        },
        {
            text: "The or operator checks if the first OR the second value is true",
            animation: () => {
                andAnimation.start({
                    from: { left: "50%", },
                    to: { left: "20%", },
                    reverse: !animationState.right,
                })
                andAnimation.start(Object.assign({ delay: 500 }, bottomToTop))
                falseRightAnimation.start(bottomToTop)
                falseLeftAnimation.start(bottomToTop)
                answerFalseAnimation.start(exit)
                orAnimation.start(topToBottom)
            }
        },
        {
            text: "It returns true if either value is true",
            animation: () => {
                trueRightAnimation.start(Object.assign({ delay: animationState.right ? 0 : 750 }, topToBottom))
                trueLeftAnimation.start(Object.assign({ delay: animationState.right ? 0 : 500 }, topToBottom))
                answerTrueAnimation.start(Object.assign({ delay: 500 }, enter))
                trueLeftAnimation.start(Object.assign({ delay: animationState.right ? 1000 : 0, cancel: !animationState.right }, bottomToTop))
                falseLeftAnimation.start(Object.assign({ delay: animationState.right ? 1000 : 750 }, topToBottom))
            }
        },
        {
            text: "Both values must be false for the or operator to return false",
            animation: () => {
                answerTrueAnimation.start(exit)
                falseRightAnimation.start(topToBottom)
                trueRightAnimation.start(bottomToTop)
                answerFalseAnimation.start(enter)
            }
        },
        {
            text: "The not operator flips a boolean value",
            animation: () => {
                orAnimation.start(Object.assign({ delay: animationState.right ? 0 : 500 }, bottomToTop))
                falseRightAnimation.start(bottomToTop)
                falseLeftAnimation.start(bottomToTop)
                answerFalseAnimation.start(exit)
                notAnimation.start(Object.assign({ delay: animationState.right ? 500 : 0 }, topToBottom))
                notAnimation.start({
                    from: { left: "80%" },
                    to: { left: "50%" },
                    reverse: !animationState.right,
                    delay: 1000
                })
            }
        },
        {
            text: "It flips a true to a false",
            animation: () => {
                notTrueAnimation.start({
                    from: { scale: 0, opacity: 0 },
                    to: { scale: 1, opacity: 1 },
                    reverse: !animationState.right,
                    cancel: !animationState.right
                })
                notFalseAnimation.start({
                    from: { scale: 0, opacity: 0 },
                    to: { scale: 1, opacity: 1 },
                    reverse: !animationState.right,
                    delay: !animationState.right ? 400 : 500
                })
                notTrueAnimation.start({
                    from: { scale: 1, opacity: 1 },
                    to: { scale: 0, opacity: 0 },
                    delay: 450,
                    reverse: !animationState.right,
                    cancel: !animationState.right
                })
            }
        },
        {
            text: "And it flips a false to a true",
            animation: () => {
                notTrueAnimation.start({
                    from: { scale: 0, opacity: 0 },
                    to: { scale: 1, opacity: 1 },
                    reverse: !animationState.right,
                    delay: !animationState.right ? 350 : 300
                })
                notFalseAnimation.start({
                    from: { scale: 1, opacity: 1 },
                    to: { scale: 0, opacity: 0 },
                    reverse: !animationState.right,
                    delay: !animationState.right ? 300 : 350
                })
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


                <AnimatedTypography variant="h3" color="white" sx={{ position: "absolute", left: "20%", top: "40%", translate: "-50%" }} style={andStyle}>and</AnimatedTypography>

                <AnimatedTypography variant="h3" color="white" sx={{ position: "absolute", left: "50%", top: "40%", translate: "-50%" }} style={orStyle}>or</AnimatedTypography>

                <AnimatedTypography variant="h3" color="white" sx={{ position: "absolute", left: "80%", top: "40%", translate: "-50%" }} style={notStyle}>not</AnimatedTypography>

                <AnimatedTypography variant="h3" color="green" sx={{ position: "absolute", left: "60%", top: "0%", translate: "50%" }} style={trueRightStyle}>True</AnimatedTypography>
                <AnimatedTypography variant="h3" color="green" sx={{ position: "absolute", left: "40%", top: "0%", translate: "-150%" }} style={trueLeftStyle}>True</AnimatedTypography>
                <AnimatedTypography variant="h3" color="red" sx={{ position: "absolute", left: "60%", top: "0%", translate: "50%" }} style={falseRightStyle}>False</AnimatedTypography>
                <AnimatedTypography variant="h3" color="red" sx={{ position: "absolute", left: "40%", top: "0%", translate: "-150%" }} style={falseLeftStyle}>False</AnimatedTypography>

                <AnimatedTypography variant="h2" color="green" sx={{ position: "absolute", left: "50%", bottom: "10%", fontWeight: 'bold', translate: "-50%", }} style={answerTrueStyle}>True</AnimatedTypography>
                <AnimatedTypography variant="h2" color="red" sx={{ position: "absolute", left: "50%", bottom: "10%", fontWeight: 'bold', translate: "-50%" }} style={answerFalseStyle}>False</AnimatedTypography>

                <AnimatedTypography variant="h3" color="green" sx={{ position: "absolute", left: "50%", top: "40%", translate: "50%" }} style={notTrueStyle}>True</AnimatedTypography>
                <AnimatedTypography variant="h3" color="red" sx={{ position: "absolute", left: "50%", top: "40%", translate: "50%" }} style={notFalseStyle}>False</AnimatedTypography>

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

export default ConditionalAnimation