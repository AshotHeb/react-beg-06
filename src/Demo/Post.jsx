import {memo} from 'react';

const Post = ({post ,handleDeletePost}) => {
    console.log('Post Render');
    return (
        <div style={{ display: "inline-block", marginLeft: "15px" }}>
            <p>
                {post._id}
            </p>
            <p>
                {post.name}
            </p>
            <button onClick={() => handleDeletePost(post._id)}>Delete</button>
        </div>
    )
}

export default memo(Post);