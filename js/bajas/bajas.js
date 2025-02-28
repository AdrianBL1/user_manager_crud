class bajas {
	constructor(reset = false) {
		if (reset) {

			window.ajax = new Ajax()
			window.vista = new bajas_ui()
			window.controlador = new bajas()
			window.ui = new UI()

			this.constantes()
			this.configuracion()

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
		const intervalo = setInterval(async () => {
			if (window.hasOwnProperty("DG")) {
				try {
					let configuracion = [], respuesta
					const servicio = { servicio: "CONFIGURACION" }

					clearInterval(intervalo)
					respuesta = await ajax.post(servicio)
					respuesta = JSON.parse(respuesta)
					if (respuesta.ok == DG.CONSULTA_EXITOSA) {
						const campos = respuesta.resultado

						//TODO: MANEJO DE LA SESION
						if (sessionStorage.getItem("autenticado")) {
							console.log("SESION: ", sessionStorage.getItem("autenticado"))

							// Borro los campos inactivos o que no se consideran en esta vista
							for (const campo in campos)
								if (campos[campo] == DG.CAMPO_INACTIVO || !vista.esElemento(campo))
									delete campos[campo]
								else configuracion.push(campo)

							// Conservo la configuración en global
							window.CONFIGURACION = configuracion

							// Solicito a la vista que se actualice
							vista.configuracion()

						} else {
							// alert("No has iniciado sesión")
							//SWEET
							vista.mensaje("question", "Autenticación", "No has iniciado sesión")

							setTimeout(() => {
								window.location.replace("/")
							}, 3000)
						}
					}
					else { throw DG.CONSULTA_FALLIDA }

				} catch {
					//SWEET
					vista.mensaje("error", "ERROR CONFIGURACIÓN", "Ocurrió un error en la configuración, vuelva a intentarlo")
				}
			}
		}, 100)
	}

	cerrarSesion() {
		// Eliminar el estado de autenticación de sessionStorage
		sessionStorage.removeItem("usuario")
		sessionStorage.removeItem("autenticado")
		this.configuracion()
	}

	validar_consulta(datos) {
		for (const campo of CONFIGURACION) {
			switch (campo) {
				case "nombre": if (datos[campo] == "") return false
					break
			}
		}
		return true
	}


	//TODO: CONSULTA NOMBRE
	async procesar_consulta(datos) {
		// Preparo datos para el envío
		datos["servicio"] = "CONSULTAS_NOMBRE"
		datos["pagina"] = paginaActual //TODO: MOD. NUM. PAG.

		try {
			let respuesta = await ajax.post(datos)
			respuesta = JSON.parse(respuesta)
			if (!respuesta.ok) throw DG.CONSULTA_FALLIDA
			else {
				//LLamar tabla
				this.resultadoDatos(JSON.stringify(respuesta), "Nombre Completo")
				CONSULTA_ACTIVA = 1
			}
		}
		catch (error) {
			// SWEET
			vista.mensaje("error", "ERROR", "Error al procesar la consulta ", error)
		}
	}

	resultadoDatos(datosRecibidos, tipoBusqueda) {

		vista.tablaDatos.innerHTML = ""

		var datos = JSON.parse(datosRecibidos)

		try {

			if (Array.isArray(datos.resultado)) {
				datos.resultado.forEach(function (usuario) {
					crearFila(usuario)
				})
			} else if (typeof datos.resultado === 'object') {
				crearFila(datos.resultado)
			}
		} catch (error) {
			console.error("Error parseo datos JSON:", error)
		}

		function crearFila(usuario) {
			var fila = document.createElement("tr")

			var columnas = ["nombreCompleto","nacimiento","edad","genero","login","creacion","acceso"]
			columnas.forEach(function (columna) {
				var td = document.createElement("td")
				td.textContent = usuario[columna]
				fila.appendChild(td)
			})

			var tdAcciones = crearBotonesEliminar(usuario.id)
			fila.appendChild(tdAcciones)

			// vista.crearTabla(fila)
			vista.caption.innerText = `Mostrando resultados de busqueda por "${tipoBusqueda}"`
			vista.table.classList.remove("oculto")
			vista.tablaDatos.appendChild(fila)

			vista.paginacion.classList.remove("oculto")
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

	//TODO: BAJAS
	async procesar_baja(id) {

		const servicio = { servicio: "BAJAS", id: id }
		console.log(servicio)

		try {
			let respuesta = await ajax.post(servicio)
			respuesta = JSON.parse(respuesta)
			console.log(respuesta)
			if (!respuesta.ok) throw DG.BAJA_FALLIDA
			else {
				// SWEET
				vista.mensaje("success", "ÉXITO", "Baja exitosa")
				vista.table.innerHTML = ""
				vista.resumenTabla.innerHTML = ""
			}
		}
		catch (e) {
			// SWEET
			vista.mensaje("error", "ERROR", "Error al procesar la baja")
		}
	}
}

function crearBotonesEliminar(id) {
	var btnEliminar = document.createElement("button")
	btnEliminar.innerText = "Eliminar"
	btnEliminar.classList = "botonEliminar"
	btnEliminar.addEventListener("click", function () {

		// SWEET
		Swal.fire({
			title: "¿Estás seguro?'",
			text: `¿Desea ELIMINAR los datos de la fila seleccionada? \n ${id}`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si, Eliminar"
		}).then((result) => {
			if (result.isConfirmed) {
				controlador.procesar_baja(id)
			} else {
				vista.mensaje("info", "INFO.", `Acción Cancelada para Eliminar, ID: ${id}`)
			}
		})
	})

	var td = document.createElement("td")
	td.classList = "acciones"
	td.appendChild(btnEliminar)

	return td
}

window.onload = () => new bajas(true)