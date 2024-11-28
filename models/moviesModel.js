import fs from 'node:fs/promises';

class MoviesModel {
	static async getAllMovies() {
		try {
			const data = await MoviesModel.getAllMovies();
			const cleanData = JSON.parse(data);
			res.status(200).json({ movies: cleanData });
		} catch (error) {
			console.log(error);
		}
	}
	static async getOneById() {
		const data = await fs.readFile('movies.json', { encoding: 'utf8' });
		return data;
	}
	static async createOne(newMovie) {
		const allMovies = await MoviesModel.getAllMovies();

		const cleanData = JSON.parse(allMovies);

		const length = cleanData.length;

		const lastElement = cleanData[length - 1];

		const lastId = lastElement.id;

		const newId = lastId + 1;

		cleanData.push({ ...newMovie, newId });

		const dataToWrite = JSON.stringify(cleanData);

		const data = await fs.writeFile(
			'movies.json',
			JSON.stringify(dataToWrite)
		);
		return data;
	}
}

export default MoviesModel;
