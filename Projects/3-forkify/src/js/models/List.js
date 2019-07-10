import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    additem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count: count,
            unit: unit,
            ingredient: ingredient
        }
        this.items.push(item);
        return item;
    }

    removeitem(id) {
        //find which item has the id to remove
        const deleteIndex = this.items.findIndex(el => el.id === id);

        //[2, 4, 8] splice(1, 1) --> returns [4] origin array is [2, 8]
        //mutates the array for us
        if (deleteIndex !== -1) {
            this.items.splice(deleteIndex, 1);
        }

    }

    updateCount(id, newCount) {
        const index = this.items.findIndex(el => el.id === id);

        if (index !== -1) {
            this.items[index].count = newCount;
        }
    }
}