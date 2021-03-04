import React, { useState, useEffect, useRef } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';

import Styles from './Home.module.css';
import DisplayPost from '../Posts/DisplayPost';
import Pagination from '../Pagination/Pagination';

const GET_POSTS = gql`
    query GetPosts {
        posts {
            data {
                id
                title
                body
                author {
                    name
                }
                comments {
                    id
                    body
                }
            }
        }
    }
`;

const numberOfPost = [10, 20, 30, 50];

function Home() {
    const { loading, error, data } = useQuery(GET_POSTS);
    const [postsData, setData] = useState([]);
    const [displayPosts, setDisplayPosts] = useState([])
    const [numberOfPosts, setNumberOfPosts] = useState(10);
    const [loader, setLoader] = useState(false);
    const postRef = useRef(null);

    const PostsBottom = () => <div ref={postRef}></div>
    const toggleLoader = (loader) => !loader;

    useEffect(() => {
        if (data !== undefined) {
            const { posts } = data;
            setData([...posts.data, ...posts.data, ...posts.data]);
            setDisplayPosts(posts.data.slice(0, numberOfPosts));
        }
    }, [data])

    /**
     * The function updates the number of posts based on the user input.
     * @param {object} e 
     */
    const updatePosts = (e) => {
        const numPost = numberOfPosts + 1;
        setNumberOfPosts(e.target.value);
        const newData = postsData.slice(numPost, numberOfPosts);
        setDisplayPosts([...displayPosts, ...newData]);

        if (numberOfPosts < e.target.value) {
            postRef?.current?.scrollIntoView({
                behavior: 'smooth',
            });
        }
    }

    /**
     * This function changes the data based on paginated user input
     * @param {number} currentPage 
     */
    const changeDisplayPostsOnPaginate = (currentPage) => {
        setLoader(toggleLoader);
        if (currentPage === 1) {
            const newData = postsData.slice(0, numberOfPosts);
            setDisplayPosts(newData);
        } else if (currentPage > 1) {
            const range = currentPage * numberOfPosts;
            console.log(range, range + numberOfPosts);
            const newData = postsData.slice(range, range + numberOfPosts + 1);
            setDisplayPosts(newData);
        }

        // Added a 500ms time out to understand the loading of the data. It also helps make data loading asynchronous.
        setTimeout(() => setLoader(toggleLoader), 500)

    }


    if (!loading && displayPosts !== undefined) {
        return (
            <div className={Styles.home}>
                <h1 style={{ textAlign: "center" }}>Posts</h1>
                <div>
                    {/** Input box for number of posts */}
                    <p className={Styles.numberOfPost}>
                        <span style={{ marginRight: "0.5%" }}>Number of Posts:</span>
                        <select name="numberOfPosts" id="postsNumber" onChange={updatePosts}>
                            {numberOfPost.map((postNum) => <option key={postNum} value={postNum}>{postNum}</option>)}
                        </select>
                    </p>


                    {/** Test 1 and 2 */}
                    {!loader
                        ? (
                            <>
                                {displayPosts.map((post) => (
                                    <div key={post.id}>
                                        <DisplayPost post={post} commentsDisplay={true} />
                                    </div>))
                                }
                                <PostsBottom />
                            </>
                        )
                        : (
                            <div className={Styles.loaderDiv}>
                                <div class="spinner-border" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        )
                    }
                    <Pagination postsData={postsData} numberOfPosts={numberOfPosts} changeDisplayPostsOnPaginate={changeDisplayPostsOnPaginate} />
                </div>
                {/* <pre>{JSON.stringify(data, undefined, 4)}</pre> */}
            </div>
        )
    }
    if (error) { return <div>Error</div> }
    return <div>Loading...</div>
}

export default Home;