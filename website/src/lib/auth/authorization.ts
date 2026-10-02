import { neon } from "@neondatabase/serverless";
import { auth } from "@/lib/auth/server";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not configured.");
}

const sql = neon(databaseUrl);

export type EmvRole = {
  id: string;
  name: string;
};

export type CurrentUser = {
  authUserId: string;
  emvUserId: string;
  email: string;
  name: string;
  displayName: string | null;
  status: string;
  roles: EmvRole[];
  permissions: string[];
};

export class AuthenticationRequiredError extends Error {
  constructor() {
    super("Authentication required.");
    this.name = "AuthenticationRequiredError";
  }
}

export class PermissionDeniedError extends Error {
  constructor() {
    super("Permission denied.");
    this.name = "PermissionDeniedError";
  }
}

/**
 * Returns the currently authenticated EMV user together with
 * their EMV roles and permissions.
 *
 * Returns null when:
 * - there is no Neon Auth session
 * - the authenticated user has no active EMV account
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const result = await auth.getSession();

  if (result.error || !result.data?.user) {
    return null;
  }

  const authUser = result.data.user;

  const rows = await sql`
    SELECT
      eu.id AS emv_user_id,
      eu.auth_user_id,
      eu.display_name,
      eu.status,
      r.id AS role_id,
      r.name AS role_name,
      p.code AS permission_code,
      rp.allowed
    FROM public.emv_users eu
    LEFT JOIN public.emv_user_roles eur
      ON eur.user_id = eu.id
    LEFT JOIN public.emv_roles r
      ON r.id = eur.role_id
    LEFT JOIN public.emv_role_permissions rp
      ON rp.role_id = r.id
    LEFT JOIN public.emv_permissions p
      ON p.id = rp.permission_id
    WHERE eu.auth_user_id = ${authUser.id}
      AND eu.status = 'active'
    ORDER BY r.name, p.code;
  `;

  if (rows.length === 0) {
    return null;
  }

  const first = rows[0];

  const roles: EmvRole[] = [];
  const permissions = new Set<string>();

  for (const row of rows) {
    if (
      row.role_id &&
      row.role_name &&
      !roles.some((role) => role.id === row.role_id)
    ) {
      roles.push({
        id: row.role_id,
        name: row.role_name,
      });
    }

    if (row.permission_code && row.allowed === true) {
      permissions.add(row.permission_code);
    }
  }

  return {
    authUserId: authUser.id,
    emvUserId: first.emv_user_id,
    email: authUser.email,
    name: authUser.name,
    displayName: first.display_name,
    status: first.status,
    roles,
    permissions: [...permissions],
  };
}

/**
 * Requires an authenticated and active EMV user.
 */
export async function requireAuth(): Promise<CurrentUser> {
  const user = await getCurrentUser();

  if (!user) {
    throw new AuthenticationRequiredError();
  }

  return user;
}

/**
 * Checks whether the current user has a specific EMV permission.
 */
export async function hasPermission(permission: string): Promise<boolean> {
  const user = await getCurrentUser();

  if (!user) {
    return false;
  }

  return user.permissions.includes(permission);
}

/**
 * Requires the current user to have a specific EMV permission.
 */
export async function requirePermission(
  permission: string,
): Promise<CurrentUser> {
  const user = await requireAuth();

  if (!user.permissions.includes(permission)) {
    throw new PermissionDeniedError();
  }

  return user;
}