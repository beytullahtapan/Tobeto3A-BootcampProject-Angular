import { provideRouter } from "@angular/router";
import { AuthBaseService } from "../../features/services/abstracts/auth-base.service";
import { AuthService } from "../../features/services/concretes/auth.service";
import { routes } from "../../app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { authInterceptor } from "../../core/interceptors/auth/auth.interceptor";

export function getAppProviders(){
    const authServiceProviders={
        provide:AuthBaseService,
        useClass:AuthService
    };

    return [
        authServiceProviders,
        provideRouter(routes),
        provideHttpClient(withInterceptors([authInterceptor]))
    ]
}