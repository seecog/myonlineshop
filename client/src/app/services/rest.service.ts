import { Http } from "@angular/http";
import { Injectable } from "@angular/core";


@Injectable()
export class RestService {

constructor(private http : Http){

}

get(link){
return this.http.get(link).toPromise();
}

post(link,data){
return this.http.post(link,data).toPromise();
}

put(link,data){
return this.http.put(link,data).toPromise();
}

delete(link){
return this.http.delete(link).toPromise();
}

}