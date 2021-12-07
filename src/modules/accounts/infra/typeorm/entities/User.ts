import {
  Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn()
    id: string;

  @Column()
    first_name: string;

  @Column()
    last_name: string;

  @Column()
    email: string;

  @Column()
    password: string;

  @CreateDateColumn()
    created_at: string;

  @UpdateDateColumn()
    updated_at: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
