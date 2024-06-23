import { Link } from "react-router-dom";
import { multiFormatDateString } from "../lib/utils";
import useAuthContext from "../hooks/useAuthContext";
import { Image } from "react-bootstrap";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const PostCard = ({ post }) => {

    const { user } = useAuthContext();
   
    return (
        <div className="w-100 bg-dark rounded p-3 m-3">
            <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center mb-3">
                    <Link to={`/profile/${post.creator}`}>
                        <Image
                            src={
                                "/assets/images/profile-placeholder.svg"
                            }
                            alt="creator"
                            className="rounded-circle"
                            width={50}
                            height={50}
                        />
                    </Link>

                    <div className="d-flex flex-column">
                        <p className="lh-base text-light">
                            {post.user.name}
                        </p>
                        <div className="d-flex justify-content-center align-items-center m-2 text-light">
                            <p className="fs-5">
                                {multiFormatDateString(post.created_at)}
                            </p>
                            •
                            <p className="fs-5">
                                {post.location}
                            </p>
                        </div>
                    </div>
                </div>

                <Link
                    to={`/update-post/${post.id}`}
                    className={`${user.id !== post.creator && "hidden"}`}>
                    <i className="bi bi-pencil-square fs-5" />
                </Link>
            </div>

            <Link to={`/posts/${post.id}`}>
                <div className="fs-4 p-3">
                    <p>{post.caption}</p>
                    {/* <ul className="d-flex mt-1">
                {post.tags.map((tag, index) => (
                  <li key={`${tag}${index}`} className="text-light-3 small-regular">
                    #{tag}
                  </li>
                ))}
              </ul> */}
                    {post.tags}
                </div>

                <Image
                    src={`${BACKEND_URL}/storage/${post?.image_url}` || "/assets/icons/profile-placeholder.svg"}
                    alt="post image"
                    width={700}
                    height={700}
                />
            </Link>

        </div>
    );
}

export default PostCard;