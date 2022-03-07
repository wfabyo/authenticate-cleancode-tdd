import {Router} from 'express'
import { makeAuthenticateController } from '../factories/makeAuthenticateController';
import { makeSignupController } from '../factories/makeSignupController';
import { makeRoute } from '../ports/makeRoute';

const path = '/authenticate'
const routes = Router()

routes.post(path+'/', makeRoute(makeAuthenticateController()))
routes.post(path+'/signup', makeRoute(makeSignupController()))

export {routes}