import React, { useState, useEffect } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import '../styles/UserInformationForm.css';

function UserInformationForm({ initialData, onSave, onPhotoChange }) {
  const [formData, setFormData] = useState({
    emailSecundario: '',
    curriculoLattes: '',
    telefone: '',
    ultimoAcesso: '',
    nome: '',
    email: '',
    userName: '',
    foto: null
  });
  const [previewFoto, setPreviewFoto] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        emailSecundario: initialData.informacoes?.emailSecundario || '',
        curriculoLattes: initialData.informacoes?.curriculoLattes || '',
        telefone: initialData.informacoes?.telefone || '',
        ultimoAcesso: initialData.informacoes?.ultimoAcesso ? new Date(initialData.informacoes.ultimoAcesso).toLocaleDateString('pt-BR') : '',
        nome: initialData.nome || '',
        email: initialData.email || '',
        userName: initialData.userName || '',
        foto: null
      });
      setPreviewFoto(initialData.foto);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, foto: file }));
      setPreviewFoto(URL.createObjectURL(file));
      onPhotoChange(file);
    }
  };

  const handleRemoveUltimoAcesso = () => {
    setFormData(prev => ({ ...prev, ultimoAcesso: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="user-info-section">
      <h3>Informações</h3>
      <form onSubmit={handleSubmit} className="user-info-form">
        <div className="form-row">
            <div className="form-group">
                <label htmlFor="fotoInput">Foto</label>
                <input
                    type="file"
                    id="fotoInput"
                    name="foto"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="form-control-file"
                />
                {previewFoto && (
                    <div className="photo-preview-container">
                        <img src={previewFoto} alt="Pré-visualização da Foto" className="photo-preview" />
                    </div>
                )}
            </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="emailSecundario">E-mail alternativo (opcional)</label>
            <input
              type="email"
              id="emailSecundario"
              name="emailSecundario"
              value={formData.emailSecundario}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="curriculoLattes">Currículo Lattes (opcional)</label>
            <input
              type="text"
              id="curriculoLattes"
              name="curriculoLattes"
              value={formData.curriculoLattes}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group last-access-group">
            <label>Último Acesso</label>
            <div className="last-access-display">
              <span>{formData.ultimoAcesso}</span>
              {formData.ultimoAcesso && (
                <button type="button" onClick={handleRemoveUltimoAcesso} className="remove-access-button">
                  <FaTimesCircle />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Principal</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="userName">Nome de Usuário</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>


        <div className="form-actions">
          <button type="submit" className="save-button">Salvar Alterações</button>
        </div>
      </form>
    </div>
  );
}

export default UserInformationForm;