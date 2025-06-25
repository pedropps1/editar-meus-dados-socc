import React, { useState, useEffect } from 'react';
import { Edit, Check, X, Eye, MoreHorizontal, AlertCircle } from 'lucide-react';
import axios from 'axios';

interface User {
  id: number;
  fullName: string;
  email: string;
  username: string;
  alternativeEmail?: string;
  lattesUrl?: string;
  phone?: string;
  joinDate: string;
  avatarUrl?: string;
  roles: string[];
}

interface KnowledgeCenter {
  id: number;
  centerName: string;
  area: string;
  facilitator: string;
  associatedTeachers: string;
  disciplines: string;
}

interface UserClass {
  id: number;
  classCode: string;
  discipline: string;
  knowledgeCenter: string;
  schedule: string;
  workload: number;
}

interface ValidationErrors {
  email?: string;
  alternativeEmail?: string;
  phone?: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<User>>({});
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const [knowledgeCenters] = useState<KnowledgeCenter[]>([
    {
      id: 1,
      centerName: "Transdisciplinar",
      area: "Transdisciplinar",
      facilitator: "Sérgio Teixeira de Carvalho",
      associatedTeachers: "TR,JS,A",
      disciplines: "≡"
    },
    {
      id: 2,
      centerName: "Inteligência Artificial",
      area: "Sistemas Inteligentes",
      facilitator: "Rogério Lopes Salvini",
      associatedTeachers: "SS,JS",
      disciplines: "≡"
    }
  ]);
  
  const [userClasses] = useState<UserClass[]>([
    {
      id: 1,
      classCode: "INF0056 - A",
      discipline: "Engenharia de Software",
      knowledgeCenter: "Fundamentos de Sistemas e Software",
      schedule: "25M23",
      workload: 64
    },
    {
      id: 2,
      classCode: "INF0283 - A",
      discipline: "Computação e Sociedade",
      knowledgeCenter: "Transdisciplinar",
      schedule: "2T45",
      workload: 32
    },
    {
      id: 3,
      classCode: "INF0284 - A",
      discipline: "Introdução à Programação",
      knowledgeCenter: "Conceitos, Métodos e Técnicas de Computação",
      schedule: "35T2345",
      workload: 128
    }
  ]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      console.log('Buscando dados do usuário...');
      const response = await axios.get('http://localhost:8085/api/users/1');
      console.log('Dados recebidos:', response.data);
      setUser(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      setSaveMessage({ type: 'error', text: 'Erro ao carregar dados do usuário. Usando dados de exemplo.' });
      
      // Fallback data for demo
      setUser({
        id: 1,
        fullName: "João da Silva Texeira",
        email: "joao.silva@ufg.br",
        username: "joao.silva",
        alternativeEmail: "joao.texeira.alternativo@email.com",
        lattesUrl: "http://lattes.cnpq.br/6423122444432953",
        phone: "(62) 98297-3241",
        joinDate: "2017-02-12",
        avatarUrl: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
        roles: ["ADMINISTRATOR", "TEACHER"]
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Validação de email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validação de telefone brasileiro
  const validatePhone = (phone: string): boolean => {
    // Remove todos os caracteres não numéricos
    const cleanPhone = phone.replace(/\D/g, '');
    // Verifica se tem 10 ou 11 dígitos (com DDD)
    return cleanPhone.length === 10 || cleanPhone.length === 11;
  };

  // Formatar telefone
  const formatPhone = (phone: string): string => {
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length === 11) {
      return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 7)}-${cleanPhone.slice(7)}`;
    } else if (cleanPhone.length === 10) {
      return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 6)}-${cleanPhone.slice(6)}`;
    }
    return phone;
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    // Validar email principal (obrigatório)
    if (!editData.email || !validateEmail(editData.email)) {
      errors.email = 'Email inválido';
    }

    // Validar email alternativo (opcional, mas se preenchido deve ser válido)
    if (editData.alternativeEmail && editData.alternativeEmail.trim() !== '' && !validateEmail(editData.alternativeEmail)) {
      errors.alternativeEmail = 'Email alternativo inválido';
    }

    // Validar telefone (opcional, mas se preenchido deve ser válido)
    if (editData.phone && editData.phone.trim() !== '' && !validatePhone(editData.phone)) {
      errors.phone = 'Telefone deve ter formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      fullName: user?.fullName,
      email: user?.email,
      alternativeEmail: user?.alternativeEmail,
      lattesUrl: user?.lattesUrl,
      phone: user?.phone,
      roles: user?.roles
    });
    setValidationErrors({});
    setSaveMessage(null);
  };

