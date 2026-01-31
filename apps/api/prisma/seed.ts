import {
  PrismaClient,
  TaskStatus,
  TaskPriority,
  Visibility,
} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Cleanup existing data (optional, but good for idempotent runs during dev)
  try {
    await prisma.attachment.deleteMany();
    await prisma.taskComment.deleteMany();
    await prisma.taskTag.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.task.deleteMany();
    await prisma.project.deleteMany();

    await prisma.workspaceMember.deleteMany();
    await prisma.workspace.deleteMany();
    await prisma.organizationMember.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.user.deleteMany();
  } catch (error) {
    console.warn(
      "Clean up failed, maybe tables don't exist yet or constraint violation without cascade.",
      error,
    );
  }

  // 1. Create Users
  const alice = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice Admin',
      passwordHash: 'hashed_password_123', // In a real app, hash this properly
    },
  });

  const bob = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      name: 'Bob Builder',
      passwordHash: 'hashed_password_456',
    },
  });

  const charlie = await prisma.user.create({
    data: {
      email: 'charlie@example.com',
      name: 'Charlie Checker',
      passwordHash: 'hashed_password_789',
    },
  });

  console.log(`Created users: ${alice.name}, ${bob.name}, ${charlie.name}`);

  // 3. Create Organization
  const org = await prisma.organization.create({
    data: {
      name: 'Acme Corp',
      description: 'A dummy organization for testing',
      visibility: Visibility.public,
      members: {
        create: [{ userId: alice.id }, { userId: bob.id }],
      },
      tags: {
        create: [
          { name: 'frontend' },
          { name: 'backend' },
          { name: 'design' },
          { name: 'marketing' },
        ],
      },
    },
    include: { tags: true },
  });

  console.log(`Created organization: ${org.name} (ID: ${org.id})`);

  // tags are returned because of `include: { tags: true }`
  const frontendTag = org.tags.find((t) => t.name === 'frontend');
  const backendTag = org.tags.find((t) => t.name === 'backend');

  // 4. Create Workspace
  const workspace = await prisma.workspace.create({
    data: {
      orgId: org.id,
      name: 'Engineering',
      description: 'Engineering team workspace',
      members: {
        create: [{ userId: alice.id }, { userId: bob.id }],
      },
    },
  });

  console.log(`Created workspace: ${workspace.name} (ID: ${workspace.id})`);

  // 5. Create Project
  const project = await prisma.project.create({
    data: {
      workspaceId: workspace.id,
      name: 'Website Redesign',
      description: 'Overhaul of the company website',
    },
  });

  console.log(`Created project: ${project.name} (ID: ${project.id})`);

  // 6. Create Tasks
  await prisma.task.create({
    data: {
      projectId: project.id,
      title: 'Design Homepage Mockups',
      description: 'Create high-fidelity mockups for the new homepage.',
      status: TaskStatus.in_progress,
      priority: TaskPriority.high,
      createdById: alice.id,
      assignedToId: bob.id,
      tags: frontendTag
        ? {
            create: { tagId: frontendTag.id },
          }
        : undefined,
      comments: {
        create: {
          userId: alice.id,
          content: 'Please make sure to follow the new brand guidelines.',
        },
      },
      dueDate: new Date(new Date().setDate(new Date().getDate() + 5)), // Due in 5 days
    },
  });

  // Ensure Charlie is in the org/workspace before assigning tasks if strict checks existed (they are in schema relations)
  await prisma.organizationMember.create({
    data: {
      orgId: org.id,
      userId: charlie.id,
    },
  });

  await prisma.workspaceMember.create({
    data: {
      workspaceId: workspace.id,
      userId: charlie.id,
    },
  });

  await prisma.task.create({
    data: {
      projectId: project.id,
      title: 'Setup CI/CD Pipeline',
      description: 'Configure GitHub Actions for automated deployment.',
      status: TaskStatus.todo,
      priority: TaskPriority.medium,
      createdById: alice.id,
      assignedToId: charlie.id,
      tags: backendTag
        ? {
            create: { tagId: backendTag.id },
          }
        : undefined,
    },
  });

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
