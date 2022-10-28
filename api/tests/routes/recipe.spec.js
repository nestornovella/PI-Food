const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');
const { idCreator } = require('../../src/functions/functions.js');


let id = idCreator()
const agent = session(app);
const recipe = {
  "id": id,
  "name": "Tacos",
	"summary": "Carne y verdura envuelta en masa",
	"healthScore": "56",
	"steps": ["Cocinar la verdura y la carne para luego colocarla dentro de la masa precalentada", "agregar tipos de salsas", "disfrutar con amigos"],
	"image": "https://www.lanacion.com.ar/resizer/OyRhrPgWUaXXuHzdq3F9cSkV4sc=/1200x800/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/O4W3KTQTYFCI7IJMIDDYTMPO5A.jpg",
	"diets": [
		"ketogenic",
		"dairy free"
	],
  "itsCreated":true
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)))

    //-----------------------

  describe('GET /api/recipes', () => {
    it('la ruta deberia recibir status 200', () =>
      agent.get('/api/recipes')
      .expect(200)
      .expect('Content-Type', /json/)
    )
  })
  describe('GET /api/recipes with query', () => {
    it('la ruta deberia recibir status 200', () => {
      agent.get('/api/recipes?name=rice')
      .expect(200)
      .expect('Content-Type', /json/)
    })
  })

  describe('GET /api/diets', () => {
    it('la ruta deberia recibir status 200', () => {
      agent.get('/api/diets')
      .expect(200)
      .expect('Content-Type', /json/)
    })
  })

  describe('POST /api/recipes', () => {
    it('la ruta deberia recibir status 200', () => {
      agent.post('/api/recipes')
      .send(recipe)
      .expect(200)
      .expect('Content-Type', /json/)
    })
  })
  

  describe('DELETE /api/recipes', () => {
    it('la ruta deberia recibir un status 202', () => {
      agent.delete('/api/recipes')
      .send(id)
      .expect(202)
      .expect('Content-Type', /json/)
    })
  })

})


