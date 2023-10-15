import {IComment} from "./comment.interface";
import {IGroup} from "./group.interface";
import {IProfile} from "./profile.interface";


export interface IOrder {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: number;
    age: number;
    course: string;
    course_format: string;
    course_type: string;
    status: string;
    sum: number;
    already_paid: number;
    created_at: string;
    group: IGroup;
    manager?: IProfile;
    msg?: string;
    utm?: string;
    comments: IComment[];
}