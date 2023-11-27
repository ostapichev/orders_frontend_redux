import {IRes} from "../types";

import {axiosService} from "./axios.service";
import {IComment} from "../interfaces";
import {urls} from "../constants";

class CommentService {
    create(order_id: string, comment: IComment): IRes<IComment> {
        return axiosService.post(urls.commentsApi.createComment(order_id), comment);
    };
    getAll(order_id: string, order_by='-id'): IRes<IComment[]> {
        return axiosService.get(urls.commentsApi.createComment(order_id), {
            params: {order_by}
        });
    }
}

export const commentService = new CommentService();
