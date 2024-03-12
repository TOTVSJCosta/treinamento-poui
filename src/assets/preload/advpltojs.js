function advplToJs(key, value) {
    if (key == 'setAPIInfo') {
        localStorage.setItem('setAPIInfo', value);
    } else if (key == 'getAllProducts') {
        //alert(value);
    } else if (key == 'getAllClientes') {
        //alert(value);
        localStorage.setItem('getAllClientes', value);
    } else if (key == 'userInfo') {
        alert(value);
        localStorage.setItem('userInfo', value);
    }
}