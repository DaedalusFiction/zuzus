import { Button, Grid, Input, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { db, storage } from "../../firebase";

const FirebaseUploadGallery = ({
    config,
    folder,
    updateCounter,
    setUpdateCounter,
}) => {
    const [formData, setFormData] = useState(
        JSON.parse(JSON.stringify(config))
    );
    const [selectedImages, setSelectedImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [fileError, setFileError] = useState("false");
    const fileInputRef = useRef();

    const handleFieldChange = (e, field, index) => {
        const newFieldData = {
            ...formData.fields[index],
            value: e.target.value,
        };

        let newFormDataFields = formData.fields;
        newFormDataFields[index] = newFieldData;
        setFormData({ ...formData, fields: newFormDataFields });
    };

    const handleImagesChange = (e) => {
        setFileError("false");
        if (e.target.files[0].size > 3097152) {
            setFileError("File size must be less than 3MB");
            return;
        }
        setSelectedImages([...selectedImages, e.target.files[0]]);
        setFileError(false);
        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();

            reader.onload = (e) => {
                if (previews.includes(e.target.result)) {
                    setFileError("Please select another file");
                } else {
                    setPreviews([...previews, e.target.result]);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        }
        fileInputRef.current.children[0].value = null;
    };

    const handleRemovePreview = (preview) => {
        const newPreviews = previews.filter(
            (myPreview) => myPreview !== preview
        );
        setPreviews(newPreviews);
    };

    const handleRemoveSelectedImage = (index) => {
        const newSelectedImages = selectedImages.filter(
            (myPreview, myIndex) => myIndex !== index
        );
        setSelectedImages(newSelectedImages);
    };

    const handleUpload = async () => {
        if (selectedImages.length === 0) {
            setFileError("Please Select an Image");
            return;
        }
        if (formData.fields[0].value === "") {
            setFileError("Please Enter a Title");
            return;
        }
        var downloadURLs = [];
        let error = false;

        //check to see if image already exists in storage
        await Promise.all(
            selectedImages.map(async (image) => {
                const storageRef = ref(storage, folder);
                const task = await getDownloadURL(storageRef).then(
                    (res) => {
                        //file already exists
                        console.log("exists");
                        error = true;
                    },
                    (res) => {
                        //file doesn't exist
                        console.log("doesn't exist");
                    }
                );
            })
        );
        //check to see if document with selected Title already exists
        const checkTask = await getDoc(
            doc(db, folder, formData.fields[0].value)
        );
        if (checkTask.exists()) {
            setFileError(
                "Please select a different title. An image with that title already exists."
            );
            return;
        }

        if (error) {
            setFileError(
                "Cannot upload. One of these files already exists in storage."
            );

            return;
        } else {
            setIsUploading(true);
            selectedImages.forEach(async (image) => {
                const storageRef = ref(storage, `${folder}/${image.name}`);

                const uploadTask = uploadBytesResumable(storageRef, image);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        //to show upload progress as percentage
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        // setUploadProgress(progress);
                    },
                    (error) => {
                        // setUploadError(true);
                    },
                    () => {
                        // creates firestore database entry
                        // setUploadProgress(0);
                        getDownloadURL(uploadTask.snapshot.ref).then(
                            (downloadURL) => {
                                downloadURLs = [...downloadURLs, downloadURL];
                                if (
                                    downloadURLs.length >= selectedImages.length
                                ) {
                                    setDoc(
                                        doc(
                                            db,
                                            folder,
                                            formData.fields[0].value
                                        ),
                                        {
                                            ...formData,
                                            id: formData.fields[0].value,
                                            URLs: downloadURLs,
                                            dateUploaded: Date.now(),
                                        }
                                    );
                                }

                                setFormData(JSON.parse(JSON.stringify(config)));
                                setPreviews([]);
                                setSelectedImages([]);
                                setIsUploading(false);
                                setUpdateCounter(updateCounter + 1);
                                setFileError("");
                            }
                        );
                    }
                );
            });
        }
    };

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                backgroundColor: "lightblue",
                padding: "1em",
                borderRadius: "5px",
            }}
        >
            <Typography variant="h3" sx={{ color: "black" }}>
                Add to {folder}
            </Typography>
            <Box>
                <Button
                    variant="contained"
                    onClick={() => {
                        fileInputRef.current.children[0].click();
                    }}
                >
                    select file
                </Button>
                <Input
                    variant="contained"
                    type="file"
                    accept="image/jpeg, image/png"
                    sx={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleImagesChange}
                >
                    Select File
                </Input>
                <br />
                <Typography variant="caption">
                    .jpg, .webp, and .png only. File size must be less than 3MB.
                </Typography>
            </Box>
            <Grid container spacing={1}>
                {previews.length > 0 &&
                    previews.map((preview, index) => {
                        return (
                            <Grid item xs={3} key={index}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: ".5rem",
                                    }}
                                >
                                    <div>
                                    <img
                                        src={preview}
                                        alt="image preview"
                                        height="100px"
                                    />
                                    </div>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            handleRemovePreview(preview);
                                            handleRemoveSelectedImage(index);
                                        }}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            </Grid>
                        );
                    })}
            </Grid>

            {formData.fields.map((field, index) => {
                return (
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        type={field.type}
                        color="secondary"
                        label={field.name}
                        key={index}
                        multiline={field.multiline}
                        rows={field.rows}
                        value={field.value}
                        onChange={(e) => {
                            handleFieldChange(e, field, index);
                        }}
                    />
                );
            })}

            <Button
                variant="contained"
                onClick={handleUpload}
                disabled={isUploading}
            >Upload</Button>
            {fileError !== "false" && <Typography className="admin-error">{fileError}</Typography>}
        </Box>
    );
};

export default FirebaseUploadGallery;
