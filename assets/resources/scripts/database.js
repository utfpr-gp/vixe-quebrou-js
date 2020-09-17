let database = {
    get: function (key) {
        return JSON.parse(localStorage.getItem(key));
    },
    set: function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    getArray: function (key) {
        if (localStorage.getItem(key) == undefined) {
            localStorage.setItem(key, JSON.stringify([]));
        }
        return JSON.parse(localStorage.getItem(key));
    },
    setArray: function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    saveItemArray: function (keyCollection, value) {
        let collection = this.getArray(keyCollection);
        collection.push(value);
        this.setArray(keyCollection, collection);
    },
    removeItemArray: function (keyCollection, value) {
        let collection = this.getArray(keyCollection);
        let indexToRemove = -1;
        for (let i in collection) {
            if (collection[i].id == value) {
                indexToRemove = i;
                break;
            }
        }

        if (indexToRemove < 0) {
            return false;
        }
        collection.splice(indexToRemove, 1);
        this.setArray(keyCollection, collection);
        return true;
    },
    sequenceId: function (key) {
        return this.getArray(key).length;
    }
}