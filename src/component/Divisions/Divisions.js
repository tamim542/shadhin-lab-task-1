import { allDivision,allDistrict,DivisionName, districtsOf } from '@bangladeshi/bangladesh-address';
import React from 'react';

const Divisions = () => {
    const address = require('@bangladeshi/bangladesh-address')

let countries = allDivision();

let abcd = districtsOf(DivisionName?.Dhaka);

    return (
        <div>
          
        </div>
    );
};

export default Divisions;