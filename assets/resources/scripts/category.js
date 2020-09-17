class Category {
    constructor(id, name, icon) {
        this.id = id;
        this._name = name;
        this.icon = icon;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }
}