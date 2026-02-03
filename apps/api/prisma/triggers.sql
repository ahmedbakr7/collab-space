-- Trigger Logic to sync Auth User to Public User
create or replace function public.on_auth_user_created()
returns trigger as $$
begin
  insert into public.users (id, email, name, avatar_url, created_at, updated_at)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', 'Unknown'),
    null, -- avatar_url MUST start as NULL
    now(),
    now()
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger on auth.users
-- Drop if exists to be idempotent
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.on_auth_user_created();
