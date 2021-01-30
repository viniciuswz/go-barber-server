import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import { v4 as uuid } from 'uuid';

class UsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async create({
        email,
        name,
        password,
    }: ICreateUserDTO): Promise<User> {
        const user = new User();
        Object.assign(user, {
            id: uuid(),
            email,
            name,
            password,
        });

        this.users.push(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(
            userIndex => userIndex.id === user.id,
        );

        if (findIndex >= 0) {
            this.users[findIndex] = user;
        }
        return user;
    }

    public async findById(id: string): Promise<User | undefined> {
        const userById = this.users.find(user => user.id === id);
        return userById;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const userByEmail = this.users.find(user => user.email === email);
        return userByEmail;
    }

    public async findAllProviders({
        expect_user_id,
    }: IFindAllProvidersDTO): Promise<User[]> {
        let { users } = this;

        if (expect_user_id) {
            users = this.users.filter(user => user.id !== expect_user_id);
        }

        return users;
    }
}

export default UsersRepository;
