-- EcoMicroVerse role and permission configuration model
--
-- Adds:
--   1. System-role protection metadata
--   2. Explicit Allow / Don't allow state for permissions

BEGIN;

-- ---------------------------------------------------------------------------
-- SYSTEM ROLE FLAG
-- ---------------------------------------------------------------------------

ALTER TABLE public.emv_roles
ADD COLUMN IF NOT EXISTS is_system_role BOOLEAN NOT NULL DEFAULT FALSE;

-- ---------------------------------------------------------------------------
-- EXPLICIT PERMISSION ACCESS STATE
-- ---------------------------------------------------------------------------

ALTER TABLE public.emv_role_permissions
ADD COLUMN IF NOT EXISTS allowed BOOLEAN NOT NULL DEFAULT TRUE;

COMMIT;
