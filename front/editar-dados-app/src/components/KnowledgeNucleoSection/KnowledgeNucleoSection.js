import React from 'react';
import { FaPencilAlt, FaEye, FaBars } from 'react-icons/fa';
import '../styles/SectionCard.css';
import '../styles/TableSection.css';

function KnowledgeNucleoSection({ nucleos }) {
    const displayedNucleos = nucleos || [];

    return (
        <div className="section-card">
            <div className="section-header">
                <h3>Meus Núcleos de Conhecimento</h3>
                <FaPencilAlt className="section-edit-icon" />
            </div>
            <div className="section-content">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Núcleo ↓</th>
                            <th>Área ↓</th>
                            <th>Facilitador ↓</th>
                            <th>Docentes Associados ↓</th>
                            <th>Disciplinas ↓</th>
                            <th>Ações ↓</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedNucleos.length > 0 ? (
                            displayedNucleos.map(item => (
                                <tr key={item.id}>
                                    <td>{item.nucleo}</td>
                                    <td>{item.area}</td>
                                    <td>{item.facilitador}</td>
                                    <td>
                                        <div className="associated-teachers">
                                            {item.docentesAssociados && item.docentesAssociados.map((initial, index) => (
                                                <span key={index} className="teacher-initials">{initial}</span>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <button className="icon-button" title={item.disciplinas ? item.disciplinas.join(', ') : 'N/A'}>
                                            <FaBars />
                                        </button>
                                    </td>
                                    <td><button className="icon-button"><FaEye /></button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">Nenhum núcleo de conhecimento disponível.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default KnowledgeNucleoSection;