import BaseError from "../error-handler"
import database from "../database"

export type TUser = {
  id?: number;
  username: string;
  password: string;
  mail: string;
  fullname: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type TAuthUser = {
  id?: number;
  username: string;
  role: string;
  token: string;
}

export type TUsersErrorMapping = {
  ER_DUP_ENTRY: string;
  ER_NO_DEFAULT_FOR_FIELD: string;
  ER_NO_SUCH_TABLE: string;
}

export const UsersErrorMapping: TUsersErrorMapping = {
  ER_DUP_ENTRY: 'Tài khoản đã tồn tại',
  ER_NO_DEFAULT_FOR_FIELD: 'Thiếu thông tin',
  ER_NO_SUCH_TABLE: 'Internal Server Error'
}

export type UsersErrorMessage = keyof typeof UsersErrorMapping

export default class Users{
  static async createUser(user: TUser): Promise<TUser> {
    const connection = await database.connect()
    return new Promise((resolve, rej) => {
      const sql = `insert into users set ?`

      const today = new Date
      today.setHours(today.getHours() + 7)

      user.createdAt = today
      user.updatedAt = today

      connection.query({ sql, values: user }, (err, _results) => {
        if (err) return rej(err);
  
        const sql = "SELECT * FROM users where username=? and mail=?"
        connection.query({ sql, values: [user.username, user.mail] }, (err, res) => {
          if(err) return rej(err)
          return resolve(res[0])
        })
      })
    })
  }
  static async all(): Promise<TUser[]> {
    const connection = await database.connect()
    return new Promise((resolve, rej) => {
      const sql = "SELECT * FROM users "
      connection.query({ sql }, (err, res) => {
        if(err) return rej(err)
        return resolve(res)
      })
    })
  }
  static async getById(id: number): Promise<TUser> {
    const connection = await database.connect()
    return new Promise((resolve, rej) => {
      const sql = "SELECT * FROM users WHERE id=? "
      connection.query({ sql, values: [id] }, (err, res) => {
        if(err) return rej(err)
        return resolve(res[0])
      })
    })
  }
  static async updateUser(id: number, user: TUser): Promise<TUser> {
    const connection = await database.connect()
    return new Promise((resolve, rej) => {
      const sql = "UPDATE users SET ? WHERE id=? "

      const today = new Date
      today.setHours(today.getHours() + 7)

      user.updatedAt = today
      connection.query({ sql, values: [user, id] }, async (err, _res) => {
        if(err) return rej(err)
        const updatedUser = await Users.getById(id)
        return resolve(updatedUser)
      })
    })
  }
  static async deleteUser(id: number): Promise<TUser> {
    const connection = await database.connect()
    return new Promise(async (resolve, rej) => {
      const currentUser = await Users.getById(id)
      const sql = "DELETE FROM users WHERE id=?"

      connection.query({ sql, values: [id] }, (err, _res) => {
        if(err) return rej(err)
        return resolve(currentUser)
      })
    })
  }
  static async signIn(user: TUser): Promise<TUser> {
    const connection = await database.connect()
    return new Promise(async (resolve, rej) => {
      const sql = "SELECT * FROM users WHERE (username=? or mail=?) and password=?"

      connection.query({ sql, values: [user.username, user.mail, user.password] }, (err, res) => {
        if(err) return rej(err)

        if (res.length === 0) {
          return rej(new BaseError('username or passwort not correct'))
        }
        return resolve(res[0])
      })
    })
  }
}

