# 🎬 StreamCatalog - Catálogo de Filmes e Séries

Um site moderno e responsivo para explorar filmes e séries com dados em tempo real do The Movie Database (TMDB).

## ✨ Características

- 🎯 **Catálogo Completo**: Filmes populares, em cartaz, próximos lançamentos e mais bem avaliados
- 🔍 **Busca Avançada**: Pesquise por título, gênero, ano de lançamento
- 🎭 **Detalhes Completos**: Sinopse, elenco, diretor, trailer e avaliações
- 📱 **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- 🎨 **Interface Moderna**: Design inspirado em plataformas de streaming populares
- ⚡ **Performance Otimizada**: Carregamento rápido com lazy loading de imagens

## 🚀 Como Configurar

### 1. Obter Chave da API do TMDB

1. **Acesse o site do TMDB**: [https://www.themoviedb.org/](https://www.themoviedb.org/)

2. **Crie uma conta gratuita**:
   - Clique em "Junte-se ao TMDB"
   - Preencha os dados solicitados
   - Confirme seu email

3. **Solicite uma chave de API**:
   - Faça login na sua conta
   - Vá em **Configurações** (Settings)
   - Clique em **API**
   - Clique em **Criar** (Create)
   - Escolha **Developer** (para uso pessoal/educacional)
   - Preencha as informações:
     - **Tipo de Aplicação**: Website
     - **Nome da Aplicação**: StreamCatalog (ou qualquer nome)
     - **URL da Aplicação**: http://localhost (para desenvolvimento local)
     - **Resumo da Aplicação**: Site de catálogo de filmes e séries
   - Aceite os termos de uso
   - Clique em **Enviar**

4. **Copie sua chave de API**:
   - Após aprovação (geralmente instantânea), você receberá uma **API Key (v3 auth)**
   - Copie esta chave

### 2. Configurar o Projeto

1. **Edite o arquivo `script.js`**:
   - Abra o arquivo `script.js`
   - Na linha 2, substitua `'SUA_CHAVE_API_AQUI'` pela sua chave da API:
   ```javascript
   const API_KEY = 'sua_chave_api_real_aqui';
   ```

### 3. Fazer Deploy Online

#### Opção 1: GitHub Pages (Recomendado)

1. Crie um repositório no GitHub
2. Faça upload dos arquivos do projeto
3. Vá para Settings > Pages
4. Selecione "Deploy from a branch" e escolha "main"
5. Seu site estará disponível em: `https://seuusuario.github.io/nome-do-repositorio`

#### Opção 2: Netlify

1. Acesse [Netlify](https://www.netlify.com/)
2. Arraste a pasta do projeto para o deploy
3. Seu site estará online em poucos segundos

#### Opção 3: Vercel

1. Acesse [Vercel](https://vercel.com/)
2. Conecte seu repositório GitHub
3. Deploy automático será feito

### 4. Executar Localmente

1. **Abra o site**:
   - Abra o arquivo `index.html` no seu navegador
   - Ou use um servidor local:
   ```bash
   # Com Python
   python -m http.server 8000
   
   # Com Node.js (http-server)
   npx http-server
   
   # Com Live Server (extensão do VS Code)
   # Clique com botão direito no index.html > Open with Live Server
   ```

## 📁 Estrutura do Projeto

```
streaming/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
└── README.md           # Este arquivo
```

## 🎯 Funcionalidades Implementadas

### ✅ Concluído
- [x] Interface principal com design moderno
- [x] Integração com API do TMDB
- [x] Exibição de filmes populares
- [x] Filmes em cartaz no cinema
- [x] Próximos lançamentos
- [x] Filmes mais bem avaliados
- [x] Sistema de busca por título
- [x] Filtros por gênero e ano
- [x] Modal com detalhes completos dos filmes
- [x] Links para trailers no YouTube
- [x] Design responsivo
- [x] Animações e transições suaves
- [x] Lazy loading de imagens
- [x] Botão "voltar ao topo"

## 🎬 Seções do Site

### 🏠 Página Inicial
- Hero section com apresentação
- Filtros interativos
- Grid de filmes com paginação

### 🎭 Detalhes do Filme
- Poster e backdrop em alta qualidade
- Informações completas (ano, duração, gêneros, diretor, elenco)
- Sinopse detalhada
- Avaliação do TMDB
- Link para trailer (quando disponível)

### 🔍 Sistema de Busca
- Busca por título em tempo real
- Filtros por:
  - Categoria (Popular, Em Cartaz, Próximos, Mais Bem Avaliados)
  - Gênero (Ação, Comédia, Drama, etc.)
  - Ano de lançamento (1970 até presente)

## 🎨 Design e UX

- **Tema Escuro**: Inspirado em plataformas de streaming
- **Cores**: Vermelho (#e50914) como cor principal, similar ao Netflix
- **Tipografia**: Segoe UI para melhor legibilidade
- **Animações**: Transições suaves e efeitos hover
- **Responsividade**: Adaptável a todos os tamanhos de tela

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Flexbox, Grid, animações, gradientes
- **JavaScript ES6+**: Fetch API, async/await, DOM manipulation
- **Font Awesome**: Ícones
- **TMDB API**: Dados de filmes e séries

## 📱 Responsividade

O site é totalmente responsivo e funciona em:
- 🖥️ **Desktop**: Layout completo com sidebar
- 📱 **Mobile**: Layout otimizado para toque
- 📟 **Tablet**: Layout adaptado para telas médias

## 🚀 Melhorias Futuras

- [ ] Sistema de favoritos (localStorage)
- [ ] Histórico de visualizações
- [ ] Recomendações personalizadas
- [ ] Integração com mais APIs de streaming
- [ ] Sistema de avaliações dos usuários
- [ ] Modo claro/escuro
- [ ] Suporte a séries de TV
- [ ] PWA (Progressive Web App)

## 📄 Licença

Este projeto é para fins educacionais e usa a API gratuita do TMDB. Respeite os termos de uso do TMDB.

## 🤝 Contribuições

Sinta-se à vontade para contribuir com melhorias, correções de bugs ou novas funcionalidades!

---

**Desenvolvido com ❤️ usando a API do The Movie Database (TMDB)**

*Este produto usa a API do TMDB, mas não é endossado ou certificado pelo TMDB.*