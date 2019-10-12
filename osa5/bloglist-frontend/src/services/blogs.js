import axios from 'axios';

const baseUrl = '/api/blogs';

let token = '';
const setToken = newToken => {
    token = `bearer ${newToken}`;  
}

const getAll = async () => {
    const resp = await axios.get(baseUrl);
    return resp.data;
};

const add = async newBlog => {
    try {
        const resp = await axios
            .post(
                baseUrl,
                newBlog,
                {
                    headers: {
                        Authorization: token,
                    }
                }
            )
        return resp.data;    

    } catch (error) {
        return error.response.data;
    }
};

const like = async blog => {
    const update = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user ? blog.user.id : undefined,
    }
    
    try {
        const resp = await axios
            .put(`${baseUrl}/update/${blog.id}`, update);
        return resp.data;
    } catch (error) {
        return error.response.data;
    }
};

const remove = async blog => {
    try {
        const resp = await axios
            .delete(`${baseUrl}/delete/${blog.id}`, 
                {
                    headers: {
                        Authorization: token,
                    }   
                })
        return resp.data;
    } catch (e) {
        return e.response.data;
    }
}

export default { 
    add,
    getAll,
    like,
    remove,
    setToken
};
