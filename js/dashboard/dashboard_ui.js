class dashboard_ui {
	constructor(reset = false) {
		if (reset) {
			this.body = document.body
			this.elementos = ["nombre"]

			this.configurar_interfaz()

			this.nuevo = document.querySelector("#nuevoUsuario")
			this.busqueda = document.querySelector("#busquedaUsuario")
			this.tablaDatos = document.querySelector("#tablaDatos")
			this.resumenTabla = document.querySelector("#resumenTabla")
			this.paginaAnterior = document.querySelector("#paginaAnterior")
			this.paginaSiguiente = document.querySelector("#paginaSiguiente")
			this.cerrarSesion = document.querySelector("#cerrarSesion")

			this.config_paginaActual()
			this.cargarDatos()
			this.fijarEventos()

			this.Procesar()
		}
	}

	Procesar() {
		// Un monitor para la validación automática
		setInterval(() => {
			const datos = this.recuperar()
			const isValid = controlador.validar_consulta(datos, this.elementos)
		
			this.busqueda.disabled =!isValid
		
			if (isValid!== this.datosCargados) {
			  this.datosCargados = isValid
			  controlador.cargarDatos(paginaActual)
			}
		
		  }, 500)
	}
	
	esElemento(elemento) {
		return this.elementos.includes(elemento)
	}

	fijarEventos() {
		this.nuevo.addEventListener("click", this.ir_altas_click)
		this.busqueda.addEventListener("click", this.busqueda_click)
		this.paginaAnterior.addEventListener("click", this.paginaAnterior_click)
		this.paginaSiguiente.addEventListener("click", this.paginaSiguiente_click)
		this.cerrarSesion.addEventListener("click", this.cerrarSesion_click)
	}

	configurar_interfaz() {

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
		this.contenido_principal.append(ui.div({ class: ["usuarios-barra"] }))
		this.usuarios_barra = document.querySelector(".usuarios-barra")
		this.usuarios_barra.append(ui.encabezado(2, { text: "Usuarios" }))
		// this.usuarios_barra.append(ui.button({ id: "nuevoUsuario", text: "Agregar Nuevo" }))
		this.usuarios_barra.append(ui.button_icon({ id: "nuevoUsuario", icon:"plus", text: "Agregar Nuevo" }))

		this.contenido_principal.append(ui.div({ class: ["busqueda-barra"] }))
		this.busqueda_barra = document.querySelector(".busqueda-barra")
		this.busqueda_barra.append(ui.input({ type: "search", id: "nombre", placeholder: "Buscar por Nombre Completo" }))
		this.nombre = document.querySelector("#nombre")
		this.busqueda_barra.append(ui.button({ id: "busquedaUsuario", text: "Buscar" }))


		// Agregar tabla
		const table = document.createElement("table")
		this.contenido_principal.appendChild(table)
		this.table = document.querySelector("table")

		// Crear el elemento thead y sus elementos hijos
		var thead = document.createElement("thead")
		var encabezado = document.createElement("tr")

		// Crear los elementos th y establecer su contenido
		var encabezados = ["Nombre", "Nacimiento", "Edad", "Login", "Acceso"]
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

		this.contenido_principal.append(ui.div({ id: "resumenTabla" }))

		this.contenido_principal.append(ui.div({ class: ["paginacion"] }))

		// Agregar botones de paginación a la interfaz
		this.paginacion = document.querySelector(".paginacion")
		// this.paginacion.append(ui.button({ id: "paginaAnterior", text: "Página Anterior" }))
		this.paginacion.append(ui.button_icon({ id: "paginaAnterior",icon:"arrow-left"}))
		this.paginacion.append(ui.div({ id: "contador" }))
		this.contador = document.querySelector("#contador")
		// this.paginacion.append(ui.button({ id: "paginaSiguiente", text: "Página Siguiente" }))
		this.paginacion.append(ui.button_icon({ id: "paginaSiguiente", icon:"arrow-right"}))

		this.body.append(ui.footer({ html: "<p>© 2024 Adrian BL - <span>CRUD: User Manager</span></p>" }))
	}

	config_paginaActual(e) {
		window.paginaActual = 1
		this.contador.textContent = `Página actual: ${paginaActual}`
	}

	cargarDatos() {
		controlador.cargarDatos(paginaActual)
	}

	ir_altas_click(e) {
		window.location.href = "/altas"
	}

	busqueda_click(e) {
		controlador.procesar_consulta(vista.recuperar(), paginaActual)
	}

	paginaAnterior_click(e) {
		try {
			if (paginaActual > 1) {
				paginaActual--
				if (CONSULTA_ACTIVA == 1) {
					controlador.cargarDatos()
				} if (CONSULTA_ACTIVA == 2) {
					controlador.procesar_consulta(vista.recuperar())
				}
			}
			vista.contador.textContent = `Página actual: ${paginaActual}`
		} catch (error) {
			console.log(`Error en el click de Pagina Anterior: ${error}`)
		}

	}

	paginaSiguiente_click(e) {
		try {
			paginaActual++

			if (CONSULTA_ACTIVA == 1) {
				controlador.cargarDatos()
			} if (CONSULTA_ACTIVA == 2) {
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
			if (this[campo])
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