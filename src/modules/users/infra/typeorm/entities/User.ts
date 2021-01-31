import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

@Entity('users')
class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    @Exclude()
    password: string;

    @Column('varchar')
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({
        name: 'avatar_url',
    })
    getAvatarUrl(): string | null {
        return this.avatar
            ? `${process.env.APP_API_URL}/files/${this.avatar}`
            : null;
    }
}

export default Users;
