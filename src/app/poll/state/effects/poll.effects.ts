import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { QuestionService } from "../../services/question/question.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import * as PollActions from "../actions/poll.actions";
import * as AuthActions from "src/app/auth/state/actions/auth.actions";

@Injectable()
export class PollEffects {
  constructor(
    private actions$: Actions,
    private questionService: QuestionService,
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
      ofType(PollActions.getQuestions),
      mergeMap(() =>
        this.questionService.getAllQuestions().pipe(
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
      ofType(PollActions.SelectQuestion),
      mergeMap(({ questionId }) =>
        this.questionService.getQuestionById(questionId).pipe(
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
}
