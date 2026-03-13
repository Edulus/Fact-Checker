// Database queries for Vercel Postgres
// See docs/DATA.md for schema and query specifications

export async function saveCheck(/* verdict */): Promise<string> {
  // TODO: Insert into checks table, return UUID
  throw new Error("Database not yet connected");
}

export async function getCheckById(id: string) {
  // TODO: SELECT from checks WHERE id = $1
  throw new Error("Database not yet connected");
}

export async function getRecentChecks(limit = 20) {
  // TODO: Recent checks feed query from DATA.md
  throw new Error("Database not yet connected");
}

export async function getTagCloud(limit = 30) {
  // TODO: Tag cloud query from DATA.md
  throw new Error("Database not yet connected");
}
