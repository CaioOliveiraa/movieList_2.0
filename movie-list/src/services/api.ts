import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const registerUser = async (name: string, password: string) => {
    try {
        const response = await api.post('/auth/register', { name, password });
        return response.data;
    } catch (error) {
        throw new Error('Erro ao cadastrar usuásrio');
    }
};

export const loginUser = async (name: string, password: string) => {
    try {
        const response = await api.post('/auth/login', { name, password });
        const token = response.data.token;
        localStorage.setItem('token', token);
        return token;
    } catch (error) {
        throw new Error('Erro ao fazer login');
    }
};

export const addMovie = async (title: string, description: string, type: string) => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.post(
            '/movies/add',
            { title, description, type },
            {
                headers: {
                    Authorization: `Beaver ${token}`
                }
            }
        );
        return response.data;

    } catch (error) {
        throw new Error('Erro ao cadastrar mídia')
    }
};

export const getMovies = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.get('/movies', {
            headers: {
                Authorization: `Beaver ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Erro ao buscar mídias')
    }
};

export default api;