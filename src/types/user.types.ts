export interface newUser{
    firstName:string,
    lastName:string,
    userName:string,
    passwordHash:string,
    phoneNumber:string,
    emailAddress:string,
    profileImage?:string,
    userRole:string
    verificationCode?:string
}

export interface updateUser {
    firstName?:string,
    lastName?:string,
    userName?:string,
    passwordHash?:string,
    phoneNumber?:string,
    emailAddress?:string,
    profileImage?:string,      
}