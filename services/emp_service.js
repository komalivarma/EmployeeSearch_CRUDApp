var logger = require('../util/logger');
var STATUS_CODES = require('../util/status_codes');
var employeeModel = require('../model/employee_model');

//==============API for Get All Employees ================

var getAllEmployees = async(req,res,next)=>{
 
    //logger
    console.log("URL hit to :",req.hostname,req.originalUrl);
    logger.info("Entered into get AllEmployess Service");
        try 
        {
            let empData =  await employeeModel.Employee.findAll({
                where:{
                    isDeleted:0
                }
            });
            //console.log(empData);
            res.status(STATUS_CODES.OK).send({
                "statusCode": STATUS_CODES.OK,
                "info": "List of Employees",
                "employees": empData
            })
        }
        catch (e) 
        {
            
            next(e);
            
        }
        }

//==========API for Insertion of Employee Records =====================

var postEmployee = async (req,res,next)=>{
    console.log("URL hit to :",req.hostname,req.originalUrl);
    logger.info("Entered into post Employee service");

    try{
        let request = req.body;
        if(request != undefined)
        {
            let empData = await employeeModel.Employee.create(request);
            res.status(STATUS_CODES.OK).send({
                "statusCode" : STATUS_CODES.OK,
                "info":"Successfully Inserted Employee Data",
                "employees" : empData
            })
        }
       
        
    }
    catch(e)
    {
        next(e);
    }
    }
