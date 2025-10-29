// types.ts
import { BlogPost, Project, SpeakingTopic, TimelineEvent, Book, BookLandingPageData, NavLink, SocialLinks, SpeakingPageData, Testimonial, CredentialItem, MentorshipInfo } from '../types';

export const mockNavLinks: NavLink[] = [
    { name: 'Home', path: '/' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Livros', path: '/livros' },
    { name: 'Palestras', path: '/palestras' },
    { name: 'Blog', path: '/blog' },
    { name: 'Projetos', path: '/projetos' },
    { name: 'Media Kit', path: '/media-kit' },
    { name: 'Contato', path: '/contato' },
];

export const mockSocialLinks: SocialLinks = {
    linkedin: 'https://www.linkedin.com/in/andersondafonseca/',
    instagram: 'https://www.instagram.com/andersondafonseca/',
    spotify: 'https://open.spotify.com/show/0FIW4vq59iKMFgEa0DhNfF',
    youtube: 'https://www.youtube.com/@MisterAndersonFonseca',
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
        icon: 'fas fa-chart-line',
        imageUrl: 'https://picsum.photos/seed/mistersales/800/600',
    },
    {
        name: 'Mister Ovos',
        description: 'Um projeto audacioso que aplica tecnologia de ponta, como IoT e análise de dados, para modernizar a produção e distribuição na avicultura.',
        link: '#',
        icon: 'fas fa-egg',
        imageUrl: 'https://picsum.photos/seed/misterovos/800/600',
    },
    {
        name: 'Podcafé Tech',
        description: 'Podcast onde converso com líderes e inovadores sobre as tendências que estão moldando o futuro da tecnologia e dos negócios no Brasil.',
        link: 'https://podcafe.tech/',
        icon: 'fas fa-podcast',
        imageUrl: 'https://media.licdn.com/dms/image/v2/D4E22AQHcsazHcFnxjw/feedshare-shrink_1280/feedshare-shrink_1280/0/1714054575364?e=1762387200&v=beta&t=QBUOkp9xmv7RrdtlPApoc7gYR8HH-f0kl4N3Un9ArfU',
    }
];

export const mockSpeakingPageData: SpeakingPageData = {
  pageTitle: 'Palestras, Treinamentos e Mentorias',
  pageDescription: 'Leve para sua empresa ou evento uma dose de inspiração, estratégia e insights sobre o futuro da tecnologia e dos negócios.',
  featuredImageUrl: 'https://media.licdn.com/dms/image/v2/D4D22AQG6sOTEG5iwQg/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1724967384975?e=1762387200&v=beta&t=TjM4Kyi9-m5rdEylVl-ewXc7C5adw4pRNEGRYyx9hHc'
};

export const mockSpeakingTopics: SpeakingTopic[] = [
    {
        title: 'As 7 Portas da TI — desbloqueando o potencial da tecnologia',
        description: 'Como transformar a área de TI em motor de crescimento empresarial.'
    },
    {
        title: 'Do Help Desk à Estratégia',
        description: 'Como o técnico pode se tornar o protagonista da transformação digital.'
    },
    {
        title: 'Inteligência Artificial e o Futuro do Trabalho',
        description: 'O impacto real da IA na vida das pessoas e nas empresas.'
    },
    {
        title: 'Cultura de Inovação e Liderança Tecnológica',
        description: 'Como desenvolver mentalidade criativa e coragem para inovar.'
    },
    {
        title: 'Vendas Técnicas com MEDDPICC',
        description: 'Framework adaptado para quem vende soluções de TI complexas.'
    },
    {
        title: 'Motivação e Orquestração de Times Home Office',
        description: 'Como construir cultura, pertencimento e engajamento em times distribuídos, unindo propósito e tecnologia para que equipes remotas funcionem em sincronia.'
    }
];

