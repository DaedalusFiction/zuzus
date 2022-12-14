import React from "react";
import PageLayout from "../../components/layout/PageLayout";
import { eventsPreviewContent, musicContent } from "../../siteInfo";
import ReactAudioPlayer from "react-audio-player";
import { Grid, List, ListItem, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import Image from "next/image";

const index = () => {
    return (
        <PageLayout name="1920's TRAD JAZZ">
            <Container maxWidth="md">
                {/* <Container maxWidth="sm">
                    <Typography className="section">
                        Louis Armstrong combo meets Mardi Gras street party.
                        Thrill to the trumpet&rsquo;s call, the clarinet&rsquo;s
                        wail, and the trombone&rsquo;s growl. Thumpin&rsquo;
                        strings send your body into an unstoppable rhythm. Like
                        a strong cocktail, Zuzu&rsquo;s vocals will{" "}
                        <em>transport</em> you.
                    </Typography>
                </Container> */}
                <List>
                    {musicContent.songs.map((song, index) => {
                        return (
                            <ListItem key={index}>
                                <Box className="music-list">
                                    <Grid container spacing={6}>
                                        <Grid item xs={12} md={6}>
                                            <Typography
                                                variant=""
                                                sx={{
                                                    textAlign: {
                                                        xs: "center",
                                                        md: "start",
                                                    },
                                                }}
                                            >
                                                {song.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: {
                                                        xs: "center",
                                                        md: "end",
                                                    },
                                                    height: "100%",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <ReactAudioPlayer
                                                    key={index}
                                                    src={song.url}
                                                    controls
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Box
                                        sx={{
                                            opacity: "70%",
                                            margin: "2rem auto",
                                            width: "90%",
                                        }}
                                    >
                                        <Image
                                            src={
                                                eventsPreviewContent
                                                    .dividerImage.url
                                            }
                                            height={80}
                                            width={1000}
                                            alt="divider"
                                        />
                                    </Box>
                                </Box>
                            </ListItem>
                        );
                    })}
                </List>
            </Container>
        </PageLayout>
    );
};

export default index;
