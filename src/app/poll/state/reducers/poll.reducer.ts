import { createReducer, on } from "@ngrx/store";
import { Question } from "../../models/question";
import * as PollActions from "../actions/poll.actions";
export const pollFeatureKey = "poll";

export interface PollState {
  isLoading: boolean;
  selectedQuestion: Question | null;
  allQuestions: Question[];
  error: string | null;
}

export const initialState: PollState = {
  isLoading: false,
  selectedQuestion: null,
  allQuestions: [],
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(PollActions.getQuestions, (state) => ({ ...state, isLoading: true })),
  on(PollActions.getQuestionsSuccess, (state, { questions }) => ({
    ...state,
    isLoading: false,
    error: null,
    allQuestions: questions,
  })),
  on(PollActions.getQuestionsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(PollActions.SelectQuestion, (state) => ({ ...state, isLoading: true })),
  on(PollActions.selectQuestionSuccess, (state, { selectedQuestion }) => ({
    ...state,
    isLoading: false,
    error: null,
    selectedQuestion,
  })),
  on(PollActions.selectQuestionFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);
