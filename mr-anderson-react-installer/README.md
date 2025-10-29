# Guia de Configuração do Conteúdo - Mr. Anderson WordPress

Este guia detalha todos os passos para configurar o conteúdo do site Mr. Anderson usando o painel do WordPress, com foco no plugin **Advanced Custom Fields (ACF)**. Siga estas instruções cuidadosamente para garantir que o front-end React exiba todas as informações corretamente.

**Requisito Essencial:** Instale e ative o plugin gratuito [Advanced Custom Fields (ACF)](https://wordpress.org/plugins/advanced-custom-fields/) antes de começar.

---

## 1. Configurações Gerais do Site (Usando uma Página)

Como a versão gratuita do ACF não possui "Options Page", vamos usar uma página normal para as configurações globais.

1.  No painel do WordPress, vá em **Páginas > Adicionar Nova**.
2.  Crie uma página com o título `Configurações do Site` e defina sua visibilidade como **Privada**. Anote o ID desta página (você pode vê-lo na URL ao editar, ex: `post.php?post=16...`).
3.  No arquivo `mr-anderson-react-installer.php`, insira o ID da página na constante `MRA_SETTINGS_PAGE_ID`.
4.  No painel do WordPress, vá para **ACF > Grupos de Campos** e clique em **"Adicionar Novo"**.
5.  **Nome do Grupo:** `Configurações do Site`
6.  **Adicione os seguintes campos:**
    *   **Links de Redes Sociais**
        *   `linkedin` (Tipo: URL)
        *   `instagram` (Tipo: URL)
        *   `spotify` (Tipo: URL)
        *   `youtube` (Tipo: URL)
    *   **Dados da Página de Palestras**
        *   `speaking_page_title` (Tipo: Texto) - Ex: "Palestras, Treinamentos e Mentorias"
        *   `speaking_page_description` (Tipo: Área de Texto) - Ex: "Leve para sua empresa..."
        *   `speaking_featured_video_id` (Tipo: Texto) - Ex: "LXb3EKWsInQ" (Apenas o ID do vídeo do YouTube)
        *   `speaking_featured_image_url` (Tipo: URL) - Ex: "https://.../imagem.jpg" (Use se não tiver vídeo)
7.  Em **Regras de Localização**, configure para `Página` | `é igual a` | `Configurações do Site`.
8.  Salve o grupo de campos.
9.  Agora, vá em **Páginas**, edite a página "Configurações do Site" e preencha os links e textos.

---

## 2. Configuração dos Tipos de Conteúdo

Para cada seção do site (Projetos, Livros, etc.), você precisa criar um "Grupo de Campos" no ACF para que os campos de edição apareçam no painel.

### A. Projetos

1.  Crie um novo Grupo de Campos no ACF chamado `Dados do Projeto`.
2.  **Adicione os campos:**
    *   `name` (Tipo: Texto)
    *   `description` (Tipo: Área de Texto)
    *   `link` (Tipo: URL)
    *   `icon` (Tipo: Texto) - Ex: `fas fa-chart-line` (Use classes do Font Awesome)
    *   `imageurl` (Tipo: URL da Imagem)
3.  **Localização:** `Tipo de Post` | `é igual a` | `Projeto`.
4.  Salve e vá para a seção **Projetos** no menu para adicionar seu conteúdo.

### B. Tópicos de Palestra

1.  Crie um novo Grupo de Campos no ACF chamado `Dados do Tópico de Palestra`.
2.  **Adicione os campos:**
    *   `title` (Tipo: Texto)
    *   `description` (Tipo: Área de Texto)
3.  **Localização:** `Tipo de Post` | `é igual a` | `Tópico de Palestra`.
4.  Salve e vá para a seção **Tópicos de Palestra** para adicionar os temas.

### C. Eventos da Timeline (Página Sobre)

1.  Crie um novo Grupo de Campos no ACF chamado `Dados do Evento da Timeline`.
2.  **Adicione os campos:**
    *   `year` (Tipo: Texto) - Ex: "2023" ou "2020 - Hoje"
    *   `title` (Tipo: Texto)
    *   `description` (Tipo: Área de Texto)
    *   `icon` (Tipo: Texto) - Ex: `fas fa-rocket` (Use classes do Font Awesome)
3.  **Localização:** `Tipo de Post` | `é igual a` | `Evento da Timeline`.
4.  Salve e vá para a seção **Eventos da Timeline** para adicionar os marcos da sua carreira.

### D. Depoimentos

1.  Crie um novo Grupo de Campos no ACF chamado `Dados do Depoimento`.
2.  **Adicione os campos:**
    *   `quote` (Tipo: Área de Texto) - A citação do depoimento.
    *   `author` (Tipo: Texto) - Nome da pessoa.
    *   `role` (Tipo: Texto) - Cargo/Empresa da pessoa.
3.  **Localização:** `Tipo de Post` | `é igual a` | `Depoimento`.
4.  Salve e vá para **Depoimentos** para adicionar o feedback.

### E. Livros (Landing Page Detalhada)

Este é o mais complexo. Como o ACF gratuito não tem o campo "Repetidor", usaremos "Área de Texto" com uma formatação específica.

1.  Crie um novo Grupo de Campos no ACF chamado `Dados do Livro`.
2.  **Adicione os campos (siga os nomes e tipos exatamente):**
    *   `title` (Texto)
    *   `summary` (Área de Texto)
    *   `cover_image_url` (URL da Imagem)
    *   `page_title` (Texto) - Título que aparece na aba do navegador.
    *   `page_description` (Área de Texto) - Descrição para SEO.
    *   `amazon_link` (URL)
    *   `hero_headline` (Área de Texto)
    *   `hero_subheadline` (Área de Texto)
    *   `hero_cta_text` (Texto)
    *   `youtube_video_id` (Texto) - Opcional, apenas o ID do vídeo.
    *   `problem_statement` (Área de Texto)
    *   `empathy_statement` (Área de Texto)
    *   `author_image_url` (URL da Imagem)
    *   `author_name` (Texto)
    *   `author_bio` (Tipo: **Área de Texto**) - *Instrução: Coloque cada item da biografia em uma nova linha.*
    *   `author_quote` (Área de Texto)
    *   `benefits_title` (Texto)
    *   `benefits` (Tipo: **Área de Texto**) - *Instrução: Cada item em uma nova linha, com partes separadas por ponto e vírgula. Formato: `icone;titulo;descricao`*
    *   `testimonials_title` (Texto)
    *   `testimonials` (Tipo: **Área de Texto**) - *Instrução: Cada item em uma nova linha. Formato: `citacao;autor;cargo`*
    *   `offer_price` (Texto) - Ex: "R$ 49,90"
    *   `offer_cta_text` (Texto)
    *   `bonus` (Tipo: **Grupo**)
        *   Sub-campo 1: `title` (Texto)
        *   Sub-campo 2: `description` (Área de Texto)
    *   `final_cta_title` (Texto)
    *   `final_cta_button_text` (Texto)
    *   `guarantee_text` (Texto)
3.  **Localização:** `Tipo de Post` | `é igual a` | `Livro`.
4.  Salve e vá para **Livros** para cadastrar seu livro com todos os detalhes.

---

## 3. Conteúdo da Área Exclusiva

### A. Vídeos Exclusivos

1.  Crie um novo Grupo de Campos no ACF chamado `Dados do Vídeo Exclusivo`.
2.  **Adicione o campo:**
    *   `youtube_video_id` (Tipo: Texto) - Ex: "LXb3EKWsInQ" (Apenas o ID do vídeo).
3.  **Localização:** `Tipo de Post` | `é igual a` | `Vídeo Exclusivo`.
4.  Salve.
5.  Para adicionar um vídeo:
    *   Vá para **Vídeos Exclusivos > Adicionar Novo**.
    *   O **título** do post será o título do vídeo.
    *   A **descrição** do post (editor principal) será a descrição do vídeo.
    *   Defina uma **Imagem Destacada** para a miniatura do vídeo.
    *   Preencha o campo `youtube_video_id`.

### B. Perguntas da Comunidade

1.  Crie um novo Grupo de Campos no ACF chamado `Dados da Pergunta da Comunidade`.
2.  **Adicione os campos:**
    *   `author_name` (Tipo: Texto) - O nome do autor (preenchido automaticamente).
    *   `status` (Tipo: **Seleção**)
        *   Escolhas: `pending` : `Aguardando`, `answered` : `Respondida`.
    *   `answer_text` (Tipo: Área de Texto) - Sua resposta em texto.
    *   `answer_youtube_video_id` (Tipo: Texto) - Opcional, ID do vídeo de resposta.
3.  **Localização:** `Tipo de Post` | `é igual a` | `Pergunta da Comunidade`.
4.  Salve.
5.  Quando um usuário envia uma pergunta, um novo post é criado como "rascunho" em **Perguntas da Comunidade**.
    *   Edite o post, mude o status para "Publicado".
    *   Preencha os campos de resposta (`answer_text`, etc.).
    *   Atualize para que a resposta apareça no site.

---

## 4. Configuração do Menu Principal

Para que o menu do site seja gerenciável pelo WordPress, siga estes passos:

1.  No painel do WordPress, vá para **Aparência > Menus**.
2.  Clique em **"criar um novo menu"**.
3.  **IMPORTANTE:** No campo "Nome do menu", digite exatamente `primary_api_menu`.
4.  Adicione as páginas desejadas ao menu (Home, Sobre, Livros, etc.).
5.  Clique em **"Salvar menu"**.

O React irá buscar automaticamente os itens deste menu específico.