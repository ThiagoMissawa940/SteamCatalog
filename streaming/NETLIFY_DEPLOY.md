# 🚀 Deploy Rápido no Netlify

## Método Mais Simples - Arrastar e Soltar

### Passo 1: Preparar os Arquivos
✅ Seus arquivos já estão prontos:
- index.html
- styles.css
- script.js
- README.md
- package.json

### Passo 2: Deploy no Netlify

1. **Acesse o Netlify**
   - Vá para: https://app.netlify.com/drop
   - OU https://www.netlify.com e clique "Deploy to Netlify"

2. **Arrastar os Arquivos**
   - Selecione TODOS os arquivos do projeto:
     - index.html
     - styles.css
     - script.js
     - README.md
     - package.json
   - Arraste para a área "Drag and drop your site output folder here"

3. **Deploy Automático**
   - Netlify fará o upload automaticamente
   - Em poucos segundos, você terá uma URL como:
   - `https://nome-aleatorio-123456.netlify.app`

### Passo 3: Configurar API Key

1. **Obter Chave TMDB**
   - Acesse: https://www.themoviedb.org
   - Crie conta gratuita
   - Vá em Settings > API
   - Solicite API Key (gratuito)
   - Copie a chave

2. **Editar o Código Online**
   - No Netlify, vá em "Site settings" > "Functions and edge"
   - OU edite localmente e faça novo upload
   - No arquivo `script.js`, linha 2:
   - Mude: `const API_KEY = 'SUA_CHAVE_API_AQUI';`
   - Para: `const API_KEY = 'sua_chave_real_aqui';`

3. **Atualizar o Site**
   - Faça upload dos arquivos novamente
   - OU use o editor online do Netlify

### Passo 4: Personalizar (Opcional)

1. **Nome Personalizado**
   - No Netlify dashboard
   - Vá em "Site settings" > "General"
   - "Change site name"
   - Escolha um nome como: `meu-catalogo-streaming`
   - URL ficará: `https://meu-catalogo-streaming.netlify.app`

2. **Domínio Próprio** (Opcional)
   - Se tiver um domínio, pode conectar
   - Vá em "Domain settings"

## ✅ Resultado Final

- ✅ Site online em poucos minutos
- ✅ URL pública para compartilhar
- ✅ HTTPS automático
- ✅ Deploy automático se conectar ao GitHub

## 🔗 Links Úteis

- **Netlify Drop**: https://app.netlify.com/drop
- **TMDB API**: https://www.themoviedb.org/settings/api
- **Documentação Netlify**: https://docs.netlify.com

## 📞 Problemas?

1. **Site não carrega filmes**: Verifique se a API key está correta
2. **Erro 404**: Certifique-se que o index.html foi enviado
3. **Layout quebrado**: Verifique se styles.css foi enviado

**Seu site estará online em menos de 5 minutos! 🎬**