/**
 * Query Features Test — Sorting, Filtering, Pagination
 * =====================================================
 * Tests the new query capabilities on all list endpoints.
 *
 * Usage:
 *   node apps/api/test-query.mjs
 *
 * Requires: running API server on http://localhost:3000
 */

const BASE = 'http://localhost:3000';
const TOKEN =
  'eyJhbGciOiJFUzI1NiIsImtpZCI6IjQ5ZTVmMjY2LTg0OGQtNDFiOC05NjM5LTI2NjZkNjdkMDJmMSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2RvcGZ4Y3JqdXJlZnBpZm53bmFvLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI5OTIwOGM4Mi0yNmYzLTQ1NDEtOGU0MC1hMjczMDM1MGU5NzUiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzcxODU3MTMyLCJpYXQiOjE3NzE4NTM1MzIsImVtYWlsIjoiYWhtZWQuYmFrci5oYWZlekBob3RtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiYXZhdGFyVXJsIjoiaHR0cHM6Ly9hcGkuZGljZWJlYXIuY29tLzcueC9hdmF0YWFhcnMvc3ZnP3NlZWQ9YWhtZWQuYmFrci5oYWZleiU0MGhvdG1haWwuY29tIiwiZW1haWwiOiJhaG1lZC5iYWtyLmhhZmV6QGhvdG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IkFobWVkIEJha3IiLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInN1YiI6Ijk5MjA4YzgyLTI2ZjMtNDU0MS04ZTQwLWEyNzMwMzUwZTk3NSJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzcxMjM4MTM5fV0sInNlc3Npb25faWQiOiI3MWRiNTg1MS00N2NjLTQyYjYtODk5OC0xMzY0YzQyYWYwYTciLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.AnX6EBOcHsnqc9Dj5lfJ1diFV-LGdssHJ9fJBYdxEGIdIPItbcaHcdAPEG1ZLtk-R2FT6uOx8e7GZQEIJvJKlA';

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

function assert(condition, label, details) {
  if (condition) {
    passed++;
    console.log(`  ✅ ${label}`);
  } else {
    failed++;
    failures.push(label);
    console.log(`  ❌ ${label}`);
    if (details) console.log(`     ↳ ${JSON.stringify(details).slice(0, 200)}`);
  }
}

// ───── Discover existing IDs ────────────────────────────

async function discoverIds() {
  console.log('\n🔍 Discovering existing resources...');

  const { data: orgs } = await api('GET', '/organizations');
  const orgId = orgs?.data?.[0]?.id;
  console.log(`  Organization: ${orgId || '❌ none found'}`);

  if (!orgId) return {};

  const { data: workspaces } = await api(
    'GET',
    `/organizations/${orgId}/workspaces`,
  );
  const wsId = workspaces?.data?.[0]?.id;
  console.log(`  Workspace:    ${wsId || '❌ none found'}`);

  if (!wsId) return { orgId };

  const { data: projects } = await api('GET', `/workspaces/${wsId}/projects`);
  const projId = projects?.data?.[0]?.id;
  console.log(`  Project:      ${projId || '❌ none found'}`);

  return { orgId, wsId, projId };
}

// ───── Test: Response Shape ─────────────────────────────

