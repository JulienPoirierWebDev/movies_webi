import fs from 'node:fs/promises';

class MoviesModel {
	static async getAllMovies() {
		try {
			const data = await fs.readFile('movies.json', { encoding: 'utf8' });
			const cleanData = JSON.parse(data);
			return cleanData;
		} catch (error) {
			console.log(error);
		}
	}
	static async getOneById(id) {
		const data = await fs.readFile('movies.json', { encoding: 'utf8' });
		const cleanData = JSON.parse(data);
		const movie = cleanData.filter((oneMovie) => {
			if (oneMovie.id === id) {
				return oneMovie;
			}
		})[0];
		return movie;
	}
	static async createOne(newMovie) {
		const allMovies = await MoviesModel.getAllMovies();

		const alreadyExist = allMovies.some(
			(oneMovie) => oneMovie.id === newMovie.id
		);
		console.log('alreadyExist', alreadyExist);

		if (alreadyExist) {
			return 'Ce film existe déjà';
		} else {
			allMovies.push({ ...newMovie });

			try {
				const data = await fs.writeFile('movies.json', JSON.stringify(allMovies));
				return 'Film ajouté avec succès';
			} catch (error) {
				throw new Error(
					"Erreur lors de l'écriture du fichier : " + error.message
				);
			}
		}
	}
}

export default MoviesModel;
