import React from 'react';
import { FaChevronDown, FaPencilAlt } from 'react-icons/fa'; 
import '../styles/SectionCard.css'; 

function MyProfilesSection({ profiles }) {
    return (
        <div className="section-card">
            <div className="section-header">
                <h3>Meus Perfis</h3>
                <FaChevronDown className="section-expand-icon" /> 
            </div>
            <div className="section-content">
                {profiles && profiles.length > 0 ? (
                    <ul className="profile-list">
                        {profiles.map(profile => (
                            <li key={profile.id} className="profile-item">
                                <strong>{profile.name}:</strong> {profile.description}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum perfil disponível.</p>
                )}
            </div>
        </div>
    );
}

export default MyProfilesSection;