async function testResponseShape(orgId, wsId, projId) {
  console.log('\n═══════════════════════════════════════');
  console.log('📦 RESPONSE SHAPE (PaginatedResult)');
  console.log('═══════════════════════════════════════');

  // Test organizations list
  const { status, data } = await api('GET', '/organizations');
  assert(status === 200, 'GET /organizations → 200');
  assert(data && Array.isArray(data.data), 'Response has data[] array', data);
  assert(data && data.meta, 'Response has meta object', data);
  assert(
    data?.meta?.page === 1,
    `meta.page defaults to 1 (got ${data?.meta?.page})`,
  );
  assert(
    data?.meta?.limit === 10,
    `meta.limit defaults to 10 (got ${data?.meta?.limit})`,
  );
  assert(
    typeof data?.meta?.total === 'number',
    `meta.total is a number (got ${data?.meta?.total})`,
  );
  assert(
    typeof data?.meta?.totalPages === 'number',
    `meta.totalPages is a number (got ${data?.meta?.totalPages})`,
  );

  // Test workspaces list
  if (orgId) {
    const { data: ws } = await api('GET', `/organizations/${orgId}/workspaces`);
    assert(ws && Array.isArray(ws.data), 'Workspaces response has data[]', ws);
    assert(ws?.meta?.page === 1, 'Workspaces meta.page = 1');
  }

  // Test projects list
  if (wsId) {
    const { data: proj } = await api('GET', `/workspaces/${wsId}/projects`);
    assert(
      proj && Array.isArray(proj.data),
      'Projects response has data[]',
      proj,
    );
    assert(proj?.meta?.page === 1, 'Projects meta.page = 1');
  }

  // Test tasks list
  if (projId) {
    const { data: tasks } = await api('GET', `/projects/${projId}/tasks`);
    assert(
      tasks && Array.isArray(tasks.data),
      'Tasks response has data[]',
      tasks,
    );
    assert(tasks?.meta?.page === 1, 'Tasks meta.page = 1');
  }

  // Test tags list
  if (orgId) {
    const { data: tags } = await api('GET', `/organizations/${orgId}/tags`);
    assert(tags && Array.isArray(tags.data), 'Tags response has data[]', tags);
    assert(tags?.meta?.page === 1, 'Tags meta.page = 1');
  }

  // Test public organizations
  const { data: pubOrgs } = await api('GET', '/organizations/public');
  assert(
    pubOrgs && Array.isArray(pubOrgs.data),
    'Public orgs response has data[]',
    pubOrgs,
  );
  assert(pubOrgs?.meta?.page === 1, 'Public orgs meta.page = 1');
}

// ───── Test: Pagination ─────────────────────────────────

async function testPagination(orgId) {
  console.log('\n═══════════════════════════════════════');
  console.log('📄 PAGINATION');
  console.log('═══════════════════════════════════════');

  // Custom limit
  const { data: p1 } = await api('GET', '/organizations?limit=2');
  assert(p1?.meta?.limit === 2, `limit=2 respected (got ${p1?.meta?.limit})`);
  assert(p1?.data?.length <= 2, `data.length ≤ 2 (got ${p1?.data?.length})`);

  // Custom page
  const { data: p2 } = await api('GET', '/organizations?page=2&limit=1');
  assert(p2?.meta?.page === 2, `page=2 respected (got ${p2?.meta?.page})`);
  assert(p2?.meta?.limit === 1, `limit=1 respected (got ${p2?.meta?.limit})`);

  // Very large page → empty data but valid response
  const { status, data: p3 } = await api('GET', '/organizations?page=9999');
  assert(status === 200, 'Large page returns 200');
  assert(
    p3?.data?.length === 0,
    `page=9999 returns empty data (got ${p3?.data?.length})`,
  );
  assert(p3?.meta?.page === 9999, `meta.page = 9999 (got ${p3?.meta?.page})`);

  // Invalid page → 400 (page=0 is below min=1)
  const { status: badPage } = await api('GET', '/organizations?page=0');
  assert(badPage === 400, `page=0 → 400 (got ${badPage})`);

  // Limit exceeds max → 400 (limit=51 exceeds max=50)
  const { status: badLimit } = await api('GET', '/organizations?limit=51');
  assert(badLimit === 400, `limit=51 → 400 (got ${badLimit})`);
}

// ───── Test: Sorting ────────────────────────────────────

