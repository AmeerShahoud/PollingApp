import { Injectable } from "@angular/core";
import * as db from "../../../db/_DATA.js";
import { from, map } from "rxjs";
import { User } from "../../models/user.js";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isLoggedIn = false;
  constructor() {}

  login() {}

  getUserById(id: string) {
    return from<Promise<{ [userId: string]: User }>>(db._getUsers()).pipe(
      map((users) => users[id])
    );
  }

  getAllUsers() {
    return from<Promise<{ [userId: string]: User }>>(db._getUsers());
  }
}
