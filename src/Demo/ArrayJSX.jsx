import React from 'react';
import idGeneretor from '../utils/idGenerator';
import Post from './Post';

class ArrayJSX extends React.Component {
    state = {
        posts: [
            {
                _id: idGeneretor(),
                name: 'Post 1 '
            },
            {
                _id: idGeneretor(),
                name: 'Post 2 '
            },
            {
                _id: idGeneretor(),
                name: 'Post 3 '
            },
            {
                _id: idGeneretor(),
                name: 'Post 4'
            }
        ]
    }
    handleDeletePost = (_id) => {
        let posts = [...this.state.posts];
        posts = posts.filter(post => post._id !== _id);
        this.setState({
            posts
        });
    }
    render() {
        const postsJSX = this.state.posts.map(post => {
            return (
                <Post
                    key={post._id}
                    handleDeletePost={this.handleDeletePost}
                    post={post}
                />
            );
        });
        return (
            <div style={{ display: 'flex' }}>
                <div>
                    {postsJSX}
                </div>
            </div>
        );
    }
};

export default ArrayJSX;