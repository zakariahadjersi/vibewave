import PostForm from "../../components/forms/PostForm";

const CreatePoste = () => {
    return (
        <div className="d-flex flex-grow-1">
            <div className="d-flex flex-column flex-grow-1 align-items-center mb-0 overflow-auto p-3 p-md-4 p-lg-5">
                <div className="mw-100 d-flex justify-content-start align-items-center p-2 mb-3 w-100">
                    <i className="bi bi-file-earmark-image fs-2 fs-md-1" />
                    <h2 className="fw-bold fs-4 fs-md-3 text-start pt-2 ps-2 ps-md-3 w-100">Create Post</h2>
                </div>
                <PostForm />
            </div>
        </div>
    );
}

export default CreatePoste;