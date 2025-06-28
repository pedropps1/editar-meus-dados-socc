import React, { useState, useEffect } from 'react';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';

import '../styles/UserProfileCard.css';

function UserProfileCard({ user, onSave, onPhotoUpload }) {
    const [editedData, setEditedData] = useState(null); 
    const [isEditing, setIsEditing] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false); 

    useEffect(() => {
        if (user) {
            setEditedData({
                ...user,
                informacoes: { ...user.informacoes }
            });
        }
    }, [user]);

    if (!user) {
        return <div className="user-profile-card">Carregando dados do usuário...</div>;
    }

    const handleEditClick = () => {
        setIsEditing(true);
        
        setEditedData({
            ...user,
            informacoes: { ...(user.informacoes || {}) } 
        });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedData({
            ...user,
            informacoes: { ...(user.informacoes || {}) }
        });
    };

    const handleSaveClick = async () => {
        try {
            await onSave(editedData); 
            setIsEditing(false);
        } catch (err) {
            console.error("Falha ao salvar os dados do usuário:", err);
            alert("Erro ao salvar dados. Verifique o console.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'emailSecundario' || name === 'telefone' || name === 'curriculoLattes') {
            setEditedData(prevData => ({
                ...prevData,
                informacoes: {
                    ...(prevData.informacoes || {}), 
                    [name]: value
                }
            }));
        } else {
            setEditedData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        if (file && onPhotoUpload) {
            try {
                setUploadingPhoto(true);
                const imageUrl = await onPhotoUpload(file);
                setEditedData(prevData => ({
                    ...prevData,
                    fotoUrl: imageUrl
                }));
            } catch (err) {
                console.error("Falha ao fazer upload da nova foto:", err);
                alert("Erro ao carregar a foto. Tente novamente.");
            } finally {
                setUploadingPhoto(false);
            }
        }
    };

    const formattedDataIngresso = user.dataIngresso ?
        new Date(user.dataIngresso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) :
        'N/A';

    const formattedUltimoAcesso = user.informacoes?.ultimoAcesso ?
        new Date(user.informacoes.ultimoAcesso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) :
        'N/A';

    return (
        <div className="user-profile-card">
            <div className="profile-header">
                <img src={editedData?.fotoUrl || 'https://via.placeholder.com/150'} alt="Foto de perfil" className="profile-picture" />
                {isEditing && ( 
                    <div className="photo-upload-overlay">
                        <label className="upload-button">
                            {uploadingPhoto ? 'Enviando...' : <FaPencilAlt />}
                            <input type="file" accept="image/*" onChange={handlePhotoChange} disabled={uploadingPhoto} />
                        </label>
                    </div>
                )}
                <div className="profile-info">
                    <h2>{user.nome}</h2>
                    <p>{user.email}</p>
                    <p>{user.userName}</p>
                    <p>Ingresso: {formattedDataIngresso}</p>
                </div>
                {!isEditing && (
                    <button className="edit-profile-button" onClick={handleEditClick}>
                        <FaPencilAlt /> Editar meus dados
                    </button>
                )}
            </div>

            <div className="section-title">Informações</div>
            <div className="information-fields">
                <div className="field-group">
                    <label>E-mail alternativo (opcional)</label>
                    {isEditing ? (
                        <input
                            type="email"
                            name="emailSecundario"
                            value={editedData?.informacoes?.emailSecundario || ''}
                            onChange={handleChange}
                            placeholder="joao.silva.alternativo@email.com"
                        />
                    ) : (
                        <p>{user.informacoes?.emailSecundario || 'N/A'}</p>
                    )}
                </div>

                <div className="field-group">
                    <label>Currículo Lattes (opcional)</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="curriculoLattes"
                            value={editedData?.informacoes?.curriculoLattes || ''}
                            onChange={handleChange}
                            placeholder="http://lattes.cnpq.br/..."
                        />
                    ) : (
                        <p>{user.informacoes?.curriculoLattes || 'N/A'}</p>
                    )}
                </div>

                <div className="field-group">
                    <label>Telefone</label>
                    {isEditing ? (
                        <input
                            type="tel"
                            name="telefone"
                            value={editedData?.informacoes?.telefone || ''}
                            onChange={handleChange}
                            placeholder="(xx) xxxxx-xxxx"
                        />
                    ) : (
                        <p>{user.informacoes?.telefone || 'N/A'}</p>
                    )}
                </div>

                <div className="field-group">
                    <label>Último Acesso</label>
                    <p>{formattedUltimoAcesso}</p>
                </div>

                {isEditing && (
                    <div className="edit-actions">
                        <button className="save-button" onClick={handleSaveClick}>Salvar</button>
                        <button className="cancel-button" onClick={handleCancelEdit}>Cancelar</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserProfileCard;