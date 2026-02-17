/**
 * Comprehensive API Integration Test for Collab-Space
 * ====================================================
 * Tests all CRUD routes with PolicyGuard authorization.
 *
 * Usage:
 *   node apps/api/test-api.mjs
 *
 * Requires: running API server on http://localhost:3000
 */

const BASE = 'http://localhost:3000';
const TOKEN =
  'eyJhbGciOiJFUzI1NiIsImtpZCI6IjQ5ZTVmMjY2LTg0OGQtNDFiOC05NjM5LTI2NjZkNjdkMDJmMSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2RvcGZ4Y3JqdXJlZnBpZm53bmFvLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI5OTIwOGM4Mi0yNmYzLTQ1NDEtOGU0MC1hMjczMDM1MGU5NzUiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzcxMzI3MzQxLCJpYXQiOjE3NzEzMjM3NDEsImVtYWlsIjoiYWhtZWQuYmFrci5oYWZlekBob3RtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiYXZhdGFyVXJsIjoiaHR0cHM6Ly9hcGkuZGljZWJlYXIuY29tLzcueC9hdmF0YWFhcnMvc3ZnP3NlZWQ9YWhtZWQuYmFrci5oYWZleiU0MGhvdG1haWwuY29tIiwiZW1haWwiOiJhaG1lZC5iYWtyLmhhZmV6QGhvdG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IkFobWVkIEJha3IiLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInN1YiI6Ijk5MjA4YzgyLTI2ZjMtNDU0MS04ZTQwLWEyNzMwMzUwZTk3NSJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzcxMjM4MTM5fV0sInNlc3Npb25faWQiOiI3MWRiNTg1MS00N2NjLTQyYjYtODk5OC0xMzY0YzQyYWYwYTciLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ._iX7m7d2SvbNF4_J_TtLJB_RXkbllGpSIGCVLI-piRTcAPXb0zHAYk1L6oHwuMTD3DN1BbJtvk7KeLVOJwdXjQ';

// ───── Helpers ──────────────────────────────────────────

let passed = 0;
let failed = 0;
const failures = [];

