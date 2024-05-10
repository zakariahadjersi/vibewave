import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FileUploader from "../FileUploader";
import { Form as FormRouter, redirect, useSubmit } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const PostForm = ({ post }) => {
    const [validated, setValidated] = useState(false);
    const [file, setFile] = useState([]);
    const submit = useSubmit();

    const submitHandler = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const newInput = document.createElement('input');
        newInput.type = 'file';
        newInput.name = 'file';
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file[0]);
        newInput.files = dataTransfer.files;
        newInput.style.display = 'none';
        form.appendChild(newInput);
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }
        setValidated(true);

        submit(form);
    }

    return (
        <FormRouter method="POST" encType="multipart/form-data" action="/create-post" onSubmit={(event) => submitHandler(event)}>
            <Form className="d-flex flex-column w-100 mw-100" noValidate validated={validated} as="div" encType="multipart/form-data" >
                <Form.Group className="mb-5" controlId="formCaption">
                    <Form.Label>Caption</Form.Label>
                    <Form.Control name="caption" as="textarea" rows={5} required min={5} max={2200} />
                    <Form.Control.Feedback type="invalid">
                        this is a required field, min length is 5 character.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-5" controlId="formFile">
                    <Form.Label>Add Photos</Form.Label>
                    <FileUploader mediaUrl={post?.imageUrl} file={file} setFile={setFile} />
                </Form.Group>
                <Form.Group className="mb-5" controleId="formLocation" >
                    <Form.Label>Add Location</Form.Label>
                    <Form.Control type="text" min={1} max={1000} required name="location" />
                    <Form.Control.Feedback type="invalid">
                        this is a required field.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-5" controleId="formLocation" >
                    <Form.Label>Add Tags (separated by comma " , ")</Form.Label>
                    <Form.Control type="text" placeholder="Art, Expression, Learn" name="tags" />
                </Form.Group>
                <div className="d-flex justify-content-end align-items-center">
                    <Button variant="dark" type="button" >
                        Cancel
                    </Button>
                    <Button variant="purple-500" type="submit" className="ms-3" >
                        Submit
                    </Button>
                </div>
            </Form>
        </FormRouter>
    );
}

export const postAction = async ({ request }) => {
    let formData = await request.formData();

    const payload = new FormData();
    payload.append("caption", formData.get("caption"));
    payload.append("location", formData.get("location"));
    payload.append("tags", formData.get("tags"));
    payload.append("file", formData.get("file"));
  
    try {
         await fetch(BACKEND_URL + '/api/post', {
            method: 'POST',
            credentials: "include",
            headers: {
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "X-XSRF-TOKEN": decodeURIComponent(getCookie("XSRF-TOKEN")),
            },
            body: payload
        })
       
        return redirect("/");
    } catch (error) {
        console.log(error);
    }
    return null;
}

export default PostForm;

const getCookie = (cookieName) => {
    const cookieArray = document.cookie.split(";");

    for (const cookie of cookieArray) {
        let cookieString = cookie;

        while (cookieString.charAt(0) == " ") {
            cookieString = cookieString.substring(1, cookieString.length);
        }
        if (cookieString.indexOf(cookieName + "=") == 0) {
            return cookieString.substring(cookieName.length + 1, cookieString.length);
        }
    }

    return undefined;
};
