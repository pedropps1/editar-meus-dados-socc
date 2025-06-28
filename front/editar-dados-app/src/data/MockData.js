// src/data/MockData.js

export const initialMockUser = {
    id: 1,
    nome: "João da Silva Teixeira",
    email: "joao.silva@ufg.br",
    userName: "joao.silva",
    dataIngresso: "2017-02-12T00:00:00",
    fotoUrl: "https://t3.ftcdn.net/jpg/06/17/13/26/360_F_617132669_LGEkJA9lH6USc1M6IHrA4Wc4Yv15j5Wj.jpg", 
    informacoes: {
        emailSecundario: "joao.teixeira.alternativo@email.com",
        curriculoLattes: "http://lattes.cnpq.br/642312244432953",
        telefone: "(62) 98297-3241",
        ultimoAcesso: "2024-10-16T15:00:00"
    }
};

export const mockProfiles = [
    { id: 1, name: "Administrador", description: "Acesso total ao sistema" },
    { id: 2, name: "Docente", description: "Gerenciamento de disciplinas e alunos" }
];

export const mockKnowledgeNucleo = [
    {
        id: 1,
        nucleo: 'Transdisciplinar',
        area: 'Transdisciplinar',
        facilitador: 'Sérgio Teixeira de Carvalho',
        docentesAssociados: ['TR', 'JS'],
        disciplinas: ['Metodologia de Pesquisa', 'Inovação Social']
    },
    {
        id: 2,
        nucleo: 'Inteligência Artificial',
        area: 'Sistemas inteligentes',
        facilitador: 'Rogério Lopes Salvini',
        docentesAssociados: ['SS', 'JS'],
        disciplinas: ['Machine Learning', 'Processamento de Linguagem Natural']
    },
];

export const mockClasses = [
    {
        id: 1,
        turma: 'INF0056 - A',
        disciplina: 'Engenharia de Software',
        nucleo: 'Fundamentos de Sistemas e Software',
        horario: '2SM23',
        cargaHoraria: '64'
    },
    {
        id: 2,
        turma: 'INF0283 - A',
        disciplina: 'Computação e Sociedade',
        nucleo: 'Transdisciplinar',
        horario: '2T45',
        cargaHoraria: '32'
    },
    {
        id: 3,
        turma: 'INF0284 - A',
        disciplina: 'Introdução à Programação',
        nucleo: 'Conceitos, Métodos e Técnicas de Computação',
        horario: '3ST2345',
        cargaHoraria: '128'
    }
];