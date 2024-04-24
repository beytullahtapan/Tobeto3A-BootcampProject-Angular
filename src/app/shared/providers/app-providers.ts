import { provideRouter } from "@angular/router";
import { AuthBaseService } from "../../features/services/abstracts/auth-base.service";
import { AuthService } from "../../features/services/concretes/auth.service";
import { routes } from "../../app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { authInterceptor } from "../../core/interceptors/auth/auth.interceptor";
import { provideToastr } from "ngx-toastr";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

export function getAppProviders(){
    const authServiceProviders={
        provide:AuthBaseService,
        useClass:AuthService
    };

    return [
        authServiceProviders,
        provideAnimationsAsync(), // required animations providers
        provideToastr(), //Toastr providers
        provideRouter(routes),
        provideHttpClient(withInterceptors([authInterceptor]))
    ]
}