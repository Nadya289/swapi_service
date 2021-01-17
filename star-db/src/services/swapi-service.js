export default class SwapiService{
    _ariBase = 'https://swapi.dev/api';
    async getResource(url){
      const res = await fetch(`${this._ariBase}${url}`);
      if(!res.ok){
        throw new Error(`Could not fetch ${url}` +
        `, receive ${res.status}`)
      }
      return await res.json();
    }
    async getAllPeople(){
      const res = await this.getResource(`/people/`);
      return res.results;
    }
    getPerson(id){
      return this.getResource(`/people/${id}`);
    }
    async getAllPlanets(){
      const res = await this.getResource(`/planets/`);
      return res.results;
    }
    getPlanet(id){
      return this.getResource(`/planets/${id}`);
    }
    
    async getAllStarships(){
      const res = await this.getResource(`/starships/`);
      return res.results;
    }
    getStarspip(id){
      return this.getResource(`/starships/${id}`);
    }
  }
  
  const swapi = new SwapiService();
  swapi.getStarspip(3).then((p) => {
        console.log(p.name);
  });
  
  
  
  