class bajas_ui {
	constructor() {
		this.body = document.body
		this.main = document.querySelector("main")
		this.elementos = ["nombre"]
	}

	esElemento(elemento){
		return this.elementos.includes(elemento)
	}

	// TODO: CONFIG
	configuracion() {

		// Config. Header
		const header = document.createElement("header")
		this.body.appendChild(header)

		// Crear Contenedor
		this.header = document.querySelector("header")

		//NUEVA NAVBAR
		this.header.append(ui.div({class:["navbar"]}))
		this.navbar = document.querySelector(".navbar")
		
		//LOGO
		this.navbar.append(ui.div({class: ["logo"]}))
		this.logo = document.querySelector(".logo")
		this.logo.append(ui.imagen({src: "favicon.ico", alt: "Logo"}))
		this.logo.append(ui.ancla({ href: "#", text: "CRUD"}))

		//NAV
		this.navbar.append(ui.div({class: ["menu"]}))
		this.menu = document.querySelector(".menu")
		this.menu.append(ui.ancla({ href: "/dashboard", text: "Dashboard"}))
		this.menu.append(ui.ancla({ href: "/altas", text: "Altas"}))
		this.menu.append(ui.ancla({ href: "/bajas", text: "Bajas"}))
		this.menu.append(ui.ancla({ href: "/cambios", text: "Cambios"}))
		this.menu.append(ui.ancla({ href: "/consultas", text: "Consultas"}))

		//PERFIL
		this.navbar.append(ui.div({class:["perfil"]}))
		this.perfil = document.querySelector(".perfil")
		this.perfil.append(ui.div({class:["contenido-perfil"]}))
		this.contenidoPerfil = document.querySelector(".contenido-perfil")
		this.contenidoPerfil.append(ui.parrafo({id:"nombreUsuario", text: sessionStorage.getItem("usuario")}))
		this.nombreUsuario = document.querySelector("#nombreUsuario")
		this.contenidoPerfil.append(ui.imagen({id:"fotoPerfil", src: "img/user.png", alt: "Usuario"}))
		this.perfil.append(ui.div({class:["desplegable"]}))
		this.desplegable = document.querySelector(".desplegable")
		// this.desplegable.append(ui.ancla({ href: "/perfil", text: "Perfil"}))
		// this.desplegable.append(ui.ancla({ href: "#", text: "Configuraciones"}))
		// this.desplegable.append(ui.ancla({ href: "#", text: "Ayuda"}))
		this.desplegable.append(ui.ancla({ href: "#", text: "Cerrar Sesión", id:"cerrarSesion"}))
		this.cerrarSesion = document.querySelector("#cerrarSesion")
		this.navbar.append(ui.div({id:"toggleMenu", class:["menu-toggle"]}))
		this.menuToggle = document.querySelector("#toggleMenu")
		this.menuToggle.append(ui.div({}))
		this.menuToggle.append(ui.div({}))
		this.menuToggle.append(ui.div({}))

		// Crear contenedor de contenido principal
		this.body.append(ui.div({ class: ["contenedor", "contenido-principal"] }))
		this.contenido_principal = document.querySelector(".contenido-principal")

		// Agregal elementos del contenido principal
		this.contenido_principal.append(ui.div({ class: ["consultas-barra"] }))
		this.consultas_barra = document.querySelector(".consultas-barra")
		this.consultas_barra.append(ui.encabezado(2, { text: "Bajas" }))

		// Crear Formulario
		try{
			this.contenido_principal.append(ui.form({id:"formulario", action:"POST", class:["formulario"]}))
		} catch (Error) {
			vista.mensaje(Error)
		}

		// Config. Formulario
		this.formulario = document.querySelector("#formulario")
		const fieldset = document.createElement("fieldset")
		this.formulario.appendChild(fieldset)
		this.fieldset = document.querySelector("fieldset")
		this.fieldset.append(ui.legend({text:"LLENA EL CAMPO NECESARIO"}))
		this.fieldset.append(ui.div({class:["contenedor-campos"]}))
	
		this.contenedor_campos = document.querySelector(".contenedor-campos")

		for (const campo of CONFIGURACION) {
			switch(campo) {
				case "nombre": {
					this.contenedor_campos.append(ui.div({class:["campo"]}))
					this.campo = document.querySelector(".campo:last-child")
					this.campo.append(ui.label({text:"Nombre Completo:"}))
					this.campo.append(ui.input({id:"nombre", type:"text", placeholder:"Nombre", class:["input-text"]}))}
				break
			}

			// Creo el atributo en la vista
			this[campo] = document.querySelector("#" + campo)
		}

				// Agregar tabla
				const table = document.createElement("table")
				this.contenido_principal.appendChild(table)
				this.table = document.querySelector("table")
				this.table.classList.add("oculto")

				// Crear el caption de la tabla
				this.caption = document.createElement("caption")
				table.appendChild(this.caption)

				// Crear el elemento thead y sus elementos hijos
				var thead = document.createElement("thead")
				var encabezado = document.createElement("tr")

				// Crear los elementos th y establecer su contenido
				var encabezados = ["Nombre","Nacimiento","Edad","Género","Login","Creación","Acceso","Acción"]
				encabezados.forEach(function (texto) {
					var th = document.createElement("th")
					th.textContent = texto
					encabezado.appendChild(th)
				})

				// Agregar el encabezado a thead
				thead.appendChild(encabezado)

				// Crear el elemento tbody
				var tbody = document.createElement("tbody")
				tbody.setAttribute("id", "tablaDatos")

				// Agregar tbody a la tabla
				this.table.appendChild(thead)
				this.table.appendChild(tbody)

				this.tablaDatos = document.querySelector("#tablaDatos")
		

		this.contenido_principal.append(ui.div({ id: "resumenTabla" }))
		this.resumenTabla = document.querySelector("#resumenTabla")

		this.contenido_principal.append(ui.div({ class: ["paginacion", "oculto"] }))

		// Agregar botones de paginación a la interfaz
		this.paginacion = document.querySelector(".paginacion")
		this.paginacion.append(ui.button({ id: "paginaAnterior", text: "Página Anterior" }))
		this.paginaAnterior = document.querySelector("#paginaAnterior")
		this.paginacion.append(ui.div({ id: "contador" }))
		this.contador = document.querySelector("#contador")
		this.paginacion.append(ui.button({ id: "paginaSiguiente", text: "Página Siguiente" }))
		this.paginaSiguiente = document.querySelector("#paginaSiguiente")


		// Agrego el botón de procesar (Se muestra u oculta automáticamente)
		this.Procesar()

		this.body.append(ui.footer({ html: "<p>© 2024 Adrian BL - <span>CRUD: User Manager</span></p>" }))

		this.config_paginaActual()
	}

