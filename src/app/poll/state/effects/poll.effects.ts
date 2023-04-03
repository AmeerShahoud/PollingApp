import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { QuestionService } from "../../services/question/question.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import * as PollActions from "../actions/poll.actions";
import * as AuthActions from "src/app/auth/state/actions/auth.actions";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/services/auth/auth.service";

@Injectable()
export class PollEffects {
  constructor(
    private actions$: Actions,
    private questionService: QuestionService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  startGetQuestionsEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess, AuthActions.signUpSuccess),
      mergeMap(() => of(PollActions.getQuestions()))
    )
  );

  getQuestionsEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(PollActions.getQuestions, PollActions.saveQuestionAnswerSuccess),

      mergeMap(() =>
        this.questionService.getAllQuestions().pipe(
          // tap((questions) => console.log(questions)),
          map((questions) => PollActions.getQuestionsSuccess({ questions })),
          catchError((err) => {
            this.snackBar.open(`Error loading questions data!`);
            return of(PollActions.getQuestionsFailure({ error: err.message }));
          })
        )
      )
    )
  );

  selectQuestionEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(PollActions.selectQuestion, PollActions.saveQuestionAnswerSuccess),
      mergeMap(({ questionId }) =>
        this.questionService.getQuestionById(questionId).pipe(
          // tap((question) => console.log(question)),
          map((question) =>
            PollActions.selectQuestionSuccess({ selectedQuestion: question })
          ),
          catchError((err) => {
            this.snackBar.open(err.message);
            return of(
              PollActions.selectQuestionFailure({ error: err.message })
            );
          })
        )
      )
    )
  );

  saveQuestionAnswerEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(PollActions.saveQuestionAnswer),
      mergeMap(({ authedUserId, questionId, answer }) =>
        this.questionService
          .saveQuestionAnswer(authedUserId, questionId, answer)
          .pipe(
            map(() => {
              return PollActions.saveQuestionAnswerSuccess({ questionId });
            }),
            tap(() => {
              this.snackBar.open("Your answer saved Successfully");
            }),
            catchError((err) => {
              this.snackBar.open(err.message);
              return of(
                PollActions.saveQuestionAnswerFailure({ error: err.message })
              );
            })
          )
      )
    )
  );

  updateUserPollDataEffect = createEffect(() =>
    this.actions$.pipe(
      ofType(PollActions.saveQuestionAnswerSuccess),
      mergeMap(() => of(AuthActions.getUpdatedUserPollData()))
    )
  );
}
