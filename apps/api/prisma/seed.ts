import {
  PrismaClient,
  TaskStatus,
  TaskPriority,
  Visibility,
  User,
  Tag,
} from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

const USERS = [
  { name: 'Alice Admin', email: 'alice@example.com', seed: 'Alice' },
  { name: 'Bob Builder', email: 'bob@example.com', seed: 'Bob' },
  { name: 'Charlie Checker', email: 'charlie@example.com', seed: 'Charlie' },
  { name: 'David Developer', email: 'david@example.com', seed: 'David' },
  { name: 'Eve Executive', email: 'eve@example.com', seed: 'Eve' },
];

const ORGS = [
  {
    name: 'Acme Corp',
    description: 'A dummy organization for testing',
    visibility: Visibility.public,
    tags: ['Engineering', 'Marketing'],
  },
  {
    name: 'Stark Industries',
    description: 'Advanced technology company',
    visibility: Visibility.private,
    tags: ['R&D', 'Manufacturing'],
  },
  {
    name: 'Wayne Enterprises',
    description: 'Conglomerate owning various businesses',
    visibility: Visibility.private,
    tags: ['Finance', 'Logistics'],
  },
  {
    name: 'Umbrella Corp',
    description: 'Pharmaceutical and biotechnology company',
    visibility: Visibility.public,
    tags: ['Biotech', 'Health'],
  },
  {
    name: 'Cyberdyne Systems',
    description: 'High-tech computer systems and robotics',
    visibility: Visibility.public,
    tags: ['AI', 'Robotics'],
  },
];

async function main() {
  console.log('Start seeding ...');

  // Cleanup existing data
  try {
    // Delete in reverse dependency order
    await prisma.attachment.deleteMany();
    await prisma.taskComment.deleteMany();
    await prisma.taskTag.deleteMany();
    await prisma.tag.deleteMany(); // Tags depend on Org
    await prisma.task.deleteMany();
    await prisma.project.deleteMany();

    await prisma.workspace.deleteMany();
    await prisma.organizationMember.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.user.deleteMany();
    console.log('Cleanup completed.');
  } catch (error) {
    console.warn(
      "Clean up failed, maybe tables don't exist yet or constraint violation without cascade.",
      error,
    );
  }

  // 1. Create Users
  const users: User[] = [];
  for (const u of USERS) {
    const user = await prisma.user.create({
      data: {
        id: randomUUID(),
        email: u.email,
        name: u.name,
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.seed}`,
      },
    });
    users.push(user);
    console.log(`Created user: ${user.name}`);
  }

  // 2. Create Organizations
  for (const orgData of ORGS) {
    const org = await prisma.organization.create({
      data: {
        name: orgData.name,
        description: orgData.description,
        visibility: orgData.visibility,
        members: {
          create: users.map((u) => ({ userId: u.id })),
        },
        tags: {
          create: orgData.tags.map((t) => ({ name: t })),
        },
      },
      include: { tags: true },
    });
    console.log(`Created organization: ${org.name} (ID: ${org.id})`);

    // 3. Create Workspaces
    for (let i = 1; i <= 3; i++) {
      const workspace = await prisma.workspace.create({
        data: {
          orgId: org.id,
          name: `${org.name} Workspace ${i}`,
          description: `Workspace ${i} for ${org.name}`,
        },
      });
      console.log(`  Created workspace: ${workspace.name}`);

      // 4. Create Projects
      for (let j = 1; j <= 2; j++) {
        const project = await prisma.project.create({
          data: {
            workspaceId: workspace.id,
            name: `${workspace.name} Project ${j}`,
            description: `Project ${j} inside ${workspace.name}`,
          },
        });
        console.log(`    Created project: ${project.name}`);

        // 5. Create Tasks
        for (let k = 1; k <= 2; k++) {
          const creator = users[Math.floor(Math.random() * users.length)];
          const assignee = users[Math.floor(Math.random() * users.length)];
          const status = Object.values(TaskStatus)[k % 3]; // Rotate status
          const priority = Object.values(TaskPriority)[k % 3]; // Rotate priority

          // Determine tags (pick 1 or 2 from org tags)
          const tagsToAssign: Tag[] = [];
          if (org.tags.length > 0) {
            const tagIndex = k % org.tags.length;
            tagsToAssign.push(org.tags[tagIndex]);
          }

          const task = await prisma.task.create({
            data: {
              projectId: project.id,
              title: `Task ${k}: ${project.name} feature`,
              description: `Description for task ${k} in project ${project.name}`,
              status: status,
              priority: priority,
              createdById: creator.id,
              assignedToId: assignee.id,
              dueDate: new Date(
                new Date().setDate(new Date().getDate() + k * 2),
              ), // Future due date
              tags: {
                create: tagsToAssign.map((t) => ({ tagId: t.id })),
              },
            },
          });

          // 6. Create Comments
          for (let m = 1; m <= 2; m++) {
            const commenter = users[Math.floor(Math.random() * users.length)];
            await prisma.taskComment.create({
              data: {
                taskId: task.id,
                userId: commenter.id,
                content: `Comment ${m} on task ${task.id} by ${commenter.name}`,
              },
            });
          }
        }
      }
    }
  }

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
