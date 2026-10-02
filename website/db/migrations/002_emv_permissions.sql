-- EcoMicroVerse editorial permissions
--
-- Authentication is handled by Neon Auth.
-- Roles and permissions are managed by EcoMicroVerse.

BEGIN;

-- ---------------------------------------------------------------------------
-- EMV PERMISSIONS
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.emv_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Stable machine-readable permission identifier.
    code TEXT NOT NULL UNIQUE,

    -- Human-readable description.
    description TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- EMV ROLE PERMISSIONS
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.emv_role_permissions (
    role_id UUID NOT NULL,
    permission_id UUID NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY (role_id, permission_id),

    CONSTRAINT emv_role_permissions_role_fk
        FOREIGN KEY (role_id)
        REFERENCES public.emv_roles(id)
        ON DELETE CASCADE,

    CONSTRAINT emv_role_permissions_permission_fk
        FOREIGN KEY (permission_id)
        REFERENCES public.emv_permissions(id)
        ON DELETE CASCADE
);

-- ---------------------------------------------------------------------------
-- INDEXES
-- ---------------------------------------------------------------------------

CREATE INDEX IF NOT EXISTS emv_role_permissions_permission_id_idx
    ON public.emv_role_permissions(permission_id);

COMMIT;
