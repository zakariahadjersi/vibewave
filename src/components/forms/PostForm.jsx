import { Button, Form } from "react-bootstrap";
import FileUploader from "../FileUploader";

const PostForm = () => {
    return (
        <Form className="d-flex flex-column w-100 mw-100">
            <Form.Group className="mb-5" controlId="formCaption">
                <Form.Label>Caption</Form.Label>
                <Form.Control as="textarea" rows={5} />
            </Form.Group>
            <Form.Group className="mb-5" controlId="formFile">
                <Form.Label>Add Photos</Form.Label>
                <Form.Control as="div" >
                    <FileUploader />
                </Form.Control>
            </Form.Group>
            <Form.Group className="mb-5" controleId="formLocation" >
                <Form.Label>Add Location</Form.Label>
                <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-5" controleId="formLocation" >
                <Form.Label>Add Tags (separated by comma " , ")</Form.Label>
                <Form.Control type="text" placeholder="Art, Expression, Learn" />
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
    );
}

export default PostForm;