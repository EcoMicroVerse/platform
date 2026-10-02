-- EcoMicroVerse initial role-permission assignments
--
-- Creates an explicit Allow/Don't allow decision for every
-- system role and every permission.
--
-- 5 roles x 17 permissions = 85 records.
--
-- Permission assignments remain configurable through the
-- future role editor UI.

BEGIN;

-- ============================================================
-- Owner
-- ============================================================

INSERT INTO public.emv_role_permissions (role_id, permission_id, allowed)
SELECT r.id, p.id, TRUE
FROM public.emv_roles r
CROSS JOIN public.emv_permissions p
WHERE r.name = 'Owner'
ON CONFLICT (role_id, permission_id)
DO UPDATE SET
    allowed = EXCLUDED.allowed;

-- ============================================================
-- Managing Editor
-- ============================================================

INSERT INTO public.emv_role_permissions (role_id, permission_id, allowed)
SELECT
    r.id,
    p.id,
    CASE p.code
        WHEN 'workspace.read' THEN TRUE
        WHEN 'candidates.read' THEN TRUE
        WHEN 'candidates.review' THEN TRUE

        WHEN 'articles.create' THEN TRUE
        WHEN 'articles.read' THEN TRUE
        WHEN 'articles.edit' THEN TRUE
        WHEN 'articles.review' THEN TRUE
        WHEN 'articles.approve' THEN TRUE
        WHEN 'articles.publish' THEN TRUE
        WHEN 'articles.archive' THEN TRUE

        WHEN 'assignments.read' THEN TRUE
        WHEN 'assignments.manage' THEN TRUE

        WHEN 'users.read' THEN TRUE
        WHEN 'users.manage' THEN TRUE

        WHEN 'roles.read' THEN TRUE
        WHEN 'roles.manage' THEN FALSE

        WHEN 'audit.read' THEN TRUE

        ELSE FALSE
    END
FROM public.emv_roles r
CROSS JOIN public.emv_permissions p
WHERE r.name = 'Managing Editor'
ON CONFLICT (role_id, permission_id)
DO UPDATE SET
    allowed = EXCLUDED.allowed;

-- ============================================================
-- Editor
-- ============================================================

INSERT INTO public.emv_role_permissions (role_id, permission_id, allowed)
SELECT
    r.id,
    p.id,
    CASE p.code
        WHEN 'workspace.read' THEN TRUE

        WHEN 'candidates.read' THEN TRUE
        WHEN 'candidates.review' THEN TRUE

        WHEN 'articles.create' THEN TRUE
        WHEN 'articles.read' THEN TRUE
        WHEN 'articles.edit' THEN TRUE
        WHEN 'articles.review' THEN TRUE

        WHEN 'assignments.read' THEN TRUE

        ELSE FALSE
    END
FROM public.emv_roles r
CROSS JOIN public.emv_permissions p
WHERE r.name = 'Editor'
ON CONFLICT (role_id, permission_id)
DO UPDATE SET
    allowed = EXCLUDED.allowed;

-- ============================================================
-- Contributor
-- ============================================================

INSERT INTO public.emv_role_permissions (role_id, permission_id, allowed)
SELECT
    r.id,
    p.id,
    CASE p.code
        WHEN 'workspace.read' THEN TRUE

        WHEN 'articles.create' THEN TRUE
        WHEN 'articles.read' THEN TRUE
        WHEN 'articles.edit' THEN TRUE

        WHEN 'assignments.read' THEN TRUE

        ELSE FALSE
    END
FROM public.emv_roles r
CROSS JOIN public.emv_permissions p
WHERE r.name = 'Contributor'
ON CONFLICT (role_id, permission_id)
DO UPDATE SET
    allowed = EXCLUDED.allowed;

-- ============================================================
-- Reviewer
-- ============================================================

INSERT INTO public.emv_role_permissions (role_id, permission_id, allowed)
SELECT
    r.id,
    p.id,
    CASE p.code
        WHEN 'workspace.read' THEN TRUE

        WHEN 'candidates.read' THEN TRUE

        WHEN 'articles.read' THEN TRUE
        WHEN 'articles.review' THEN TRUE

        WHEN 'assignments.read' THEN TRUE

        ELSE FALSE
    END
FROM public.emv_roles r
CROSS JOIN public.emv_permissions p
WHERE r.name = 'Reviewer'
ON CONFLICT (role_id, permission_id)
DO UPDATE SET
    allowed = EXCLUDED.allowed;

COMMIT;
