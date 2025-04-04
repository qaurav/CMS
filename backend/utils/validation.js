const validateLocation = (location) => {
    const errors = [];

    if (!location.locationname) errors.push("Name is required");
    if(!location.address) errors.push ("Address is required")
    
    return {
        isValid :errors.length === 0,
        errors
    };
};

const validateService = (service) => {
    const errors = [];

    if (!service.name) errors.push("Name is required");
    if(!service.description) errors.push ("Address is required")
    
    return {
        isValid :errors.length === 0,
        errors
    };
};

const validateBooking = (booking) => {
    const errors = [];
  
    if (!booking.name) errors.push('Name is required');
    if (!booking.email) errors.push('Email is required');
    if (!booking.phone) errors.push('Phone is required');
    if (!booking.service) errors.push('Service is required');
    if (!booking.address) errors.push('Address is required');
    if (!booking.date) errors.push('Date is required');
  
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  

module.exports = {
    validateLocation,
    validateService,
    validateBooking
}