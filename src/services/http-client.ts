import axios from "axios";

export const httpClient = axios.create({
	baseURL: "https://take-home-exercise-api.herokuapp.com",
	headers: {
		"API-KEY": import.meta.env.VITE_AMBERFLO_API_KEY,
	},
});

export enum HttpStatusCode {
	CREATED = 201,
}
