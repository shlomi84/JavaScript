export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = {
            id: id,
            title: title,
            author: author,
            img: img
        }
        this.likes.push(like);

        //save to local storage
        this.persistData();

        return like;
    }

    deleteLike(id) {
        // find index of item w/ id
        const index = this.likes.findIndex(el => el.id === id);

        //if found, delete item from array
        if (index !== -1) {
            this.likes.splice(index, 1);
        }

        //save to local storage
        this.persistData();
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));
        
        //restore likes from local storage
        if (storage) {
            this.likes = storage;
        }
    }
}