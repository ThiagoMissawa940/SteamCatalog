# 🚀 Guia de Deploy - Catálogo de Streaming

## Opções de Deploy Gratuito

### 1. GitHub Pages (Mais Fácil)

**Passo a passo:**

1. **Criar conta no GitHub** (se não tiver)
   - Acesse: https://github.com
   - Clique em "Sign up"

2. **Criar novo repositório**
   - Clique no "+" no canto superior direito
   - Selecione "New repository"
   - Nome: `streaming-catalog` (ou outro nome)
   - Marque "Public"
   - Clique "Create repository"

3. **Upload dos arquivos**
   - Na página do repositório, clique "uploading an existing file"
   - Arraste todos os arquivos do projeto:
     - index.html
     - styles.css
     - script.js
     - README.md
     - package.json
     - vercel.json
   - Escreva uma mensagem: "Initial commit"
   - Clique "Commit changes"

4. **Ativar GitHub Pages**
   - Vá para "Settings" (aba no topo do repositório)
   - Role para baixo até "Pages" (menu lateral)
   - Em "Source", selecione "Deploy from a branch"
   - Em "Branch", selecione "main"
   - Clique "Save"

5. **Acessar seu site**
   - Aguarde alguns minutos
   - Seu site estará em: `https://seuusuario.github.io/streaming-catalog`

### 2. Netlify (Arrastar e Soltar)

**Passo a passo:**

1. **Acessar Netlify**
   - Vá para: https://www.netlify.com
   - Clique "Sign up" (pode usar GitHub)

2. **Deploy por arrastar**
   - Na dashboard, procure "Want to deploy a new site without connecting to Git?"
   - Clique "Browse to upload"
   - Selecione TODOS os arquivos do projeto
   - Aguarde o upload

3. **Site online**
   - Netlify gerará uma URL aleatória
   - Você pode personalizar o nome em "Site settings"

### 3. Vercel (GitHub Integration)

**Passo a passo:**

1. **Primeiro, suba no GitHub** (siga passos 1-3 do GitHub Pages)

2. **Conectar ao Vercel**
   - Acesse: https://vercel.com
   - Clique "Sign up" e conecte com GitHub
   - Autorize o Vercel a acessar seus repositórios

3. **Import do projeto**
   - Clique "New Project"
   - Selecione seu repositório `streaming-catalog`
   - Clique "Import"
   - Clique "Deploy"

4. **Site online**
   - Vercel gerará uma URL
   - Deploy automático a cada commit no GitHub

## ⚠️ Importante: Configurar API Key

**Depois do deploy, você precisa:**

1. **Obter chave TMDB**
   - Acesse: https://www.themoviedb.org
   - Crie conta gratuita
   - Vá em Settings > API
   - Solicite API Key (gratuito)

2. **Configurar no código**
   - Edite o arquivo `script.js` no GitHub/repositório
   - Linha 2: `const API_KEY = 'SUA_CHAVE_AQUI';`
   - Substitua pela sua chave real
   - Commit as mudanças

3. **Site funcionando**
   - Aguarde alguns minutos para atualizar
   - Teste se os filmes aparecem

## 🔗 URLs de Exemplo

- **GitHub Pages**: `https://seuusuario.github.io/streaming-catalog`
- **Netlify**: `https://nome-aleatorio.netlify.app`
- **Vercel**: `https://streaming-catalog.vercel.app`

## 📞 Suporte

Se tiver problemas:
1. Verifique se todos os arquivos foram enviados
2. Confirme se a API key está correta
3. Teste localmente primeiro
4. Verifique o console do navegador (F12) para erros

**Boa sorte com seu deploy! 🎬**