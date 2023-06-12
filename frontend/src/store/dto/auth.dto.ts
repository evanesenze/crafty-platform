export type LoginDto = {
    email: string;
    password: string;
};

export type RefreshTokenDto = {
    refreshToken: string;
};

export type RegisterDto = {
    email: string;
    password: string;
    same_password: string;
};
