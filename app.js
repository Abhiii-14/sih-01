"use strict";

const reportForm = document.querySelector("#reportForm");

if (reportForm) {
    const description = document.querySelector("#description");
    const descriptionCount = document.querySelector("#descriptionCount");
    const photoInput = document.querySelector("#photo");
    const photoMessage = document.querySelector("#photoMessage");
    const photoPreview = document.querySelector("#photoPreview");
    const cancelPhotoButton = document.querySelector("#cancelPhoto");
    const reportMessage = document.querySelector("#reportMessage");
    const locationInput = document.querySelector("#location");
    const locationButton = document.querySelector("#useCurrentLocation");
    const locationMessage = document.querySelector("#locationMessage");
    const ratingForm = document.querySelector("#ratingForm");
    const ratingMessage = document.querySelector("#ratingMessage");
    let previewUrl = "";

    const setMessage = (element, text, state) => {
        element.textContent = text;
        if (state) {
            element.dataset.state = state;
        } else {
            delete element.dataset.state;
        }
    };

    const updateDescriptionCount = () => {
        descriptionCount.textContent = `${description.value.length}/${description.maxLength} characters`;
    };

    const clearPhotoPreview = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            previewUrl = "";
        }
        photoPreview.removeAttribute("src");
        photoPreview.hidden = true;
    };

    description.addEventListener("input", updateDescriptionCount);

    photoInput.addEventListener("change", () => {
        photoInput.setCustomValidity("");
        setMessage(photoMessage, "");
        clearPhotoPreview();
        cancelPhotoButton.hidden = photoInput.files.length === 0;

        const file = photoInput.files[0];
        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            const message = "Choose an image file.";
            photoInput.setCustomValidity(message);
            setMessage(photoMessage, message, "error");
            photoInput.reportValidity();
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            const message = "Choose an image smaller than 5 MB.";
            photoInput.setCustomValidity(message);
            setMessage(photoMessage, message, "error");
            photoInput.reportValidity();
            return;
        }

        previewUrl = URL.createObjectURL(file);
        photoPreview.src = previewUrl;
        photoPreview.hidden = false;
        setMessage(photoMessage, `Preview ready: ${file.name}`, "success");
    });

    locationButton.addEventListener("click", () => {
        if (!window.isSecureContext || !navigator.geolocation) {
            setMessage(locationMessage, "Location access requires a secure page. Open this site on localhost or HTTPS.", "error");
            return;
        }

        locationButton.disabled = true;
        setMessage(locationMessage, "Getting your location...");

        navigator.geolocation.getCurrentPosition(
            ({coords}) => {
                locationInput.value = `${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`;
                locationInput.dispatchEvent(new Event("input", {bubbles: true}));
                setMessage(locationMessage, "Coordinates added. Add a street or ward if needed.", "success");
                locationButton.disabled = false;
            },
            (error) => {
                const messages = {
                    1: "Location permission was denied. Allow access in your browser and try again.",
                    2: "Your location is unavailable. Enter it manually or try again.",
                    3: "The location request timed out. Try again."
                };
                setMessage(locationMessage, messages[error.code] || "Unable to get your location. Enter it manually.", "error");
                locationButton.disabled = false;
            },
            {enableHighAccuracy: false, timeout: 15000, maximumAge: 30000}
        );
    });

    cancelPhotoButton.addEventListener("click", () => {
        photoInput.value = "";
        photoInput.setCustomValidity("");
        clearPhotoPreview();
        cancelPhotoButton.hidden = true;
        setMessage(photoMessage, "");
        setMessage(reportMessage, "");
    });

    reportForm.addEventListener("invalid", () => {
        setMessage(reportMessage, "Please complete the required fields and correct any invalid values.", "error");
    }, true);

    reportForm.addEventListener("input", () => {
        setMessage(reportMessage, "");
    });

    reportForm.addEventListener("submit", (event) => {
        event.preventDefault();
        setMessage(reportMessage, "Frontend demo only: the form is valid, but no report was sent or saved.", "success");
    });

    reportForm.addEventListener("reset", () => {
        window.setTimeout(() => {
            photoInput.setCustomValidity("");
            updateDescriptionCount();
            clearPhotoPreview();
            cancelPhotoButton.hidden = true;
            setMessage(photoMessage, "");
            setMessage(reportMessage, "");
        }, 0);
    });

    ratingForm.addEventListener("invalid", () => {
        setMessage(ratingMessage, "Enter a complaint ID and select a rating.", "error");
    }, true);

    ratingForm.addEventListener("submit", (event) => {
        event.preventDefault();
        setMessage(ratingMessage, "Frontend demo only: your rating is valid, but it was not sent or saved.", "success");
    });

    ratingForm.addEventListener("reset", () => {
        window.setTimeout(() => setMessage(ratingMessage, ""), 0);
    });

    window.addEventListener("pagehide", clearPhotoPreview);
    updateDescriptionCount();
}

const registrationForm = document.querySelector("#registrationForm");

if (registrationForm) {
    const registrationResult = document.querySelector("#registrationResult");

    const bindFilePreview = (input, preview, cancelButton, message, allowPdf) => {
        let previewUrl = "";

        const clearPreview = () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
                previewUrl = "";
            }
            preview.removeAttribute("src");
            preview.hidden = true;
        };

        const clearSelection = () => {
            input.value = "";
            input.setCustomValidity("");
            clearPreview();
            cancelButton.hidden = true;
            message.textContent = "";
            delete message.dataset.state;
        };

        input.addEventListener("change", () => {
            input.setCustomValidity("");
            clearPreview();
            message.textContent = "";
            delete message.dataset.state;
            cancelButton.hidden = input.files.length === 0;

            const file = input.files[0];
            if (!file) {
                return;
            }

            const isImage = file.type.startsWith("image/");
            const isPdf = allowPdf && (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"));
            if (!isImage && !isPdf) {
                const error = allowPdf ? "Choose an image or PDF file." : "Choose an image file.";
                input.setCustomValidity(error);
                message.textContent = error;
                message.dataset.state = "error";
                input.reportValidity();
                return;
            }

            if (isImage) {
                previewUrl = URL.createObjectURL(file);
                preview.src = previewUrl;
                preview.hidden = false;
            }
            message.textContent = isPdf ? `PDF selected: ${file.name}` : `Preview ready: ${file.name}`;
            message.dataset.state = "success";
        });

        cancelButton.addEventListener("click", clearSelection);
        return clearSelection;
    };

    const clearIssuePhoto = bindFilePreview(
        document.querySelector("#issuePhoto"),
        document.querySelector("#issuePhotoPreview"),
        document.querySelector("#cancelIssuePhoto"),
        document.querySelector("#issuePhotoMessage"),
        false
    );
    const clearCitizenIdProof = bindFilePreview(
        document.querySelector("#citizenIdProof"),
        document.querySelector("#citizenIdProofPreview"),
        document.querySelector("#cancelCitizenIdProof"),
        document.querySelector("#citizenIdProofMessage"),
        true
    );

    registrationForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const complaintId = `CF-${crypto.randomUUID().replace(/-/g, "").slice(0, 12).toUpperCase()}`;
        registrationResult.textContent = `Complaint registered. Your ID is ${complaintId}.`;
        registrationResult.dataset.state = "success";
    });

    registrationForm.addEventListener("reset", () => {
        window.setTimeout(() => {
            clearIssuePhoto();
            clearCitizenIdProof();
            registrationResult.textContent = "";
            delete registrationResult.dataset.state;
        }, 0);
    });

    window.addEventListener("pagehide", () => {
        clearIssuePhoto();
        clearCitizenIdProof();
    });
}
