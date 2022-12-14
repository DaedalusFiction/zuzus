import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { Button, Grid, Slide } from "@mui/material";
import Link from "next/link";
import theme from "../../styles/themes/theme";
import { useEffect, useState } from "react";
import { navigateToTop } from "../../utility/navigateToTop";
import { pages, siteName, navbar } from "../../siteInfo";
import { useRouter } from "next/router";

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [titleFontSize, setTitleFontSize] = useState("2.25rem");
    const router = useRouter();
    const currentPage = router.pathname.split("/")[1];
    const path = router.pathname.split("/");
    const [trigger, setTrigger] = useState(true);

    useEffect(() => {
        const threshold = 30;
        let lastScrollY = window.pageYOffset;
        let ticking = false;

        const updateScrollDir = () => {
            const scrollY = window.pageYOffset;

            if (Math.abs(scrollY - lastScrollY) < threshold) {
                ticking = false;
                return;
            }
            setTrigger(scrollY > lastScrollY ? true : true);
            setTitleFontSize(scrollY < lastScrollY ? "2rem" : "2rem");
            lastScrollY = scrollY > 0 ? scrollY : 0;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollDir);
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [trigger]);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (e) => {
        setAnchorElNav(null);
    };

    const handleMouseEnter = () => {
        setExpanded(false);
    };

    const handleMouseLeave = () => {
        setExpanded(false);
    };

    return (
        <Slide
            direction="down"
            in={trigger}
            sx={{
                position: "fixed",
                top: "0",
                zIndex: "100",
                display: { xs: "inherit", md: "flex" },
            }}
        >
            <AppBar
                position="static"
                color="secondary"
                onMouseLeave={handleMouseLeave}
            >
                <Container
                    sx={{ paddingTop: ".75rem", paddingBottom: ".75rem" }}
                    maxWidth="xl"
                >
                    <Grid container>
                        <Grid item xs={3}>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: "flex", md: "none" },
                                }}
                            >
                                <nav>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    sx={{ color: "white" }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "left",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "left",
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: "block", md: "none" },
                                    }}
                                >
                                    {pages.map((page, index) => {
                                        return (
                                            <MenuItem
                                                onClick={() => {
                                                    navigateToTop();
                                                    handleCloseNavMenu();
                                                }}
                                                key={index}
                                            >
                                                <Typography textAlign="center">
                                                    <Link href={page.href}>
                                                        {page.name}
                                                    </Link>
                                                </Typography>
                                            </MenuItem>
                                        );
                                    })}
                                </Menu>
                                </nav>
                            </Box>
                        </Grid>
                        <Grid item xs={9}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "end",
                                    height: "100%",
                                    width: "100%",
                                }}
                            >
                                <h1 className="nav-bar">
                                <Typography
                                    variant="h3"
                                    component="p"
                                    noWrap
                                    sx={{
                                        display: { xs: "flex", md: "none" },
                                        fontSize: "1.75rem",
                                        textAlign: "center",
                                        transition: "1000ms",
                                        color: theme.palette.custom.light,
                                    }}
                                >
                                    <Link href="/" style={{ color: "inherit" }}>
                                        {siteName}
                                    </Link>
                                </Typography>
                                </h1>
                            </Box>
                        </Grid>
                    </Grid>

                    {/* desktop view */}
                    <Box sx={{ display: { xs: "none", md: "inherit" } }}>
                        <Grid container>
                            <Grid item xs={4}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        height: "100%",
                                        gap: ".5rem",
                                    }}
                                >
                                    {/* <Box sx={{ height: "100%" }}>
                                        <NativeImage
                                            image={navbar.image}
                                            maxSize={85}
                                        />
                                    </Box> */}
                                    <h1 className="nav-bar">
                                    <Typography
                                        variant="h3"
                                        component="p"
                                        sx={{
                                            margin: "0",
                                            transition: "300ms",
                                            fontSize: titleFontSize,
                                            textAlign: "center",
                                            color:
                                                currentPage === ""
                                                    ? theme.palette.primary.main
                                                    : theme.palette.custom
                                                          .light,
                                            "&:hover": {
                                                color: theme.palette.primary
                                                    .main,
                                            },
                                        }}
                                    >
                                        <Link href="/">{siteName}</Link>
                                    </Typography>
                                    </h1>
                                </Box>
                            </Grid>
                            <Grid item xs={8}>
                                <nav className="desktop">
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "100%",
                                        height: "100%",
                                        justifyContent: "end",
                                        gap: "1em",
                                    }}
                                >
                                    {pages.map((page, index) => (
                                        <span key={index} className={path.includes(
                                            page.name
                                                .split(" ")
                                                .join("")
                                        ) ? 'selected' : ''}>
                                        <Link href={page.href}
                                                sx={{
                                                    color: path.includes(
                                                        page.name
                                                            .split(" ")
                                                            .join("")
                                                    )
                                                        ? theme.palette.primary
                                                              .main
                                                        : theme.palette.custom
                                                              .light,
                                                    "&:hover": {
                                                        color: theme.palette
                                                            .primary.main,
                                                    },
                                                }}
                                            >
                                                {page.name}
                                        </Link>
                                        </span>
                                    ))}
                                    <span className={"top-nav-contact " + (path.includes("contact") ? 'selected' : '')}>
                                    <Link href={navbar.buttonOne.href}>
                                        {navbar.buttonOne.text}
                                    </Link>
                                    </span>
                                </Box>
                                </nav>
                            </Grid>
                        </Grid>
                        {/* {expanded && (
                            <Box sx={{ padding: ".5rem 0" }}>
                                <Divider />
                                <Fade in={expanded}>
                                    <Grid container>
                                        <Grid item xs></Grid>
                                        <Grid item xs={6}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    gap: "1em",
                                                    width: "100%",
                                                }}
                                            >
                                                {pages.map((page, index) => {
                                                    return (
                                                        <Box key={index}>
                                                            {page.subPages
                                                                .length > 0 &&
                                                                page.subPages.map(
                                                                    (
                                                                        subPage,
                                                                        index
                                                                    ) => {
                                                                        return (
                                                                            <Typography
                                                                                key={
                                                                                    index
                                                                                }
                                                                                sx={{
                                                                                    textTransform:
                                                                                        "capitalize",
                                                                                    margin: ".5em 0",
                                                                                    transition:
                                                                                        "150ms",
                                                                                    color: theme
                                                                                        .palette
                                                                                        .custom
                                                                                        .light,
                                                                                    "&:hover":
                                                                                        {
                                                                                            color: theme
                                                                                                .palette
                                                                                                .custom
                                                                                                .light,
                                                                                        },
                                                                                }}
                                                                            >
                                                                                <Link
                                                                                    href={
                                                                                        subPage.href
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        subPage.name
                                                                                    }
                                                                                </Link>
                                                                            </Typography>
                                                                        );
                                                                    }
                                                                )}
                                                        </Box>
                                                    );
                                                })}
                                            </Box>
                                        </Grid>

                                        <Grid item xs></Grid>
                                    </Grid>
                                </Fade>
                            </Box>
                        )} */}
                    </Box>
                </Container>
            </AppBar>
        </Slide>
    );
};
export default Navbar;
