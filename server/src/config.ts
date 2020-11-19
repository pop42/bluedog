import {CompanyController} from './api/companies/company_controller'
import {Api} from './api/api'
import {env} from './env'
import {createDbClient} from './db_client'
import {MessageDb} from './message_db'
import {usersAggregator} from './aggregators/users/users_aggregator'
import {UserController} from './api/users/user_controller'
import {userComponent} from './components/users/user_component'
import {companyComponent} from './components/companies/company_component'
import {emailComponent} from './components/email/email_component'
import {adminAggregator} from './aggregators/admin/admin_aggregator'
import {companiesAggregator} from './aggregators/companies/companies_aggregator'
import {VehicleController} from './api/assets/asset_controller'
import {vehicleComponent} from './components/assets/vehicles/vehicles_component'
import {vehiclesAggregator} from './aggregators/assets/vehicles/vehicles_aggregator'

export const viewDbClient = createDbClient(env.viewDbConnectionString)
export const messageDb = new MessageDb(env.messageDbConnectionString)

const controllers = [
  new CompanyController(viewDbClient, messageDb),
  new UserController(viewDbClient, messageDb),
  new VehicleController(viewDbClient, messageDb),
]

export const aggregators = [
  usersAggregator,
  adminAggregator,
  companiesAggregator,
  vehiclesAggregator
]

export const components = [
  companyComponent,
  userComponent,
  emailComponent,
  vehicleComponent,
]

export const apiServer = new Api(controllers).app