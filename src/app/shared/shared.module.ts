import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./components/header/header.component";
import { SpecialTextComponent } from "./components/special-text/special-text.component";
import { MaterialModule } from "../material/material.module";
import { ImgPlaceholderDirective } from "./directives/img-placeholder.directive";
import { AvatarAlbumComponent } from "./components/avatar-album/avatar-album.component";
import { AutoFocusDirective } from "./directives/auto-focus.directive";

@NgModule({
  declarations: [
    HeaderComponent,
    SpecialTextComponent,
    ImgPlaceholderDirective,
    AvatarAlbumComponent,
    AutoFocusDirective,
  ],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [
    HeaderComponent,
    SpecialTextComponent,
    ImgPlaceholderDirective,
    AutoFocusDirective,
  ],
})
export class SharedModule {}
