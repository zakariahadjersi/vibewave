import { Fragment, useCallback, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { convertFileToUrl } from "../lib/utils";

const FileUploader = ({ mediaUrl, file, setFile }) => {

    const [fileUrl, setFileUrl] = useState(mediaUrl);

    const onDrop = useCallback(
        (acceptedFiles) => {
            setFile(acceptedFiles);
            setFileUrl(convertFileToUrl(acceptedFiles[0]));
        },
        [file]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpeg", ".jpg"],
        },
    });

    return (
        <div
            {...getRootProps()}
            className="d-flex flex-column justify-content-center align-items-center bg-dark rounded" role="button">

            <Form.Control {...getInputProps()} />

            {fileUrl ? (
                <>
                    <div className="d-flex justify-content-center align-items-center w-100 p-3 p-lg-5">
                        <img src={fileUrl} alt="image" className="img-fluid" />
                    </div>
                    <p className="text-light text-center fs-6 w-100">Click or drag photo to replace</p>
                </>
            ) : (
                <div className="d-flex flex-column justify-content-center align-items-center p-5 h-75">
                    <i className="bi bi-card-image" style={{ fontSize: 60 }} />
                    <h3 className="fs-2 fw-medium lh-base text-light mb-1 mt-2">
                        Drag photo here
                    </h3>
                    <p className="text-light fs-6 fw-normal">SVG, PNG, JPG</p>
                    <Button type="button" variant="purple-200" >
                        Select from device
                    </Button>
                </div>
            )}
        </div>
    );
}

export default FileUploader;