import React, { useState, useEffect } from 'react';
import ProfileHeader from './components/ProfileHeader/ProfileHeader.js';
import UserProfileCard from './components/UserProfileCard/UserProfileCard.js';
import MyProfilesSection from './components/MyProfilesSection/MyProfilesSection.js';
import KnowledgeNucleoSection from './components/KnowledgeNucleoSection/KnowledgeNucleoSection.js';
import MyClassesSection from './components/MyClassesSection/MyClassesSection.js';

import apiService from './services/apiService.js';

import { mockProfiles, mockKnowledgeNucleo, mockClasses, initialMockUser } from './data/MockData.js';

import './App.css';

function App() {
    const [user, setUser] = useState(initialMockUser);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userId = 1;
    useEffect(() => {
        const loadUserAndProfiles = async () => {
            try {
                setLoading(true);
                setError(null);

                const userData = await apiService.fetchUserData(userId);


                if (userData.foto && typeof userData.foto === 'string') {
                    userData.fotoUrl = userData.foto;
                    delete userData.foto;
                } else if (!userData.fotoUrl) {
                    userData.fotoUrl = 'https://via.placeholder.com/150';
                }

                setUser(userData);
            } catch (err) {
                console.error('Erro ao carregar dados do usuário do backend:', err);
                setError('Falha ao carregar os dados do usuário. Exibindo dados de demonstração.');
                setUser(initialMockUser);
            } finally {
                setLoading(false);
            }
        };

        loadUserAndProfiles();
    }, [userId]);

    const handleSaveUser = async (updatedUserData) => {
        try {
            setLoading(true);
            setError(null);

            const response = await apiService.updateUserData(userId, updatedUserData);

            if (response.foto && typeof response.foto === 'string') {
                response.fotoUrl = response.foto;
                delete response.foto;
            }

            setUser(response); 
            alert('Dados do usuário atualizados com sucesso!');
        } catch (err) {
            console.error('Erro ao salvar usuário:', err);
            setError('Falha ao salvar os dados do usuário. Tente novamente.');
            alert('Erro ao salvar dados!');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Carregando perfil...</div>;
    }

    return (
        <div className="App">
            <ProfileHeader />
            <div className="main-content">
                {error && <div className="error-message">{error}</div>}
                <UserProfileCard user={user} onSave={handleSaveUser} onPhotoUpload={apiService.uploadImage} />
                <MyProfilesSection profiles={mockProfiles} />
                <KnowledgeNucleoSection nucleos={mockKnowledgeNucleo} />
                <MyClassesSection classes={mockClasses} />
            </div>
        </div>
    );
}

export default App;