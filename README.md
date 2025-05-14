# 🏋️ WorkGym - Onde esforço vira resultado! 💪

## 📜 Descrição

O WorkGym é um projeto de estudo que simula uma API RESTful e aplicações frontend (mobile e web) para um sistema de academia. Desenvolvido com foco no aprendizado e aplicação de tecnologias modernas, o projeto abrange desde o backend robusto com Java e Spring Boot, passando por um aplicativo mobile intuitivo com Flutter, até uma interface web dinâmica com Next.js. A ideia central é demonstrar a integração dessas tecnologias para criar uma solução completa, mesmo que em um escopo de estudo, onde "esforço vira resultado!".


## 🚀 Tecnologias Utilizadas

**Backend (Java / Spring Boot):**
*   ⚡ Java 21 - Linguagem de programação principal
*   🔥 Spring Boot 3.4.5 - Framework para desenvolvimento backend
*   🌐 Spring Boot Starter Web - Para criação da API REST
*   💾 Spring Boot Starter Data JPA - Para interação com o banco de dados
*   🐘 PostgreSQL - Banco de dados relacional
*   ✅ Spring Boot Starter Validation - Validação de dados
*   🔒 Spring Boot Starter Security - Para segurança da aplicação
*   🔑 com.auth0:java-jwt 4.5.0 - Para manipulação de JSON Web Tokens (JWT)
*   📄 Lombok - Para reduzir código boilerplate
*   🛠️ Spring Boot DevTools - Ferramentas de desenvolvimento
*   📦 Maven - Gerenciador de dependências e build

**Mobile (Flutter):**
*   📱 Flutter SDK 3.7.2 - Framework para desenvolvimento mobile multiplataforma
*   🎯 Dart - Linguagem de programação para Flutter
*   🧱 Provider ^6.1.5 - Gerenciamento de estado
*   🔗 http ^1.4.0 - Para requisições HTTP
*   ✔️ validatorless ^1.2.4 - Para validações de formulários
*   📝 shared_preferences ^2.5.3 - Para armazenamento local de dados simples
*   👤 flutter_signin_button ^2.0.0 - Botões de login social
*   🖋️ google_fonts ^6.2.1 - Fontes customizadas
*   🎨 cupertino_icons ^1.0.8 - Ícones no estilo iOS
*   🖼️ Assets (imagens) - Para logos e elementos visuais

**Web (Next.js):**
*   💻 Next.js 15.3.2 - Framework para desenvolvimento web com React
*   ⚛️ React 19 - Biblioteca JavaScript para construção de interfaces
*   🔷 TypeScript 5 - Superset do JavaScript com tipagem estática
*   💨 Tailwind CSS 4 - Framework CSS utility-first
*   🧩 @tabler/icons-react ^3.31.0 & lucide-react ^0.510.0 - Bibliotecas de ícones
*   🔄 Axios ^1.9.0 - Cliente HTTP para requisições
*   🍪 js-cookie ^3.0.5 - Manipulação de cookies
*   ☀️ next-themes ^0.4.6 - Gerenciamento de temas (claro/escuro)
*   📢 sonner ^2.0.3 - Para notificações
*   ✨ clsx ^2.1.1 & tailwind-merge ^3.3.0 - Utilitários para classes CSS
*   📜 ESLint ^9 - Ferramenta de linting para JavaScript e TypeScript
*   📦 npm/yarn - Gerenciadores de pacotes Node.js



## 🛠️ Configuração do Ambiente

1️⃣ **Requisitos Gerais**

Antes de iniciar, garanta que você tem instalado:
*   🔗 Git

2️⃣ **Backend (Java / Spring Boot)**

*   ☕ JDK 21 ou superior
*   🏗️ Maven

3️⃣ **Mobile (Flutter)**

*   📱 Flutter SDK (versão 3.7.2 ou compatível)
*   🎯 Dart SDK (embutido no Flutter SDK)
*   ⚙️ Android Studio (com plugins Flutter e Dart) ou Visual Studio Code (com extensões Flutter e Dart)

4️⃣ **Web (Next.js)**

*   🟢 Node.js (versão 20 ou superior recomendada)
*   📦 npm (geralmente incluído com Node.js) ou yarn

5️⃣ **Clonar o Repositório**

Como este é um projeto de estudo e o repositório não foi especificado, você precisará clonar o projeto do local onde ele estiver hospedado. Exemplo:

```bash
git clone <URL_DO_REPOSITORIO_WORKGYM>
cd workgym
```

6️⃣ **Configurar e Executar o Backend (Spring Boot)**

O backend Spring Boot geralmente pode ser executado diretamente após a importação do projeto em uma IDE compatível (como IntelliJ IDEA ou Eclipse) ou via linha de comando com Maven. Assumindo que o projeto está configurado para usar PostgreSQL, certifique-se de ter uma instância do PostgreSQL rodando e configurada no `application.properties` (ou `application.yml`).

