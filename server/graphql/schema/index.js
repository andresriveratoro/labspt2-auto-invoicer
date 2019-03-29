const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type User {
  _id: ID!
  email: String!
  password: String
  name: String!
  phone_num: String
  country_code: String
  address_1: String
  address_2: String
  city: String
  state: String
  postal_code: String
  country: String
  companies: [Company!]
  invoices: [Invoice!]
  googleId: String
  facebookId: String
}

type Company {
  _id: ID!
  name: String!
  email: String!
  phone_num: String!
  country_code: String!
  address_1: String!
  address_2: String
  city: String!
  state: String!
  postal_code: String!
  country: String!
  unlimited_tier: Boolean!
  credits: Int!
  users: [User!]!
  customers: [Customer!]
  invoices: [Invoice!]
}

type Customer {
  _id: ID!
  name: String!
  email: String!
  phone_num: String!
  country_code: String!
  address_1: String!
  address_2: String
  city: String!
  state: String!
  postal_code: String!
  country: String!
  companies: [Company!]!
  invoices: [Invoice!]
}



type Invoice {
  _id: ID!
  invoiceNumber: Int!
  languageSelection: String!
  currencySelection: String!
  addressFrom: String!
  addressTo: String!
  cityTo: String
  stateRegionTo: String
  zipCodeTo: Int!
  clientEmailTo: String!
  selectedDate: String!
  invoiceDueDate: String!
  balanceDue: Float!
  subtotal: Int
  discount: Int
  tax: Float!
  shipping: Int!
  total: Int
  amountPaid: Int
  invoiceNotes: String
  invoiceTerms: String
}


input InvoiceInput {
  invoiceNumber: Int!
  languageSelection: String!
  currencySelection: String!
  addressFrom: String!
  addressTo: String!
  cityTo: String
  stateRegionTo: String
  zipCodeTo: Int!
  clientEmailTo: String!
  selectedDate: String!
  invoiceDueDate: String!
  balanceDue: Float!
  subtotal: Int
  discount: Int
  tax: Float!
  shipping: Int!
  total: Int
  amountPaid: Int
  invoiceNotes: String
  invoiceTerms: String
}

type Item {
  _id: ID!
  description: String!
  quantity: Int!
  rate: Float!
  amount: Int!
}

input CompanyInput {
  name: String!
  email: String!
  phone_num: String!
  country_code: String!
  address_1: String!
  address_2: String
  city: String!
  state: String!
  postal_code: String!
  country: String!
}

input EditCompanyInput {
  _id: ID
  name: String
  email: String
  phone_num: String
  country_code: String
  address_1: String
  address_2: String
  city: String
  state: String
  postal_code: String
  country: String
}

input UserInput {
  email: String!
  password: String!
  name: String!
  phone_num: String!
  country_code: String!
  address_1: String!
  address_2: String
  city: String!
  state: String!
  postal_code: String!
  country: String!
}

input EditUserInput {
  email: String
  password: String
  name: String
  phone_num: String
  country_code: String
  address_1: String
  address_2: String
  city: String
  state: String
  postal_code: String
  country: String
}

input CustomerInput {
  name: String!
  email: String!
  phone_num: String!
  country_code: String!
  address_1: String!
  address_2: String
  city: String!
  state: String!
  postal_code: String!
  country: String!
}

input EditCustomerInput {
  name: String
  email: String
  phone_num: String
  country_code: String
  address_1: String
  address_2: String
  city: String
  state: String
  postal_code: String
  country: String
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

type Country {
  name: String!
  iso2: String!
  dialCode: String!
  priority: Int!
  format: String
}

type RootQuery {
  login(email: String!, password: String!): AuthData!
  users: [User!]!
  user(userID: ID!): User!
  companyByAnyField(companyInput: EditCompanyInput): [Company!]
  companies: [Company!]!
  company(companyID: ID!): Company!
  customers: [Customer!]!
  customer(customerID: ID!): Customer!
  countries: [Country!]!
  country(name: String, iso2: String): Country!
  invoices: [Invoice!]!
  invoice(invoiceID: ID!): Invoice!
}

type RootMutation {
  createUser(userInput: UserInput!): User
  editUser(userID: ID!, editUserInput: EditUserInput!): User
  createCompany(companyInput: CompanyInput!): Company
  editCompany(editCompanyInput: EditCompanyInput!, companyID: ID!): Company
  createCustomer(customerInput: CustomerInput!): Customer
  editCustomer(customerID: ID!, editCustomerInput: EditCustomerInput!): Customer
  addUserToCompany(userID: ID!, companyID: ID!): Company
  addCustomerToCompany(customerID: ID!, companyID: ID!): Customer
  createInvoice(invoiceInput: InvoiceInput!): Invoice
  
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);
