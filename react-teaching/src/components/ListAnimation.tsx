import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Replay from '@mui/icons-material/Replay';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import { animated, useSpring, useTransition } from '@react-spring/web';
import React, { useEffect, useReducer, useRef, useState } from 'react'
import { useMeasure } from 'react-use';
import useFitText from "use-fit-text";

function ListAnimation({ setCompleted }: { setCompleted: () => void }) {
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
    const numSteps = 5
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
        oldValueAnimation.start({
            to: { top: "50%", translateY: "-50%" }
        })
        newValueAnimation.start({
            to: { top: "0%", translateY: "-100%" },
        })
        appendValueAnimation.start({
            to: { left: "100%" },
        })
        insertValueAnimation.start({
            to: { translateX: "0%" },
        })
        addedValueAnimation.start({
            to: { top: "0%", translateY: "-100%" },
        })
        indexFiveAnimation.start({
            to: { opacity: 0 },
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
    const lineTwoStyle = useSpring({
        opacity: animationState.step >= 1 ? 1 : 0
    })
    const lineThreeStyle = useSpring({
        opacity: animationState.step >= 2 ? 1 : 0
    })
    const lineFourStyle = useSpring({
        opacity: animationState.step >= 3 ? 1 : 0
    })
    const lineFiveStyle = useSpring({
        opacity: animationState.step >= 4 ? 1 : 0
    })
    const lineSixStyle = useSpring({
        opacity: animationState.step >= 5 ? 1 : 0
    })
    const resetStyle = useSpring({
        opacity: animationState.step === numSteps ? 1 : 0,
        rotate: animationState.step === numSteps ? "0deg" : "180deg",
        delay: animationState.step === numSteps ? 1500 : 0
    })
    const [newValueStyle, newValueAnimation] = useSpring(() => { })
    const [oldValueStyle, oldValueAnimation] = useSpring(() => { })
    const [appendValueStyle, appendValueAnimation] = useSpring(() => { })
    const [insertValueStyle, insertValueAnimation] = useSpring(() => { })
    const [addedValueStyle, addedValueAnimation] = useSpring(() => { })
    const [indexFiveStyle, indexFiveAnimation] = useSpring(() => { })
    const steps = [
        {
            text: "A list is simply a collection of values indexed from zero",
            animation: () => null
        },
        {
            text: "To get a value in the array, type the arrays name and then the index. To change the value, access the value in the array and change it in the same you would change a variable",
            animation: () => {
                oldValueAnimation.start({
                    from: { top: "50%", translateY: "-50%" },
                    to: { top: "100%", translateY: "0%" },
                    reverse: !animationState.right,
                })
                newValueAnimation.start({
                    from: { top: "0%", translateY: "-100%" },
                    to: { top: "50%", translateY: "-50%" },
                    reverse: !animationState.right,
                })
            }
        },
        {
            text: "To add an element to the end of an array, call .append(newValue) on the list",
            animation: () => {
                appendValueAnimation.start({
                    from: { left: "100%" },
                    to: { left: "87.5%" },
                    reverse: !animationState.right,
                })
            }
        },
        {
            text: "To remove an element, call .remove(index) on the list",
            animation: () => {
                appendValueAnimation.start({
                    from: { left: "100%" },
                    to: { left: "87.5%" },
                    reverse: animationState.right,
                })
            }
        },
        {
            text: "To add an element at a specific point in the list, call a .insert(index, newValue) on the list. This will insert the newValue at that index, shifting the other elements of the list one over",
            animation: () => {
                insertValueAnimation.start({
                    from: { translateX: "0%" },
                    to: { translateX: "110%" },
                    reverse: !animationState.right,
                    delay: animationState.right ? 0 : 500
                })
                addedValueAnimation.start({
                    from: { top: "0%", translateY: "-100%" },
                    to: { top: "50%", translateY: "-50%" },
                    reverse: !animationState.right,
                    delay: animationState.right ? 500 : 0
                })
                indexFiveAnimation.start({
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                    reverse: !animationState.right,
                    delay: animationState.right ? 500 : 0
                })
            }
        },
        {
            text: "To get the index of an elemenet, call a .index(value) on the list. This will return the index of the lists value.",
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
                <Container sx={{ width: "fit-content", position: "absolute", left: 0, top: "1em" }}>
                    <Typography component="div" color="white" sx={{ position: "absolute", opacity: 0, height: height * 0.14, fontSize: codeFontSize, width: width * 0.25 }} ref={textRef}>
                        letters=["a", "b", "c", "d", "e"]
                    </Typography>
                    <Typography sx={{ fontSize: codeFontSize }} color="white">
                        letters=["a", "b", "c", "d", "e"]
                    </Typography>
                    <AnimatedTypography sx={{ fontSize: codeFontSize }} color="white" position="relative" style={lineTwoStyle}>
                        letters[1]="f"
                    </AnimatedTypography>
                    <AnimatedTypography sx={{ fontSize: codeFontSize }} color="white" position="relative" style={lineThreeStyle}>
                        letters.append("g")
                    </AnimatedTypography>
                    <AnimatedTypography sx={{ fontSize: codeFontSize }} color="white" position="relative" style={lineFourStyle}>
                        letters.remove(5)
                    </AnimatedTypography>
                    <AnimatedTypography sx={{ fontSize: codeFontSize }} color="white" position="relative" style={lineFiveStyle}>
                        letters.insert(2,"h")
                    </AnimatedTypography>
                    <AnimatedTypography sx={{ fontSize: codeFontSize }} color="white" position="relative" style={lineSixStyle}>
                        letters.index("c")
                    </AnimatedTypography>
                </Container>
                <Box sx={{ position: "absolute", height: width * 0.1, width: width * 0.1, left: "32.5%", top: "50%", translate: "0 -50%", backgroundColor: "#41B3A3", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    "a"
                </Box>
                <AnimatedBox sx={{ position: "absolute", height: width * 0.1, width: width * 0.1, left: "43.5%", backgroundColor: "#41B3A3", display: "flex", justifyContent: "center", alignItems: "center" }} style={{ top: "50%", translateY: "-50%", ...oldValueStyle }}>
                    "b"
                </AnimatedBox>
                <AnimatedBox sx={{ position: "absolute", height: width * 0.1, width: width * 0.1, left: "43.5%", backgroundColor: "#41B3A3", display: "flex", justifyContent: "center", alignItems: "center" }} style={{ top: "0%", translateY: "-100%", ...newValueStyle }}>
                    "f"
                </AnimatedBox>
                <AnimatedBox sx={{ position: "absolute", height: width * 0.1, width: width * 0.1, left: "54.5%", backgroundColor: "#41B3A3", display: "flex", justifyContent: "center", alignItems: "center" }} style={{ top: "0%", translateY: "-100%", ...addedValueStyle }}>
                    "h"
                </AnimatedBox>
                <AnimatedBox sx={{ position: "absolute", height: width * 0.1, width: width * 0.1, left: "54.5%", top: "50%", backgroundColor: "#41B3A3", display: "flex", justifyContent: "center", alignItems: "center" }} style={{ translateX: "0%", translateY: "-50%", ...insertValueStyle }}>
                    "c"
                </AnimatedBox>
                <AnimatedBox sx={{ position: "absolute", height: width * 0.1, width: width * 0.1, left: "65.5%", top: "50%", backgroundColor: "#41B3A3", display: "flex", justifyContent: "center", alignItems: "center" }} style={{ translateX: "0%", translateY: "-50%", ...insertValueStyle }}>
                    "d"
                </AnimatedBox>
                <AnimatedBox sx={{ position: "absolute", height: width * 0.1, width: width * 0.1, left: "76.5%", top: "50%", backgroundColor: "#41B3A3", display: "flex", justifyContent: "center", alignItems: "center" }} style={{ translateX: "0%", translateY: "-50%", ...insertValueStyle }}>
                    "e"
                </AnimatedBox>
                <AnimatedBox sx={{ position: "absolute", height: width * 0.1, width: width * 0.1, top: "50%", translate: "0 -50%", backgroundColor: "#41B3A3", display: "flex", justifyContent: "center", alignItems: "center" }} style={appendValueStyle}>
                    "g"
                </AnimatedBox>


                <Box sx={{ position: "absolute", height: width * 0.1, width: width * 0.1, left: "32.5%", top: "55%", display: "flex", justifyContent: "center", alignItems: "center", color: "white" }}>
                    0
                </Box>
                <Box sx={{ position: "absolute", height: width * 0.1, width: width * 0.1, left: "43.5%", top: "55%", display: "flex", justifyContent: "center", alignItems: "center", color: "white" }}>
                    1
                </Box>
                <Box sx={{ position: "absolute", height: width * 0.1, width: width * 0.1, left: "54.5%", top: "55%", display: "flex", justifyContent: "center", alignItems: "center", color: "white" }}>
                    2
                </Box>
                <Box sx={{ position: "absolute", height: width * 0.1, width: width * 0.1, left: "65.5%", top: "55%", display: "flex", justifyContent: "center", alignItems: "center", color: animationState.step == 5 ? "green" : "white" }}>
                    3
                </Box>
                <Box sx={{ position: "absolute", height: width * 0.1, width: width * 0.1, left: "76.5%", top: "55%", display: "flex", justifyContent: "center", alignItems: "center", color: "white" }}>
                    4
                </Box>
                <AnimatedBox sx={{ position: "absolute", height: width * 0.1, width: width * 0.1, top: "55%", display: "flex", justifyContent: "center", alignItems: "center", color: "white" }} style={appendValueStyle}>
                    5
                </AnimatedBox>
                <AnimatedBox sx={{ position: "absolute", height: width * 0.1, width: width * 0.1, top: "55%", left: "87.5%", display: "flex", justifyContent: "center", alignItems: "center", color: "white" }} style={indexFiveStyle}>
                    5
                </AnimatedBox>
                <Typography sx={{ position: "absolute", left: "65%", bottom: "2%", translate: "-50% 0" }} align="left" color="white" variant="h6">
                    Index
                </Typography>

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

export default ListAnimation