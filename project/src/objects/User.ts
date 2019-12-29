import levelDB from "../leveldb";
import { resolve } from "dns";
import bcrypt, { compareSync } from "bcrypt
import jwt from "jsonwebtoken";

export class User {
  private login: string;
  private email: string;
  private password: string;

  constructor(login: string, email: string, password: string) {
    this.login = login;
    this.email = email;
    this.password = password;
  }

  public getLogin = () => {
    return this.login;
  };
  public getEmail = () => {
    return this.email;
  };
  public getPassword = () => {
    return this.password;
  };
  public getUser = () => {
    let user = {
      login: this.login,
      email: this.email,
      password: this.password
    };
    return user;
  };

  public updateData = (login?: string, email?: string, password?: string) => {
    this.login = login ? login : this.login;
    this.email = email ? email : this.email;
  };

  public checkPassword = (password: string) => {
    const check = compareSync(password, this.password);
    return check;
  };
  public signToken = () => {
    return jwt.sign({ id: this.getLogin() }, config.jwtKey, { expiresIn: "1h" });
  };
}

export class UserHandler {
  public db: any;

  constructor(dbPath: string) {
    this.db = levelDB.open(dbPath);
  }

  private fromDB = (login: string, data: string) => {
    const [login, email, password] = data.split(":");
    return new User(login, email, password);
  };
}
