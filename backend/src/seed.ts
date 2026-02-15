import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create initial admin user
  const adminPassword = await bcrypt.hash('Admin@123', 12);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@nexora.com' },
    update: {},
    create: {
      email: 'admin@nexora.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      isEmailVerified: true,
    },
  });

  console.log('Created admin user:', admin.email);

  // Create a regular test user
  const userPassword = await bcrypt.hash('User@123', 12);
  
  const user = await prisma.user.upsert({
    where: { email: 'user@nexora.com' },
    update: {},
    create: {
      email: 'user@nexora.com',
      password: userPassword,
      firstName: 'Test',
      lastName: 'User',
      role: 'USER',
      status: 'ACTIVE',
      isEmailVerified: true,
    },
  });

  console.log('Created test user:', user.email);

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
