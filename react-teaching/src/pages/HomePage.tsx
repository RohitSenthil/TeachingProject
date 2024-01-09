import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import React, { useRef } from 'react'
import PairImage from "../images/PairProgram.svg"
import Box from '@mui/material/Box'
import Star from '@mui/icons-material/Star'
import { useIntersection } from 'react-use';
import { useSpring, animated, useTrail } from '@react-spring/web'
import { useNavigate } from 'react-router-dom'
import { useGlobalData } from '../components/GlobalStateProvider'

function HomePage() {
    const AnimatedTypography = animated(Typography)
    const AnimatedStar = animated(Star)
    const AnimatedContainer = animated(Container)
    const AnimatedButton = animated(Button)
    const aboutRef = useRef(null);
    const aboutIntersection = useIntersection(aboutRef, {
        root: null,
        rootMargin: '0px',
        threshold: 0
    });
    const [aboutStyle, aboutAnimation] = useSpring({
        opacity: aboutIntersection?.isIntersecting ? 1 : 0,
        translateX: aboutIntersection?.isIntersecting ? "0%" : "-25%",
        config: { mass: 1, tension: 280, friction: 60 }

    }, [aboutIntersection?.isIntersecting])
    const aboutContentRef = useRef<HTMLDivElement>(null);
    const aboutContentIntersection = useIntersection(aboutContentRef, {
        root: null,
        rootMargin: '0px',
        threshold: 0
    });
    const [aboutContentStyle, aboutContentAnimation] = useSpring({
        opacity: aboutContentIntersection?.isIntersecting ? 1 : 0,
        translateX: aboutContentIntersection?.isIntersecting ? "0%" : "-25%",
        config: { mass: 1, tension: 280, friction: 60 }
    }, [aboutContentIntersection?.isIntersecting])
    const [aboutBackgroundStyle, aboutBackgroundAnimation] = useSpring({
        backgroundPosition: (aboutIntersection?.isIntersecting || aboutContentIntersection?.isIntersecting ? "0% 0%" : "100% 100%"),
        config: { mass: 1, tension: 280, friction: 60 }
    }, [(aboutIntersection?.isIntersecting || aboutContentIntersection?.isIntersecting)])
    const reviewRef = useRef(null);
    const reviewIntersection = useIntersection(reviewRef, {
        root: null,
        rootMargin: '0px',
        threshold: 0
    });
    const [reviewStyle, reviewAnimation] = useSpring({
        opacity: reviewIntersection?.isIntersecting ? 1 : 0,
        translateX: reviewIntersection?.isIntersecting ? "0%" : "-25%",
        config: { mass: 1, tension: 280, friction: 60 }
    }, [reviewIntersection?.isIntersecting])
    const joinButtonRef = useRef(null)
    const joinButtonIntersection = useIntersection(joinButtonRef, {
        root: null,
        rootMargin: '0px',
        threshold: 0
    })
    const [joinButtonBackgroundStyle, joinButtonBackgroundAnimation] = useSpring({
        backgroundPosition: (joinButtonIntersection?.isIntersecting ? "0% 0%" : "100% 100%"),
        config: { mass: 1, tension: 280, friction: 60 }
    }, [joinButtonIntersection?.isIntersecting])
    const [joinButtonStyle, joinButtonAnimation] = useSpring({
        opacity: joinButtonIntersection?.isIntersecting ? 1 : 0,
        translateX: joinButtonIntersection?.isIntersecting ? "0%" : "-25%",
        config: { mass: 1, tension: 280, friction: 60 },
        delay: joinButtonIntersection?.isIntersecting ? 200 : 0
    }, [joinButtonIntersection?.isIntersecting])
    const reviews = [
        {
            text: "My son absolutely loves Play with Python!",
            author: "- Ramesh Gupta"
        },
        {
            text: "I'm so happy my children have something worthwhile that they enjoy!",
            author: "- Varun Patel"
        },
        {
            text: "After Play with Python, my daughter cant stop coding!",
            author: "- Subramanium Rajkumar"
        }
    ]
    let navigate = useNavigate()
    const pictureShown = useMediaQuery('(min-width:1300px)');
    const [data, setData] = useGlobalData()
    const getLatestURL = () => {
        const keys = Object.keys(data).reverse()
        const lastIndex = keys.findIndex((element) => data[element] !== null)
        if (lastIndex === -1) {
            return "/variable"
        }
        else if (lastIndex === 0) {
            return "/loop/3"
        }
        else {
            const name: any = keys[lastIndex - 1]
            return isNaN(name.at(-1)) ? `/${name}` : `/${name.slice(0, -1)}/${name.at(-1)}`
        }

    }
    const url = getLatestURL()
    return (
        <Container
            sx={{ backgroundColor: "#f5f5f5", overflowY: "auto", overflowX: "hidden", minWidth: "100%", display: "flex", flexDirection: "column", justifyItems: "center", alignItems: "center" }} disableGutters={true}>
            <Container disableGutters={true} maxWidth={false}>
                <Container sx={{ display: "flex", justifyContent: pictureShown ? "normal" : "center", alignItems: pictureShown ? "normal" : "center" }} disableGutters={true} maxWidth={false}>
                    <Box sx={{ height: "fit-content", marginLeft: (pictureShown) ? "5%" : "0%", marginTop: "5%", maxWidth: 575, }}>
                        <Typography variant="h2" align="center" sx={{ fontWeight: "bold", marginTop: "2rem" }}>Your new programming teacher</Typography>
                        <Typography variant="h4" align="center" sx={{ marginTop: "1rem" }}> A revolutionary new system for learning coding</Typography>
                        <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "3em" }}>
                            <Button variant="contained" size="large" sx={{ marginRight: "2.5%" }} onClick={() => navigate(url)}>{url === "/variable" ? "Join Today" : "Continue"}</Button>
                            <Button variant="outlined" size="large" sx={{ marginLeft: "2.5%" }} color="secondary" onClick={() => aboutContentRef.current?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })}>Learn More</Button>
                        </Container>
                    </Box>
                    {
                        (pictureShown) ? <Container sx={{ width: "calc(100vw - 575px)", justifyContent: "center", }} disableGutters={true} maxWidth={false}>
                            <img src={PairImage} style={{ zIndex: 5000, width: "100%", height: "auto", maxHeight: "calc(100vh - 5vh)", marginTop: "5vh" }} />
                        </Container> : null
                    }
                </Container>
                <AnimatedContainer sx={{ background: "linear-gradient(to left, #f5f5f5 50%, #00897b 50%) 100% 100%/ 200% 200%", width: "100vw", paddingBottom: "1rem", paddingTop: "1rem", marginTop: "10em" }} maxWidth={false} style={aboutBackgroundStyle}>
                    <Container ref={aboutRef}>
                        <AnimatedTypography variant="h2" align="center" sx={{ fontWeight: "bold" }} style={aboutStyle}>About Us</AnimatedTypography>
                    </Container>
                    <Container sx={{ width: "75%" }} ref={aboutContentRef}>
                        <AnimatedTypography variant="h5" align="center" sx={{ marginTop: "2rem", marginBottom: "2rem" }} style={aboutContentStyle} >Play with Python was founded by me, Rohit Senthil. My friends often asked me for help with coding, and I wound up spending hours a day teaching my friends. Through my teaching, I found a significant issue in coding resources. None of them explained concepts in a way beginners could understand and made their users mash keys until they fulfilled some arbitrary quota without giving their users a solid understanding of the material. After becoming familiar with the typical struggles of people learning programming, I created this website to teach you how to code. This website will teach you the fundamentals of programming in a straightforward, easy-to-follow way. By the end of the course, you'll be proficient in Python and be able to apply your newfound skills to any programming project. Scroll down to check out reviews from our satisfied members.
                        </AnimatedTypography>
                    </Container>
                </AnimatedContainer>
                <Container ref={reviewRef} >
                    <AnimatedTypography variant="h2" align="center" sx={{ fontWeight: "bold", marginTop: "2rem" }} style={reviewStyle} >Join hundreds of satisfied users</AnimatedTypography>
                </Container>
                {
                    reviews.map((review) => {
                        const reviewStarsRef = useRef(null);
                        const reviewStarsIntersection = useIntersection(reviewStarsRef, {
                            root: null,
                            rootMargin: '0px',
                            threshold: 0
                        });
                        const reviewStars = useTrail(5, {
                            opacity: reviewStarsIntersection?.isIntersecting ? 1 : 0,
                            x: reviewStarsIntersection?.isIntersecting ? "0" : `-${Math.PI}`,
                        })
                        const reviewContentRef = useRef(null);
                        const reviewContentIntersection = useIntersection(reviewContentRef, {
                            root: null,
                            rootMargin: '0px',
                            threshold: 0
                        });
                        const [reviewContentStyle, reviewContentAnimation] = useSpring({
                            opacity: reviewContentIntersection?.isIntersecting ? 1 : 0,
                            translateX: reviewContentIntersection?.isIntersecting ? "0%" : "-25%",
                            config: { mass: 1, tension: 280, friction: 60 }
                        }, [reviewContentIntersection?.isIntersecting])
                        const [starBackgroundStyle, starBackgroundAnimation] = useSpring({
                            backgroundPosition: (reviewStarsIntersection?.isIntersecting ? "0% 0%" : "100% 100%"),
                            config: { mass: 1, tension: 280, friction: 60 }
                        }, [reviewStarsIntersection?.isIntersecting])
                        return (
                            <React.Fragment key={review.author}>
                                <AnimatedContainer sx={{ width: "100%", background: "linear-gradient(to left, #f5f5f5 50%, #008937 50%) 100% 100%/ 200% 200%" }} disableGutters={true} maxWidth={false} style={starBackgroundStyle}>
                                    <Container sx={{ display: "flex", justifyContent: "space-between", marginTop: "3em" }} ref={reviewStarsRef}>
                                        {
                                            reviewStars.map(({ opacity, x }, index) =>
                                                <AnimatedStar sx={{ color: "#ffe082", fontSize: "min(15vh,15vw)", filter: "brightness(0) saturate(100%) invert(80%) sepia(41%) saturate(451%) hue-rotate(352deg) brightness(105%) contrast(102%)" }} style={{
                                                    opacity,
                                                    rotate: x.to(x => `${x}rad`),
                                                    translate: x.to((theta: any) => {
                                                        const a = Math.cos(theta)
                                                        const b = Math.sin(theta)
                                                        const c = (a ** 2) + (b ** 2)
                                                        return `${((-a / c) * (theta * 100 / -Math.PI))}%, ${(b / c) * (theta * 100 / -Math.PI)}%`
                                                    })
                                                }} key={index} />
                                            )
                                        }
                                    </Container>
                                </AnimatedContainer>
                                <Container ref={reviewContentRef}>
                                    <AnimatedTypography variant="h4" align="left" marginLeft={"5%"} marginTop={"3rem"} style={reviewContentStyle} sx={{ fontWeight: "bold" }}>
                                        {review.text}
                                    </AnimatedTypography>
                                    <AnimatedTypography variant="h4" align="right" marginRight={"5%"} marginTop={"1rem"} style={reviewContentStyle}>
                                        {review.author}
                                    </AnimatedTypography>
                                </Container>
                            </React.Fragment>
                        );
                    })
                }
                <Container disableGutters={true} maxWidth={false} ref={joinButtonRef}>
                    <AnimatedContainer sx={{ width: "100%", background: "linear-gradient(to left, #f5f5f5 50%, #00897b 50%) 100% 100%/ 200% 200%", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1em" }} disableGutters={true} maxWidth={false} style={joinButtonBackgroundStyle}>
                        <AnimatedButton variant="contained" disableElevation={true} style={joinButtonStyle} onClick={() => navigate(url)}>
                            <Typography variant="h4" marginTop={"0.5rem"} marginBottom={"0.5rem"} sx={{ fontWeight: "bold" }}>
                                {url === "/variable" ? "Join Today" : "Continue"}
                            </Typography>
                        </AnimatedButton>
                    </AnimatedContainer>
                </Container>
            </Container>
        </Container>
    );
}

export default HomePage
