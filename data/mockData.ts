import { BlogPost, Project, SpeakingTopic, TimelineEvent, Book, BookLandingPageData, NavLink, SocialLinks, SpeakingPageData } from '../types';

export const mockNavLinks: NavLink[] = [
    { name: 'Home', path: '/' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Livros', path: '/livros' },
    { name: 'Palestras', path: '/palestras' },
    { name: 'Blog', path: '/blog' },
    { name: 'Projetos', path: '/projetos' },
    { name: 'Contato', path: '/contato' },
];

export const mockSocialLinks: SocialLinks = {
    linkedin: 'https://www.linkedin.com/in/examplename/',
    instagram: 'https://www.instagram.com/examplename/',
    spotify: 'https://open.spotify.com/show/example',
    youtube: 'https://www.youtube.com/c/examplename',
};

export const mockBlogPosts: BlogPost[] = [
  {
    slug: 'ia-revolucionando-vendas',
    title: 'Como a IA está revolucionando o processo de vendas em TI',
    summary: 'A Inteligência Artificial não é mais ficção científica; é uma ferramenta poderosa que está remodelando o cenário de vendas, especialmente no setor de tecnologia.',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    category: 'Inteligência Artificial',
    publishDate: '2024-07-15',
    content: `
      <p class="mb-4">A Inteligência Artificial (IA) está transformando o mundo dos negócios de maneiras que mal podíamos imaginar há uma década. No setor de TI, onde a inovação é a moeda corrente, a IA emergiu como um divisor de águas, especialmente no processo de vendas.</p>
      <h3 class="text-2xl font-semibold mb-2 mt-6">Personalização em Escala</h3>
      <p class="mb-4">Uma das maiores contribuições da IA para as vendas é a capacidade de personalizar a abordagem em uma escala sem precedentes. Ferramentas de IA podem analisar dados de clientes em tempo real, identificar padrões de comportamento e prever necessidades futuras. Isso permite que as equipes de vendas criem propostas e comunicações altamente relevantes, aumentando significativamente as taxas de conversão.</p>
      <h3 class="text-2xl font-semibold mb-2 mt-6">Automação de Tarefas Repetitivas</h3>
      <p>Vendedores gastam uma quantidade significativa de tempo em tarefas administrativas. A IA pode automatizar muitas dessas atividades, como qualificação de leads, agendamento de reuniões e follow-ups, liberando os vendedores para se concentrarem no que fazem de melhor: construir relacionamentos e fechar negócios.</p>
    `,
  },
  {
    slug: 'o-futuro-do-trabalho-e-hibrido',
    title: 'O Futuro do Trabalho é Híbrido: Desafios e Oportunidades',
    summary: 'A pandemia acelerou a transição para modelos de trabalho flexíveis. Exploramos o que isso significa para empresas e colaboradores no longo prazo.',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    category: 'Futuro do Trabalho',
    publishDate: '2024-06-28',
    content: `
      <p class="mb-4">O modelo de trabalho híbrido, que combina dias no escritório com trabalho remoto, tornou-se a nova norma para muitas organizações. Essa mudança traz consigo um conjunto único de desafios e oportunidades.</p>
      <h3 class="text-2xl font-semibold mb-2 mt-6">Desafios da Colaboração</h3>
      <p class="mb-4">Manter uma cultura de colaboração forte quando a equipe está distribuída é um desafio. As empresas precisam investir em tecnologias que facilitem a comunicação e garantam que todos se sintam incluídos, independentemente de onde trabalham.</p>
      <h3 class="text-2xl font-semibold mb-2 mt-6">Oportunidades de Talentos</h3>
      <p>Por outro lado, o modelo híbrido abre um leque de oportunidades para a contratação de talentos, permitindo que as empresas recrutem os melhores profissionais, não importa onde eles estejam localizados. Isso aumenta a diversidade e a competitividade.</p>
    `,
  },
   {
    slug: 'blockchain-alem-das-criptomoedas',
    title: 'Blockchain: Muito Além das Criptomoedas',
    summary: 'Descubra como a tecnologia por trás do Bitcoin pode revolucionar cadeias de suprimentos, sistemas de votação e muito mais.',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    category: 'Tecnologia',
    publishDate: '2024-05-20',
    content: `
      <p class="mb-4">Quando a maioria das pessoas ouve a palavra "blockchain", elas imediatamente pensam em Bitcoin e outras criptomoedas. No entanto, a tecnologia subjacente tem o potencial de transformar indústrias inteiras de maneiras profundas e duradouras.</p>
      <h3 class="text-2xl font-semibold mb-2 mt-6">Rastreabilidade e Transparência</h3>
      <p>Na cadeia de suprimentos, por exemplo, o blockchain pode fornecer um registro imutável de cada etapa do processo, desde a origem da matéria-prima até o consumidor final. Isso aumenta a transparência, combate a falsificação e garante a qualidade dos produtos.</p>
    `,
  },
];

export const mockProjects: Project[] = [
    {
        name: 'Mister Sales',
        description: 'Uma plataforma SaaS inovadora que utiliza inteligência artificial para otimizar o processo de vendas B2B em empresas de tecnologia.',
        link: '#',
        icon: 'fas fa-chart-line'
    },
    {
        name: 'Mister Ovos',
        description: 'Um projeto audacioso que aplica tecnologia de ponta, como IoT e análise de dados, para modernizar a produção e distribuição na avicultura.',
        link: '#',
        icon: 'fas fa-egg'
    },
    {
        name: 'Podcafé Tech',
        description: 'Podcast onde converso com líderes e inovadores sobre as tendências que estão moldando o futuro da tecnologia e dos negócios no Brasil.',
        link: '#',
        icon: 'fas fa-podcast'
    }
];

export const mockSpeakingPageData: SpeakingPageData = {
  pageTitle: 'Palestras',
  pageDescription: 'Leve para sua empresa ou evento uma dose de inspiração, estratégia e insights sobre o futuro da tecnologia e dos negócios.',
  featuredVideoId: 'LXb3EKWsInQ' // Example video ID
};

export const mockSpeakingTopics: SpeakingTopic[] = [
    {
        title: 'As 7 Portas da TI: Desvendando a Carreira',
        description: 'Uma palestra baseada no meu livro, explorando os caminhos e competências essenciais para uma carreira de sucesso e propósito em tecnologia.'
    },
    {
        title: 'Vendas em TI: Do Bit ao Contrato',
        description: 'Estratégias e táticas para profissionais de tecnologia que precisam vender ideias, projetos e produtos complexos de forma eficaz.'
    },
    {
        title: 'Inovação na Prática: Como Criar Negócios que Importam',
        description: 'Minha jornada como empreendedor, compartilhando lições sobre como identificar oportunidades, validar ideias e transformar tecnologia em negócios reais.'
    },
    {
        title: 'O Futuro é Tech: Tendências que Vão Mudar Tudo',
        description: 'Uma análise profunda sobre as tecnologias emergentes (IA, Blockchain, IoT) e como elas impactarão empresas, carreiras e a sociedade.'
    }
];

export const mockTimelineEvents: TimelineEvent[] = [
    {
        year: '2005',
        title: 'Início da Carreira em TI',
        description: 'Comecei minha jornada no mundo da tecnologia, atuando como desenvolvedor e analista de sistemas em grandes corporações.',
        icon: 'fas fa-laptop-code'
    },
    {
        year: '2012',
        title: 'Transição para Liderança',
        description: 'Assumi posições de gestão, liderando equipes de alta performance em projetos complexos de transformação digital.',
        icon: 'fas fa-users'
    },
    {
        year: '2017',
        title: 'Fundação do Mister Sales',
        description: 'Dei o salto para o empreendedorismo, criando a Mister Sales para resolver um grande desafio do mercado de vendas de TI.',
        icon: 'fas fa-rocket'
    },
    {
        year: '2020',
        title: 'Lançamento de "As 7 Portas da TI"',
        description: 'Publiquei meu primeiro livro, consolidando anos de experiência em um guia prático para profissionais de tecnologia.',
        icon: 'fas fa-book-open'
    },
    {
        year: '2022',
        title: 'Expansão e Novos Projetos',
        description: 'Iniciei novos empreendimentos, como o Mister Ovos e o Podcafé Tech, diversificando minha atuação e impacto.',
        icon: 'fas fa-lightbulb'
    }
];

export const mockBooks: Book[] = [
    {
        slug: 'as-7-portas-da-ti',
        title: 'As 7 Portas da TI',
        summary: 'O guia definitivo para transformar sua carreira em TI, evitando armadilhas e construindo um caminho de sucesso e propósito.',
        coverImageUrl: 'https://picsum.photos/400/600?grayscale&random=book2',
    },
    // Futuros livros podem ser adicionados aqui
];

export const mockBookLandingPages: BookLandingPageData[] = [
  {
    slug: 'as-7-portas-da-ti',
    pageTitle: 'Livro: As 7 Portas da TI',
    pageDescription: 'O guia definitivo para transformar sua carreira em TI, escrito por Mr. Anderson.',
    amazonLink: 'https://www.amazon.com.br/',
    
    // Section 1: Hero
    heroHeadline: 'O livro que abre as 7 portas para transformar sua carreira em TI — e mostra quais você NÃO deve atravessar.',
    heroSubheadline: 'Um guia prático e direto ao ponto para navegar no complexo mundo da tecnologia, evitar armadilhas e construir uma carreira de sucesso e propósito.',
    heroCtaText: 'Quero meu exemplar agora',
    coverImageUrl: 'https://picsum.photos/400/600?grayscale&random=book2',
    youtubeVideoId: 'LXb3EKWsInQ', // Example video ID

    // Section 2: Storytelling
    problemStatement: 'Você já sentiu que está perdendo tempo com cursos, certificações e caminhos que não levam a lugar nenhum?',
    empathyStatement: 'Eu também passei por isso. Foram anos de tentativa e erro, investindo em "atalhos" que só me atrasaram. Foi essa jornada que me permitiu mapear as verdadeiras portas para o sucesso em TI.',

    // Section 3: Author
    authorImageUrl: 'https://as7portas1.websiteseguro.com/mranderson2.png',
    authorName: 'Mr. Anderson',
    authorBio: [
        'Diretor de tecnologia com mais de 20 anos de experiência.',
        'Criador dos projetos Mister Sales e Mister Ovos.',
        'Host do podcast Podcafé Tech.'
    ],
    authorQuote: 'Escrevi este livro para ser o guia que eu gostaria de ter recebido no início da minha carreira: sem enrolação, direto ao ponto e focado no que realmente gera resultado.',

    // Section 4: Benefits
    benefitsTitle: 'O que você vai encontrar no livro',
    benefits: [
        { icon: 'fas fa-map-signs', title: 'Onde investir seu tempo', description: 'Descubra quais são as áreas e habilidades que realmente importam para construir uma base sólida e se destacar no mercado.' },
        { icon: 'fas fa-door-closed', title: 'Evitar as portas erradas', description: 'Aprenda a identificar os "atalhos" que parecem bons, mas que na verdade atrasam sua carreira e seu desenvolvimento.' },
        { icon: 'fas fa-user-tie', title: 'Conquistar autoridade', description: 'Veja o passo a passo para se posicionar como um especialista, mesmo sem ter anos de experiência formal na área.' },
        { icon: 'fas fa-comments-dollar', title: 'Conectar TI e Negócios', description: 'Entenda como alinhar suas habilidades técnicas com os objetivos da empresa para gerar mais valor e ser mais reconhecido.' },
        { icon: 'fas fa-chart-line', title: 'Acelerar seu crescimento', description: 'Domine as competências comportamentais e estratégicas que diferenciam os profissionais comuns dos de alto impacto.' },
        { icon: 'fas fa-key', title: 'Destravar seu potencial', description: 'Um mapa completo para você tomar as rédeas da sua carreira e construir uma trajetória de sucesso e propósito em TI.' },
    ],

    // Section 5: Testimonials
    testimonialsTitle: 'O que os leitores estão dizendo',
    testimonials: [
        { quote: 'Um guia essencial para quem quer crescer em TI. Leitura obrigatória!', author: 'Podcafé Tech', role: 'Podcast de Tecnologia' },
        { quote: 'Claro, objetivo e cheio de insights práticos. Me ajudou a redefinir meus próximos passos na carreira.', author: 'Ana Silva', role: 'Desenvolvedora Sênior' },
        { quote: 'Finalmente um livro que fala sobre a carreira em TI de uma forma que eu consigo entender e aplicar. Recomendo!', author: 'João Costa', role: 'Estudante de Análise de Sistemas' },
    ],

    // Section 6: Offer + Bonus
    offerPrice: 'R$ 49,90',
    offerCtaText: 'Garanta seu exemplar agora',
    bonus: {
        title: 'BÔNUS EXCLUSIVO: Checklist de Carreira',
        description: 'Ao adquirir o livro hoje, você recebe um checklist digital para avaliar seu momento atual e planejar seus próximos passos na carreira de forma estratégica.',
    },
    
    // Section 7: Final CTA
    finalCtaTitle: 'Pronto para abrir as portas do seu futuro?',
    finalCtaButtonText: 'Sim, quero abrir as 7 Portas da TI e acelerar minha carreira',
    guaranteeText: 'Satisfação garantida ou seu dinheiro de volta em 7 dias.',
  }
];