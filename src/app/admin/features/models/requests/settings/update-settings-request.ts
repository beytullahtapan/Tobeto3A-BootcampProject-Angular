export interface UpdateSettingsRequest {
    Id: string; 
    title: string;
    description:string;
    keywords:string;
    email :string;
    phone: Date;
    googleSiteKey:string;
    googleSecretKey:string;
    googleAnalytics:string;
    logoUrl:string;
    LogoFile:File;
    faviconUrl:string;
    FaviconFile: File;
    maintenanceMode:boolean;
    termsOfUse:string;
    privacyPolicy:string;
    updatedDate:Date;
}
