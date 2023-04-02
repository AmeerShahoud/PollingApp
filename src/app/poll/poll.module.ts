import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PollRoutingModule } from "./poll-routing.module";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { StoreModule } from "@ngrx/store";
import * as fromPoll from "./state/reducers/poll.reducer";
import { EffectsModule } from "@ngrx/effects";
import { PollEffects } from "./state/effects/poll.effects";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";
import { QuestionListComponent } from './components/question-list/question-list.component';
import { QuestionListItemComponent } from './components/question-list-item/question-list-item.component';
import { QuestionPageComponent } from './pages/question-page/question-page.component';
import { QuestionVoteComponent } from './components/question-vote/question-vote.component';
import { QuestionStatisticsComponent } from './components/question-statistics/question-statistics.component';

@NgModule({
  declarations: [HomePageComponent, QuestionListComponent, QuestionListItemComponent, QuestionPageComponent, QuestionVoteComponent, QuestionStatisticsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    StoreModule.forFeature(fromPoll.pollFeatureKey, fromPoll.reducer),
    EffectsModule.forFeature([PollEffects]),
    PollRoutingModule,
  ],
})
export class PollModule {}
