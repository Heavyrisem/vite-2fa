export enum Roles {
  TEST_ROLE = 'TestRole',
  MANAGE_USER = 'ManageUser',
}

export interface Role {
  id: number;
  name: Roles;
  description: string;
}
