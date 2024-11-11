import axios from 'axios';

// Configuração do Axios
const api = axios.create({
    baseURL: 'https://movielist-2-0.onrender.com/api',
});

// Interceptores para lidar com autenticação
api.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');

            if (refreshToken) {
                try {
                    const refreshResponse = await axios.post('/auth/refresh-token', {
                        refreshToken,
                    });

                    if (refreshResponse.status === 200) {
                        const { accessToken } = refreshResponse.data;
                        localStorage.setItem('accessToken', accessToken);

                        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                        return api(originalRequest);
                    }
                } catch (err) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

// Funções de requisição da API
export const registerUser = async (name: string, password: string) => {
    try {
        const response = await api.post('/auth/register', { name, password });
        return response.data;
    } catch (error) {
        throw new Error('Erro ao cadastrar usuário');
    }
};

export const loginUser = async (name: string, password: string): Promise<string> => {
    try {
        const response = await api.post('/auth/login', { name, password });
        const data = response.data;

        // Armazena os tokens
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        console.log('Login realizado com sucesso!');

        // Retorna o accessToken
        return data.accessToken;
    } catch (error) {
        console.error('Erro na requisição de login:', error);
        throw new Error('Erro ao realizar login');
    }
};
export const addMovie = async (movie: { title: string, description?: string, type: string }) => {
    try {
        const response = await api.post('/movies/add', movie);
        console.log('Filme adicionado com sucesso!');
        return response.data;
    } catch (error) {
        console.error('Erro ao adicionar filme:', error);
        throw new Error('Erro ao adicionar filme');
    }
};

export const getMovies = async () => {
    try {
        const response = await api.get('/movies');
        return response.data;
    } catch (error) {
        throw new Error('Erro ao buscar mídias');
    }
};

export const getMovie = async (movieId: string) => {
    try {
        const response = await api.get(`/movies/${movieId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar filme:', error);
        throw new Error('Erro ao buscar filme');
    }
};

export const deleteMovie = async (movieId: string) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await api.delete(`/movies/${movieId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Filme excluído com sucesso!');
        return response.data;
    } catch (error) {
        console.error('Erro ao excluir filme:', error);
        throw new Error('Erro ao excluir filme');
    }
};

export const updateMovie = async (movieId: string, movie: {title: string, description: string, type: string}) => {
    try {
        const token = localStorage.getItem('accessToken');
        const response = await api.put(`/movies/${movieId}`, movie, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('Filme atualizado com sucesso!');
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar filme:', error);
        throw new Error('Erro ao atualizar filme');
    }
}


export default api;