  const handleSave = async () => {
    if (!user) return;

    if (!validateForm()) {
      setSaveMessage({ type: 'error', text: 'Por favor, corrija os erros antes de salvar.' });
      return;
    }

    setIsLoading(true);
    try {
      console.log('Salvando dados:', editData);
      
      // Formatar telefone antes de enviar
      const dataToSave = {
        ...editData,
        phone: editData.phone ? formatPhone(editData.phone) : editData.phone
      };

      const response = await axios.put(`http://localhost:8085/api/users/${user.id}`, dataToSave);
      console.log('Dados salvos com sucesso:', response.data);
      
      setUser(response.data);
      setIsEditing(false);
      setEditData({});
      setValidationErrors({});
      setSaveMessage({ type: 'success', text: 'Dados salvos com sucesso!' });
      
      // Limpar mensagem após 3 segundos
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      setSaveMessage({ type: 'error', text: 'Erro ao salvar dados. Tente novamente.' });
      
      // Para demo, ainda atualiza localmente
      setUser({ ...user, ...editData });
      setIsEditing(false);
      setEditData({});
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
    setValidationErrors({});
    setSaveMessage(null);
  };

  const handleInputChange = (field: keyof User, value: string) => {
    setEditData({ ...editData, [field]: value });
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (validationErrors[field as keyof ValidationErrors]) {
      setValidationErrors({ ...validationErrors, [field]: undefined });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getRoleDisplayName = (role: string) => {
    const roleMap: { [key: string]: string } = {
      'ADMINISTRATOR': 'Administrador',
      'TEACHER': 'Docente',
      'STUDENT': 'Estudante'
    };
    return roleMap[role] || role;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">
          {isLoading ? 'Carregando...' : 'Erro ao carregar dados'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-teal-700 text-white px-8 py-4">
        <h1 className="text-xl font-semibold">Editar meus dados</h1>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Mensagem de sucesso/erro */}
        {saveMessage && (
          <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
            saveMessage.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            <AlertCircle className="w-5 h-5" />
            <span>{saveMessage.text}</span>
          </div>
        )}

        {/* User Profile Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                <img 
                  src={user.avatarUrl || "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-1">{user.fullName}</h2>
                <p className="text-gray-600 text-lg mb-1">{user.email}</p>
                <p className="text-gray-500 mb-2">{user.username}</p>
                <p className="text-sm text-gray-500">
                  Ingresso: {formatDate(user.joinDate)}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-teal-700 text-white px-6 py-2 rounded-lg hover:bg-teal-800 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Check className="w-4 h-4" />
                    <span>{isLoading ? 'Salvando...' : 'Salvar'}</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancelar</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="bg-teal-700 text-white px-6 py-2 rounded-lg hover:bg-teal-800 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Editar meus dados</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Informações</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                E-mail alternativo (opcional)
              </label>
              {isEditing ? (
                <div>
                  <input
                    type="email"
                    value={editData.alternativeEmail || ''}
                    onChange={(e) => handleInputChange('alternativeEmail', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                      validationErrors.alternativeEmail ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="email.alternativo@exemplo.com"
                  />
                  {validationErrors.alternativeEmail && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{validationErrors.alternativeEmail}</span>
                    </p>
                  )}
                </div>
              ) : (
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                  {user.alternativeEmail || 'Não informado'}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Currículo Lattes (opcional)
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={editData.lattesUrl || ''}
                  onChange={(e) => handleInputChange('lattesUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="http://lattes.cnpq.br/..."
                />
              ) : (
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                  {user.lattesUrl || 'Não informado'}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Telefone</label>
              {isEditing ? (
                <div>
                  <input
                    type="tel"
                    value={editData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                      validationErrors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="(xx) xxxxx-xxxx"
                  />
                  {validationErrors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{validationErrors.phone}</span>
                    </p>
                  )}
                </div>
              ) : (
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                  {user.phone || 'Não informado'}
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 flex items-center text-sm text-gray-500">
            <span className="font-medium">Último Acesso:</span>
            <span className="ml-2">Quarta-feira 25/06/2025</span>
            <div className="ml-2 w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>

        {/* User Profiles Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Meus perfis</h3>
          <div className="space-y-4">
            {user.roles.map((role, index) => (
              <div key={index}>
                <select
                  value={role}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:opacity-75"
                >
                  <option value="ADMINISTRATOR">Administrador</option>
                  <option value="TEACHER">Docente</option>
                  <option value="STUDENT">Estudante</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Knowledge Centers Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Meus Núcleos de Conhecimento</h3>
            <Edit className="w-4 h-4 text-gray-400" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 font-medium text-gray-600">Núcleo ↓</th>
                  <th className="text-left py-3 font-medium text-gray-600">Área ↓</th>
                  <th className="text-left py-3 font-medium text-gray-600">Facilitador ↓</th>
                  <th className="text-left py-3 font-medium text-gray-600">Docentes Associados ↓</th>
                  <th className="text-left py-3 font-medium text-gray-600">Disciplinas ↓</th>
                  <th className="text-left py-3 font-medium text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody>
                {knowledgeCenters.map((center) => (
                  <tr key={center.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 text-gray-700">{center.centerName}</td>
                    <td className="py-4 text-gray-700">{center.area}</td>
                    <td className="py-4 text-gray-700">{center.facilitator}</td>
                    <td className="py-4">
                      <div className="flex space-x-1">
                        {center.associatedTeachers.split(',').map((teacher, idx) => (
                          <span key={idx} className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs">
                            {teacher.trim()}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="bg-gray-100 p-2 rounded flex items-center justify-center w-8 h-8">
                        <MoreHorizontal className="w-4 h-4 text-gray-600" />
                      </div>
                    </td>
                    <td className="py-4">
                      <button className="text-teal-600 hover:bg-teal-50 p-2 rounded-full">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* My Classes Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex items-center space-x-2 mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Minhas Turmas</h3>
            <Edit className="w-4 h-4 text-gray-400" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 font-medium text-gray-600">Turma ↓</th>
                  <th className="text-left py-3 font-medium text-gray-600">Disciplina ↓</th>
                  <th className="text-left py-3 font-medium text-gray-600">Núcleo ↓</th>
                  <th className="text-left py-3 font-medium text-gray-600">Horário ↓</th>
                  <th className="text-left py-3 font-medium text-gray-600">CH da Disciplina ↓</th>
                  <th className="text-left py-3 font-medium text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody>
                {userClasses.map((userClass) => (
                  <tr key={userClass.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 text-gray-700">{userClass.classCode}</td>
                    <td className="py-4 text-gray-700">{userClass.discipline}</td>
                    <td className="py-4 text-gray-700">{userClass.knowledgeCenter}</td>
                    <td className="py-4 text-gray-700">{userClass.schedule}</td>
                    <td className="py-4 text-gray-700">{userClass.workload}</td>
                    <td className="py-4">
                      <button className="text-teal-600 hover:bg-teal-50 p-2 rounded-full">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;