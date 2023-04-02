import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject, combineLatest, takeUntil } from "rxjs";
import * as PollActions from "../../state/actions/poll.actions";
import * as PollSelectors from "../../state/selectors/poll.selectors";
import * as AuthSelectors from "../../../auth/state/selectors/auth.selectors";
@Component({
  selector: "app-question-page",
  templateUrl: "./question-page.component.html",
  styleUrls: ["./question-page.component.css"],
})
export class QuestionPageComponent implements OnInit, OnDestroy {
  isLoading = false;
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
        this.store.dispatch(PollActions.selectQuestion({ questionId }));
      });

    combineLatest(
      this.store.select(PollSelectors.selectIsLoading),
      this.store.select(AuthSelectors.selectIsLoading)
    )
      .pipe(takeUntil(this.destroySubscriptions))
      .subscribe(
        (isLoading) => (this.isLoading = isLoading[0] || isLoading[1])
      );
  }

  ngOnDestroy() {
    this.destroySubscriptions.complete();
  }
}
