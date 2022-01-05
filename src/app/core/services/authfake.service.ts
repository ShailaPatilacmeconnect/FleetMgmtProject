import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import jwt_decode from "jwt-decode";
import { User } from '../models/auth.models';
import { environment } from 'src/environments/environment';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { EventService } from './event.service';

@Injectable({ providedIn: 'root' })
export class AuthfakeauthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public apiStatusHandler=new Subject<any>();
    private currentstatusSubject: BehaviorSubject<User>;
    public currentstatus: Observable<User>;
    constructor(private http: HttpClient,private eventService: EventService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.currentstatusSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentstatus')));
        this.currentstatus = this.currentstatusSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    public get currentstatusvalue(): any {
        return this.currentstatusSubject.value;
    }
    
    public getApiLoaderStatus()
    {
      return this.apiStatusHandler.asObservable();
    }
    public setApiLoaderStatus()
    {
      this.apiStatusHandler.next({show:false});

    }
    forgot(email: string) {
        this.apiStatusHandler.next({show:true});
        let formData=new FormData();
        formData.append('email',email)
        return this.http.post<any>(environment.baseurl+'auth/forgotPassword', formData)
                   .pipe(map(res => {
            this.apiStatusHandler.next({show:false});
                return res;
            }));
    }
    resetPassword(password: string,confirm_password:string,token:string) {
        this.apiStatusHandler.next({show:true});
        let formData=new FormData();
        formData.append('password',password);
        formData.append('confirm_password',confirm_password);
        formData.append('token',token);

        return this.http.post<any>(environment.baseurl+'auth/resetPassword', formData)
                   .pipe(map(res => {
            this.apiStatusHandler.next({show:false});
                return res;
            }));
    }
    login(form) {
        this.apiStatusHandler.next({show:true});
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type' : 'application/json',
              'Access-Control-Allow-Origin':'*',
            })
          };
        return this.http.post<any>(environment.baseurl+'auth/login', JSON.stringify(form),httpOptions)
                   .pipe(map(res => {
            this.apiStatusHandler.next({show:false});
                // login successful if there's a jwt token in the response
                if (res['status']==true) {
                    let decoded_value:any=jwt_decode(res['data'])
                    console.log(decoded_value)
                    decoded_value['token']=res['data'];
                    if(res['logo_path']!='')
                    localStorage.setItem('user_logo',res['logo_path']);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                     localStorage.setItem('currentUser', JSON.stringify(decoded_value));
                    this.currentUserSubject.next(decoded_value);
                }
                return res;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.clear();
        this.currentUserSubject.next(null);
        // location.reload()
    }
    getFile( url) {
        this.apiStatusHandler.next({show:true});
        const httpOptions = {
            responseType: 'blob' as 'json',
        }
        return this.http.get<any>(environment.baseurl+url, httpOptions)
                      .pipe(map(res => {
            this.apiStatusHandler.next({show:false});
            // login successful if there's a jwt token in the response
            if (res['status']==true) {
             
            }
            console.log(res)
            return res;
        }));
    }
    post( url,body) {
        this.apiStatusHandler.next({show:true});
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type' : 'application/json',
              'Access-Control-Allow-Origin':'*',
            })
          };
        return this.http.post<any>(environment.baseurl+url,JSON.stringify(body),httpOptions)
                   .pipe(map(res => {
            this.apiStatusHandler.next({show:false});

                return res;
            }));
    }
    put( url,body) {
        this.apiStatusHandler.next({show:true});
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type' : 'application/json',
              'Access-Control-Allow-Origin':'*',
            })
          };
        return this.http.put<any>(environment.baseurl+url,JSON.stringify(body),httpOptions)
                   .pipe(map(res => {
            this.apiStatusHandler.next({show:false});

                return res;
            }));
    }
    putMultipart( url,body) {
        this.apiStatusHandler.next({show:true});

        return this.http.put<any>(environment.baseurl+url,body)
                   .pipe(map(res => {
            this.apiStatusHandler.next({show:false});

                return res;
            }));
    }
    postMultipart( url,body) {
        this.apiStatusHandler.next({show:true});

        return this.http.post<any>(environment.baseurl+url,body)
                   .pipe(map(res => {
            this.apiStatusHandler.next({show:false});

                return res;
            }));
    }
    get( url) {
        console.log(url)
        this.apiStatusHandler.next({show:true});

        return this.http.get<any>(environment.baseurl+url)
                      .pipe(map(res => {
            this.apiStatusHandler.next({show:false});
            if (res['status']==true) {
             
            }
            return res;
        }));
    }
    delete( url) {
        return this.http.delete<any>(environment.baseurl+url)
                      .pipe(map(res => {
            this.apiStatusHandler.next({show:false});
            // login successful if there's a jwt token in the response
            if (res['status']==true) {
             
            }
            return res;
        }));
    }
    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n)
    
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
    
        return new File([u8arr], filename, { type: mime })
      }

}
