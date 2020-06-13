import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(query => {
      if (!query.code || !query.state) {
        return null;
      }
      this.authService.updateToken(query.code).subscribe(payload => {
        localStorage.setItem('token', payload.access_token);
        localStorage.setItem('payload', JSON.stringify(payload));
        this.router.navigate(['/']).then(r => {
          console.error(r);
        });
      }, (err => {
        this.router.navigate(['/login']).then(r => {
          console.error([err, r]);
        });
      }));
    });
  }

}
