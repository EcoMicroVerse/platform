-- EcoMicroVerse editorial identity layer
--
-- Authentication is handled by Neon Auth.
-- These tables contain only EcoMicroVerse-specific
-- editorial identity and role information.

BEGIN;

-- ---------------------------------------------------------------------------
-- EMV USERS
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.emv_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Stable identity supplied by Neon Auth.
    auth_user_id UUID NOT NULL UNIQUE,

    -- Optional application-level display name.
    -- Authentication email/name remain owned by Neon Auth.
    display_name TEXT,

    -- Application lifecycle state.
    status TEXT NOT NULL DEFAULT 'active'
        CHECK (status IN (
            'invited',
            'active',
            'suspended',
            'deactivated'
        )),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- EMV ROLES
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.emv_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name TEXT NOT NULL UNIQUE,

    description TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- EMV USER ROLES
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.emv_user_roles (
    user_id UUID NOT NULL,
    role_id UUID NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY (user_id, role_id),

    CONSTRAINT emv_user_roles_user_fk
        FOREIGN KEY (user_id)
        REFERENCES public.emv_users(id)
        ON DELETE CASCADE,

    CONSTRAINT emv_user_roles_role_fk
        FOREIGN KEY (role_id)
        REFERENCES public.emv_roles(id)
        ON DELETE CASCADE
);

-- ---------------------------------------------------------------------------
-- INDEXES
-- ---------------------------------------------------------------------------

CREATE INDEX IF NOT EXISTS emv_user_roles_role_id_idx
    ON public.emv_user_roles(role_id);

CREATE INDEX IF NOT EXISTS emv_users_status_idx
    ON public.emv_users(status);

COMMIT;
