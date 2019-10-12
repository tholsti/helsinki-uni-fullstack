import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
    const blog = {
        title: 'title test',
        author: 'tomi',
        likes: 100,
    }

    const component = render(
        <SimpleBlog blog={blog}/>
    )

    expect(component.container).toHaveTextContent(
        'title test'
    )
    expect(component.container).toHaveTextContent(
        'tomi'
    )
    expect(component.container).toHaveTextContent(
        'blog has 100 likes'
    )
})

test('eventhandler fires', () => {
    const blog = {
        title: 'title test',
        author: 'tomi',
        likes: 100,
    }

    const mockFn = jest.fn();

    const { getByText } = render(
        <SimpleBlog blog={blog} onClick={mockFn}/>
    )

    const button = getByText('like');

    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockFn.mock.calls.length).toBe(2);

});
