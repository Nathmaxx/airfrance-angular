import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IVolDto, Vol } from './../models/vol.model';

@Injectable({
	providedIn: 'root'
})
export class VolService {

	constructor(private http: HttpClient) { }

	/**
	 * Récupération de la liste des vols en départ d'un aéroport donné en paramètre et selon un intervalle de temps donné.
	 * Open Sky REST API
	 * https://openskynetwork.github.io/opensky-api/rest.html#departures-by-airport
	 */
	getVols(code: string, debut: number, fin: number, type: "departure" | "arrival"): Observable<Vol[]> {
		const link = `https://opensky-network.org/api/flights/${type}?airport=${code}&begin=${debut}&end=${fin}`
		return this.http.get<any>(link).pipe(
			map((response) => response
				.map((dto: IVolDto) => new Vol(dto))
			));
	}
}
