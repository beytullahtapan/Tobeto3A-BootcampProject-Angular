import { provideRouter } from "@angular/router";
import { AuthBaseService } from "../../features/services/abstracts/auth-base.service";
import { AuthService } from "../../features/services/concretes/auth.service";
import { routes } from "../../app.routes";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { authInterceptor } from "../../core/interceptors/auth/auth.interceptor";
import { provideToastr } from "ngx-toastr";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { CachingInterceptors } from "../../core/interceptors/cache/caching.interceptor";
import { ErrorInterceptors } from "../../core/interceptors/error/error.interceptor";
import { LoggingInterceptor } from "../../core/interceptors/logging/log.interceptor";
import { ChatBaseService } from "../../features/services/abstracts/chat-base.service";
import { ChatService } from "../../features/services/concretes/chat.service";
import { ChatHubService } from "../../features/services/concretes/chat-hub.service";

export function getAppProviders(){
    const authServiceProviders={
        provide:AuthBaseService,
        useClass:AuthService
    };

    const chatServiceProviders={
        provide:ChatBaseService,
        useClass:ChatService
    };


    return [
        authServiceProviders,
        chatServiceProviders,
        ChatHubService,
        provideAnimationsAsync(), // required animations providers
        provideToastr(), //Toastr providers
        provideRouter(routes),
        provideHttpClient(withInterceptors([authInterceptor,CachingInterceptors,ErrorInterceptors,LoggingInterceptor]))
    ]
}