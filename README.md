# in.health
Estou animado para compartilhar as últimas atualizações sobre o aplicativo in.health, um projeto full stack que venho desenvolvendo.
O in.health é um aplicativo projetado para ajudar os usuários a registrar e monitorar seus hábitos diários, estabelecendo metas e objetivos de saúde personalizados. Com uma interface intuitiva, o aplicativo permite que os usuários:
Registro de Hábitos: Adicione e acompanhe diversos hábitos, como alimentação, exercícios e sono, permitindo uma visualização clara do progresso ao longo do tempo.
Definição de Metas: Estabeleça metas pessoais adaptadas a cada hábito, facilitando o foco e a motivação no caminho para uma vida mais saudável.
Análises e Relatórios: Receba relatórios detalhados sobre o progresso dos hábitos e a evolução das metas, proporcionando uma visão clara dos avanços e áreas que precisam de atenção.
Notificações e Lembretes: Receba lembretes personalizados para manter os hábitos em dia e garantir que os objetivos sejam atingidos de forma consistente.
Interface Responsiva: Acesse o aplicativo de diferentes dispositivos, garantindo que os usuários possam registrar seus hábitos e consultar seus dados a qualquer momento e em qualquer lugar.
O in.health busca empoderar os usuários a terem um controle ativo sobre sua saúde e bem-estar, promovendo um estilo de vida equilibrado e saudável.


Recentemente, concluí o backend, a parte que trouxe mais aprendizado até o momento, pois me desafiou a utilizar diversas tecnologias com as quais já estava familiarizado de maneiras novas e mais complexas.
Tecnologias Utilizadas:
Node.js e TypeScript: Utilizei essas tecnologias para construir um backend escalável, seguro e com tipagem forte, o que facilita bastante a manutenção do código.
Fastify: Escolhi este framework pela sua alta performance na criação de APIs RESTful. Embora tenha enfrentado desafios de compatibilidade entre diferentes versões, o esforço valeu a pena para garantir respostas rápidas e eficiência na comunicação entre frontend e backend.
Drizzle ORM com PostgreSQL: Para o gerenciamento de dados, usei o drizzle, que permitiu consultas SQL otimizadas, e PostgreSQL como banco de dados relacional. Também implementei migrações para gerenciar as mudanças no banco de dados de forma controlada e eficiente.
Docker: Utilizei Docker para criar um ambiente de desenvolvimento replicável, com o banco de dados PostgreSQL isolado em containers, garantindo maior segurança e flexibilidade com a configuração de variáveis de ambiente.
Zod: A validação de dados com Zod foi crucial para garantir a integridade e segurança das informações inseridas na API. Essa ferramenta se mostrou extremamente útil ao implementar tipagem e validação robustas.
Day.js: Esta biblioteca foi essencial para a manipulação de datas, sendo utilizada para criar resumos semanais e registrar metas completadas em períodos específicos.
Desafios Superados:
Consultas complexas com CTEs: Estruturei consultas SQL avançadas utilizando CTEs (Common Table Expressions) para calcular frequências e metas completadas de forma eficiente, otimizando o desempenho das operações.
Migrações e Seeds: Integrei um sistema de migrações e seeds, o que facilitou o desenvolvimento colaborativo e permitiu a manutenção do banco de dados ao longo do tempo de maneira mais organizada.
Validação de Dados: Apliquei validação robusta de dados, garantindo a segurança e consistência das informações processadas pela aplicação.
Este projeto me proporcionou uma experiência valiosa, consolidando meu conhecimento em backend e desafiando-me a encontrar soluções criativas para problemas complexos. 
agora falta construir a interface e o frontend.