```bash
# Navegue até o diretório do backend
cd caminho/para/backend-workgym
mvn spring-boot:run
```
A API estará acessível em: `http://localhost:8080` (ou a porta configurada).

7️⃣ **Configurar e Executar o Mobile (Flutter)**

Após configurar o ambiente Flutter e ter um emulador rodando ou um dispositivo conectado:

```bash
# Navegue até o diretório do mobile
cd caminho/para/mobile-workgym
flutter pub get
flutter run
```

8️⃣ **Configurar e Executar a Web (Next.js)**

```bash
# Navegue até o diretório da web
cd caminho/para/web-workgym
npm install # ou yarn install
npm run dev # ou yarn dev
```
A aplicação web estará acessível em: `http://localhost:3000` (ou a porta configurada).

## 📂 Estrutura do Projeto

A estrutura do projeto WorkGym é dividida em três componentes principais, cada um com sua organização interna típica:

**Backend (Java/Spring Boot):**
```
backend-workgym/
├── src/main/java/ais/io/workgym/
│   ├── controllers/   # Controladores REST
│   ├── dto/           # Data Transfer Objects
│   ├── entities/      # Entidades JPA
│   ├── repositories/  # Repositórios JPA
│   ├── services/      # Lógica de negócio
│   ├── config/        # Configurações (ex: Security)
│   └── WorkgymApplication.java  # Classe principal
├── src/main/resources/
│   ├── application.properties  # Configurações da aplicação
│   └── static/          # Arquivos estáticos (se houver)
│   └── templates/       # Templates (se houver)
└── pom.xml            # Dependências do Maven
```

**Mobile (Flutter):**
```
mobile-workgym/
├── lib/
│   ├── main.dart        # Ponto de entrada da aplicação
│   ├── app/
│   │   ├── core/        # Lógica central, helpers, constants
│   │   ├── models/      # Modelos de dados
│   │   ├── pages/       # Telas da aplicação
│   │   ├── repositories/ # Repositórios para acesso a dados
│   │   ├── services/    # Serviços (ex: HTTP)
│   │   └── widgets/     # Widgets reutilizáveis
├── assets/
│   └── images/        # Imagens e outros assets
└── pubspec.yaml       # Dependências e metadados do projeto
```

**Web (Next.js):**
```
web-workgym/
├── app/                 # Diretório principal da aplicação (App Router)
│   ├── (auth)/          # Rotas de autenticação
│   ├── (main)/          # Rotas principais após login
│   │   └── layout.tsx
│   │   └── page.tsx
│   └── globals.css
│   └── layout.tsx
│   └── page.tsx
├── components/          # Componentes React reutilizáveis
├── public/              # Arquivos estáticos
├── lib/                 # Funções utilitárias, hooks
├── styles/              # Estilos globais (se não usar globals.css)
├── next.config.mjs      # Configurações do Next.js
├── package.json         # Dependências e scripts
└── tsconfig.json        # Configurações do TypeScript
```

## ✅ Testes

**Backend (Java/Spring Boot):**
Para rodar os testes automatizados (JUnit, Spring Boot Starter Test, Spring Security Test):

```bash
# Navegue até o diretório do backend
cd caminho/para/backend-workgym
mvn test
```

**Mobile (Flutter):**
Para rodar os testes (flutter_test, flutter_lints):

```bash
# Navegue até o diretório do mobile
cd caminho/para/mobile-workgym
flutter test
```

**Web (Next.js):**
Para rodar os linters (ESLint) e testes (se configurados com Jest, Playwright, etc.):

```bash
# Navegue até o diretório da web
cd caminho/para/web-workgym
npm run lint
# npm run test (se houver script de teste configurado)
```

## 🤝 Contribuição

Como este é um projeto de estudo, contribuições podem não ser o foco principal. No entanto, se desejar sugerir melhorias ou correções, sinta-se à vontade para abrir uma issue ou um pull request no repositório do projeto (se disponível publicamente).

Caso queira seguir um fluxo formal de contribuição:
1.  🚀 Faça um fork do projeto
2.  🌿 Crie uma branch (`git checkout -b feature/sua-feature`)
3.  💾 Commit suas alterações (`git commit -m 'Adiciona sua nova feature'`)
4.  📤 Envie para o repositório remoto (`git push origin feature/sua-feature`)
5.  🛎️ Abra um Pull Request

## 📜 Licença

Este projeto é distribuído sob a licença MIT. Consulte o arquivo `LICENSE` (se houver no projeto) para mais informações.

## 👤 Autor

Desenvolvido como um projeto de estudo. 🚀

