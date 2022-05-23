!(function () {
	let juego = {
		palabra: 'ALURA',
		estado: 1,
		adivinado: ['A', 'L'],
		errado: ['B', 'J', 'K', 'C'],
	};

	let $html = {
		hombre: document.getElementById('hombre'),
		adivinado: document.querySelector('.adivinado'),
		errado: document.querySelector('.errado'),
	};

	function dibujar(juego) {
		// Actualizar la imgaen del hombre
		var $element;
		$element = $html.hombre;
		$element.src = `../imagenes/0${juego.estado}.png`;

		//Creamos las letras adivinadas
		var palabra = juego.palabra;
		var adivinado = juego.adivinado;
		$element = $html.adivinado;
		for (let letra of palabra) {
			let $span = document.createElement('span');
			let $txt = document.createTextNode('');
			if (adivinado.indexOf(letra) >= 0) {
				$txt.nodeValue = letra;
			}
			$span.setAttribute('class', 'letra adivinada');
			$span.appendChild($txt);
			$element.appendChild($span);
		}

		//Creamos las letras erradas
		let errado = juego.errado;
		$element = $html.errado;
		for (const letra of errado) {
			let $span = document.createElement('span');
			let $txt = document.createTextNode(letra);
			$span.setAttribute('class', 'letra errada');
			$span.appendChild($txt);
			$element.appendChild($span);
		}
	}

	console.log(juego);
	dibujar(juego);
})();
