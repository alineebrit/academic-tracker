import { IGetUsersController, IGetUsersRepository } from "./protocols";

export class GetUsersController implements IGetUsersController {
  getUsersRepository: IGetUsersRepository;

  constructor(getUsersRepository: IGetUsersRepository) {
    this.getUsersRepository = getUsersRepository;
  }

  async handle() {
    try {
      const users = await this.getUsersRepository.getUsers();
      return {
        statusCode: 200,
        body: users,
      };
    } catch {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
