import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

test('renders content', () => {
    
    const user = {
        username: 'tomi',
        name: 'Tomi Holstila'
    }
    
    const blog = {
        title: 'example',
        author: 'tomi',
        likes: 100,
        url: 'www.google.com',
        user: {
            username: 'make',
            name: 'Make Testaaja'
        }
    }

    const component = render(
        <Blog blog={blog} user={user}/>
    )

    expect(component.container).toHaveTextContent(
        'example'
    );
    
    expect(component.container).not.toHaveTextContent(
        'www.google.com'
    );

    const button = component.container.querySelector('.t-show-details');
    fireEvent.click(button);

    expect(component.container).toHaveTextContent('www.google.com');
    expect(component.container).toHaveTextContent('added by Make Testaaja');
})
