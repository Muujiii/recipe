export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, publisher,img) {
        const like = {id, title, publisher, img};
        this.likes.push(like);
        return like;
    }

    deleteLike (id) {
        // id gedeg ID tei like-iin index iig arraygaar haij oloh
        const index = this.likes.findIndex(el => el.id === id);
        // Ug indextei elementiig massivaas ustgana
        this.likes.splice(index, 1);
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }


    getNumberOfLikes() {
        return this.likes.length;
    }
}