import React from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
    const [showDetails, setShowDetails] = React.useState(false);
    const [likes, setLikes] = React.useState(blog.likes);

    const like = async () => {
        const resp = await blogService.like({                
            ...blog,
            likes,
        });
        setLikes(resp.likes);
    }

    const remove = () => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            blogService.remove(blog);
        }
    }

    return (
        <div style={{ border: '1px solid black', marginBottom: '4px' }}>
            <span 
                onClick={() => setShowDetails(!showDetails)} 
                style={{ cursor: 'pointer' }}
                className={'t-show-details'}
            >
                {blog.author}: {blog.title}
            </span>
            {showDetails && (
                <div style={{ paddingLeft: '8px' }}>
                    <a href={blog.url}>{blog.url}</a><br/>
                    {likes} like{likes !== 1 && 's'}
                    <button onClick={like}>like</button><br/>
                    {blog.user && <>{`added by ${blog.user.name}`}<br/></>}
                    {
                        blog.user && blog.user.username === user.username &&
                        <button onClick={remove}>Remove</button>
                    }
                </div>
            )}
        </div>
    );
}

Blog.propTypes = {
    blog: PropTypes.shape({
        author: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        user: PropTypes.shape({
            username: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    }).isRequired,
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }).isRequired,
}

export default Blog;
