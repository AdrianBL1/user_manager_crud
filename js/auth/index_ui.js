class index_ui {
	constructor(reset = false) {
		if (reset) {
			this.body = document.body
			this.main = document.querySelector("main")
			this.main.append(ui.div({ id: "formulario" }))
			this.formulario = document.querySelector("#formulario")
			this.formulario.append(ui.parrafo({html: "<img src='favicon.ico' height='70px'>", class: ["logo__icono"]}))

			this.elementos_auth = ["login", "pwd"]

			for (const campo of this.elementos_auth) {
				switch (campo) {
					case "login": this.formulario.append(ui.input({ id: "login", type: "text", placeholder: "Login" }))
						break
					case "pwd": this.formulario.append(ui.input({ id: "pwd", type: "password", placeholder: "Contraseña" }))
						break
				}

				// Creo el atributo en la vista
				this[campo] = document.querySelector("#" + campo)
			}

			this.main.append(ui.div({ id: "registro" }))
			this.registro = document.querySelector("#registro")
			this.registro.append(ui.ancla({ id: "irRegistrar", href: "/altas", text: "Registrar nuevo usuario" }))

			// Agrego el botón de procesar (Se muestra u oculta automáticamente)
			this.Procesar_Auth()
		}
	}

	Procesar_Auth() {
		// Creo el control
		// this.main.append(ui.input({id:"procesar_auth", type:"button", value:"Iniciar Sesion", class:["oculto"]}))
		this.main.append(ui.input({id:"procesar_auth", type:"button", value:"Iniciar Sesion"}))

		// Creo el atributo en la vista
		this.procesar_auth = document.querySelector("#procesar_auth")

		// Fijo el evento click
		this.procesar_auth.addEventListener("click", this.consulta_click)
	}

	consulta_click(e) {
		e.preventDefault() // Detengo la propagación del evento
		console.log(vista.recuperar())
		self.EXISTE(vista.recuperar())  // Validará el controlador
	}

	recuperar() {
		return {
			login: vista.login.value,
			pwd: vista.pwd.value,
		}
	}

	actualizar(data) {
		this.login.value = data.login
		this.pwd.value = data.pwd
	}
}