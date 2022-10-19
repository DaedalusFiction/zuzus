import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import ContactFormField from "../contact/ContactFormField";

import emailjs from "@emailjs/browser";

const ContactForm = ({ config }) => {
    const [formData, setFormData] = useState(
        JSON.parse(JSON.stringify(config))
    );
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSendEmail = () => {
        const templateParams = {
            website: formData.website,
            email: formData.fields[0].value,
        };

        emailjs
            .send(
                "service_tmo76bn",
                "template_pfang7n",
                templateParams,
                "aMDOy4kUud9rd0Yg9"
            )
            .then(function () {
                setIsSubmitted(true);
            });
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1em",
                minWidth: "45ch",
            }}
        >
            {!isSubmitted ? (
                <>
                    {formData.fields.map((field, index) => {
                        return (
                            <Box key={index}>
                                <ContactFormField
                                    index={index}
                                    field={field}
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                            </Box>
                        );
                    })}
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={handleSendEmail}
                    >
                        Submit
                    </Button>
                </>
            ) : (
                <Typography>Thanks! We will be in touch soon!</Typography>
            )}
        </Box>
    );
};

export default ContactForm;
