import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
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
}

export default UsersRepository;