	Procesar() {
		// Cierre de sesion
		this.cerrarSesion = document.querySelector("#cerrarSesion")
		this.cerrarSesion.addEventListener("click", this.cerrarSesion_click)

		
		// Creo el control
		this.fieldset.append(ui.div({class:["contenedor-boton","flex"]}))
		this.contenedor_boton = document.querySelector(".contenedor-boton")

		this.contenedor_boton.append(ui.button({id:"limpiar", text:"Limpiar"}))
		// Nombre Completo
		this.contenedor_boton.append(ui.input({id:"procesar_consulta", type:"button", value: "Consultar por Nombre Completo", class:["oculto"]}))
		
		// Creo el atributo en la vista
		this.limpiar = document.querySelector("#limpiar")
		this.procesar_consulta = document.querySelector("#procesar_consulta")

		// Fijo el evento click
		this.limpiar.addEventListener("click", this.limpiar_click)
		this.procesar_consulta.addEventListener("click", this.procesar_click_consulta)

		// Control Paginacion
		this.paginaAnterior.addEventListener("click", this.paginaAnterior_click)
		this.paginaSiguiente.addEventListener("click", this.paginaSiguiente_click)

		// Un monitor para la validación automática
		setInterval(() => {
			const datos = this.recuperar()

			if(controlador.validar_consulta(datos)) this.procesar_consulta.classList.remove("oculto")
			else this.procesar_consulta.classList.add("oculto")
		}, 500)
	}

	config_paginaActual(e) {
		window.paginaActual = 1
		this.contador.textContent = `Página actual: ${paginaActual}`
	}

	procesar_click_consulta(e){
		controlador.procesar_consulta(vista.recuperar())
	}

	limpiar_click(e){
		e.preventDefault()
		this.form.reset()

		vista.table.innerHTML = ""
		vista.resumenTabla.innerHTML = ""
	}

	paginaAnterior_click(e) {
		try{
			if (paginaActual > 1) {
				paginaActual--
				if (CONSULTA_ACTIVA == 1){
					controlador.procesar_consulta(vista.recuperar())
				}
			}
			vista.contador.textContent = `Página actual: ${paginaActual}`
		} catch (error) {
			console.log(`Error en el click de Pagina Anterior: ${error}`)
		}
	}

	paginaSiguiente_click(e) {
		try{
			paginaActual++
			if (CONSULTA_ACTIVA == 1){
				controlador.procesar_consulta(vista.recuperar())
			}
			vista.contador.textContent = `Página actual: ${paginaActual}`
		} catch (error) {
			console.log(`Error en el click de Pagina Siguiente: ${error}`)
		}
	}

	cerrarSesion_click(e) {
		controlador.cerrarSesion()
	}

	recuperar() {
		let datos = {}

		for (const campo of this.elementos)
			if(this[campo])
				datos[campo] = this[campo].value
		return datos
	}

	mensaje(icono,titulo,texto){
		// alert(texto)
		// TODO: ALTERNATIVA SWEETALERT
		// Se agregaron parametros (icono, titulo y texto)
		Swal.fire({
			icon: icono,
			title: titulo,
			text: texto
		})
	}
}