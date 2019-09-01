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
        console.log(error.response.data.error);
        
        return error.response.data;
    }

};

export default { getAll, add, setToken };
