import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { AccountService } from "../_services/account.service";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { ValidationError } from "../_models/validation.error";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private accountService: AccountService,
        private router: Router
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(catchError(err => {
                if ([401, 403].includes(err.status) && this.accountService.userValue) {
                    this.accountService.logout();
                }

                let errorMessage = this.handleError(err.error);
                // const error = err.error; //?.message || err.error?.title;

                // console.error(error);
                return throwError(() => errorMessage);
            }))
    }

    private handleError(error :HttpErrorResponse) {
        if (error.status == 400) {
            return this.handleBadRequest(error);
        }
        return {title:"Unknown error", Errors: []}
    }

    private handleBadRequest(httpErrorResponse: HttpErrorResponse):ValidationError {
        let validationError: ValidationError = new ValidationError;
        if (this.router.url == '/signup') {
            validationError.Title = this.ExtractStringField(httpErrorResponse, 'Title');
            validationError.Errors = this.ExtractErrors(httpErrorResponse);
            console.log(validationError)
            return validationError;
        }
        else {
            validationError.Title = this.ExtractStringField(httpErrorResponse, 'Title');
            return validationError;
        }
    }

    private ExtractStringField(httpErrorResponse: HttpErrorResponse, name: string): string {
        return Object.entries(httpErrorResponse)
            .filter((item) => item[0].toLowerCase() == name.toLowerCase())
            .map((item) => item[1])
            .join(', ');
    }
    private ExtractErrors(httpErrorResponse: HttpErrorResponse) : Array<string> {
        let returnedErrors = Object.entries(httpErrorResponse)
        let filteredReturnedErrors = returnedErrors
            .filter((item) => item[0]==='errors')
            .map((item)=>item[1])[0]
        return Object.values(filteredReturnedErrors).flat().map((x)=>String(x)) //as Array<string>

    }

    // private handleBadRequest(httpErrorResponse: HttpErrorResponse) {
    //     console.log('I am in error.interceptor.ts');
    //     if (this.router.url == '/signup') {
    //         let message = '';

    //         let returnedErrors = Object.entries(httpErrorResponse)
    //         let filteredReturnedErrors = returnedErrors
    //             .filter((item) => item[0]==='errors')
    //             .map((item)=>item[1])[0]
    //         return Object.values(filteredReturnedErrors).flat()
    //     }
    //     else {
    //         return httpErrorResponse.error ? httpErrorResponse.error : httpErrorResponse.message;
    //     }
    // }
}
