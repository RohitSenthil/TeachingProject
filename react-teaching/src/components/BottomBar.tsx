import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { animated, useSpring } from '@react-spring/web'
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHover, useHoverDirty } from 'react-use'
import { useGlobalData } from './GlobalStateProvider'
import HoverMessage from './HoverMessage'
function BottomBar({ position, show, problem = false }: { position: number, show: boolean, problem?: boolean }) {
    let navigate = useNavigate()
    const [data, updateData] = useGlobalData()
    const convertToURL = (position: number) => {
        if (position === -1) {
            return "/"
        }
        const key = Object.keys(data)[position]
        const url = /\d/.test(key.slice(-1)) ? `/${key.slice(0, -1)}/${key.slice(-1)}` : `/${key}`
        return url
    }
    const finished = data[Object.keys(data)[position]]
    const AnimatedContainer = animated(Container)
    const bottomContainerRef = useRef(null)
    const [CheckHoveringContainer, isHovering] = useHover(<Container style={{ height: "2em", minWidth: "100vw", position: "absolute", opacity: 0, bottom: 0, zIndex: 1 }} />)
    const isHoveringBottomBar = useHoverDirty(bottomContainerRef);
    const [bottomContainerStyle, bottomContainerAnimation] = useSpring(() => ({
        height: (isHovering || isHoveringBottomBar || show ? "3em" : "0em")
    }))
    useEffect(() => {
        bottomContainerAnimation.start({ height: (isHovering || isHoveringBottomBar || show ? "3em" : "0em") })
    }, [(isHovering || isHoveringBottomBar || show)])
    return (
        <>
            <AnimatedContainer sx={{ width: "100vw", boxShadow: "rgba(0, 0, 0, 0.4) 0px 54px 55px, rgba(0, 0, 0, 0.3) 0px -12px 30px, rgba(0, 0, 0, 0.3) 0px 4px 6px, rgba(0, 0, 0, 0.3) 0px 12px 13px, rgba(0, 0, 0, 0.2) 0px -3px 5px" }} ref={bottomContainerRef} style={bottomContainerStyle} disableGutters={true} maxWidth={false}>
                <Box sx={{ bottom: 0, minWidth: "100vw", left: 0, zIndex: 8000 }}>
                    <Container sx={{ height: "3em", backgroundColor: "secondary.main", position: "relative", display: "flex", alignItems: "center", minWidth: "100vw" }} >
                        <HoverMessage text={problem ? "You must complete the problem before moving on to the next section" : "You must complete the multiple choice questions and watch the animations before moving on to the next section"} hide={finished}>
                            <span style={{ height: "100%", display: "flex", position: "absolute", right: "1em", justifyItems: "center", alignItems: "center", zIndex: 8000 }}>
                                <Button size="medium" endIcon={<ArrowForward />} variant={"contained"} disabled={!finished} onClick={() => navigate(convertToURL(position + 1))} sx={{ zIndex: 8000 }}> Next
                                </Button>
                            </span>
                        </HoverMessage>
                        <Button size="medium" startIcon={<ArrowBack />} variant="contained" sx={{ position: "absolute", left: "1em", zIndex: 8000 }} onClick={() => navigate(convertToURL(position - 1))}>Back</Button>
                    </Container>
                </Box>
            </AnimatedContainer>
            {CheckHoveringContainer}
        </>
    )
}
export default BottomBar