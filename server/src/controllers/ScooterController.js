import faker from 'faker';
import AppController from './AppController';
/**
 * Handle the Scooter Request like list and more.
 */
class ScooterController extends AppController {
	/**
	 * Configure controller
	 */
	constructor() {
		super();
		this.index = this.index.bind(this);
	}
	/**
	* @param {Object} req The request object
	* @param {Object} res The response object
	* @param {function} next The callback to the next program handler
	* @return {void}
	*/
	index(req, res, next) {
		res.setHeader('Content-Type', 'application/json');

		this.data.scooters = [];

		for (let i = 0; i < 50; i++) {
			this.data.scooters.push({
				lat: faker.address.latitude,
				long: faker.address.longitude,
				battery: faker.random.number(10, 100),
				serial_code: faker.random.number(1000, 9999),
			});
		}

		this.response(req, res, next);
	}
}

export default ScooterController;
