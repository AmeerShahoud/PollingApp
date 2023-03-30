import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./components/header/header.component";
import { SpecialTextComponent } from "./components/special-text/special-text.component";
import { MaterialModule } from "../material/material.module";
import { ImgPlaceholderDirective } from "./directives/img-placeholder.directive";
import { AvatarAlbumComponent } from './components/avatar-album/avatar-album.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SpecialTextComponent,
    ImgPlaceholderDirective,
    AvatarAlbumComponent,
  ],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [HeaderComponent, SpecialTextComponent, ImgPlaceholderDirective],
})
export class SharedModule {}
