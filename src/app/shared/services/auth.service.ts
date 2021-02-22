import { Injectable } from '@angular/core';
import { UserManager, User, UserManagerSettings } from 'oidc-client';
import { Constants } from '../constants';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userManager: UserManager;
  private _user: User | null;
  private _loginChangedSubject = new Subject<boolean>();
  public loginChanged = this._loginChangedSubject.asObservable();

  private get idpSettings(): UserManagerSettings {
    return {
      authority: Constants.idpAuthority,
      client_id: Constants.clientId,
      redirect_uri: `${Constants.clientRoot}/auth-callback`,
      scope: "openid profile",
      response_type: "code",
      post_logout_redirect_uri: `${Constants.clientRoot}/signout-callback`
    }
  }
  constructor() {
    this._userManager = new UserManager(this.idpSettings);

    this._userManager.getUser().then(user => {
      this._user = user;
      this._loginChangedSubject.next(this.isAuthenticated());
    })
  }

  public login = () => {
    return this._userManager.signinRedirect();
  }

  isAuthenticated(): boolean {
    return this._user !== null && !this._user.expired;
  }

  async completeAuthentication() {
    this._user = await this._userManager.signinRedirectCallback();
    this._loginChangedSubject.next(this.isAuthenticated());
  }


}
