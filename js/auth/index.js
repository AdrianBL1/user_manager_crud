class index {
	constructor(reset = false) {
		if (reset) {
			window.self = new index()
			window.ui = new UI()
			window.vista = new index_ui(true)
			window.ajax = new Ajax()

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
		//TODO: MANEJO DE LA SESION
		if (sessionStorage.getItem("autenticado")) {

			vista.main.innerHTML = ''
			vista.main.innerHTML = "Ya has iniciado sesión"

			setTimeout(() => {
				window.location.replace("/dashboard")
			}, 1000)
		}
	}

	async EXISTE(datos) {
		if (self.validar(datos)) {

			datos.servicio = "EXISTE"
			console.log(datos)
			let r = await ajax.post(datos)

			r = JSON.parse(r)

			console.log(r)

			try {
				if (r.resultado.resultado == DG.CONSULTA_EXITOSA) {

					

					vista.main.innerHTML = ''
					sessionStorage.setItem("autenticado", "true")
					sessionStorage.setItem("usuario", datos["login"])

					vista.main.innerHTML = "Acceso Concedido"

					setTimeout(() => {
						// this.configuracion()
						window.location.replace("/dashboard")
					}, 2000)
				}
				else {
					// alert("Consulta fallida")

					//SWEET
					Swal.fire({
						icon: "error",
						title: "Consulta Fallida",
						text: "Login no encontrado o error en los datos",
					})
				}
			} catch (error) {
				console.log(error)
			}
		}
	}

	validar(datos) {
		console.log(datos)
		if (datos.login == "" || datos.pwd == "") {
			// alert("Error en los datos")
			//SWEET
			Swal.fire({
				icon: "error",
				title: "Error en los datos",
				text: "Falta ingresar Usuario o Contraseña",
			})
			return false
		}
		else return true
	}

	ERROR(e) { alert(e.message) }
}
window.onload = () => new index(true)