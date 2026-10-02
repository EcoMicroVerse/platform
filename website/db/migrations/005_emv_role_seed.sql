-- EcoMicroVerse initial editorial roles
--
-- Creates the initial system roles.
-- Permission assignments are handled separately.

BEGIN;

INSERT INTO public.emv_roles (
    name,
    description,
    is_system_role
)
VALUES
    (
        'Owner',
        'Full EcoMicroVerse platform and editorial administration.',
        TRUE
    ),
    (
        'Managing Editor',
        'Manages editorial workflows, users, assignments, and publication.',
        TRUE
    ),
    (
        'Editor',
        'Reviews candidates and develops research articles.',
        TRUE
    ),
    (
        'Contributor',
        'Creates and edits assigned article content.',
        TRUE
    ),
    (
        'Reviewer',
        'Reviews articles and provides editorial or scientific feedback.',
        TRUE
    )
ON CONFLICT (name)
DO UPDATE SET
    description = EXCLUDED.description,
    is_system_role = EXCLUDED.is_system_role,
    updated_at = NOW();

COMMIT;
