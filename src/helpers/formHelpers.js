function collectForm(form) {
    let data = {}
    let x = [...form.elements].forEach(item=> {
        if(!item.name) return
        data[item.name] = item.value
    })
    return x;
}

export {collectForm}