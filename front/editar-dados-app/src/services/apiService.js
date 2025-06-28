const API_BASE_URL = 'http://localhost:8080/api';

const apiService = {
    fetchUserData: async (userId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/usuarios/${userId}`);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
                throw new Error(errorData.message || `Erro ao buscar usuário: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
            throw error;
        }
    },

    updateUserData: async (userId, userData) => {
        try {
            const params = new URLSearchParams();
            if (userData.nome !== undefined) params.append('nome', userData.nome);
            if (userData.email !== undefined) params.append('email', userData.email);
            if (userData.userName !== undefined) params.append('userName', userData.userName);
            if (userData.emailSecundario !== undefined) params.append('emailSecundario', userData.emailSecundario);
            if (userData.telefone !== undefined) params.append('telefone', userData.telefone);
            if (userData.curriculoLattes !== undefined) params.append('curriculoLattes', userData.curriculoLattes);
            if (userData.fotoUrl !== undefined) params.append('fotoUrl', userData.fotoUrl);

            const response = await fetch(`${API_BASE_URL}/usuarios/${userId}?${params.toString()}`, {
                method: 'PUT',
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
                throw new Error(errorData.message || `Erro ao atualizar usuário: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Erro ao atualizar dados do usuário:", error);
            throw error;
        }
    },

    uploadImage: async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${API_BASE_URL}/upload/image`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
                throw new Error(errorData.message || `Erro ao fazer upload da imagem: ${response.status}`);
            }
            const imageUrl = await response.text();
            return imageUrl;
        } catch (error) {
            console.error("Erro ao fazer upload da imagem:", error);
            throw error;
        }
    }
};

export default apiService;