class cambios {
	constructor(reset = false) {
		if (reset) {
			
			window.ajax = new Ajax()
			window.vista = new cambios_ui()
			window.controlador = new cambios()
			window.ui = new UI()

			this.constantes()
			this.configuracion()
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

							if (!sessionStorage.getItem("EditActive")) {
								// Borro los campos inactivos o que no se consideran en esta vista
								for (const campo in campos)
									if (campos[campo] == DG.CAMPO_INACTIVO || !vista.esElemento(campo))
										delete campos[campo]
									else configuracion.push(campo)

								// Conservo la configuración en global
								window.CONFIGURACION = configuracion

								// Solicito a la vista que se actualice
								vista.configuracion()

								// Si es necesario, consulto los géneros
								if (CONFIGURACION.includes("genero")) this.generos()
							} else {
								// Borro los campos inactivos o que no se consideran en esta vista
								for (const campo in campos)
									if (campos[campo] == DG.CAMPO_INACTIVO || !vista.esElemento(campo))
										delete campos[campo]
									else configuracion.push(campo)

								// Conservo la configuración en global
								window.CONFIGURACION = configuracion

								// Solicito a la vista que se actualice
								vista.configuracion()

								// Si es necesario, consulto los géneros
								if (CONFIGURACION.includes("genero")) this.generos()

								//Ejecuta el motodo de consultar informacion almacenada para los Cambios
								this.procesar_consulta_id(sessionStorage.getItem("EditID"))
							}
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
					vista.mensaje("error","ERROR CONFIGURACIÓN","Ocurrió un error en la configuración, vuelva a intentarlo") 
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

	async generos() {
		let servicio = { servicio: "CONSULTAS_CATALOGO", catalogo: "generos" }

		try {
			let respuesta = await ajax.post(servicio)
			respuesta = JSON.parse(respuesta)
			if (respuesta.ok == DG.CONSULTA_EXITOSA) vista.generos(respuesta.resultado)
			else throw DG.CONSULTA_FALLIDA
		}
		catch { 
			//SWEET 
			vista.mensaje("error","ERROR EN GÉNEROS","Ocurrió un error, vuelva a intentarlo")  
		}
	}

	validar_cambio(datos) {
		for (const campo of CONFIGURACION) {
			switch (campo) {
				case "nombre":
				case "pApellido":
				case "sApellido":
				case "nacimiento":
				case "login":
				case "pwd":
				case "foto": if (datos[campo] == "") return false
					break
				case "genero": if (parseInt(datos[campo]) == DG.INDEFINIDO) return false
					break
				case "id": if (datos[campo] == "") return false
					break
			}
		}
		return true
	}

	//TODO: CAMBIOS
	async procesar_cambio(datos) {
		// Preparo datos para el envío
		datos["servicio"] = "CAMBIOS"
		datos["genero"] = parseInt(datos["genero"])

		try {
			let respuesta = await ajax.post(datos)
			respuesta = JSON.parse(respuesta)
			console.log(respuesta)
			if (!respuesta.ok) throw DG.CAMBIO_FALLIDO
			//SWEET
			else vista.mensaje("success","ÉXITO","Registro modificado")
		}
		catch (e) {
			//SWEET
			vista.mensaje("error","ERROR","Error al procesar la modificacion")  
		}
	}

	//TODO: CAMBIOS
	async procesar_consulta_id(id) {
		//Preparamiento de los datos
		const datos = { servicio: "CONSULTAS_ID", id: id }

		try {
			let respuesta = await ajax.post(datos)
			respuesta = JSON.parse(respuesta)
			if (!respuesta.ok) throw DG.CONSULTA_FALLIDA
			else {
				console.log(respuesta)
				//LLenar Formulario
				vista.llenarFormulario(respuesta.resultado)
				//Borrar los datos despues de usarlos
				this.borarDatosTemp()
			}
		}
		catch (error) {
			//SWEET
			vista.mensaje("error","ERROR","Error al procesar la consulta ",error)  
			this.borarDatosTemp()
		}
	}

	borarDatosTemp(){
		sessionStorage.removeItem("EditActive")
		sessionStorage.removeItem("EditID")
	}
	
}

window.onload = () => new cambios(true)