import { Component, OnInit } from '@angular/core';
import {
  GetUserService,
  GetAllMoviesService,
  RemoveFavoriteMovieService,
  DeleteUserService
} from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any = [];
  favorites: any = [];

  constructor(
    public fetchApiData: GetUserService,
    public fetchApiData2: GetAllMoviesService,
    public fetchApiData3: RemoveFavoriteMovieService,
    public fetchApiData4: DeleteUserService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  /**
   * This will run getUser() function on initialization
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * This gets user object from database and calls getMovies() function
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.getMovies();
    });
  }

  /**
   * This returns movies from database and calls filterFavorites() function
   */
  getMovies(): void {
    this.fetchApiData2.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.filterFavorites();
    });
  }

  /**
   * Filters movies into an array to match user's favorites
   * @returns {array}
   */
  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.user.FavouriteMovies.includes(movie._id)) {
        this.favorites.push(movie);
      }
    });
    return this.favorites;
  }

  /**
   * This removes movie from favorites and refreshes the window
   * @param id 
   * @param title 
   */
  removeFromFavorites(id: string, title: string): void {
    this.fetchApiData3.deleteFavoriteMovie(id).subscribe(() => {
      this.snackBar.open(
        `${title} has been removed from your Favorites`, 'OK', {
        duration: 2000,
      }
      );
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    });
  }

  /**
   * This function opens a dialog to update user's info
   */
  openUpdateProfileDialog(): void {
    this.dialog.open(UpdateProfileComponent, {
      width: '280px',
    });
  }

  /**
   * This function will ask if user wishes to delete their account first.
   * If they confirm then it will delete user's account and redirect to welcome page
   */
  deleteProfile(): void {
    let ok = confirm("Are you sure you want to delete your profile?\nThis action cannot be undone.");
    if (ok) {
      this.fetchApiData4.deleteUser().subscribe(
        (resp: any) => {
          this.snackBar.open(
            'Your account has successfully been deleted!',
            'OK',
            {
              duration: 2000,
            }
          );
          // Logs user out
          localStorage.clear();
        },
        (result) => {
          this.snackBar.open('Your account has successfully been deleted!', 'OK', {
            duration: 2000,
          });

          // Refreshes and redirects to welcome view
          this.router.navigate(['/welcome']);
        }
      );
    }
  }
}