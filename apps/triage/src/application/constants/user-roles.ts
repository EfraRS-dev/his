/**
 * User Role IDs matching the Users Service database
 * Based on the roles defined in the Users microservice
 */
export const UserRoles = {
  Admin: 1,
  Doctor: 2,
  Nurse: 3,
  Patient: 4,
} as const;

export type UserRoleId = (typeof UserRoles)[keyof typeof UserRoles];
