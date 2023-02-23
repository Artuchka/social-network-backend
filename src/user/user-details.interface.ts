import { Role } from './role.enum'

export interface UserDetails {
  id: string
  email: string
  username: string
  roles: [Role]
}