export const mockTimelineEvents: TimelineEvent[] = [
    {
        year: 'Início dos Anos 2000',
        title: 'Fundamentos Técnicos no Brasil',
        description: 'Iniciei a carreira em diversas cidades do Brasil, atuando desde o suporte técnico e docência até a assessoria tecnológica em prefeituras, construindo uma base sólida e multifacetada.',
        icon: 'fas fa-laptop-code'
    },
    {
        year: '2007',
        title: 'Experiência Internacional: Japão',
        description: 'Em uma passagem pelo Japão, atuei com marketing e desenvolvimento de campanhas, ampliando minha visão de mercado e adaptabilidade cultural.',
        icon: 'fas fa-globe-asia'
    },
     {
        year: '2011-2013',
        title: 'Vivência na Argentina: Grandes Players',
        description: 'Residindo na Argentina, trabalhei em multinacionais como Avaya e Lufthansa, desenvolvendo habilidades em vendas e atendimento ao cliente em um ambiente global.',
        icon: 'fas fa-plane-departure'
    },
    {
        year: '2013-2024',
        title: 'Liderança em Vendas e CX',
        description: 'Uma década dedicada a construir e liderar equipes de alta performance em vendas complexas e experiência do cliente em empresas como Figo Software e ACSoftware.',
        icon: 'fas fa-users'
    },
    {
        year: '2023',
        title: 'Âncora do AC News',
        description: 'Atuei como âncora do jornal digital AC News por um ano, aprofundando minha experiência em comunicação e mídia digital para o setor de tecnologia.',
        icon: 'fas fa-tv'
    },
    {
        year: '2020 - Hoje',
        title: 'Empreendedorismo e Mídia',
        description: 'Cofundador do Podcafé Tech, um dos principais podcasts de tecnologia, e assumi o desafio como CEO da Mister Sales, aplicando IA para revolucionar vendas.',
        icon: 'fas fa-rocket'
    },
    {
        year: '2025',
        title: 'Lançamento de "As 7 Portas da TI"',
        description: 'Consolidei mais de duas décadas de experiência em um guia prático para profissionais de tecnologia, compartilhando o mapa para uma carreira de impacto.',
        icon: 'fas fa-book-open'
    },
];

export const mockBooks: Book[] = [
    {
        slug: 'as-7-portas-da-ti',
        title: 'As 7 Portas da TI',
        summary: 'O guia definitivo para transformar sua carreira em TI, evitando armadilhas e construindo um caminho de sucesso e propósito.',
        coverImageUrl: 'https://media.licdn.com/dms/image/v2/D4D22AQG0i-v0KWsSKA/feedshare-shrink_800/B4DZlUGZXcJgAk-/0/1758052589465?e=1762387200&v=beta&t=F1QyEIVqTGRewI-qAE4oiBu1qfFI6emo9VbUnf9aofc',
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
    coverImageUrl: 'https://media.licdn.com/dms/image/v2/D4D22AQG0i-v0KWsSKA/feedshare-shrink_800/B4DZlUGZXcJgAk-/0/1758052589465?e=1762387200&v=beta&t=F1QyEIVqTGRewI-qAE4oiBu1qfFI6emo9VbUnf9aofc',
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

// New data from Media Kit
export const mockTestimonials: Testimonial[] = [
    {
        quote: 'Anderson Fonseca meu amigo uma honra dividir o palco com você … Gratidão máxima',
        author: 'Felipe Prado',
        role: 'Head of Artificial Intelligence & Cyber Analytics'
    },
    {
        quote: 'Parabéns Mr Anderson Fonseca pela palestra e pelo livro! Forte Abraço!',
        author: 'Dyogo Andreatta Junqueira',
        role: 'CEO na ACS Pro e ACCyber Pro'
    },
    {
        quote: 'O treinamento de vendas trouxe para minha equipe o choque que eles precisavam, recomendo muito este trabalho',
        author: 'Rodrigo Trigo',
        role: 'CEO da Domo Soluções'
    }
];

export const mockMcEvents = [
    'HackerSec Conference (2023 e 2024)',
    'Podcafé Summit (2024)',
    'Roadshows ManageEngine Brasil',
    'Podcafé On the Road (2025)'
];

export const mockCredentials: CredentialItem[] = [
    {
        title: 'Áreas de Atuação',
        items: ['Tecnologia', 'Inovação', 'Inteligência Artificial', 'Vendas Técnicas', 'Cultura Digital', 'Liderança', 'Orquestração de Times Remotos']
    },
    {
        title: 'Formação e Credenciais',
        items: [
            'Analista de Sistemas',
            'Especialista em Gestão e Transformação Digital',
            'Especialista em Gestão de Serviços (ITSM) e Operações (ITOM)',
            'Especialista em Segurança de Acessos (IAM/PAM) e Endpoints (UEM)',
            'Criador do framework As 7 Portas da TI',
            'Criador do framework Mister Sales para vendas complexas',
            'Diretor Comercial com mais de 10 anos de experiência'
        ]
    }
];

export const mockMentorshipInfo: MentorshipInfo = {
    title: 'Mentoria para Liderança Remota',
    description: 'Programa prático e personalizado que ajuda líderes e gestores a criarem rituais de conexão, métricas de produtividade e comunicação de propósito em times híbridos.',
    topics: [
        'Criação de cultura digital genuína',
        'Comunicação empática à distância',
        'Técnicas para motivar e inspirar remotamente',
        'Ferramentas para acompanhamento e feedback não invasivo',
        'Dinâmicas de grupo online'
    ],
    result: 'Resultado: equipes mais engajadas, humanas e produtivas, mesmo fora do escritório.'
};