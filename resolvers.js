const User = require("./models/User.model")
const Employee = require('./models/Employee.model')
const resolvers = {
    Query: {
        login: async (parent, args, context, info) => {
            const {email, password} = args
            if(!email || !password) {
                return 'All fields are required'
            }
            const user = await User.findOne({email})
            if(!user) {
                return 'user not found'
            }
            if(!(await user.isPasswordMatch(password))) {
                return 'bad credentails'
            }
            return 'logged in'
        },
        getAllEmployees: async () => {
            return await Employee.find({})
        },
        searchEmployeeById: async (parent, {id}, context, info) => {
            return await Employee.findById(id)
        },
        updateEmployeeById: async (parent, args, context, info) => {
            const { id } = args
            return await Employee.findByIdAndUpdate(id, args.employee, {new: true})
        },
        deleteEmployeeById: async (parent, { id }, context, info) => {
            await Employee.findByIdAndDelete(id)
            return 'Employee Deleted'
        }   
    },
    Mutation: {
        signup: async (parent, args, context, info) => {
            const user = await User.create(args.user)
            return user
        },
        addEmployee: async (parent, args, context, info) => {
            const employee = await Employee.create(args.employee)
            return employee
        }
    }
}

module.exports = resolvers