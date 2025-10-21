/**
 * User Role IDs matching the Users Service database
 * Based on the roles defined in the Users microservice
 */
export const UserRoles = {
  ADMIN: 1,
  DOCTOR: 2,
  NURSE: 3,
  RECEPTIONIST: 4,
} as const;

export type UserRoleId = (typeof UserRoles)[keyof typeof UserRoles];
