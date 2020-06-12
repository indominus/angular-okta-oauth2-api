import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent implements OnInit {

  constructor(private authService: AuthService, private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.queryParams.subscribe(query => {
      if (!query.code || !query.state) {
        return null;
      }
      this.authService.updateToken(query.code).subscribe(payload => {
        localStorage.setItem('token', payload.access_token);
        localStorage.setItem('payload', JSON.stringify(payload));
      });
    });
  }

}
