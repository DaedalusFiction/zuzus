import { Button, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import Link from "next/link";
import { pages, header, siteName } from "../../siteInfo";
import theme from "../../styles/themes/theme";

const Header = ({ light }) => {
    return (
        <Container maxWidth="xl">
            <Box
                sx={{
                    justifyContent: "space-between",
                    padding: ".5em 0",
                    display: { xs: "none", lg: "flex" },
                }}
            >
                <Box
                    sx={{
                        display: { xs: "none", lg: "flex" },
                        alignItems: "center",
                        gap: "1.5em",
                    }}
                >
                    <Typography
                        variant="h4"
                        component="p"
                        sx={{
                            color: light
                                ? theme.palette.custom.light
                                : theme.palette.custom.dark,
                        }}
                    >
                        <Link href="/">{siteName}</Link>
                    </Typography>
                    {false &&
                        pages.map((page) => {
                            return (
                                <Typography
                                    key={page.name}
                                    variant="h5"
                                    component="p"
                                    className="nav-link"
                                    sx={{
                                        color: light
                                            ? theme.palette.custom.lightMuted
                                            : theme.palette.custom.darkMuted,
                                        "&:hover": {
                                            color: light
                                                ? theme.palette.custom.light
                                                : theme.palette.custom.dark,
                                        },
                                    }}
                                >
                                    <Link href={page.href}>{page.name}</Link>
                                </Typography>
                            );
                        })}
                </Box>
                <Link href={header.buttonOne.href}>
                    <Button
                        variant={header.buttonOne.variant}
                        color={light ? "primary" : "secondary"}
                    >
                        {header.buttonOne.text}
                    </Button>
                </Link>
            </Box>
        </Container>
    );
};

export default Header;
