import { createTheme } from "@mui/material/styles";

let theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            // main: "#ffc700",
            main: "#d8c26c",
            off: "#FBFFF1",
        },
        secondary: {
            // main: "#fe1d1d",
            main: "#00857f",
        },
        background: {
            default: "#FBFBF2",
            // accent: "#ffc700",
            accent: "#d8c26c",
            // accent: "#ffeccd",
            dark: "#ffeccd",
        },
        custom: {
            dark: "#272D2D",
            darkMuted: "#757575",
            light: "#F6F8FF",
            lightMuted: "#cacaca",
        },
        text: {
            primary: "#272D2D",
            primaryMuted: "#757575",
            secondary: "#F6F8FF",
            secondaryMuted: "#cacaca",
        },
    },
    fonts: {
        // header: "Playfair Display",
        header: "Park Lane",
        body: "Raleway",
        title: "Park Lane",
    },
});

theme = createTheme(theme, {
    border: `1px solid ${theme.palette.custom.dark}`,
    custom: {
        spacing: {
            paragraph: "2rem",
            quote: "3rem",
        },
    },
    typography: {
        h1: {
            // fontFamily: "Raleway",
            fontFamily: theme.fonts.title,
            color: theme.palette.primary.main,
            // color: theme.palette.primary.off,
            lineHeight: ".85em",
            fontSize: "clamp(4.5rem, 20vw, 30rem)",
            letterSpacing: ".025em",
        },
        h2: {
            color: theme.palette.custom.primary,
            fontFamily: theme.fonts.header,
            // fontWeight: "400",
            // color: darkTheme.palette.custom.dark,
            fontSize: "clamp(3rem, 6vw, 10rem)",
            letterSpacing: ".025em",
            lineHeight: "1em",
        },
        h3: {
            color: theme.palette.custom.primary,
            fontFamily: theme.fonts.header,
            letterSpacing: ".025em",
            // fontWeight: "400",
            // color: darkTheme.palette.custom.dark,
        },
        h4: {
            color: theme.palette.custom.primary,
            fontFamily: theme.fonts.header,
            letterSpacing: ".025em",
            fontSize: "1.65rem",
            // fontWeight: "600",
            marginBottom: ".25em",
            // color: darkTheme.palette.custom.dark,
        },
        h5: {
            // color: theme.palette.custom.primary,
            fontFamily: theme.fonts.body,
            fontSize: "1.25rem",
            fontWeight: "400",
            // color: darkTheme.palette.custom.dark,
        },
        h6: {
            fontFamily: theme.fonts.body,
            fontWeight: "500",
            fontSize: "1rem",
        },

        subtitle1: {
            fontFamily: theme.fonts.body,
            fontWeight: "400",
            color: theme.palette.custom.primaryMuted,
            fontSize: "1.25rem",
        },
        subtitle2: {
            fontFamily: theme.fonts.body,
            fontWeight: "400",
            fontSize: "1.25rem",
            color: theme.palette.custom.primaryMuted,
        },
        body1: {
            fontFamily: theme.fonts.body,
            fontWeight: "400",
            fontSize: "1.25rem",
            lineHeight: "1.25rem",
            color: theme.palette.custom.primaryMuted,
            // fontFamily: darkTheme.typography.darkTheme.main,
        },
        body2: {
            fontFamily: theme.fonts.body, // fontFamily: "Raleway",
            fontWeight: "400",
            fontSize: "1.25rem",
            lineHeight: "1.5rem",
            color: theme.palette.custom.darkMuted,
            // fontFamily: darkTheme.typography.darkTheme.decorative,
        },
        caption: {
            color: theme.palette.custom.darkMuted,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "0",
                    whiteSpace: "nowrap",
                    minWidth: "max-content",
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    backgroundColor: theme.palette.custom.dark,
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    // fontFamily: theme.typography.theme.accent,
                    fontSize: "1rem",
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    // fontFamily: theme.typography.theme.accent,
                    color: theme.palette.secondary.main,
                },
            },
        },
    },
});

export default theme;
