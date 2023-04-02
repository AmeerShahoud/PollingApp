import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { AuthorQuestion } from "../../models/author-question";
import * as AuthSelectors from "src/app/auth/state/selectors/auth.selectors";
import { Store } from "@ngrx/store";
import { FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import * as PollActions from "../../state/actions/poll.actions";
import { Subject, takeUntil } from "rxjs";
import { User } from "src/app/auth/models/user";

@Component({
  selector: "app-question-vote",
  templateUrl: "./question-vote.component.html",
  styleUrls: ["./question-vote.component.css"],
})
export class QuestionVoteComponent implements OnInit, OnDestroy {
  @Input("question") authorQuestion!: AuthorQuestion;
  user!: User | null;
  answer = new FormControl("", [Validators.required]);

  private destroySubscriptions = new Subject();

  constructor(private store: Store, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.store
      .select(AuthSelectors.selectUser)
      .pipe(takeUntil(this.destroySubscriptions))
      .subscribe((user) => (this.user = user));
  }

  onSave() {
    if (this.answer.invalid) {
      this.snackBar.open("Choose an answer to continue.");
      return;
    }
    if (this.user && this.authorQuestion.question) {
      this.store.dispatch(
        PollActions.saveQuestionAnswer({
          authedUserId: this.user.id,
          questionId: this.authorQuestion.question.id,
          answer: this.answer.value as "optionOne" | "optionTwo",
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.destroySubscriptions.complete();
  }
}
