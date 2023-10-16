import {IProfile} from "./profile.interface";

export interface IUser {
    id: number;
    email: string;
    is_active: boolean;
    last_login?: string;
    profile: IProfile;
}