async function api(method, path, body) {
  const opts = {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE}${path}`, opts);
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }
  return { status: res.status, data };
}

function assert(condition, label) {
  if (condition) {
    passed++;
    console.log(`  ✅ ${label}`);
  } else {
    failed++;
    failures.push(label);
    console.log(`  ❌ ${label}`);
  }
}

// ───── Test Suites ──────────────────────────────────────

async function testOrganizations() {
  console.log('\n═══════════════════════════════════════');
  console.log('🏢 ORGANIZATIONS');
  console.log('═══════════════════════════════════════');

  // GET all orgs (user's orgs)
  const { status: listStatus, data: orgs } = await api('GET', '/organizations');
  assert(listStatus === 200, `GET /organizations → 200 (got ${listStatus})`);
  assert(Array.isArray(orgs), `Response is an array (got ${typeof orgs})`);
  assert(orgs.length > 0, `Has at least 1 org (got ${orgs.length})`);
  console.log(`  📋 Found ${orgs.length} organizations`);

  // CREATE org
  const { status: createStatus, data: newOrg } = await api(
    'POST',
    '/organizations',
    {
      name: 'Test Org ' + Date.now(),
      description: 'Created by API test',
      visibility: 'public',
    },
  );
  assert(
    createStatus === 201,
    `POST /organizations → 201 (got ${createStatus})`,
  );
  assert(newOrg && newOrg.id, `Created org has an id`);
  const orgId = newOrg?.id;
  console.log(`  🆕 Created org: ${orgId}`);

  if (!orgId) return { orgId: orgs[0]?.id };

  // GET single org
  const { status: getStatus, data: fetchedOrg } = await api(
    'GET',
    `/organizations/${orgId}`,
  );
  assert(
    getStatus === 200,
    `GET /organizations/${orgId} → 200 (got ${getStatus})`,
  );
  assert(fetchedOrg?.id === orgId, `Fetched org id matches`);

  // UPDATE org
  const { status: updateStatus, data: updatedOrg } = await api(
    'PUT',
    `/organizations/${orgId}`,
    {
      name: 'Updated Test Org',
    },
  );
  assert(
    updateStatus === 200,
    `PUT /organizations/${orgId} → 200 (got ${updateStatus})`,
  );
  assert(updatedOrg?.name === 'Updated Test Org', `Org name updated`);

  // GET with fake id → 404
  const { status: notFound } = await api(
    'GET',
    '/organizations/00000000-0000-0000-0000-000000000000',
  );
  assert(notFound === 404, `GET non-existent org → 404 (got ${notFound})`);

  return { orgId };
}

async function testWorkspaces(orgId) {
  console.log('\n═══════════════════════════════════════');
  console.log('📁 WORKSPACES');
  console.log('═══════════════════════════════════════');

  // GET all workspaces for org
  const { status: listStatus, data: workspaces } = await api(
    'GET',
    `/organizations/${orgId}/workspaces`,
  );
  assert(
    listStatus === 200,
    `GET /organizations/${orgId}/workspaces → 200 (got ${listStatus})`,
  );
  assert(Array.isArray(workspaces), `Response is an array`);
  console.log(`  📋 Found ${workspaces?.length ?? 0} workspaces`);

  // CREATE workspace
  const { status: createStatus, data: newWs } = await api(
    'POST',
    `/organizations/${orgId}/workspaces`,
    {
      name: 'Test Workspace ' + Date.now(),
      description: 'Created by API test',
    },
  );
  assert(
    createStatus === 201,
    `POST .../workspaces → 201 (got ${createStatus})`,
  );
  assert(newWs && newWs.id, `Created workspace has an id`);
  const wsId = newWs?.id;
  console.log(`  🆕 Created workspace: ${wsId}`);

  if (!wsId) return { workspaceId: workspaces?.[0]?.id };

  // GET single workspace (flat route)
  const { status: getStatus, data: fetchedWs } = await api(
    'GET',
    `/workspaces/${wsId}`,
  );
  assert(getStatus === 200, `GET /workspaces/${wsId} → 200 (got ${getStatus})`);
  assert(fetchedWs?.id === wsId, `Fetched workspace id matches`);

  // UPDATE workspace
  const { status: updateStatus, data: updatedWs } = await api(
    'PUT',
    `/workspaces/${wsId}`,
    {
      name: 'Updated Test Workspace',
    },
  );
  assert(
    updateStatus === 200,
    `PUT /workspaces/${wsId} → 200 (got ${updateStatus})`,
  );
  assert(
    updatedWs?.name === 'Updated Test Workspace',
    `Workspace name updated`,
  );

  // GET with fake id → 404
  const { status: notFound } = await api(
    'GET',
    '/workspaces/00000000-0000-0000-0000-000000000000',
  );
  assert(
    notFound === 404,
    `GET non-existent workspace → 404 (got ${notFound})`,
  );

  return { workspaceId: wsId };
}

async function testProjects(workspaceId) {
  console.log('\n═══════════════════════════════════════');
  console.log('📊 PROJECTS');
  console.log('═══════════════════════════════════════');

  // GET all projects for workspace
  const { status: listStatus, data: projects } = await api(
    'GET',
    `/workspaces/${workspaceId}/projects`,
  );
  assert(
    listStatus === 200,
    `GET /workspaces/${workspaceId}/projects → 200 (got ${listStatus})`,
  );
  assert(Array.isArray(projects), `Response is an array`);
  console.log(`  📋 Found ${projects?.length ?? 0} projects`);

  // CREATE project
  const { status: createStatus, data: newProj } = await api(
    'POST',
    `/workspaces/${workspaceId}/projects`,
    {
      workspaceId,
      name: 'Test Project ' + Date.now(),
      description: 'Created by API test',
    },
  );
  assert(createStatus === 201, `POST .../projects → 201 (got ${createStatus})`);
  assert(newProj && newProj.id, `Created project has an id`);
  const projectId = newProj?.id;
  console.log(`  🆕 Created project: ${projectId}`);

  if (!projectId) return { projectId: projects?.[0]?.id };

  // GET single project (flat route)
  const { status: getStatus, data: fetchedProj } = await api(
    'GET',
    `/projects/${projectId}`,
  );
  assert(
    getStatus === 200,
    `GET /projects/${projectId} → 200 (got ${getStatus})`,
  );
  assert(fetchedProj?.id === projectId, `Fetched project id matches`);

  // GET with fake id → 404
  const { status: notFound } = await api(
    'GET',
    '/projects/00000000-0000-0000-0000-000000000000',
  );
  assert(notFound === 404, `GET non-existent project → 404 (got ${notFound})`);

  return { projectId };
}

async function testTasks(projectId) {
  console.log('\n═══════════════════════════════════════');
  console.log('✅ TASKS');
  console.log('═══════════════════════════════════════');

  // GET all tasks for project (nested route)
  const { status: listStatus, data: tasks } = await api(
    'GET',
    `/projects/${projectId}/tasks`,
  );
  assert(
    listStatus === 200,
    `GET /projects/${projectId}/tasks → 200 (got ${listStatus})`,
  );
  assert(Array.isArray(tasks), `Response is an array`);
  console.log(`  📋 Found ${tasks?.length ?? 0} tasks`);

  // CREATE task
  const { status: createStatus, data: newTask } = await api(
    'POST',
    `/projects/${projectId}/tasks`,
    {
      projectId,
      title: 'Test Task ' + Date.now(),
      description: 'Created by API test',
      status: 'todo',
      priority: 'medium',
    },
  );
  assert(createStatus === 201, `POST .../tasks → 201 (got ${createStatus})`);
  assert(newTask && newTask.id, `Created task has an id`);
  const taskId = newTask?.id;
  console.log(`  🆕 Created task: ${taskId}`);

  if (!taskId) return { taskId: tasks?.[0]?.id };

  // GET single task (flat route)
  const { status: getStatus, data: fetchedTask } = await api(
    'GET',
    `/tasks/${taskId}`,
  );
  assert(getStatus === 200, `GET /tasks/${taskId} → 200 (got ${getStatus})`);
  assert(fetchedTask?.id === taskId, `Fetched task id matches`);

  // UPDATE task
  const { status: updateStatus, data: updatedTask } = await api(
    'PUT',
    `/tasks/${taskId}`,
    {
      title: 'Updated Test Task',
      status: 'in_progress',
      priority: 'high',
    },
  );
  assert(
    updateStatus === 200,
    `PUT /tasks/${taskId} → 200 (got ${updateStatus})`,
  );
  assert(updatedTask?.title === 'Updated Test Task', `Task title updated`);
  assert(
    updatedTask?.status === 'in_progress',
    `Task status updated to in_progress`,
  );
  assert(updatedTask?.priority === 'high', `Task priority updated to high`);

  // GET with fake id → 404
  const { status: notFound } = await api(
    'GET',
    '/tasks/00000000-0000-0000-0000-000000000000',
  );
  assert(notFound === 404, `GET non-existent task → 404 (got ${notFound})`);

  return { taskId };
}

async function testTags(orgId) {
  console.log('\n═══════════════════════════════════════');
  console.log('🏷️  TAGS');
  console.log('═══════════════════════════════════════');

  // GET all tags for org
  const { status: listStatus, data: tags } = await api(
    'GET',
    `/organizations/${orgId}/tags`,
  );
  assert(
    listStatus === 200,
    `GET /organizations/${orgId}/tags → 200 (got ${listStatus})`,
  );
  assert(Array.isArray(tags), `Response is an array`);
  console.log(`  📋 Found ${tags?.length ?? 0} tags`);

  // CREATE tag
  const { status: createStatus, data: newTag } = await api(
    'POST',
    `/organizations/${orgId}/tags`,
    {
      orgId,
      name: 'test-tag-' + Date.now(),
    },
  );
  assert(createStatus === 201, `POST .../tags → 201 (got ${createStatus})`);
  assert(newTag && newTag.id, `Created tag has an id`);
  const tagId = newTag?.id;
  console.log(`  🆕 Created tag: ${tagId}`);

  if (tagId) {
    // DELETE tag
    const { status: deleteStatus } = await api(
      'DELETE',
      `/organizations/${orgId}/tags/${tagId}`,
    );
    assert(
      deleteStatus === 200 || deleteStatus === 204,
      `DELETE .../tags/${tagId} → 200|204 (got ${deleteStatus})`,
    );
    console.log(`  🗑️  Deleted tag: ${tagId}`);
  }

  return {};
}

async function testAuthFailures() {
  console.log('\n═══════════════════════════════════════');
  console.log('🔒 AUTH & POLICY GUARD FAILURES');
  console.log('═══════════════════════════════════════');

  // Request without token → 401
  const noAuthRes = await fetch(`${BASE}/organizations`, {
    headers: { 'Content-Type': 'application/json' },
  });
  assert(
    noAuthRes.status === 401,
    `GET /organizations without token → 401 (got ${noAuthRes.status})`,
  );

  // Request with invalid token → 401
  const badRes = await fetch(`${BASE}/organizations`, {
    headers: {
      Authorization: 'Bearer invalid-token',
      'Content-Type': 'application/json',
    },
  });
  assert(
    badRes.status === 401,
    `GET /organizations with bad token → 401 (got ${badRes.status})`,
  );

  // Access non-existent org → 404 (PolicyGuard)
  const { status: fakeOrg } = await api(
    'PUT',
    '/organizations/00000000-0000-0000-0000-000000000000',
    {
      name: 'Hack',
    },
  );
  assert(fakeOrg === 404, `PUT non-existent org → 404 (got ${fakeOrg})`);

  // Access non-existent workspace → 404 (PolicyGuard)
  const { status: fakeWs } = await api(
    'PUT',
    '/workspaces/00000000-0000-0000-0000-000000000000',
    {
      name: 'Hack',
    },
  );
  assert(fakeWs === 404, `PUT non-existent workspace → 404 (got ${fakeWs})`);

  // Access non-existent task → 404 (PolicyGuard)
  const { status: fakeTask } = await api(
    'PUT',
    '/tasks/00000000-0000-0000-0000-000000000000',
    {
      title: 'Hack',
    },
  );
  assert(fakeTask === 404, `PUT non-existent task → 404 (got ${fakeTask})`);
}

async function testCleanup(orgId, workspaceId, projectId, taskId) {
  console.log('\n═══════════════════════════════════════');
  console.log('🧹 CLEANUP (DELETE created resources)');
  console.log('═══════════════════════════════════════');

  // Delete task
  if (taskId) {
    const { status } = await api('DELETE', `/tasks/${taskId}`);
    assert(
      status === 200 || status === 204,
      `DELETE task ${taskId} → 200|204 (got ${status})`,
    );
    console.log(`  🗑️  Deleted task`);
  }

  // Delete project — skip if no flat delete route
  // (Projects may only be deletable via nested route or may not have a delete handler)

  // Delete workspace
  if (workspaceId) {
    const { status } = await api('DELETE', `/workspaces/${workspaceId}`);
    assert(
      status === 200 || status === 204,
      `DELETE workspace ${workspaceId} → 200|204 (got ${status})`,
    );
    console.log(`  🗑️  Deleted workspace`);
  }

  // Delete org
  if (orgId) {
    const { status } = await api('DELETE', `/organizations/${orgId}`);
    assert(
      status === 200 || status === 204,
      `DELETE org ${orgId} → 200|204 (got ${status})`,
    );
    console.log(`  🗑️  Deleted org`);
  }
}

// ───── Main Runner ──────────────────────────────────────

async function main() {
  console.log('╔═══════════════════════════════════════════╗');
  console.log('║   Collab-Space API — Comprehensive Test   ║');
  console.log('║          PolicyGuard Validation            ║');
  console.log('╚═══════════════════════════════════════════╝');
  console.log(`\n🌐 Base URL: ${BASE}`);
  console.log(`🔑 Token:    ...${TOKEN.slice(-20)}`);

  try {
    // 1. Organizations
    const { orgId } = await testOrganizations();
    if (!orgId) {
      console.error('\n💥 Cannot continue without an org id');
      process.exit(1);
    }

    // 2. Workspaces
    const { workspaceId } = await testWorkspaces(orgId);
    if (!workspaceId) {
      console.error('\n💥 Cannot continue without a workspace id');
      process.exit(1);
    }

    // 3. Projects
    const { projectId } = await testProjects(workspaceId);
    if (!projectId) {
      console.error('\n💥 Cannot continue without a project id');
      process.exit(1);
    }

    // 4. Tasks
    const { taskId } = await testTasks(projectId);

    // 5. Tags
    await testTags(orgId);

    // 6. Auth & PolicyGuard failure cases
    await testAuthFailures();

    // 7. Cleanup
    await testCleanup(orgId, workspaceId, projectId, taskId);
  } catch (err) {
    console.error('\n💥 Unexpected error:', err);
    failed++;
  }

  // ───── Summary ────────────────────────────────────
  console.log('\n╔═══════════════════════════════════════════╗');
  console.log(
    `║  Results: ${passed} passed, ${failed} failed${' '.repeat(Math.max(0, 18 - String(passed).length - String(failed).length))}║`,
  );
  console.log('╚═══════════════════════════════════════════╝');

  if (failures.length > 0) {
    console.log('\n❌ Failures:');
    failures.forEach((f) => console.log(`   • ${f}`));
  }

  process.exit(failed > 0 ? 1 : 0);
}

main();
