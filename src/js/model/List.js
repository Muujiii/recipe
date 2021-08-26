import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    deleteItem(id) {
        // id gedeg ID-tei ortsiin indexiig massive-aas haij oloh
        const index = this.items.findIndex(el => el.id === id);

        // Ug index deerh elementiig massive-aas ustgana
        this.items.splice(index, 1);
    }

    addItem(item) {
        let newItem = {
            id : uniqid(),
            item : item
        };

        this.items.push(newItem);
        return newItem;
    }
}