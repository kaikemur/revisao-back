import 'dotenv/config';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

// 1. Instancie o Pool e o Adapter ANTES de tudo
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// 2. Agora defina a variável 'prisma' globalmente para o arquivo
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Iniciando seed de Foods...');

    // O modelo deve ser exatamente 'food' (como no seu schema)
    await prisma.food.createMany({
        data: [
            {
                nome: 'Hambúrguer de Costela',
                descricao: 'Pão brioche, costela desfiada e maionese de ervas',
                ano: 2024,
                category: 'Lanches',
                avaliable: true,
            },
            {
                nome: 'Vinho Tinto Reserva',
                descricao: 'Notas de frutas vermelhas e carvalho',
                ano: 2021,
                category: 'Bebidas',
                avaliable: true,
            },
            {
                nome: 'Vinho rose',
                descricao: 'Notas de rosa vermelhas e cravos',
                ano: 2021,
                category: 'Bebidas',
                avaliable: true,
            }
        ],
    });

    console.log('✅ Seed de foods concluído com sucesso!');
}

main()
    .catch((e) => {
        console.error('❌ Erro durante o seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        // Importante fechar a conexão
        await prisma.$disconnect();
    });
