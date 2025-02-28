class UI {
    input(setup) {
        const input = document.createElement("input")

        if (setup.hasOwnProperty("id")) input.id = setup.id
        if (setup.hasOwnProperty("type")) input.setAttribute("type", setup.type)
        if (setup.hasOwnProperty("placeholder")) input.setAttribute("placeholder", setup.placeholder)
        if (setup.hasOwnProperty("value")) input.setAttribute("value", setup.value)
        if (setup.hasOwnProperty("name")) input.name = setup.name
        if (setup.hasOwnProperty("class")) // Debe ser un array de cadenas
            for (const clase of setup.class)
                input.classList.add(clase)
        return input
    }

    select(setup) {
        const select = document.createElement("select")

        if (setup.hasOwnProperty("id")) select.id = setup.id
        if (setup.hasOwnProperty("class")) // Debe ser un array de cadenas
            for (const clase of setup.class)
                select.classList.add(clase)
        return select
    }

    div(setup) {
        const div = document.createElement("div")

        if (setup.hasOwnProperty("id")) div.id = setup.id
        if (setup.hasOwnProperty("class")) // Debe ser un array de cadenas
            for (const clase of setup.class)
                div.classList.add(clase)
        return div
    }

    button(setup) {
        const button = document.createElement("button")

        if (setup.hasOwnProperty("id")) button.id = setup.id
        if (setup.hasOwnProperty("text")) button.textContent = setup.text || ""
        if (setup.hasOwnProperty("class")) // Debe ser un array de cadenas
            for (const clase of setup.class)
                button.classList.add(clase)
        return button
    }

    ancla(setup) {
        const ancla = document.createElement("a")

        if (setup.hasOwnProperty("id")) ancla.id = setup.id
        if (setup.hasOwnProperty("href")) ancla.setAttribute("href", setup.href)
        if (setup.hasOwnProperty("target")) ancla.setAttribute("target", setup.target)
        if (setup.hasOwnProperty("text")) ancla.textContent = setup.text || ""
        if (setup.hasOwnProperty("class")) // Debe ser un array de cadenas
            for (const clase of setup.class)
                ancla.classList.add(clase)
        return ancla
    }

    parrafo(setup) {
        const parrafo = document.createElement("p")

        if (setup.hasOwnProperty("id")) parrafo.id = setup.id
        if (setup.hasOwnProperty("text")) parrafo.textContent = setup.text || ""
        if (setup.hasOwnProperty("html")) parrafo.innerHTML = setup.html || ""
        if (setup.hasOwnProperty("class")) // Debe ser un array de cadenas
            for (const clase of setup.class)
                parrafo.classList.add(clase)
        return parrafo
    }

    nav(setup) {
        const nav = document.createElement("nav")

        if (setup.hasOwnProperty("id")) nav.id = setup.id
        if (setup.hasOwnProperty("text")) nav.textContent = setup.text || ""
        if (setup.hasOwnProperty("class")) // Debe ser un array de cadenas
            for (const clase of setup.class)
                nav.classList.add(clase)
        return nav
    }

    encabezado(nivel, setup) {
        const heading = document.createElement(`h${nivel}`)

        if (setup.hasOwnProperty("id")) heading.id = setup.id
        if (setup.hasOwnProperty("text")) heading.textContent = setup.text || ""
        if (setup.hasOwnProperty("html")) heading.innerHTML = setup.html || ""
        if (setup.hasOwnProperty("class")) // Debe ser un array de cadenas
            for (const clase of setup.class)
                heading.classList.add(clase)
        return heading
    }

    footer(setup) {
        const footer = document.createElement("footer")

        if (setup.hasOwnProperty("id")) footer.id = setup.id
        if (setup.hasOwnProperty("text")) footer.textContent = setup.text || ""
        if (setup.hasOwnProperty("html")) footer.innerHTML = setup.html || ""
        if (setup.hasOwnProperty("class")) // Debe ser un array de cadenas
            for (const clase of setup.class)
                footer.classList.add(clase)
        return footer
    }

    // form(setup) {
    //     const formulario = document.createElement("form")

    //     if (setup.hasOwnProperty("id")) formulario.id = setup.id

    //     if (setup.hasOwnProperty("action")) formulario.action = setup["action"]
    //     else throw new Error("No se ha proporcionado la acción del formulario.")

    //     if (setup.hasOwnProperty("method")) formulario.method = setup.method
    //     else formulario.method = "GET"

    //     if (setup.hasOwnProperty("class")) // Debe ser un array de cadenas
    //         for (const clase of setup.class)
    //             formulario.classList.add(clase)

    //     return formulario
    // }

    // TODO: SE COMENTARION ALGUNAS PROPIEDADES PARA QUE NO SEAN OBLIGATORIAS
    form(setup) {
        const formulario = document.createElement("form")

        if (setup.hasOwnProperty("id")) formulario.id = setup.id

        if (setup.hasOwnProperty("action")) formulario.action = setup["action"]
        // else throw new Error("No se ha proporcionado la acción del formulario.")

        if (setup.hasOwnProperty("method")) formulario.method = setup.method
        // else formulario.method = "GET"

        if (setup.hasOwnProperty("class")) // Debe ser un array de cadenas
            for (const clase of setup.class)
                formulario.classList.add(clase)

        return formulario
    }

    label(setup) {
        const label = document.createElement("label")

        if (setup.hasOwnProperty("id")) label.id = setup.id
        if (setup.hasOwnProperty('for')) label.htmlFor = setup['for']
        if (setup.hasOwnProperty("text")) label.textContent = setup.text || ""
        if (setup.hasOwnProperty("class")) // Debe ser un array de cadenas
            for (const clase of setup.class)
                label.classList.add(clase)
        return label
    }

    caption(setup) {
        const caption = document.createElement("caption")

        if (setup.hasOwnProperty("id")) caption.id = setup.id
        if (setup.hasOwnProperty("text")) caption.textContent = setup.text || ""
        if (setup.hasOwnProperty("class")) // Debe ser un array de cadenas
            for (const clase of setup.class)
                caption.classList.add(clase)
        return caption
    }

    legend(setup) {
        const legend = document.createElement("legend")

        if (setup.hasOwnProperty("id")) legend.id = legend.id
        if (setup.hasOwnProperty("text")) legend.textContent = setup.text || ""
        if (setup.hasOwnProperty("class")) // Debe ser un array de cadenas
            for (const clase of setup.class)
                legend.classList.add(clase)
        return legend
    }

    button_icon(setup) {
        const button = document.createElement("button")

        if (setup.hasOwnProperty("icon")) {
            const icon = document.createElement("i")
            icon.classList.add("fas", `fa-${setup.icon}`)
            button.appendChild(icon)
        }

        if (setup.hasOwnProperty("text")) {
            const buttonText = document.createTextNode(` ${setup.text}`)
            button.appendChild(buttonText)
        }

        if (setup.hasOwnProperty("id")) button.id = setup.id
        if (setup.hasOwnProperty("class"))
            for (const clase of setup.class) 
                button.classList.add(clase)

        return button
    }

    imagen(setup){
        const imagen = document.createElement("img")

        if (setup.hasOwnProperty("id")) imagen.id = setup.id
        if (setup.hasOwnProperty("src")) imagen.src = setup.src
        if (setup.hasOwnProperty("alt")) imagen.alt = setup.alt
        if (setup.hasOwnProperty("class"))
            for (const clase of setup.class) 
                imagen.classList.add(clase)

        return imagen
    }
}