class SaveData {
    data = new Object;
    
    getItem = id => this.data[id];

    setItem = (id, value) => this.data[id] = value;

    save = slot => globalThis.localStorage.setItem(`nuinui-save-${slot}`, JSON.stringify(this.data));

    load = slot => this.data = JSON.parse(globalThis.localStorage.getItem(`nuinui-save-${slot}`));

    delete = slot => globalThis.localStorage.removeItem(`nuinui-save-${slot}`);

    getOpt = id => globalThis.localStorage.getItem(`nuinui-opt-${id}`);

    setOpt = (id, value) => globalThis.localStorage.setItem(`nuinui-opt-${id}`, value);
}

export { SaveData };