async function testSorting(orgId) {
  console.log('\n═══════════════════════════════════════');
  console.log('🔃 SORTING');
  console.log('═══════════════════════════════════════');

  // Sort by name ascending
  const { status: s1, data: asc } = await api(
    'GET',
    '/organizations?sort=name',
  );
  assert(s1 === 200, 'sort=name returns 200');
  if (asc?.data?.length >= 2) {
    const names = asc.data.map((o) => o.name);
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    assert(
      JSON.stringify(names) === JSON.stringify(sorted),
      `sort=name → ascending order (${names.slice(0, 3).join(', ')}...)`,
    );
  } else {
    console.log('  ⚠️  Not enough orgs for ascending sort validation');
  }

  // Sort by name descending
  const { status: s2, data: desc } = await api(
    'GET',
    '/organizations?sort=-name',
  );
  assert(s2 === 200, 'sort=-name returns 200');
  if (desc?.data?.length >= 2) {
    const names = desc.data.map((o) => o.name);
    const sorted = [...names].sort((a, b) => b.localeCompare(a));
    assert(
      JSON.stringify(names) === JSON.stringify(sorted),
      `sort=-name → descending order (${names.slice(0, 3).join(', ')}...)`,
    );
  } else {
    console.log('  ⚠️  Not enough orgs for descending sort validation');
  }

  // Sort by createdAt descending
  const { status: s3 } = await api('GET', '/organizations?sort=-createdAt');
  assert(s3 === 200, 'sort=-createdAt returns 200');

  // Invalid sort field → the unknown field is silently ignored (200 OK)
  const { status: s4 } = await api('GET', '/organizations?sort=invalidField');
  assert(s4 === 200, 'sort=invalidField → 200 (unknown fields ignored)');
}

// ───── Test: Filtering ──────────────────────────────────

async function testFiltering(orgId, projId) {
  console.log('\n═══════════════════════════════════════');
  console.log('🔎 FILTERING');
  console.log('═══════════════════════════════════════');

  // Filter orgs by visibility
  const { status: f1, data: pubOrgs } = await api(
    'GET',
    '/organizations?visibility=public',
  );
  assert(f1 === 200, 'visibility=public returns 200');
  if (pubOrgs?.data?.length > 0) {
    const allPublic = pubOrgs.data.every((o) => o.visibility === 'public');
    assert(allPublic, 'All filtered orgs are public');
  } else {
    console.log('  ⚠️  No public orgs found to validate filter');
  }

  // Filter tasks by status (if project exists)
  if (projId) {
    const { status: tf1, data: todoTasks } = await api(
      'GET',
      `/projects/${projId}/tasks?status=todo`,
    );
    assert(tf1 === 200, 'status=todo returns 200');
    if (todoTasks?.data?.length > 0) {
      const allTodo = todoTasks.data.every((t) => t.status === 'todo');
      assert(allTodo, 'All filtered tasks have status=todo');
    }

    // Comma filter (IN)
    const { status: tf2, data: multiStatus } = await api(
      'GET',
      `/projects/${projId}/tasks?status=todo,in_progress`,
    );
    assert(tf2 === 200, 'status=todo,in_progress returns 200');
    if (multiStatus?.data?.length > 0) {
      const validStatuses = multiStatus.data.every(
        (t) => t.status === 'todo' || t.status === 'in_progress',
      );
      assert(
        validStatuses,
        'All filtered tasks have status todo or in_progress',
      );
    }

    // Priority filter
    const { status: tf3 } = await api(
      'GET',
      `/projects/${projId}/tasks?priority=high`,
    );
    assert(tf3 === 200, 'priority=high returns 200');
  }

  // Combined: sort + filter + pagination
  const { status: combo, data: comboData } = await api(
    'GET',
    '/organizations?visibility=public&sort=-name&page=1&limit=5',
  );
  assert(combo === 200, 'Combined sort+filter+pagination returns 200');
  assert(
    comboData?.meta?.limit === 5,
    `Combined: limit=5 respected (got ${comboData?.meta?.limit})`,
  );
}

// ───── Main Runner ──────────────────────────────────────

async function main() {
  console.log('╔═══════════════════════════════════════════╗');
  console.log('║   Query Features Test — Sort/Filter/Page  ║');
  console.log('╚═══════════════════════════════════════════╝');
  console.log(`\n🌐 Base URL: ${BASE}`);

  try {
    const { orgId, wsId, projId } = await discoverIds();

    await testResponseShape(orgId, wsId, projId);
    await testPagination(orgId);
    await testSorting(orgId);
    await testFiltering(orgId, projId);
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
