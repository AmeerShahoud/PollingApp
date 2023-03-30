import { Injectable } from "@angular/core";
import * as db from "../../../db/_DATA.js";
import { from, map } from "rxjs";
import { User } from "../../models/user.js";

type UsersData = Promise<{ [userId: string]: User }>;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}

  login() {}

  getUserById(id: string) {
    return from<UsersData>(db._getUsers()).pipe(map((users) => users[id]));
  }

  getAllUsers() {
    return from<UsersData>(db._getUsers()).pipe(
      map((users) => {
        let _users: User[] = [];
        for (let id in users) _users.push(users[id]);
        return _users;
      })
    );
  }
}
