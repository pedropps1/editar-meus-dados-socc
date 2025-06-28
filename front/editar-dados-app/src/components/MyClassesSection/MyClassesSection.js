import React from 'react';
import { FaPencilAlt, FaEye } from 'react-icons/fa';
import '../styles/SectionCard.css';
import '../styles/TableSection.css';

function MyClassesSection({ classes }) {
    const displayedClasses = classes || [];

    return (
        <div className="section-card">
            <div className="section-header">
                <h3>Minhas Turmas</h3>
                <FaPencilAlt className="section-edit-icon" />
            </div>
            <div className="section-content">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Turma ↓</th>
                            <th>Disciplina ↓</th>
                            <th>Núcleo ↓</th>
                            <th>Horário ↓</th>
                            <th>CH da Disciplina ↓</th>
                            <th>Ações ↓</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedClasses.length > 0 ? (
                            displayedClasses.map(item => (
                                <tr key={item.id}>
                                    <td>{item.turma}</td>
                                    <td>{item.disciplina}</td>
                                    <td>{item.nucleo}</td>
                                    <td>{item.horario}</td>
                                    <td>{item.cargaHoraria}</td>
                                    <td><button className="icon-button"><FaEye /></button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">Nenhuma turma disponível.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MyClassesSection;