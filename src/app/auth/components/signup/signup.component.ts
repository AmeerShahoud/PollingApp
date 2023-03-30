import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Subject, Subscription, takeUntil } from "rxjs";
import { AvatarAlbumComponent } from "src/app/shared/components/avatar-album/avatar-album.component";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnDestroy {
  avatarUrl?: string;
  destroySubscriptions = new Subject();

  signUpForm = this.fb.nonNullable.group({
    firstName: ["", [Validators.required, Validators.pattern(/[a-zA-z]+/g)]],
    lastName: ["", [Validators.required, Validators.pattern(/[a-zA-z]+/g)]],
  });

  get firstName() {
    return this.signUpForm.controls.firstName;
  }

  get lastName() {
    return this.signUpForm.controls.lastName;
  }

  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

  openAvatarDialog() {
    this.dialog
      .open<AvatarAlbumComponent, any, string>(AvatarAlbumComponent, {
        width: "80%",
      })
      .afterClosed()
      .pipe(takeUntil(this.destroySubscriptions))
      .subscribe((url) => {
        this.avatarUrl = url || this.avatarUrl;
      });
  }

  onSignUp() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAsTouched();
      return;
    }
  }

  ngOnDestroy(): void {
    this.destroySubscriptions.complete();
  }
}
