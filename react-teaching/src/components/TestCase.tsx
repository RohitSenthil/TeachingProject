import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React, { useEffect, } from 'react'
import { animated, useSpring, useTransition } from '@react-spring/web'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
export default function TestCase({ number, correct }: { number: number, correct: boolean }) {
    const AnimatedPaper = animated(Paper)
    const AnimatedTypography = animated(Typography)
    const [style, changeBackground] = useSpring(() => {
    })
    useEffect(() => {
        changeBackground.start({
            to: {
                backgroundPosition: (correct ? "0% 0%" : "100% 100%"),
                config: { mass: 1, tension: 280, friction: 120 }
            },
        })
    }, [correct])
    const transition = useTransition(correct, {
        initial: { left: "50%", translate: "-50%" },
        from: { left: correct ? ("0%") : ("100%"), translate: correct ? ("-100%") : ("0%") },
        enter: { left: "50%", translate: "-50%" },
    })
    return (
        <AnimatedPaper style={{
            position: "relative",
            width: "70%",
            minHeight: "4em",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            margin: "1em auto 1em auto",
            background: "linear-gradient(to left, #f44336 50%, #66bb6a 50%) 100% 100%/ 200% 200%",
            overflowX: "hidden",
            ...style,
        }}
            elevation={16}
        >
            {transition((style, item) => {
                return <AnimatedTypography style={{ margin: "0 0 0 0", display: "inline-flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", position: "relative", color: "white", ...style }} variant="h6" align="center" >
                    Test Case {number} {item ? "Passed" : "Failed"} {item ? <CheckIcon fontSize='large' /> : <CloseIcon fontSize='large' />}
                </AnimatedTypography>
            })}
        </AnimatedPaper>
    )
}
