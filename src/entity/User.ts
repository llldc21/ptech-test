import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import * as bcrypt from "bcrypt";

@Entity()
@Unique(["email"])
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "email" })
  email: string;

  @Column()
  password: string;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
