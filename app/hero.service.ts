import { Injectable }			from '@angular/core';
import { Headers, Http }		from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } 				from './hero';

@Injectable()
export class HeroService{

	private heroesUrl = "app/heroes";
	private headers = new Headers({"Content-Type" : "applicaction/json"});

	constructor(private http : Http){};

	getHeroes() : Promise<Hero[]>{
		// return Promise.resolve(HEROES);
		return this.http
					.get(this.heroesUrl)
					.toPromise()
					.then(response => response.json().data as Hero)
					.catch(this.handleError);
	}

	getHero(id : number) : Promise<Hero>{
		return this.getHeroes()
			.then(heroes => heroes.find(hero => hero.id === id));
	}

	update(hero : Hero) : Promise<Hero> {
		const url = `${this.heroesUrl}/${hero.id}`;
		return this.http
				.put(url,JSON.stringify(hero), {headers : this.headers})
				.toPromise()
				.then(() => hero)
				.catch(this.handleError);
	}

	create(name : string) : Promise<Hero> {
		return this.http
					.post(this.heroesUrl, JSON.stringify({name : name}))
					.toPromise()
					.then(res => res.json().data)
					.catch(this.handleError)
	}

	delete(id : number) : Promise<void> {
		return this.http
				.delete(`${this.heroesUrl}/${id}`,{headers : this.headers})
				.toPromise();
				.then(res => null)
				.catch(this.handleError);

	}

	private handleError(err : any){
		console.log("An error ocurred", err);
		return Promise.reject(err.message | err);
	}
}