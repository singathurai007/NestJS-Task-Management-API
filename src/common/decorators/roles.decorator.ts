import { SetMetadata } from '@nestjs/common';

/**
 * Custom decorator that marks a route with the roles required to
 * access it. Used together with RolesGuard.
 */
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
