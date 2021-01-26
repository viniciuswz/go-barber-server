import UseToken from '../infra/typeorm/entities/UserToken';

export default interface IUsersTokensRepository {
    generated(user_id: string): Promise<UseToken>;
}
