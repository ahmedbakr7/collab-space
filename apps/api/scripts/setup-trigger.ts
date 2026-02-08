import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const triggerFunction = `
create or replace function public.on_auth_user_created()
returns trigger as $$
begin
  insert into public.users (id, email, name, avatar_url, created_at, updated_at)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', 'Unknown'),
    coalesce(new.raw_user_meta_data->>'avatarUrl', new.raw_user_meta_data->>'avatar_url'),
    now(),
    now()
  );
  return new;
end;
$$ language plpgsql security definer;
`;

const triggerDrop = `
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
`;

const triggerCreate = `
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.on_auth_user_created();
`;

async function main() {
  console.log('Connecting to database...');
  await prisma.$connect();

  console.log('Creating sync function...');
  await prisma.$executeRawUnsafe(triggerFunction);

  console.log('Dropping old trigger...');
  await prisma.$executeRawUnsafe(triggerDrop);

  console.log('Creating new trigger...');
  await prisma.$executeRawUnsafe(triggerCreate);

  console.log('Trigger setup complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
