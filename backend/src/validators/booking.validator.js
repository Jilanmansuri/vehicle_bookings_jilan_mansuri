import { body } from 'express-validator';

export const createBookingValidationRules = () => {
  return [
    body('customer')
      .notEmpty()
      .withMessage('Customer ID is required')
      .isMongoId()
      .withMessage('Invalid Customer ID format'),
    body('driver')
      .optional()
      .isMongoId()
      .withMessage('Invalid Driver ID format'),
    body('vehicle')
      .notEmpty()
      .withMessage('Vehicle ID is required')
      .isMongoId()
      .withMessage('Invalid Vehicle ID format'),
    body('pickupLocation')
      .notEmpty()
      .withMessage('Pickup Location is required')
      .isMongoId()
      .withMessage('Invalid Pickup Location format'),
    body('dropLocation')
      .notEmpty()
      .withMessage('Drop Location is required')
      .isMongoId()
      .withMessage('Invalid Drop Location format'),
    body('distance')
      .notEmpty()
      .withMessage('Distance is required')
      .isNumeric()
      .withMessage('Distance must be a number'),
    body('fare')
      .notEmpty()
      .withMessage('Fare is required')
      .isNumeric()
      .withMessage('Fare must be a number'),
    body('paymentMethod')
      .optional()
      .isMongoId()
      .withMessage('Invalid Payment Method ID format'),
    body('status')
      .optional()
      .isIn(['Success', 'Cancelled by Driver', 'Cancelled by Customer', 'Pending'])
      .withMessage('Invalid status value'),
  ];
};
