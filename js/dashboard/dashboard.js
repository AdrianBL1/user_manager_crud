class dashboard {
	constructor(reset = false) {
		if (reset) {
			
			window.ajax = new Ajax()
			window.controlador = new dashboard()
			window.ui = new UI()
			
			this.constantes()
			
			// TODO: TEST DE SESION
			this.configuracion() ? window.vista = new dashboard_ui(true) : window.location.replace("/")

			window.CONSULTA_ACTIVA = 0
		}
	}

	async constantes() {
		const servicio = { servicio: "CONSTANTES" }

		try {
			let respuesta = await ajax.post(servicio)
			respuesta = JSON.parse(respuesta)

			window.DG = {} // Creo el objeto global de las constantes
			for (const constante of respuesta.resultado)
				DG[constante.constante] = constante.valor
		}
		catch(e) { 
			//SWEET
			vista.mensaje("error","ERROR CONSTANTES","Ocurrió un error en obtener las Constantes, vuelva a intentarlo", e) 
		}
	}
		
	configuracion() {

		//TODO: MANEJO DE LA SESION
		if (sessionStorage.getItem("autenticado")) {
			console.log("SESION: ", sessionStorage.getItem("autenticado"))
			return true
		} else {
			alert("No has iniciado sesión")
			window.location.replace("/")
			return false
		}
	}

	cerrarSesion() {
		// Eliminar el estado de autenticación de sessionStorage
		sessionStorage.removeItem("usuario")
		sessionStorage.removeItem("autenticado")
		this.configuracion()
	}

	resetNumPagina(){
		vista.config_paginaActual()
	}

	//TODO: CARGAR DATOS
	async cargarDatos(numPagina) {

		var peticion = new Object()

		peticion.servicio = "CONSULTAS"
		peticion.pagina = paginaActual

		if (controlador.validar(peticion)) {
			let respuesta = await ajax.post(peticion)
			console.log(respuesta)
			
			// vista.mostrarResultado(respuesta)
			this.resultadoDatos(respuesta)
			CONSULTA_ACTIVA = 1
		}
	}

	validar_consulta(datos, elementos) {
		for (const campo of elementos) {
			switch (campo) {
				case "nombre": if (datos[campo] == "") return false
					break
			}
		}
		return true
	}

	//TODO: CONSULTA NOMBRE
	async procesar_consulta(datos) {
		this.resetNumPagina()

		// Preparo datos para el envío
		datos["servicio"] = "CONSULTAS_NOMBRE"
		datos["pagina"] = paginaActual //TODO: MOD. NUM. PAG.

		try {
			let respuesta = await ajax.post(datos)
			respuesta = JSON.parse(respuesta)
			if (!respuesta.ok) throw DG.CONSULTA_FALLIDA
			else {
				//LLamar tabla
				this.resultadoDatos(JSON.stringify(respuesta))
				CONSULTA_ACTIVA = 2
			}
		}
		catch (error) { 
			// SWEET
			vista.mensaje("error", "ERROR", "Error al procesar la consulta ", error)
		}
	}

	resultadoDatos(datosRecibidos) {
		vista.tablaDatos.innerHTML = ""

		console.log("Datos a tabla: ", datosRecibidos)
		var datos = JSON.parse(datosRecibidos)
		console.log(datos)

		if (Array.isArray(datos.resultado)) {
			datos.resultado.forEach(function (usuario) {
				crearFila(usuario)
			})
		} else if (typeof datos.resultado === 'object') {
			crearFila(datos.resultado)
		}

		function crearFila(usuario) {
			var fila = document.createElement("tr")

			var columnas = ["nombreCompleto", "nacimiento", "edad" ,"login", "acceso"]
			columnas.forEach(function (columna) {
				var td = document.createElement("td")
				td.textContent = usuario[columna]
				fila.appendChild(td)
			})

			vista.tablaDatos.appendChild(fila)
		}

		this.resumenTabla(datosRecibidos)
	}

	resumenTabla(datosRecibidos) {
		try {
			let datos = JSON.parse(datosRecibidos)
			vista.resumenTabla.innerHTML = `
                <p>P&aacute;gina anterior: <b>${datos.paginacion.paginaAnterior}</b></p>
                <p>P&aacute;gina siguiente: <b>${datos.paginacion.paginaSiguiente}</b></p>
                <p>Total de registros: <b>${datos.paginacion.totalRegistros}</b></p>
                <p>Registro inicial: <b>${datos.paginacion.registroInicial}</b></p>
				<p>Registro final: <b>${datos.paginacion.registroFinal}</b></p>
				<p>Tama&ntilde;o de P&aacute;gina: <b>${datos.paginacion.tamanoPagina}</b></p>
				`

			// Control de la paginacion
			if (datos.paginacion.paginaAnterior == 0) vista.paginaAnterior.disabled = true
			else vista.paginaAnterior.disabled = false

			if (datos.paginacion.totalRegistros == datos.paginacion.registroFinal) vista.paginaSiguiente.disabled = true
			else vista.paginaSiguiente.disabled = false
		}
		catch {
			vista.resumenTabla.innerHTML = "<p>No hay datos de Resumen de tabla</p>"
		}
	}

	validar(datos) {
		let mensaje = ""

		if (datos.hasOwnProperty("servicio") && datos.servicio == "ND")
			mensaje = "Servicio incorrecto"
		else return true

		// vista.mensaje(mensaje)
		console.log(mensaje)
		return false
	}
}

window.onload = () => new dashboard(true)