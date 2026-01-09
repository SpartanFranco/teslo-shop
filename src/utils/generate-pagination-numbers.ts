export const generatePagination = (currentPage: number, totalPages: number) => {
	//si el numero total de páginas es 7 o menos vamos a mostrar todas las páginas sin ...

	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, idx) => idx + 1); //[1,2,3,4,5,6,7]
	}
	// si la página actual esta dentro de las primeras 3 páginas
	// mostrar las tres primeras 3 ptos suspensivos y las dos últimas.
	if (currentPage <= 3) {
		return [1, 2, 3, '...', totalPages - 1, totalPages]; //[1,2,3,'...',60,61]
	}
	// si la página actual esta dentro de las últimas 3 páginas
	// mostrar las 2 primeras, 3 ptos suspensivos y las 3 últimas.
	if (currentPage >= totalPages - 2) {
		return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]; //[1,2,'...',59,60,61]
	}

	// si la página actual está en otro lugar (medio) mostrar la primera página
	// ...,la página actual, y vecinos.

	return [
		1,
		'...',
		currentPage - 1,
		currentPage,
		currentPage + 1,
		'...',
		totalPages,
	];
};
