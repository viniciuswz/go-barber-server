import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async create({
        email,
        name,
        password,
    }: ICreateUserDTO): Promise<User> {
        const appointment = this.ormRepository.create({
            email,
            name,
            password,
        });

        await this.ormRepository.save(appointment);
        return appointment;
    }

    public async save(data: User): Promise<User> {
        const user = await this.ormRepository.save(data);
        return user;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { email },
        });

        return user;
    }

    public async findAllProviders({
        expect_user_id,
    }: IFindAllProvidersDTO): Promise<User[]> {
        let users: User[];
        if (expect_user_id) {
            users = await this.ormRepository.find({
                where: { id: Not(expect_user_id) },
            });
        } else {
            users = await this.ormRepository.find();
        }

        return users;
    }
}

export default UsersRepository;
