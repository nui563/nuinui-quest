class SaveData {
    data = new Object;
    
    getItem = id => this.data[id];

    setItem = (id, value) => this.data[id] = value;

    save = slot => localStorage.setItem(`nuinui-save-${slot}`, JSON.stringify(this.data));

    load = slot => this.data = JSON.parse(localStorage.getItem(`nuinui-save-${slot}`));

    delete = slot => localStorage.removeItem(`nuinui-save-${slot}`);

    getOpt = id => localStorage.getItem(`nuinui-opt-${id}`);

    setOpt = (id, value) => localStorage.setItem(`nuinui-opt-${id}`, value);
}