export interface UpdateSettingsRequest {
    Id: string; 
    Title: string;
    Description:string;
    Keywords:string;
    Email :string;
    Phone: Date;
    GoogleSiteKey:string;
    GoogleSecretKey:string;
    GoogleAnalytics:string;
    LogoUrl:string;
    LogoFile:File;
    FaviconUrl:string;
    FaviconFile: File;
    MaintenanceMode:boolean;
    TermsOfUse:string;
    PrivacyPolicy:string;
    updatedDate:Date;
}
