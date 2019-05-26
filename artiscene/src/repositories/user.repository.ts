import { DefaultCrudRepository, juggler, HasManyRepositoryFactory, repository } from '@loopback/repository';
import { User, Client } from '../models';
import { DbDataSource } from '../datasources';
import { inject } from '@loopback/core';
import { ClientRepository } from './client.repository';
import { ArtistRepository } from './artist.repository';
import { HttpErrors } from '@loopback/rest';
import * as isemail from 'isemail';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
  > {
  // public clients: HasManyRepositoryFactory<Client, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository(ClientRepository) protected clientRepository: ClientRepository,
    @repository(ArtistRepository) protected artistRepository: ArtistRepository,
  ) {
    super(User, dataSource);
    // this.clients = this._createHasManyRepositoryFactoryFor(
    //   'clients',
    //   async () => clientRepository,
    // );
  }

  async login(email: string, password: string) {

    if (!isemail.validate(email)) {
      throw new HttpErrors.UnprocessableEntity('invalid email');
    }
    console.log("password " + password + " condition " + (password === undefined));
    if (password === "undefined") {
      throw new HttpErrors.UnprocessableEntity('password field is necessary');
    }

    const users = await (this.find({ where: { email: email, password: password }, limit: 1, fields: { password: false } }));
    if (users.length == 0) {
      throw new HttpErrors.UnprocessableEntity("either email or password is incorrect");
      return {
        "result": "either email or password is incorrect"
      }
    }
    const user = users[0];
    user.access_token = this.createAccessToken();
    delete user.password;
    await this.update(user);

    console.log("user type " + user.user_type + " condition" + (parseInt(user.user_type || "0") === 0));
    if (parseInt(user.user_type || "0") === 0) {
      const clients = await this.clientRepository.find({ where: { user_id: user.id }, limit: 1 })
      return {
        "user": user,
        "informtion": clients[0]
      }
    } else if (parseInt(user.user_type || "-1") === 1) {
      const artists = await this.artistRepository.find({ where: { user_id: user.id }, limit: 1 })
      return {
        "user": user,
        "informtion": artists[0]
      }
    } else {
      return user;
    }
  }

  async signup(user: User) {

    const users = await (this.find({ where: { email: user.email } }));
    if (users.length === 0) {
      return await this.create(user)
    } else {
      throw new HttpErrors.Conflict('account exists');
    }

  }

  async getUserById(id: number) {

    const users = await (this.find({ where: { id: id }, limit: 1, fields: { password: false } }));
    if (users.length == 0) {
      throw new HttpErrors.UnprocessableEntity("either email or password is incorrect");
      return {
        "result": "either email or password is incorrect"
      }
    }
    const user = users[0];

    console.log("user type " + user.user_type + " condition" + (parseInt(user.user_type || "0") === 0));
    if (parseInt(user.user_type || "0") === 0) {
      const clients = await this.clientRepository.find({ where: { user_id: user.id }, limit: 1 })
      return {
        "user": user,
        "informtion": clients[0]
      }
    } else if (parseInt(user.user_type || "-1") === 1) {
      const artists = await this.artistRepository.find({ where: { user_id: user.id }, limit: 1 })
      return {
        "user": user,
        "informtion": artists[0]
      }
    } else {
      return user;
    }

  }




  createAccessToken() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

}
