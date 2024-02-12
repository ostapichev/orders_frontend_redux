export interface IParams {
    page?: string;
    order_by?: string;
    name?: string;
    surname?: string;
    email?: string;
    phone?: string;
    age?: string;
    course?: string;
    course_format?: string;
    course_type?: string;
    status_in?: string;
    group?: string;
    created_at_after?: string;
    created_at_before?: string;
    manager?: string;
    [key: string]: string | undefined;
}
