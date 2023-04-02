import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as PollSelectors from "../../state/selectors/poll.selectors";
import { ActivatedRoute } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import * as PollActions from "../../state/actions/poll.actions";
import { AuthorQuestion } from "../../models/author-question";

@Component({
  selector: "app-question-page",
  templateUrl: "./question-page.component.html",
  styleUrls: ["./question-page.component.css"],
})
export class QuestionPageComponent implements OnInit, OnDestroy {
  isLoading$ = this.store.select(PollSelectors.selectIsLoading);
  error$ = this.store.select(PollSelectors.selectError);
  selectedAuthorQuestion$ = this.store.select(
    PollSelectors.selectSelectedAuthorQuestion
  );
  IsSelectedQuestionAnswered$ = this.store.select(
    PollSelectors.selectIsSelectedQuestionAnswered
  );

  private destroySubscriptions = new Subject();

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroySubscriptions))
      .subscribe((params) => {
        const questionId = params.get("id")!;
        this.store.dispatch(PollActions.SelectQuestion({ questionId }));
      });
  }

  ngOnDestroy() {
    this.destroySubscriptions.complete();
  }
}
