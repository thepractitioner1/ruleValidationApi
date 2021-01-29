function Validate(object) {
    let error = checkRequirements(object);
    if (error != undefined) return error;

    const { data, rule } = object;

    let value = rule.field;
    let myfield = value;

    if (typeof value == "string" && value.includes('.')) {
        const arr = value.split(".");
        value = data[`${arr[0]}`][`${arr[1]}`]
    }

    const response = evaluateCondition(myfield, value, rule.condition, rule.condition_value)

    return response


}


function checkRequirements(object) {
    let value = object.rule.field;
    const { data } = object;

    if (typeof value == "string" && value.includes('.')) {
        const arr = value.split(".")
        if (data.hasOwnProperty(arr[0]) == false || data[`${arr[0]}`].hasOwnProperty(arr[1]) == false) return {
            "message": `field ${value} is missing from data.`,
            "status": "error",
            "data": null
        }
    } else {
        if (object['data'][`${value}`] == undefined) {
            return {
                "message": `field ${value} is missing from data`,
                "status": "error",
                "data": null
            }
        }
    }
    return undefined;
}


function evaluateCondition(field, field_value, condition, condition_value) {
    /* eq: Means the field value should be equal to the condition value 
     ii/ neq: Means the field value should not be equal to the condition value 
     iii/ gt: Means the field value should be greater than the condition value 
     iv/ gte: Means the field value should be greater than or equal to the condition value 
     v/ contains: Means the field value should contain the condition value
     */
    let flag;

    switch (condition) {
        case "eq":
            flag = (field_value == condition_value);
            break;

        case "neq":
            flag = (field_value != condition_value);
            break;
        case "gt":
            flag = (field_value > condition_value);
            break;
        case "gte":
            flag = (field_value >= condition_value);
            break
        case "contains":
            flag = condition_value.toString().contains(field_value);
            break;
        default:
            flag = false;
    }

    if (flag == true) {
        return {
            "message": `field ${field} successfully validated.`,
            "status": "success",
            "data": {
                "validation": {
                    "error": false,
                    "field": field,
                    "field_value": field_value,
                    "condition": condition,
                    "condition_value": condition_value
                }
            }
        }
    } else {
        return {
            "message": `field ${field} failed validation.`,
            "status": "error",
            "data": {
                "validation": {
                    "error": true,
                    "field": field,
                    "field_value": field_value,
                    "condition": condition,
                    "condition_value": condition_value
                }
            }
        }
    }
}

exports.ValidateService = Validate;