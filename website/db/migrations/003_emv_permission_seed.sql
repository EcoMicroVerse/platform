-- EcoMicroVerse permission vocabulary
--
-- This migration defines the stable permission codes used by
-- the editorial authorization layer.
--
-- It does not create roles or assign permissions.

BEGIN;

INSERT INTO public.emv_permissions (code, description)
VALUES
    (
        'workspace.read',
        'Access the EcoMicroVerse editorial workspace.'
    ),
    (
        'candidates.read',
        'View research candidates in the editorial candidate inbox.'
    ),
    (
        'candidates.review',
        'Review candidates and change their editorial decision status.'
    ),
    (
        'articles.create',
        'Create new article drafts.'
    ),
    (
        'articles.read',
        'View articles and article drafts.'
    ),
    (
        'articles.edit',
        'Edit article draft content and editorial notes.'
    ),
    (
        'articles.review',
        'Submit articles for review or return them to draft.'
    ),
    (
        'articles.approve',
        'Approve articles for publication.'
    ),
    (
        'articles.publish',
        'Publish an approved article to the public research-object repository.'
    ),
    (
        'articles.archive',
        'Archive an article.'
    ),
    (
        'assignments.read',
        'View editorial assignments.'
    ),
    (
        'assignments.manage',
        'Create, modify, and complete editorial assignments.'
    ),
    (
        'users.read',
        'View EcoMicroVerse editorial user accounts.'
    ),
    (
        'users.manage',
        'Invite, suspend, deactivate, and manage editorial users.'
    ),
    (
        'roles.read',
        'View editorial roles and their permissions.'
    ),
    (
        'roles.manage',
        'Create and modify editorial roles and their permissions.'
    ),
    (
        'audit.read',
        'View the EcoMicroVerse editorial audit history.'
    )
ON CONFLICT (code)
DO UPDATE SET
    description = EXCLUDED.description,
    updated_at = NOW();

COMMIT;
