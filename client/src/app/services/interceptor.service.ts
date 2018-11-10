
import {HttpInterceptor, HttpHandler, HttpEvent,HttpRequest} from '@angular/common/http';
// import { HttpRequest } from 'selenium-webdriver/http';
import { Observable } from 'rxjs';
export class InterceptorService implements HttpInterceptor{


intercept(req : HttpRequest<any>, handler : HttpHandler): Observable<HttpEvent<any>>{
    var cloneReq = req.clone({
        setHeaders : {
            'token' : localStorage.getItem('token')
        }
        
    });
    
return handler.handle(cloneReq);
}

}