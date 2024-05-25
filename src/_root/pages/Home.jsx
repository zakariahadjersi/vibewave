import { Spinner } from "react-bootstrap";
import { json, useLoaderData } from "react-router-dom";
import { getCookie } from "../../lib/utils";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Home() {

    const data = useLoaderData();

    if (data.isError) {
      return <p>{data.message}</p>;
    }

    const posts = data;
    console.log(posts);
    const isPostLoading = true;

    return (
        <div className="d-flex w-100">
            <div className="d-flex flex-column align-items-center w-100 m-5 p-4">
                <div className="d-flex flex-column align-items-center w-100 m-4">
                    <h2 className="fs-4 text-start w-100 mb-4">Home Feed</h2>
                    {isPostLoading && !posts ? (
                        <Spinner
                            as="span"
                            animation="border"
                            size="lg"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                        />
                    ) : (
                        <ul className="d-flex flex-column m-3 w-100 ">
                            {/* {posts?.documents.map((post) => (
                                <li key={post.$id} className="d-flex justify-content-center
                                 w-100">
                                    <PostCard post={post} />
                                </li>
                            ))} */}
                            Test
                        </ul>
                    )}
                </div>
            </div>

            {/* <div className="home-creators">
                <h3 className="h3-bold text-light-1">Top Creators</h3>
                {isUserLoading && !creators ? (
                    <Spinner
                        as="span"
                        animation="border"
                        size="lg"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                    />
                ) : (
                    <ul className="grid 2xl:grid-cols-2 gap-6">
                        {creators?.documents.map((creator) => (
                            <li key={creator?.$id}>
                                <UserCard user={creator} />
                            </li>
                        ))}
                    </ul>
                )}
            </div> */}
        </div>
    );
}

export const homeLoader = async () => {
    const response = await fetch(BACKEND_URL + '/api/posts', {
        method: 'GET',
        credentials: "include",
        headers: {
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": decodeURIComponent(getCookie("XSRF-TOKEN")),
        },
    });

    if (!response.ok) {

        throw json(
            { message: 'Could not fetch posts.' },
            {
                status: 500,
            }
        );
    } else {
        return response;
    }
}
export default Home;