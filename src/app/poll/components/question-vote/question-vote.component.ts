import { Component, Input } from "@angular/core";
import { AuthorQuestion } from "../../models/author-question";
import * as AuthSelectors from "src/app/auth/state/selectors/auth.selectors";
import { Store } from "@ngrx/store";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-question-vote",
  templateUrl: "./question-vote.component.html",
  styleUrls: ["./question-vote.component.css"],
})
export class QuestionVoteComponent {
  @Input("question") authorQuestion!: AuthorQuestion;
  user$ = this.store.select(AuthSelectors.selectUser);
  answer = new FormControl("", [Validators.required]);

  constructor(private store: Store) {}
}
