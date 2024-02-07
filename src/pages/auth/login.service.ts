import api from '../../utils/api.ts';

export const getTodos = () => {
    console.log(' 123');
    return api.get('/todos');
}
