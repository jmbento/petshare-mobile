# 🐾 PetShare Mobile

Sistema completo de gestão de doações para pets - conectando doadores, coletores, centrais de distribuição e necessitados.

## 📱 Sobre o Projeto

O PetShare é um aplicativo mobile desenvolvido em React Native que facilita o processo de doação de ração e suprimentos para pets necessitados. O sistema conecta diferentes tipos de usuários em um fluxo completo:

**Doador** → **Coletor** → **Central** → **Distribuidor** → **Necessitado**

## 🚀 Tecnologias

- **React Native** com Expo
- **Supabase** (Backend, Auth, Database)
- **React Navigation** (Navegação)
- **PostgreSQL** (Banco de dados)

## 👥 Tipos de Usuários

1. **Administradores** (2) - Aprovam gestores
2. **Gestores** - Gerenciam centrais de distribuição
3. **Doadores** - Criam alertas de doação
4. **Coletores** - Buscam doações e levam para centrais
5. **Distribuidores** - Entregam aos necessitados
6. **Necessitados** - Recebem as doações
7. **Patrocinadores** - Monetizam o app

## ✨ Funcionalidades

- ✅ Login social (Google/Facebook)
- ✅ Sistema de alertas de doação
- ✅ Chat com envio de fotos
- ✅ Gestão de centrais
- ✅ Comprovação com fotos
- ✅ Área de patrocinadores
- ✅ Atualizações em tempo real

## 🎨 Design System

- **Cores principais:**
  - Azul cinza escuro (#2C3E50) - Títulos
  - Preto (#000000) - Textos
  - Cinza claro (#7F8C8D) - Placeholders
  - Laranja (#FF6B35) - Destaques
  - Vermelho (#E74C3C) - Alertas
  - Verde claro (#90EE90) - Ações completadas

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/jmbento/petshare-mobile.git
cd petshare-mobile
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (crie um arquivo `.env`):
```
SUPABASE_URL=https://rqxwednpxxmvuxaerhiq.supabase.co
SUPABASE_ANON_KEY=sua_chave_aqui
```

4. Execute o projeto:
```bash
npm start
```

## 📊 Estrutura do Banco de Dados

O schema completo está no arquivo `database_schema.sql` e inclui:

- 10 tabelas (users, donations, centers, messages, etc)
- Tipos ENUM para roles e status
- Políticas RLS (Row Level Security)
- Índices para performance
- Subscriptions em tempo real

## 📂 Estrutura do Projeto

```
petshare-mobile/
├── src/
│   ├── contexts/
│   │   └── AuthContext.js
│   ├── lib/
│   │   └── supabase.js
│   ├── navigation/
│   │   ├── AuthStack.js
│   │   └── MainStack.js
│   ├── screens/
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── HomeScreen.js
│   │   └── ProfileScreen.js
│   └── theme/
│       └── index.js
├── App.js
└── package.json
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## 📄 Licença

MIT License - veja o arquivo LICENSE para mais detalhes.

## 🎯 Roadmap

- [ ] Implementar chat com upload de fotos
- [ ] Sistema de notificações push
- [ ] Mapa de centrais e doações
- [ ] Dashboard de administração
- [ ] Sistema de gamificação
- [ ] Relatórios e estatísticas

## 💼 Criado por

**BXD.DESIGN**

---

**PetShare** - Conectando amor aos pets 🐕🐱
