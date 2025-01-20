import { UserRole } from "../models/role";
import { User } from "../models/user";
import { IGetUsersRepository } from "./../controllers/get-users/protocols";
export class PgGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        email: "luis@email.com",
        name: "Luis Ricarte",
        password: "123",
        role: UserRole.ALUNO,
      },
    ];
  }
}
