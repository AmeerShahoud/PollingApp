import { createReducer, on } from "@ngrx/store";
import * as AuthActions from "../actions/auth.actions";
import { User } from "../../models/user";

export const authFeatureKey = "auth";

export interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User | null;
  allUsers: User[];
  error: string | null;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  isLoading: false,
  user: null,
  allUsers: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({ ...state, isLoading: true })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    isLoading: false,
    user,
    isLoggedIn: true,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(AuthActions.signUp, (state) => ({ ...state, isLoading: true })),
  on(AuthActions.signUpSuccess, (state, { user }) => ({
    ...state,
    isLoading: false,
    user,
    isLoggedIn: true,
  })),
  on(AuthActions.signUpFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    isLoggedIn: false,
    user: null,
  })),
  on(AuthActions.getAllUsers, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(AuthActions.getUpdatedUsers, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(AuthActions.getAllUsersSuccess, (state, { users }) => ({
    ...state,
    isLoading: false,
    allUsers: users,
  })),
  on(AuthActions.getAllUsersFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);
