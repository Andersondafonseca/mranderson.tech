import { Questionnaire } from '../types';

export const questionnaires: Questionnaire[] = [
  {
    slug: 'porta-1-infraestrutura',
    title: 'Porta 1: Infraestrutura',
    subtitle: 'Você Tem o Perfil para Infraestrutura?',
    description: 'Descubra se seu perfil comportamental e técnico está alinhado com a área que é a base de toda a tecnologia.',
    icon: 'fas fa-server',
    sections: [
      {
        title: 'Perfil Técnico e Curiosidade',
        questions: [
          'Eu gosto de entender como as coisas funcionam nos bastidores.',
          'Eu me sinto confortável mexendo em hardware, redes e dispositivos físicos.',
          'Eu tenho facilidade em seguir procedimentos e padrões técnicos.',
          'Eu gosto de investigar e resolver problemas técnicos.',
          'Eu me interesso por tecnologias como redes, servidores e nuvem.',
          'Eu me preocupo com segurança e proteção de dados.',
          'Eu gosto de tornar sistemas mais eficientes.',
        ],
      },
      {
        title: 'Perfil Comportamental',
        questions: [
          'Eu mantenho a calma mesmo em situações de pressão ou crise.',
          'Eu sou persistente na resolução de problemas, mesmo quando não acho a solução de primeira.',
          'Eu consigo ser paciente com usuários que têm pouca habilidade técnica.',
          'Eu sou detalhista e atento a pequenas falhas.',
          'Eu consigo seguir processos repetitivos sem perder a concentração.',
          'Eu me sinto confortável trabalhando nos bastidores sem busca constante por reconhecimento.',
          'Eu tenho responsabilidade e senso de urgência para atender a qualquer hora se o sistema falha.',
        ],
      },
      {
        title: 'Perfil de Aprendizado',
        questions: [
          'Eu tenho interesse contínuo em aprender novas tecnologias.',
          'Eu entendo que a infraestrutura evolui rapidamente e exige atualização constante.',
          'Eu me esforço para entender o “porquê” das coisas, não apenas o “como”.',
          'Eu aceito que erros fazem parte do aprendizado técnico.',
          'Eu sou capaz de estudar sozinho e buscar soluções sem supervisão constante.',
          'Eu gosto de entender profundamente um assunto antes de aplicá-lo.',
        ],
      },
      {
        title: 'Trabalho em Equipe e Comunicação',
        questions: [
          'Eu consigo explicar conceitos técnicos de forma simples para quem não entende de TI.',
          'Eu trabalho bem em equipe, mesmo sob pressão.',
          'Eu aceito feedback técnico para melhorar minha performance.',
          'Eu sei a importância de documentar procedimentos para outras pessoas da equipe.',
          'Eu respeito processos de mudança e aprovação antes de alterar sistemas críticos.',
          'Eu busco não apenas executar tarefas, mas entender o contexto maior em que estou inserido.',
          'Eu estou disposto a assumir plantões ou atuar fora do horário comercial se necessário para resolver crises.',
        ],
      },
      {
        title: 'Responsabilidade e Crescimento',
        questions: [
          'Eu entendo que, em infraestrutura, o impacto do meu erro pode afetar toda a empresa.',
          'Eu tenho interesse em liderar projetos de tecnologia no futuro.',
          'Eu me imagino construindo uma carreira sólida e de longo prazo dentro da área de TI.',
        ],
      },
    ],
    results: [
      {
        minScore: 26,
        maxScore: 30,
        title: 'Perfil Ideal',
        icon: 'fas fa-rocket text-green-400',
        description: 'Perfil ideal para uma carreira brilhante em infraestrutura.',
      },
      {
        minScore: 20,
        maxScore: 25,
        title: 'Potencial de Crescimento',
        icon: 'fas fa-lightbulb text-yellow-400',
        description: 'Boa base, com potencial de crescimento.',
      },
      {
        minScore: 15,
        maxScore: 19,
        title: 'Interesse com Pontos a Desenvolver',
        icon: 'fas fa-tools text-blue-400',
        description: 'Interesse existente, mas será necessário desenvolver perfil técnico ou comportamental.',
      },
      {
        minScore: 0,
        maxScore: 14,
        title: 'Ponto de Reflexão',
        icon: 'fas fa-compass text-red-400',
        description: 'Talvez outra área da TI combine melhor com seu estilo atual — mas isso pode mudar com experiência e desenvolvimento pessoal.',
      },
    ],
  },
  {
    slug: 'porta-2-desenvolvimento-de-sistemas',
    title: 'Porta 2: Desenvolvimento',
    subtitle: 'Você Tem o Perfil para Sistemas?',
    description: 'Avalie se sua paixão por lógica e criação de soluções se alinha com o universo do desenvolvimento de software.',
    icon: 'fas fa-code',
    sections: [
        {
            title: 'Perfil Técnico-Criativo',
            questions: [
                'Eu gosto de resolver problemas lógicos e pensar em soluções práticas.',
                'Tenho interesse por tecnologia desde jovem.',
                'Gosto de entender como os sistemas e aplicativos funcionam por trás das telas.',
                'Já tentei criar algo usando código ou tenho curiosidade sobre isso.',
                'Me sinto motivado ao ver ideias virando algo real.',
            ],
        },
        {
            title: 'Comportamento em Projetos',
            questions: [
                'Consigo lidar bem com tentativas e erros.',
                'Consigo focar em tarefas por longos períodos, especialmente quando estou criando algo.',
                'Tenho interesse em trabalhar com equipes técnicas e aprender com outras pessoas.',
                'Gosto de aprender com vídeos, cursos e práticas.',
                'Me sinto confortável lidando com detalhes e depuração de problemas.',
            ],
        },
        {
            title: 'Propósito e Motivação',
            questions: [
                'Me interesso por soluções criativas que facilitam a vida das pessoas.',
                'A ideia de trabalhar remotamente ou como freelancer me atrai.',
                'Tenho disciplina e sei estudar de forma autônoma.',
                'Quero aprender algo hoje que possa ser útil por muitos anos.',
                'Sonho em trabalhar com tecnologia ou já pesquisei sobre isso.',
            ],
        },
    ],
    results: [
        { minScore: 13, maxScore: 15, title: 'Perfil Ideal', icon: 'fas fa-rocket text-green-400', description: 'Perfil ideal para desenvolvimento! Bem-vindo ao universo da criação digital.' },
        { minScore: 9, maxScore: 12, title: 'Boa Afinidade', icon: 'fas fa-lightbulb text-yellow-400', description: 'Boa afinidade — com foco e prática, pode se destacar.' },
        { minScore: 6, maxScore: 8, title: 'Potencial a Explorar', icon: 'fas fa-tools text-blue-400', description: 'Potencial existe, mas talvez queira explorar outras portas também.' },
        { minScore: 0, maxScore: 5, title: 'Ponto de Reflexão', icon: 'fas fa-compass text-red-400', description: 'Talvez outro caminho na TI combine melhor com seu perfil atual.' },
    ],
  },
  {
    slug: 'porta-3-seguranca-da-informacao',
    title: 'Porta 3: Segurança',
    subtitle: 'Tem o Perfil para Segurança da Informação?',
    description: 'Descubra se seu perfil analítico e seu instinto protetor são compatíveis com a linha de frente da defesa digital.',
    icon: 'fas fa-shield-alt',
    sections: [
      {
        title: 'Perfil Técnico',
        questions: [
          'Gosto de pensar em como sistemas podem ser invadidos.',
          'Me interessa descobrir falhas ou brechas em processos.',
          'Tenho curiosidade sobre criptografia, redes e firewalls.',
          'Gosto de acompanhar notícias de vazamentos e ataques.',
          'Já usei (ou quis usar) ferramentas de hacking ético.',
        ],
      },
      {
        title: 'Perfil Comportamental',
        questions: [
          'Sou detalhista e meticuloso.',
          'Tenho disciplina para estudar temas técnicos.',
          'Me preocupo com privacidade e proteção de dados.',
          'Consigo manter a calma sob pressão.',
          'Prezo pela ética e confidencialidade.',
        ],
      },
      {
        title: 'Propósito e Missão',
        questions: [
          'Me identifico com o papel de prevenir desastres.',
          'Sinto satisfação em manter sistemas funcionando com segurança.',
          'Quero proteger empresas e pessoas de ameaças reais.',
          'Gosto de resolver problemas complexos.',
          'Quero fazer parte da linha de frente na defesa do mundo digital.',
        ],
      },
    ],
    results: [
      { minScore: 13, maxScore: 15, title: 'Perfil Ideal', icon: 'fas fa-rocket text-green-400', description: 'Perfil ideal para Segurança da Informação!' },
      { minScore: 9, maxScore: 12, title: 'Potencial de Crescimento', icon: 'fas fa-lightbulb text-yellow-400', description: 'Boa afinidade, com potencial de crescimento.' },
      { minScore: 6, maxScore: 8, title: 'Exigirá Dedicação', icon: 'fas fa-tools text-blue-400', description: 'Pode seguir, mas exigirá dedicação técnica intensa.' },
      { minScore: 0, maxScore: 5, title: 'Ponto de Reflexão', icon: 'fas fa-compass text-red-400', description: 'Talvez outra área da TI combine melhor com seu estilo.' },
    ],
  },
  {
    slug: 'porta-4-governanca-e-riscos',
    title: 'Porta 4: Governança',
    subtitle: 'Você Tem o Perfil para Governança de TI?',
    description: 'Avalie se sua capacidade de organização, visão estratégica e habilidade para criar processos se encaixam na área de GRC.',
    icon: 'fas fa-sitemap',
    sections: [
      {
        title: 'Perfil de Organização e Estratégia',
        questions: [
          'Gosto de criar padrões e processos que melhoram a organização.',
          'Tenho facilidade em seguir e propor normas e boas práticas.',
          'Me interessa entender como decisões de TI impactam o negócio.',
          'Consigo pensar de forma preventiva para evitar problemas.',
          'Gosto de investigar a origem dos problemas e estruturar soluções.',
        ],
      },
      {
        title: 'Comunicação e Liderança',
        questions: [
          'Gosto de trabalhar com diferentes setores e alinhar expectativas.',
          'Consigo atuar como mediador em situações de conflito entre áreas.',
          'Acredito que regras bem definidas tornam o trabalho mais produtivo.',
          'Sei lidar com cobranças formais e relatórios estruturados.',
          'Tenho interesse em melhorar processos e elevar a qualidade geral.',
        ],
      },
      {
        title: 'Propósito e Impacto',
        questions: [
          'Me interesso por certificações e padrões reconhecidos.',
          'Acredito que tecnologia sem governança é como uma cidade sem leis.',
          'Quero ajudar empresas a crescerem com responsabilidade e segurança.',
          'Gosto de pensar em riscos e prevenções antes de agir.',
          'Vejo valor em fazer a tecnologia ser percebida como estratégica.',
        ],
      },
    ],
    results: [
      { minScore: 13, maxScore: 15, title: 'Perfil Ideal', icon: 'fas fa-rocket text-green-400', description: 'Perfil ideal para Governança, Compliance e Riscos!' },
      { minScore: 9, maxScore: 12, title: 'Boa Afinidade', icon: 'fas fa-lightbulb text-yellow-400', description: 'Boa afinidade — com formação e prática, pode se destacar.' },
      { minScore: 6, maxScore: 8, title: 'Potencial a Explorar', icon: 'fas fa-tools text-blue-400', description: 'Potencial existe, mas talvez prefira algo mais flexível ou técnico.' },
      { minScore: 0, maxScore: 5, title: 'Ponto de Reflexão', icon: 'fas fa-compass text-red-400', description: 'Talvez outra porta combine melhor com seu estilo.' },
    ],
  },
  {
    slug: 'porta-5-dados-e-bi',
    title: 'Porta 5: Dados e BI',
    subtitle: 'Você Tem o Perfil para Dados e BI?',
    description: 'Descubra se sua curiosidade investigativa e sua paixão por encontrar respostas em números são ideais para a área de dados.',
    icon: 'fas fa-chart-bar',
    sections: [
      {
        title: 'Perfil Técnico',
        questions: [
          'Gosto de entender como as informações se conectam.',
          'Sinto prazer em trabalhar com números e padrões.',
          'Me interesso por criar relatórios e gráficos.',
          'Tenho curiosidade sobre como os dados influenciam negócios.',
          'Gosto de investigar até encontrar causas ocultas.',
        ],
      },
      {
        title: 'Perfil Comportamental',
        questions: [
          'Sou paciente e detalhista.',
          'Aceito bem críticas construtivas.',
          'Organizo informações de forma lógica.',
          'Não me importo em revisar até estar correto.',
          'Tenho disciplina para estudar ferramentas técnicas.',
        ],
      },
      {
        title: 'Curiosidade e Impacto',
        questions: [
          'Vejo valor onde outros ignoram dados.',
          'Me interesso por estatística, economia ou tecnologia.',
          'Tenho curiosidade sobre IA e Machine Learning.',
          'Gosto de buscar soluções escondidas nos dados.',
          'Quero usar dados para causar impacto positivo.',
        ],
      },
    ],
    results: [
      { minScore: 13, maxScore: 15, title: 'Perfil Ideal', icon: 'fas fa-rocket text-green-400', description: 'Perfil ideal para Dados e BI!' },
      { minScore: 9, maxScore: 12, title: 'Boa Afinidade', icon: 'fas fa-lightbulb text-yellow-400', description: 'Boa afinidade, mas precisa fortalecer.' },
      { minScore: 6, maxScore: 8, title: 'Exigirá Preparação', icon: 'fas fa-tools text-blue-400', description: 'Pode atuar, mas terá que se preparar bastante.' },
      { minScore: 0, maxScore: 5, title: 'Ponto de Reflexão', icon: 'fas fa-compass text-red-400', description: 'Talvez outra porta da tecnologia combine melhor com seus talentos naturais.' },
    ],
  },
  {
    slug: 'porta-6-educacao-e-engajamento',
    title: 'Porta 6: Educação',
    subtitle: 'Você tem Perfil para Educação e Suporte?',
    description: 'Avalie se sua paciência, empatia e prazer em ensinar são a combinação perfeita para as áreas de suporte e treinamento.',
    icon: 'fas fa-chalkboard-teacher',
    sections: [
      {
        title: 'Ensino e Atendimento',
        questions: [
          'Gosto de explicar conceitos para outras pessoas.',
          'Sinto satisfação ao ver alguém aprender algo novo.',
          'Consigo ser paciente mesmo quando o outro tem dificuldade.',
          'Me sinto motivado ajudando pessoas a resolver problemas.',
          'Tenho empatia com quem não entende de tecnologia.',
        ],
      },
      {
        title: 'Perfil Comportamental',
        questions: [
          'Sei adaptar minha linguagem para diferentes perfis de pessoas.',
          'Tenho prazer em criar guias, FAQs ou manuais.',
          'Acredito que feedback negativo é uma oportunidade de melhoria.',
          'Consigo lidar com clientes irritados de forma profissional.',
          'Me preocupo em documentar o que aprendo para ajudar outros.',
        ],
      },
      {
        title: 'Perfil de Evolução Contínua',
        questions: [
          'Vejo valor em orientar e capacitar pessoas para serem mais independentes.',
          'Consigo explicar tanto o “como” quanto o “porquê” das coisas.',
          'Gosto de estudar novos produtos e tecnologias para ensinar melhor.',
          'Me sinto confortável aprendendo ferramentas de atendimento.',
          'Sinto orgulho em tornar a vida dos outros mais fácil através da tecnologia.',
        ],
      },
    ],
    results: [
      { minScore: 13, maxScore: 15, title: 'Perfil Ideal', icon: 'fas fa-rocket text-green-400', description: 'Perfil ideal para Educação e Suporte!' },
      { minScore: 9, maxScore: 12, title: 'Boa Afinidade', icon: 'fas fa-lightbulb text-yellow-400', description: 'Boa afinidade, com potencial de desenvolvimento.' },
      { minScore: 6, maxScore: 8, title: 'Exigirá Desenvolvimento', icon: 'fas fa-tools text-blue-400', description: 'Pode atuar, mas precisará desenvolver habilidades fundamentais.' },
      { minScore: 0, maxScore: 5, title: 'Ponto de Reflexão', icon: 'fas fa-compass text-red-400', description: 'Talvez outra porta da TI combine melhor com seus talentos naturais.' },
    ],
  },
   {
    slug: 'porta-7-comercial-e-produto',
    title: 'Porta 7: Produto',
    subtitle: 'Você tem Perfil para Comercial e Produto em TI?',
    description: 'Descubra se sua habilidade de comunicação, visão de negócios e interesse em criar soluções de valor se alinham a Vendas e Produto.',
    icon: 'fas fa-bullhorn',
    sections: [
      {
        title: 'Perfil Comercial',
        questions: [
          'Gosto de conversar e entender as necessidades de outras pessoas.',
          'Tenho facilidade em explicar ideias de forma clara.',
          'Consigo lidar com rejeições sem desanimar.',
          'Gosto de desafios e metas.',
          'Me interesso por aprender sobre negócios e mercados.',
        ],
      },
      {
        title: 'Perfil de Produto',
        questions: [
          'Me interessa entender como um produto é criado.',
          'Gosto de organizar ideias em projetos e etapas.',
          'Consigo ver tanto o detalhe quanto o todo.',
          'Gosto de trabalhar com diferentes equipes (TI, marketing, vendas).',
          'Tenho interesse em descobrir como melhorar experiências de usuários.',
        ],
      },
      {
        title: 'Evolução e Curiosidade',
        questions: [
          'Me sinto motivado a construir algo que ajude muitas pessoas.',
          'Tenho interesse em dados e resultados para tomar decisões.',
          'Me atualizo sobre novas tecnologias e tendências de mercado.',
          'Gosto de pensar em estratégias para resolver problemas.',
          'Vejo vendas e produtos como oportunidades de transformação.',
        ],
      },
    ],
    results: [
      { minScore: 13, maxScore: 15, title: 'Perfil Ideal', icon: 'fas fa-rocket text-green-400', description: 'Perfil ideal para Comercial e Produto em TI!' },
      { minScore: 9, maxScore: 12, title: 'Boa Afinidade', icon: 'fas fa-lightbulb text-yellow-400', description: 'Boa afinidade, com potencial de desenvolvimento.' },
      { minScore: 6, maxScore: 8, title: 'Exigirá Aprimoramento', icon: 'fas fa-tools text-blue-400', description: 'Pode atuar, mas exigirá foco em aprimoramento de habilidades.' },
      { minScore: 0, maxScore: 5, title: 'Ponto de Reflexão', icon: 'fas fa-compass text-red-400', description: 'Talvez outra porta da tecnologia combine melhor com seus talentos naturais.' },
    ],
  },
];