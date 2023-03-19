import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private login:LoginService){}
    
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler //after getting a request it will forward ahead with the help of next
        ):Observable<HttpEvent<any>> {
        // add the jwt token (localstorage )request
        let authreq=req;
        const token=this.login.getToken();
        console.log('inside interceptor');
        if(token != null){
            authreq=authreq.clone({
                setHeaders:{Authorization: `Bearer ${token}`},
            })
        }
        return next.handle(authreq);
    }

}

export const authInterceptorProviders=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi: true,

    },
]

//intercepetors -- so we can intercept each http request and add authorization header into it
