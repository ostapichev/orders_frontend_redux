export interface IParams {
    page?: string;
    order_by?: string;
    name_contains?: string;
    surname_contains?: string;
    email_contains?: string;
    phone_contains?: string;
    age_in?: string;
    course?: string;
    course_format?: string;
    course_type?: string;
    status_in?: string;
    group?: string;
    created_at_after?: string;
    created_at_before?: string;
    manager?: string;
}
