import React from 'react';

const SimpleBlog = ({ blog, onClick }) => (
    <div className={'t_simple-blog'}>
        <div>
            {blog.title} {blog.author}
        </div>
        <div>
            blog has {blog.likes} likes
            <button className={'t_simple-blog-button'} onClick={onClick}>like</button>
        </div>
    </div>
)

export default SimpleBlog;
