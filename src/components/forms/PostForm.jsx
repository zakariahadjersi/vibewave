import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FileUploader from "../FileUploader";
import { Form as FormRouter, useSubmit } from "react-router-dom";

const PostForm = ({ post }) => {
    const [validated, setValidated] = useState(false);
    const submit = useSubmit();

    const submitHandler = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          setValidated(true);
          return;
        }
        setValidated(true);
        submit(form);
    }

    return (
        <FormRouter method="POST" encType="multipart/form-data" action="/create-post">
            <Form className="d-flex flex-column w-100 mw-100" noValidate validated={validated} as="div" onSubmit={submitHandler} >
                <Form.Group className="mb-5" controlId="formCaption">
                    <Form.Label>Caption</Form.Label>
                    <Form.Control name="caption" as="textarea" rows={5} required min={5} max={2200} />
                    <Form.Control.Feedback type="invalid">
                        this is a required field, min length is 5 character.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-5" controlId="formFile">
                    <Form.Label>Add Photos</Form.Label>
                    <Form.Control as="div" >
                        <FileUploader mediaUrl={post?.imageUrl}  />
                    </Form.Control>
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
    console.log(formData.get("file"));
    return null;
}

export default PostForm;